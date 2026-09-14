import os
import sys
import re
import sqlite3
import csv
import io
from datetime import datetime
from flask import Flask, request, jsonify, send_file, render_template_string

# Forçar stdout para UTF-8 no Windows para evitar UnicodeEncodeError em terminais CP1252
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

app = Flask(__name__)

# Configuração de caminhos absolutos (Regra de Ouro Ana)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get('DB_PATH', os.path.join(BASE_DIR, 'database.db'))
HTML_PATH = os.path.join(BASE_DIR, 'index.html')

ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "admin123")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    print(f"⚙️ Inicializando banco de dados em: {DB_PATH}")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS presencas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            evento_id TEXT NOT NULL,
            aluno_nome TEXT NOT NULL,
            aluno_email TEXT NOT NULL,
            aluno_matricula TEXT NOT NULL,
            status TEXT DEFAULT 'PRESENTE',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(evento_id, aluno_matricula)
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Tabela 'presencas' pronta para uso.")

@app.route('/')
@app.route('/a-casa')
@app.route('/agenda')
@app.route('/programas')
@app.route('/contato')
@app.route('/apoie')
@app.route('/plano-museologico')
def home():
    with open(HTML_PATH, 'r', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content)

@app.route('/api/registrar', methods=['POST'])
def registrar_presenca():
    payload = request.get_json() or {}
    evento_id = payload.get('evento_id', '').strip()
    aluno_nome = payload.get('aluno_nome', '').strip()
    aluno_email = payload.get('aluno_email', '').strip()
    aluno_matricula = payload.get('aluno_matricula', '').strip()

    print(f"📥 Recebendo dados de {aluno_nome} ({aluno_matricula})...")

    # Validações de integridade conforme SCHEMA.md e DERS
    if not all([evento_id, aluno_nome, aluno_email, aluno_matricula]):
        print("⚠️ Falha: Campos obrigatórios ausentes.")
        return jsonify({'erro': 'Todos os campos são obrigatórios.'}), 400

    if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", aluno_email):
        print(f"⚠️ Falha: E-mail inválido ({aluno_email}).")
        return jsonify({'erro': 'Formato de e-mail inválido.'}), 400

    if not aluno_matricula.isdigit():
        print(f"⚠️ Falha: Matrícula não numéricas ({aluno_matricula}).")
        return jsonify({'erro': 'A matrícula deve conter apenas dígitos numéricos.'}), 400

    try:
        now = datetime.now().isoformat()
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO presencas (evento_id, aluno_nome, aluno_email, aluno_matricula, timestamp)
                VALUES (?, ?, ?, ?, ?)
            ''', (evento_id, aluno_nome, aluno_email, aluno_matricula, now))
            conn.commit()

        print(f"✅ Presença salva em database.db com sucesso para {aluno_nome}.")
        return jsonify({
            'mensagem': 'Presença registrada com sucesso.',
            'status': 'PRESENTE',
            'timestamp': now
        }), 201

    except sqlite3.IntegrityError:
        print(f"⚠️ Falha: Matrícula {aluno_matricula} já registrada para o evento {evento_id}.")
        return jsonify({'erro': 'Presença já registrada para esta matrícula neste evento.'}), 409
    except Exception as e:
        print(f"❌ Erro interno no servidor: {str(e)}")
        return jsonify({'erro': 'Erro interno ao salvar no banco de dados.'}), 500

@app.route('/api/presencas', methods=['GET'])
def listar_presencas():
    token = request.headers.get('X-Admin-Token')
    if token != ADMIN_TOKEN:
        print("🔒 Acesso negado à rota /api/presencas: Token inválido.")
        return jsonify({'erro': 'Não autorizado. Token inválido.'}), 401

    print("📊 Consultando lista de presenças...")
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, evento_id, aluno_nome, aluno_email, aluno_matricula, status, timestamp FROM presencas ORDER BY timestamp DESC')
        rows = cursor.fetchall()

    resultado = [dict(row) for row in rows]
    print(f"✅ {len(resultado)} registros encontrados.")
    return jsonify(resultado), 200

@app.route('/api/exportar-csv', methods=['GET'])
def exportar_csv():
    token = request.headers.get('X-Admin-Token') or request.args.get('token')
    if token != ADMIN_TOKEN:
        print("🔒 Acesso negado à exportação CSV: Token inválido.")
        return jsonify({'erro': 'Não autorizado. Token inválido.'}), 401

    print("📄 Gerando arquivo CSV com BOM...")
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, evento_id, aluno_nome, aluno_email, aluno_matricula, status, timestamp FROM presencas ORDER BY timestamp DESC')
        rows = cursor.fetchall()

    # Gera CSV com BOM para Excel (utf-8-sig)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['id', 'evento_id', 'aluno_nome', 'aluno_email', 'aluno_matricula', 'status', 'timestamp'])

    for row in rows:
        writer.writerow([row['id'], row['evento_id'], row['aluno_nome'], row['aluno_email'], row['aluno_matricula'], row['status'], row['timestamp']])

    mem = io.BytesIO()
    mem.write(output.getvalue().encode('utf-8-sig'))
    mem.seek(0)

    filename = f"presencas_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    print(f"✅ Arquivo {filename} enviado com sucesso.")
    return send_file(
        mem,
        mimetype='text/csv',
        as_attachment=True,
        download_name=filename
    )

if __name__ == '__main__':
    init_db()
    print("🚀 Servidor VEM rodando em http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
