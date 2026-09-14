# ♠️ StatPoker — Plataforma de Gestão de Clubes de Poker

> **Slogan:** Seu clube inteiro, numa só mesa. Torneios, cash game, bar, financeiro, ranking e o app do jogador — 100% online, com banco exclusivo e 2FA.

Este repositório consolida o projeto **StatPoker** utilizando a metodologia **VEM (Vibe Engineering Method)** e **AI-First Engineering**, integrando **Engenharia de Requisitos**, **Spec-Driven Development (SDD)** e as diretrizes de simplicidade **Karpathy-style**.

---

## 🏗️ Visão Geral do Produto e Módulos

O **StatPoker** centraliza todas as frentes de um clube de poker em uma única interface moderna, segura e de altíssima performance:

1. **Torneios:** Gestão de blinds, caixas com tickets automáticos de mesa e posição, relógio sincronizado nas TVs e controle de redraw balanceado.
2. **Cash Game:** Fichário em tempo real, fila de espera digital inteligente e controle de tempo por jogador via app do dealer.
3. **Bar & Restaurante:** Ponto de venda (PDV), comandas no caixa ou na mesa e baixa de estoque em tempo real a cada item vendido.
4. **Financeiro:** Centro de custos por setor (Torneios, Cash, Bar, Administrativo), conciliação com PW PIX e extrato consolidado de múltiplos caixas.
5. **Engajamento & Fidelização:** Leaderboard com fórmula de pontuação customizável, tickets de satélites rastreáveis e jackpot acumulado ao vivo.
6. **GameID (App do Jogador):** Auto-cadastro, pagamento de inscrições via QR PIX, consulta de saldo de fichário e acompanhamento de torneios em tempo real.
7. **Autenticação & Segurança:** Acesso seguro com verificação em duas etapas (2FA / OTP 6 dígitos) e banco de dados exclusivo isolado por clube.
8. **Planos Comerciais:**
   - **Start (R$ 297/mês):** Torneios + Cash Game, até 3 logins de equipe, relógio nas TVs.
   - **Pro (R$ 597/mês - Mais Escolhido):** Tudo do Start + Bar, Financeiro PW PIX, Ranking, Jackpot, Logins ilimitados e suporte prioritário 7 dias.
   - **Enterprise (Sob Consulta):** Tudo do Pro + GameID White-label, multi-unidades e gerente exclusivo.

---

## 🗺️ Mapa da Memória e Documentação Técnica (VEM)

Os arquivos `.md` deste repositório formam a **Única Fonte da Verdade** para o desenvolvimento e operação da plataforma:

1. **`01-NORTH_STAR.md` (Intenção e Limites):** Define o propósito central do StatPoker, as dores reais do salão de poker e as personas-chave.
2. **`02-DERS_MESTRE.md` (Especificação de Requisitos):** Contrato vivo com todos os Requisitos de Usuário (RU), Sistema (RS), Funcionais (RF01 a RF12), Regras de Negócio (RN) e Não-Funcionais (RNF).
3. **`03-FRONTEND_GUIDE.md` (Manual do José - UI/UX):** Diretrizes de design Dark Mode, paleta de cores (`#3ecf8e`, `#e0332b`), animações de fichas/cartas, componentes da Landing Page e Dashboard SPA.
4. **`04-BACKEND_GUIDE.md` (Manual da Ana - Backend):** Arquitetura Python/Flask, rotas REST, transações atômicas de caixa/estoque e isolamento de banco de dados.
5. **`05-FINDINGS.md` (Memória Técnica & Autocura):** Diário de incidentes, causas raízes, correções cirúrgicas e decisões de trade-off registradas.
6. **`06-WIREFRAME_IDEAS.md` (Arquitetura Visual):** Diagrama de Casos de Uso em Mermaid e wireframes textuais da Landing Page, Modais de Auth/2FA e Dashboard.
7. **`SCHEMA.md` (Constituição dos Dados):** Estrutura inegociável *"JSON is Law"* para Leads, Torneios, Mesas de Cash, Comandas, Jogadores e KPIs.
8. **`VIBE_MANIFEST.md` (Regras Inegociáveis):** Hard rules de desenvolvimento, simplicidade radical e protocolos de recusa (*push back*).
9. **`CLAUDE.md` (Diretrizes Comportamentais):** Identidades das personas VEM (José, Ana, Maria, Tiago) e regras de operação da IA.
10. **`SKILL.md` (Biblioteca de Padrões Técnicos):** Guia de Engenharia de Requisitos, taxonomia, acessibilidade WCAG (POUR) e testes no padrão AAA.
11. **`PROMPTS.md` (Roteiro de Execução):** Prompts mestres de sistema e de cada persona técnica para build e ship.
12. **`VCC_TEMPLATE.md` (Contrato de Sessão):** Template oficial do Vibe-Coding Canvas para governança de sessões de codificação.

---

## 🛂 Protocolo de Personas dos Agentes

* **José (Frontend):** Interfaces visuais premium, Dark Mode, responsividade mobile/TV e acessibilidade POUR.
* **Ana (Backend):** APIs RESTful leves, banco de dados segregado por clube e segurança com 2FA.
* **Maria (Auditora):** Conformidade com LGPD, segurança de dados do jogador e integridade de requisitos.
* **Tiago (QA):** Automação de testes no padrão AAA (Arrange, Act, Assert) e integridade de caixas/fichário.

---

## ⚖️ Regras Karpathy Inegociáveis

* **Pense antes de codar:** Analise regras financeiras e de regras de poker antes de gerar código.
* **Regra 80/20:** Entregue 80% do valor operacional com 20% do código essencial bem estruturado.
* **Mudanças Cirúrgicas:** Altere estritamente as linhas necessárias, preservando o que já funciona.
* **JSON is Law:** Nenhuma alteração no código pode violar as definições do `SCHEMA.md`.

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências (Python/Flask)
pip install -r requirements.txt

# 2. Iniciar o servidor da aplicação
python app.py
```
Acesse no navegador: `http://localhost:5000`

---
© 2026 StatPoker — Gestão Inteligente de Clubes de Poker.
