# 📜 VIBE_MANIFEST.md: Regras de Engenharia Inegociáveis

## 🧠 1. Mindset de Engenharia (Karpathy Guidelines)

*As diretrizes abaixo priorizam a **cautela sobre a velocidade** e a assertividade sobre a digitação rápida no projeto **StatPoker**.*

* **Pense antes de Codar:** Nunca assuma nada silenciosamente. Se houver ambiguidade em regras de poker, transações de fichário ou cálculos de rake, a IA deve parar, listar suas suposições e pedir clarificação antes de agir.
* **Mudanças Cirúrgicas:** Altere estritamente as linhas necessárias para a tarefa ou correção. É terminantemente proibido reformatar arquivos inteiros, mudar paleta sem solicitação ou alterar a estrutura CSS/JS consolidada.
* **Simplicidade Radical (Regra 80/20):** Busque o código mínimo que resolva 80% da operação do clube de poker com 20% do esforço. Evite bibliotecas desnecessárias.
* **Execução Orientada a Metas:** Toda tarefa deve ser transformada em uma meta verificável (ex.: "Verificar se a transação do caixa debita o estoque do bar e credita o extrato").

---

## ⚙️ 2. Restrições Técnicas de Build (The Law)

*Estas regras garantem a integridade da plataforma StatPoker e a segurança operacional dos clubes.*

* **Isolamento de Banco de Dados:** Cada clube opera com seu banco de dados exclusivo; proibido compartilhamento de dados entre instâncias distintas.
* **Soberania do Dado (JSON is Law):** Nenhuma rota de API, payload ou formulário pode divergir da estrutura formalizada no `SCHEMA.md`.
* **Caminhos Absolutos:** Utilize sempre caminhos absolutos (`os.path.abspath`) para persistência de dados e localização de assets estáticos no backend.
* **Leveza e Resiliência:** Mantenha a interface rápida e fluida sem sobrecarregar navegadores do caixa ou TVs do salão.

---

## ♿ 3. Padrões de Qualidade e Conformidade

*Diretrizes obrigatórias para os agentes José, Ana, Maria e Tiago.*

* **Acessibilidade POUR:** Toda interface deve ser auditada pelos princípios de ser **Perceptível, Operável, Compreensível e Robusto** (WCAG AA).
* **Padrão de Teste AAA:** Todos os testes gerados devem seguir o padrão **Arrange (Organizar), Act (Agir) e Assert (Verificar)**.
* **Segurança de Transmissão:** Senhas e tokens nunca devem trafegar em URLs abertas; utilize headers seguros e fluxos protegidos com 2FA.

---

## 🚫 4. Gatilhos de Rejeição (Push Back)

*A IA deve "empurrar de volta" e alertar o humano caso:*

* Seja solicitado o uso de frameworks SPA pesados (ex.: Angular/React) quando HTML5/CSS3/JS Vanilla entrega performance e estabilidade superiores.
* Seja sugerido armazenar dados de múltiplos clubes em uma única tabela compartilhada sem isolamento.
* O usuário peça para ignorar a verificação de 2FA ou regras de conciliação financeira por "pressa".

---

**🛂 Protocolo de Auditoria:** Qualquer código que viole este manifesto será sumariamente reprovado pela agente **Maria (Revisora)**, exigindo correção cirúrgica imediata.

✅ Arquivo VIBE_MANIFEST.md atualizado com as regras do STATPOKER!
