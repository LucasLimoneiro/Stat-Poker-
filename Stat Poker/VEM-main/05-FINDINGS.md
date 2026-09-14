# 🧠 05-FINDINGS.md: Memória Técnica e Log de Autocura

## 🎯 1. Propósito e Uso

Este arquivo é a **Memória Técnica e Cérebro de Autocura** do projeto **StatPoker**. Sempre que ocorrer um erro de execução, divergência de estado entre módulos (Torneios, Cash Game, Bar, Financeiro), falha no fluxo de 2FA ou bug visual nas animações de fichas e cartas, o incidente deve ser documentado aqui antes da correção cirúrgica.

**Protocolo de Autocura:**
1. Copie o traceback do terminal, log de erro da API ou console do navegador.
2. Registre na seção **"Log de Incidentes"** abaixo.
3. Invoque a IA com o comando: *"Analise os erros no FINDINGS.md, identifique a causa raiz e aplique uma correção cirúrgica no código respeitando o SCHEMA.md e o VIBE_MANIFEST.md"*.

---

## 📋 2. Log de Incidentes e Erros (The Log)

| Data | Sessão (VCC) | Descrição do Erro / Traceback | Causa Raiz | Correção Cirúrgica Aplicada |
| :--- | :--- | :--- | :--- | :--- |
| 14/09/2026 | VCC-01 | Transição de foco no input OTP do 2FA não avançava automaticamente no mobile | Evento `input` não tratava tamanho de dígito e navegação para `nextElementSibling` | Implementada função `initAuthFlow()` com auto-avanço de foco e suporte a Backspace |
| 14/09/2026 | VCC-01 | Fechamento do menu lateral do Dashboard não restaurava o scroll do body em telas menores | Falta de remoção da classe `no-scroll` no evento de click do botão fechar | Corrigido evento `dashCloseSidebarBtn` no `script.js` |

---

## 🔬 3. Análise de Causa Raiz (Root Cause) e Padrões

* **Padrão Detectado:** Sincronização entre contagem de blinds e relógio das TVs requer atualizações periódicas sem polling excessivo.
  * **Ação Preventiva:** Utilizar timers precisos no frontend com checagem de timestamp absoluto do servidor, evitando desvio de relógio.
* **Padrão Detectado:** Lançamento de comandas de bar exige validação atômica para evitar saldo negativo de estoque.
  * **Ação Preventiva:** Executar verificação de quantidade disponível em transação SQL com bloqueio de linha.

---

## 💡 4. Decisões Técnicas e Trade-offs (Findings)

* **Decisão:** Arquitetura Single-Database per Tenant (banco de dados isolado por clube de poker).
  * **Justificativa:** Garante 100% de privacidade, conformidade com LGPD, backup individualizado sem impacto cruzado e elimina o risco de vazamento de dados de jogadores entre clubes concorrentes.
* **Decisão:** Autenticação de dois fatores (2FA / TOTP) nativa integrada ao fluxo de login.
  * **Justificativa:** Proteção indispensável para operações financeiras e caixas de clubes de poker com alto volume transacional diário.
* **Decisão:** Dashboard SPA em Vanilla JS com views chaveadas por atributos `data-view`.
  * **Justificativa:** Zero dependências de frameworks pesados (React/Vue), carregamento instantâneo no navegador do caixa/dealer e altíssima estabilidade.
* **Decisão:** Animação de fichas e cartas (`falling-elements`) respeitando `prefers-reduced-motion`.
  * **Justificativa:** Visual imersivo e sofisticado sem prejudicar a performance em dispositivos modestos ou violar acessibilidade.

---

## 🚧 5. Devedor Técnico e Lições Aprendidas

1. **Lição:** Operações de fichário de cash game devem registrar histórico completo de transações (auditoria imutável) e não apenas o saldo atual.
2. **Lição:** O envio de tickets de torneios para impressoras térmicas no caixa deve ter fallback visual na tela com QR Code do GameID.
3. **Dívida:** Adicionar modo offline com sincronização em lote para registro de mãos e pedidos de bar caso haja oscilação momentânea da internet no salão.

---

### 🛂 Instrução para a IA
> *"Antes de cada correção, consulte as seções 2 e 4 deste arquivo para garantir que a nova solução não repita erros do passado e mantenha as decisões arquiteturais já validadas para o StatPoker"*.

✅ Arquivo 05-FINDINGS.md atualizado com as memórias técnicas do STATPOKER!
