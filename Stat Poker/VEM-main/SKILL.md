# 🧠 SKILL.md: Base de Conhecimento e Padrões Técnicos

## 🏛️ 1. Engenharia de Requisitos (Taxonomia VEM aplicada ao StatPoker)

Os requisitos da plataforma **StatPoker** são classificados seguindo a taxonomia formal da Engenharia de Requisitos para eliminar ambiguidades:

* **RU (Requisitos de Usuário):** Descrições em alto nível das necessidades dos donos de clube, floors, caixas, dealers e jogadores de poker.
* **RS (Requisitos de Sistema):** Especificações técnicas estruturadas que definem o comportamento da Landing Page, Dashboard SPA, APIs e persistência.
* **RF (Requisitos Funcionais):** Funções explícitas do software (ex.: criação de torneios, cálculo de rake em mesas de cash game, lançamento de comandas com baixa de estoque, autenticação 2FA).
* **RN (Regras de Negócio):** Diretrizes e restrições mandatórias do domínio (ex.: "Isolamento de banco por clube", "Nenhum caixa pode fechar sem conciliação de PIX/dinheiro").
* **RNF (Requisitos Não Funcionais):** Critérios de qualidade como tempo de resposta < 200ms no caixa, disponibilidade 99.9%, segurança HTTPS e acessibilidade POUR.

---

## ⚖️ 2. Categorias de Prioridade (Regra 80/20)

1. **Essencial:** Requisitos vitais para a operação básica do clube (Torneios, Cash Game, Bar, Caixas, 2FA, Dashboard).
2. **Importante:** Requisitos de alto valor agregado que complementam a operação (Jackpot, Ranking, Relatórios consolidados, GameID).
3. **Desejável:** Funcionalidades adicionais e melhorias cosméticas para ciclos futuros do PDCA (animações extras, personalizações avançadas).

---

## ♿ 3. Acessibilidade Digital (Padrão WCAG / POUR)

Toda interface gerada para o StatPoker (Landing Page e Dashboard) deve atender aos princípios POUR:

* **Perceptível (Perceivable):** Alto contraste no Dark Mode, ícones com textos acessíveis ou `aria-label`, elementos visuais nítidos.
* **Operável (Operable):** Todos os modais (Login, 2FA), navegação de abas e formulários são operáveis por teclado (Tab, Enter, Esc).
* **Compreensível (Understandable):** Rótulos claros para buy-in, blinds, rake, feedback imediato em erros de validação e confirmações de ações críticas.
* **Robusto (Robust):** Código semântico HTML5 puro, compatível com navegadores modernos em desktops, tablets, smartphones e Smart TVs do salão.

---

## 🧪 4. Padrões de Teste (Modelo AAA)

Todos os testes de rotas da API, regras de fichário e cálculos financeiros devem seguir a estrutura Arrange, Act, Assert:

* **Arrange (Organizar):** Inicializa o estado de teste, mock de banco isolado e parâmetros de requisição.
* **Act (Agir):** Invoca a função de cálculo ou executa a chamada HTTP na rota.
* **Assert (Verificar):** Valida status HTTP, integridade do payload JSON retornado e persistência correta no banco.

---

## 🤖 5. Spec-Driven Development (SDD)

* **Definição de Escopo:** Nenhuma linha de código é alterada sem correspondência com o `02-DERS_MESTRE.md`.
* **Soberania do Dado:** Toda estrutura trafegada deve refletir exatamente o `SCHEMA.md`.
* **Mudanças Cirúrgicas:** Alterações estritas e pontuais no código para manter estabilidade operacional.

---

## 🗺️ 6. Modelagem e Diagramação (Mermaid.js)

Os agentes devem manter os fluxos de caixa, transições de estado de torneio e diagramas de caso de uso expressos em **Mermaid.js** no `06-WIREFRAME_IDEAS.md`.

---
**💡 Instrução para a IA:** Utilize este arquivo como manual de conformidade técnica para qualquer implementação no StatPoker.

✅ Arquivo SKILL.md atualizado com os padrões técnicos do STATPOKER!
