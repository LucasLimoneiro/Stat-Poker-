# 📝 02-DERS_MESTRE.md: Especificação Mestre de Requisitos

# 📑 1. Identificação e Controle de Versão
- **Projeto:** Plataforma StatPoker — Gestão de Clubes de Poker ("Seu clube inteiro, numa só mesa").
- **Versão:** 1.0 (Baseada no VEM).
- **Responsáveis:** Equipe de Produto & Engenharia StatPoker.
- **Histórico:** Consolidação pós-North Star para plataforma Web SaaS integrada (Landing Page + Dashboard Operacional SPA + GameID).

# 🎯 2. Visão Geral e Escopo
- **Objetivo Central:** Centralizar a gestão operacional, financeira e de engajamento de clubes e torneios de poker em uma plataforma 100% online, eliminando filas no caixa, unificando controle de bar, fichário e relógios de torneio, com banco exclusivo por clube e 2FA.
- **Público-Alvo:** Donos de clubes (Victor), Diretores de torneio/Floors (Marcos), Operadores de caixa/bar (Camila), Dealers (Lucas) e Jogadores de poker (Rodrigo via GameID).
- **Fora de Escopo:** Apostas de dinheiro real no app sem presença física, módulos contábeis legados com emissão fiscal complexa, servidores locais obrigatórios.

# 👥 3. Requisitos de Usuário (RU)

| ID | Descrição do Requisito de Usuário |
| :--- | :--- |
| **RU01** | O administrador do clube deseja visualizar em tempo real os KPIs consolidados (Faturamento, Rake, Jogadores Ativos e Despesas) para tomar decisões rápidas. |
| **RU02** | O diretor de torneio (Floor) deseja criar e gerenciar torneios, controlar níveis de blinds, emitir tickets automáticos de mesa e exibir o relógio sincronizado nas TVs. |
| **RU03** | O operador do fichário e o dealer desejam controlar as mesas de cash game ativas, registrar tempo de jogo, calcular rake e gerenciar a fila de espera digital. |
| **RU04** | O atendente de bar/restaurante deseja lançar comandas vinculadas ao jogador ou à mesa com baixa automática de estoque no ato da venda. |
| **RU05** | O gerente financeiro deseja conciliar entradas e saídas de caixas, sangrias, agendamentos e transações via PW PIX em um extrato único. |
| **RU06** | O jogador de poker deseja consultar sua pontuação no ranking, ingressos/tickets conquistados em satélites e valor acumulado do Jackpot pelo GameID. |
| **RU07** | O interessado em contratar a plataforma deseja conhecer os módulos, consultar os planos de assinatura (Start, Pro, Enterprise) e solicitar contato comercial ou migração gratuita. |

# ⚙️ 4. Requisitos de Sistema (RS)

| ID | Descrição Técnica |
| :--- | :--- |
| **RS01** | A interface web deve ser composta por Landing Page institucional/comercial responsiva e Dashboard SPA modular com suporte a rotas internas. |
| **RS02** | O sistema de autenticação deve prover verificação em duas etapas (2FA via código OTP de 6 dígitos) antes de liberar acesso ao painel do clube. |
| **RS03** | A persistência deve garantir isolamento de banco de dados por clube (single-database por tenant), assegurando privacidade e velocidade. |
| **RS04** | A interface visual deve utilizar tema Dark Mode moderno com acentos nas cores `#3ecf8e` (verde vitória), `#e0332b` (vermelho naipe) e animações dinâmicas de fichas e cartas. |
| **RS05** | O relógio de torneios e o painel de KPIs devem suportar atualização em tempo real com baixa latência para sincronização com monitores de TV. |

# ✅ 5. Requisitos Funcionais (RF) e Priorização

| ID | Descrição do Requisito Funcional | Tipo | Prioridade | Critério de Aceite (Sucesso) |
| :--- | :--- | :--- | :--- | :--- |
| **RF01** | **Landing Page Comercial:** Hero com proposta de valor, animação de fichas e cartas, banner de migração gratuita, seção Quem Somos com estatísticas (3 produtos, 100% online, 1 banco exclusivo), módulos "Tudo na Mesa", tabela de Planos (Start R$ 297, Pro R$ 597, Enterprise sob consulta), formulário Fale Conosco e Rodapé. | RS | Essencial | Página carrega completa com design fluido, âncoras funcionais e envio de formulário simulado/ativo. |
| **RF02** | **Módulo de Autenticação e 2FA:** Modal de login (usuário e senha) conectado ao fluxo de verificação em duas etapas (input de 6 dígitos OTP) e redirecionamento para o Dashboard do clube. | RS | Essencial | Usuário autentica com credenciais válidas e código OTP 2FA. |
| **RF03** | **Dashboard - Visão Home:** Exibição dos 4 cards de KPIs (Faturamento R$ 86.320, Rake Total R$ 14.780, Jogadores Únicos 214, Despesas R$ 22.140), filtro de período, gráfico de faturamento semanal, gráfico de composição de rake, listas de torneios em andamento e movimentação recente de caixas. | RS | Essencial | Dados dos KPIs e gráficos renderizam com precisão e responsividade. |
| **RF04** | **Módulo Torneios:** Cadastro de eventos, controle de estrutura de blinds, tempo por nível, buy-in/rebuy/addon, emissão de tickets de mesa e posição, relógio de salão e controle de redraw. | RS | Essencial | Criação e acompanhamento de torneio ativo com contagem regressiva de blinds. |
| **RF05** | **Módulo Cash Game:** Gestão de mesas abertas por modalidade (Texas Hold'em, Omaha), limites (blinds), controle de fichas em jogo, tempo por jogador, lista de espera digital e apuração de rake/drop. | RS | Essencial | Abertura de mesa, entrada/saída de jogadores e cálculo de rake em tempo real. |
| **RF06** | **Módulo Bar & Restaurante:** Ponto de venda (PDV), abertura de comandas na mesa ou no cadastro do jogador, lançamento de itens e baixa imediata de estoque. | RS | Essencial | Comanda lançada calcula total e debita estoque dos itens vendidos. |
| **RF07** | **Módulo Cadastros (Jogadores & Funcionários):** Gestão de cadastro de jogadores (GameID, CPF, telefone, histórico, saldo) e equipe interna (cargos, permissões: administrador, floor, caixa, dealer). | RS | Essencial | Listagem, busca e cadastro de novos jogadores e operadores. |
| **RF08** | **Módulo Engajamento (Ranking, Tickets & Jackpot):** Cálculo e leaderboard do ranking da temporada com fórmulas personalizadas, controle de tickets de satélites emitidos/utilizados e monitor do valor do Jackpot acumulado. | RS | Importante | Leaderboard exibe top jogadores e histórico de premiações de jackpot. |
| **RF09** | **Módulo Financeiro:** Painel de fluxo de caixa, centro de custos (Torneios, Cash, Bar, Administrativo), conciliação de pagamentos PW PIX e extrato detalhado por operador de caixa. | RS | Essencial | Extrato exibe transações de entradas/saídas com filtros por operador e data. |
| **RF10** | **Módulo Relatórios:** Exportação e visualização analítica de relatórios consolidados de desempenho financeiro e operacional do clube. | RS | Importante | Relatórios geram resumos consolidados de faturamento e rake. |
| **RF11** | **Integração GameID (App do Jogador):** Interface web mobile para auto-cadastro, consulta de ranking ao vivo, saldo de fichário e pré-inscrição em torneios com QR Code PIX. | RS | Importante | Jogador acessa seus dados e leaderboard diretamente pelo smartphone. |
| **RF12** | **Ticker Animado e Efeitos Visuais:** Barras de rolagem infinita com tags dos módulos (Torneios, Cash Game, Bar, Financeiro, Ranking, Jackpot, GameID, Tickets) e naipes de baralho. | RS | Desejável | Animação contínua e suave sem travar a navegação. |

# 📏 6. Regras de Negócio (RN)

| ID | Descrição da Regra de Negócio | Requisito Relacionado |
| :--- | :--- | :--- |
| **RN01** | **Isolamento de Dados:** Cada clube contratante opera sobre seu próprio banco de dados isolado; nenhum dado é compartilhado entre organizações distintas. | RF02, RF03, RNF03 |
| **RN02** | **Obrigatoriedade de 2FA:** Acessos administrativos e de operadores financeiros exigem verificação em duas etapas ativa. | RF02 |
| **RN03** | **Cálculo de Rake e Drop:** O rake recolhido nas mesas de cash game deve ser contabilizado automaticamente nas métricas financeiras ao encerramento de cada sessão ou mão. | RF03, RF05, RF09 |
| **RN04** | **Regra de Estoque do Bar:** Toda venda registrada no módulo Bar & Restaurante deve gerar baixa automática no inventário do item respectivo. | RF06 |
| **RN05** | **Pontuação de Ranking:** Os pontos de torneio são calculados de acordo com a fórmula configurada pelo clube (ponderando buy-in, número de inscritos e colocação). | RF08 |
| **RN06** | **Fechamento de Caixa:** Nenhum caixa de operador pode ser encerrado sem a conciliação física de dinheiro, comprovantes de cartão e transações PW PIX. | RF09 |

# 🛡️ 7. Requisitos Não Funcionais (RNF)

| ID | Nome / Atributo | Categoria | Prioridade | Descrição Técnica |
| :--- | :--- | :--- | :--- | :--- |
| **RNF01** | **Performance & Latência** | Performance | Essencial | Carregamento da página em < 1.5s e tempo de resposta de API < 200ms para garantir velocidade no caixa. |
| **RNF02** | **Responsividade Total** | Usabilidade | Essencial | Interface adaptada para smartphones, tablets, desktops e TVs Full HD / 4K para exibição de blinds e ranking. |
| **RNF03** | **Segurança e Criptografia** | Segurança | Essencial | Comunicação 100% HTTPS/WSS, senhas com hash seguro (bcrypt/argon2) e segregação de tenants. |
| **RNF04** | **Identidade Visual Premium** | Usabilidade | Essencial | Tema Dark Mode com estética de cassino sofisticado, contrastes adequados e tipografia sem serifa de alta legibilidade. |
| **RNF05** | **Alta Disponibilidade (SaaS)** | Confiabilidade | Essencial | Arquitetura em nuvem resiliente com 99.9% de uptime para suportar picos noturnos e torneios de fim de semana. |
| **RNF06** | **Acessibilidade POUR** | Usabilidade | Importante | Conformidade com princípios POUR (WCAG AA), foco navegável por teclado e elementos semânticos. |

# ⚖️ 8. Diretrizes Karpathy de Implementação (VEM)
- **Pense antes de codar:** Analise as regras de cálculo de rake, blinds e estoque antes de qualquer alteração lógica.
- **Simplicidade Radical:** Mantenha a arquitetura leve (HTML/CSS/JS Vanilla no front + Flask/SQLite no back), sem dependências pesadas desnecessárias.
- **Mudanças Cirúrgicas:** Altere estritamente os componentes ou rotas afetados, preservando as animações e estilos globais consolidados.
- **Fidelidade Visual:** Respeite rigorosamente a paleta StatPoker (`#0d0d11`, `#15151e`, `#3ecf8e`, `#e0332b`) e a hierarquia do layout.

# 🔗 9. Matriz de Rastreabilidade Simples

| RU | Requisitos Relacionados |
| :--- | :--- |
| **RU01 (KPIs em tempo real)** | RF03, RF09, RNF01, RNF04 |
| **RU02 (Direção de Torneios)** | RF04, RF08, RNF02 |
| **RU03 (Cash Game & Fichário)** | RF05, RF09, RN03 |
| **RU04 (Bar & Restaurante)** | RF06, RN04, RF09 |
| **RU05 (Gestão Financeira & PIX)** | RF09, RN06, RNF03 |
| **RU06 (GameID do Jogador)** | RF08, RF11, RNF02 |
| **RU07 (Landing Page & Planos)** | RF01, RF12, RNF01, RNF04 |

✅ Arquivo 02-DERS_MESTRE.md atualizado com as especificações completas do STATPOKER!
