import os
import unittest
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEST_DB_PATH = os.path.join(BASE_DIR, 'test_database.db')

os.environ["ADMIN_TOKEN"] = "admin123"
os.environ["DB_PATH"] = TEST_DB_PATH

from app import app, init_db, get_db_connection

class TestAppAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if os.path.exists(TEST_DB_PATH):
            try:
                os.remove(TEST_DB_PATH)
            except OSError:
                pass
        init_db()

    @classmethod
    def tearDownClass(cls):
        if os.path.exists(TEST_DB_PATH):
            try:
                os.remove(TEST_DB_PATH)
            except OSError:
                pass

    def setUp(self):
        app.config['TESTING'] = True
        self.client = app.test_client()
        conn = get_db_connection()
        try:
            conn.execute('DELETE FROM presencas')
            conn.commit()
        finally:
            conn.close()

    def test_registrar_presenca_sucesso(self):
        # 1. Arrange
        payload = {
            "evento_id": "palestra-01",
            "aluno_nome": "João Silva",
            "aluno_email": "joao.silva@universidade.edu.br",
            "aluno_matricula": "20261001"
        }

        # 2. Act
        response = self.client.post(
            '/api/registrar',
            data=json.dumps(payload),
            content_type='application/json'
        )

        # 3. Assert
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data["status"], "PRESENTE")
        self.assertIn("timestamp", data)

    def test_registrar_presenca_duplicada_erro(self):
        # 1. Arrange
        payload = {
            "evento_id": "palestra-01",
            "aluno_nome": "João Silva",
            "aluno_email": "joao.silva@universidade.edu.br",
            "aluno_matricula": "20261001"
        }
        self.client.post('/api/registrar', data=json.dumps(payload), content_type='application/json')

        # 2. Act
        response = self.client.post('/api/registrar', data=json.dumps(payload), content_type='application/json')

        # 3. Assert
        self.assertEqual(response.status_code, 409)
        data = json.loads(response.data)
        self.assertIn("Presença já registrada", data["erro"])

    def test_registrar_matricula_invalida(self):
        # 1. Arrange
        payload = {
            "evento_id": "palestra-01",
            "aluno_nome": "Maria Souza",
            "aluno_email": "maria@universidade.edu.br",
            "aluno_matricula": "2026ABC" # Inválido (contém letras)
        }

        # 2. Act
        response = self.client.post('/api/registrar', data=json.dumps(payload), content_type='application/json')

        # 3. Assert
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("dígitos numéricos", data["erro"])

    def test_listar_presencas_autenticacao(self):
        # 1. Arrange - Sem token de admin
        response_unauthorized = self.client.get('/api/presencas')
        self.assertEqual(response_unauthorized.status_code, 401)

        # 2. Act - Com token de admin
        response_authorized = self.client.get('/api/presencas', headers={'X-Admin-Token': 'admin123'})

        # 3. Assert
        self.assertEqual(response_authorized.status_code, 200)
        data = json.loads(response.authorized_data if hasattr(response_authorized, 'authorized_data') else response_authorized.data)
        self.setIsInstance = isinstance(data, list)
        self.assertTrue(isinstance(data, list))

    def test_exportar_csv_sucesso(self):
        # 1. Arrange: Registrar um aluno
        payload = {
            "evento_id": "palestra-01",
            "aluno_nome": "Carlos Lima",
            "aluno_email": "carlos@universidade.edu.br",
            "aluno_matricula": "20261002"
        }
        self.client.post('/api/registrar', data=json.dumps(payload), content_type='application/json')

        # 2. Act
        response = self.client.get('/api/exportar-csv?token=admin123')

        # 3. Assert
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'text/csv')
        self.assertIn(b'Carlos Lima', response.data)

if __name__ == '__main__':
    unittest.main()
