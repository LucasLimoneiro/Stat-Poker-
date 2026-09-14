# 01-NORTH_STAR.md: Intenção e Limites do Projeto

# 🎯 1. Intenção Central (The North Star)
R: Transformar a gestão de clubes de poker, eventos e torneios em uma operação 100% integrada, digital e em tempo real — unindo Torneios, Cash Game, Bar & Restaurante, Financeiro (PW PIX), Engajamento (Ranking/Jackpot) e o aplicativo do jogador (GameID) em uma só mesa, garantindo máxima segurança com banco de dados exclusivo por clube e autenticação em dois fatores (2FA).

# 😫 2. O Problema Real (A Dor)
R: Clubes de poker enfrentam gargalos operacionais críticos:
1. **Filas no Caixa às 21h de quinta-feira:** Lentidão em inscrições de torneios, rebuys, addons e fichário de cash game.
2. **Descentralização e Descontrole:** O bar funciona em um sistema separado, o fichário em planilhas manuais, e o relógio de torneio nas TVs perde sincronia ou exige operação redundante.
3. **Falta de Transparência para o Jogador:** Jogadores não conseguem consultar seus pontos de ranking ao vivo, saldo em fichário ou histórico de premiações de forma autônoma.
4. **Risco e Insegurança de Dados:** Sistemas legados usam servidores locais instáveis, sem backup em nuvem e sem isolamento de banco de dados por clube.

# 👥 3. Público-Alvo (As Personas)

| Persona | Descrição |
| :--- | :--- |
| **Victor (Dono/Administrador do Clube)** | Gestor que precisa de visão 360° em tempo real (faturamento, rake total, despesas, fluxo de caixa e relatórios consolidados) sem depender de infraestrutura física de servidores. |
| **Marcos (Diretor de Torneios / Floor)** | Responsável pelo salão, gestão de blinds, sincronização de relógio nas TVs, tickets automáticos de mesa/posição, rebuys, addons e redraw balanceado. |
| **Camila (Operadora de Caixa & Bar)** | Precisa registrar buy-ins, saques de cash game, comandas de bar e pagamentos via PIX em segundos, sem divergências no fechamento de caixa. |
| **Lucas (Dealer / Fichário)** | Opera a mesa de cash game direto no app: registra tempo de jogo, solicita reposição de fichas e gerencia a fila de espera digital. |
| **Rodrigo (Jogador Regular)** | Utiliza o **GameID** para auto-cadastro, inscrição rápida via QR PIX, acompanhamento do ranking da temporada, jackpot e contagem de fichas ao vivo. |

# 🔍 4. Checklist de Descoberta (5 Questões)

| Critério | Resposta |
| :--- | :--- |
| **Fonte do Dado** | Dados operacionais em tempo real (torneios, mesas de cash game, comandas de bar, transações PIX, pontuação de ranking e logs de caixas) persistidos em banco de dados isolado por clube. |
| **Entrega** | Plataforma Web SaaS (Landing Page pública + Dashboard SPA responsivo) acessível via navegador em qualquer dispositivo (desktop, tablet, celular e TVs do salão). |
| **Regra de Ouro** | Fila zero no caixa, controle total de fichas/rake em tempo real e estabilidade operacional 100% online com banco exclusivo e 2FA. |
| **Resiliência** | Arquitetura leve, banco isolado por tenant, suporte a reconexão automática e operação veloz mesmo em horários de pico. |
| **Interface** | Design Dark Mode de alto impacto com estética casino moderna (acentos em verde `#3ecf8e`, vermelho `#e0332b`, dourado/laranja e naipes de cartas animados). |

# 🚫 5. Limites e Fora de Escopo
Para manter o foco, alta performance e simplicidade Karpathy-style:

| Não faremos | Motivo |
| :--- | :--- |
| ❌ Intermediação de apostas online com dinheiro real no app | O StatPoker é um software de gestão e automação para clubes físicos e eventos presenciais, não um operador de apostas online. |
| ❌ Dependência de servidores locais instalados no clube | A solução é 100% em nuvem (SaaS), eliminando custos de TI e manutenção de hardware físico no salão. |
| ❌ Banco de dados compartilhado/misturado entre clubes | Cada clube possui banco de dados estritamente isolado para conformidade de dados e segurança máxima. |
| ❌ Módulos contábeis fiscais complexos no MVP | Foco total na operação do salão, fichário, PIX, caixas e centro de custos do poker. |
| ❌ Aplicativo nativo pesado que exija download obrigatório no caixa | Web App ultrarrápido (PWA / SPA) roda direto no navegador de qualquer dispositivo sem atrito. |

# ⚖️ 6. Mindset de Simplicidade (Karpathy Style)
Regra 80/20: 80% do valor operacional do clube é entregue com 20% do código essencial bem estruturado.

**Foco do MVP:**
1. **Landing Page Comercial:** Apresentação da plataforma, módulos ("Tudo na Mesa"), tabela de planos (Start, Pro, Enterprise), formulário de contato e chamada de migração gratuita.
2. **Módulo de Autenticação Segura:** Login com e-mail/usuário, senha e verificação em duas etapas (2FA / OTP 6 dígitos) com indicação de banco de dados exclusivo do clube.
3. **Dashboard Operacional Completo:**
   - **Operação:** Home com KPIs ao vivo (Faturamento, Rake, Jogadores, Despesas), Torneios (blinds, relógio, tickets), Cash Game (mesas, fichário, fila), Bar & Restaurante (comandas e estoque).
   - **Cadastros:** Jogadores (GameID) e Funcionários (cargos e permissões).
   - **Engajamento:** Ranking automatizado, Tickets de satélites e Jackpot acumulado.
   - **Gestão:** Financeiro integrado com PW PIX, extrato consolidado de caixas e relatórios analíticos.

# 🛂 Instrução para a IA
"Antes de iniciar qualquer fase de desenvolvimento ou alteração, leia este NORTH_STAR. Qualquer funcionalidade sugerida que fira os limites do Item 5 ou o Mindset do Item 6 deve ser descartada imediatamente. Mantenha o foco no problema real: gestão integrada, rápida e segura de clubes de poker com o StatPoker."

✅ Arquivo 01-NORTH_STAR.md atualizado com as informações oficiais do STATPOKER!
