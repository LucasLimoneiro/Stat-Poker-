# 📐 SCHEMA.md: Constituição dos Dados

# 🎯 1. Propósito e Princípio Fundamental
Este documento define a estrutura inegociável dos dados da plataforma **StatPoker** (Gestão de Clubes de Poker).

# 🔒 "JSON is Law"
"O JSON definido aqui é a Única Fonte da Verdade. Toda estrutura de dados no frontend, todo arquivo de payload, tabela de banco de dados e rota de API deve espelhar EXATAMENTE estas estruturas de campos, tipos e nomes."

**Consequências:**
- ❌ Nenhum campo pode ser adicionado no frontend sem estar formalizado no SCHEMA.
- ❌ Nenhum campo pode ter tipo ou nomenclatura diferente entre backend e frontend.
- ✅ Qualquer mudança deve ser primeiramente revisada e atualizada neste documento.

---

# 📊 2. Estruturas de Dados Centrais (JSON)

## 2.1 Lead Comercial / Fale Conosco (`contato`)
Representa mensagens e solicitações de clubes interessados na plataforma.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INTEGER | NÃO (auto) | Identificador do lead | `1` |
| `nome` | STRING | SIM | Nome do responsável ou gestor | `"Victor Silva"` |
| `contato` | STRING | SIM | E-mail ou telefone/WhatsApp | `"victor@royalflushclube.com.br"` |
| `mensagem` | STRING | NÃO | Detalhes sobre o clube (mesas, torneios) | `"Temos 12 mesas e 3 torneios semanais."` |
| `data_envio` | STRING (ISO) | SIM | Data e hora do envio | `"2026-09-14T15:30:00Z"` |

```json
{
  "nome": "Victor Silva",
  "contato": "victor@royalflushclube.com.br",
  "mensagem": "Temos 12 mesas e 3 torneios semanais. Gostaria de agendar migração.",
  "data_envio": "2026-09-14T15:30:00Z"
}
```

---

## 2.2 Torneio (`torneio`)
Representa um torneio de poker cadastrado e operado pelo clube.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INTEGER | SIM | Identificador do torneio | `101` |
| `nome` | STRING | SIM | Nome do torneio | `"Super Quinta 20k Garantidos"` |
| `data_hora` | STRING (ISO) | SIM | Data e horário de início | `"2026-09-17T19:30:00Z"` |
| `buy_in` | NUMBER | SIM | Valor do buy-in (R$) | `150.00` |
| `rake` | NUMBER | SIM | Valor da taxa do clube (R$) | `30.00` |
| `stack_inicial` | INTEGER | SIM | Quantidade de fichas iniciais | `25000` |
| `nivel_blinds_minutos`| INTEGER | SIM | Duração de cada nível (minutos) | `20` |
| `garantido` | NUMBER | NÃO | Premiação garantida (R$) | `20000.00` |
| `status` | STRING | SIM | Status (`"agendado"`, `"em_andamento"`, `"finalizado"`) | `"em_andamento"` |
| `entradas_totais` | INTEGER | SIM | Número acumulado de entradas | `94` |
| `jogadores_restantes` | INTEGER | SIM | Jogadores ainda ativos | `28` |
| `nivel_atual` | INTEGER | SIM | Nível corrente de blinds | `8` |

```json
{
  "id": 101,
  "nome": "Super Quinta 20k Garantidos",
  "data_hora": "2026-09-17T19:30:00Z",
  "buy_in": 150.00,
  "rake": 30.00,
  "stack_inicial": 25000,
  "nivel_blinds_minutos": 20,
  "garantido": 20000.00,
  "status": "em_andamento",
  "entradas_totais": 94,
  "jogadores_restantes": 28,
  "nivel_atual": 8
}
```

---

## 2.3 Mesa de Cash Game (`mesa_cash`)
Representa uma mesa de jogo a dinheiro real operando no salão.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INTEGER | SIM | Identificador da mesa | `1` |
| `numero_mesa` | INTEGER | SIM | Número físico da mesa no salão | `3` |
| `modalidade` | STRING | SIM | Modalidade (`"Texas Hold'em"`, `"Pot-Limit Omaha"`) | `"Texas Hold'em"` |
| `small_blind` | NUMBER | SIM | Valor do Small Blind (R$) | `5.00` |
| `big_blind` | NUMBER | SIM | Valor do Big Blind (R$) | `5.00` |
| `buyin_minimo` | NUMBER | SIM | Entrada mínima na mesa (R$) | `200.00` |
| `buyin_maximo` | NUMBER | SIM | Entrada máxima na mesa (R$) | `1000.00` |
| `assentos_ocupados` | INTEGER | SIM | Número de jogadores sentados | `8` |
| `assentos_maximo` | INTEGER | SIM | Capacidade máxima da mesa | `9` |
| `rake_acumulado` | NUMBER | SIM | Total de rake gerado na sessão (R$) | `1450.00` |
| `dealer_atual` | STRING | SIM | Nome do dealer na mesa | `"Lucas Albuquerque"` |

```json
{
  "id": 1,
  "numero_mesa": 3,
  "modalidade": "Texas Hold'em",
  "small_blind": 5.00,
  "big_blind": 5.00,
  "buyin_minimo": 200.00,
  "buyin_maximo": 1000.00,
  "assentos_ocupados": 8,
  "assentos_maximo": 9,
  "rake_acumulado": 1450.00,
  "dealer_atual": "Lucas Albuquerque"
}
```

---

## 2.4 Jogador / GameID (`jogador`)
Representa o cadastro do jogador e sua integração com o app GameID.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `game_id` | STRING | SIM | Código identificador único do jogador | `"SP-98421"` |
| `nome_completo` | STRING | SIM | Nome do jogador | `"Rodrigo Ferreira"` |
| `apelido` | STRING | NÃO | Nickname no salão | `"Rodrigo Poker"` |
| `cpf` | STRING | SIM | CPF cadastrado | `"123.456.789-00"` |
| `telefone` | STRING | SIM | WhatsApp do jogador | `"11988887777"` |
| `saldo_fichario` | NUMBER | SIM | Saldo em fichas / créditos (R$) | `850.00` |
| `pontos_ranking` | NUMBER | SIM | Pontos acumulados na temporada | `3420` |
| `posicao_ranking` | INTEGER | SIM | Colocação atual no leaderboard | `4` |
| `tickets_satelite` | INTEGER | SIM | Quantidade de tickets disponíveis | `2` |

```json
{
  "game_id": "SP-98421",
  "nome_completo": "Rodrigo Ferreira",
  "apelido": "Rodrigo Poker",
  "cpf": "123.456.789-00",
  "telefone": "11988887777",
  "saldo_fichario": 850.00,
  "pontos_ranking": 3420,
  "posicao_ranking": 4,
  "tickets_satelite": 2
}
```

---

## 2.5 Comanda de Bar & Restaurante (`comanda_bar`)
Representa consumo de bar vinculado a um jogador ou mesa.

| Campo | Tipo | Obrigatório | Descrição | Exemplo |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INTEGER | SIM | Identificador da comanda | `890` |
| `game_id` | STRING | NÃO | Vinculação ao jogador (se houver) | `"SP-98421"` |
| `numero_mesa` | INTEGER | SIM | Mesa onde o pedido foi entregue | `3` |
| `itens` | ARRAY | SIM | Lista de itens e quantidades | `[{"produto": "Heineken Long Neck", "qtd": 2, "preco_unit": 16.00}]` |
| `valor_total` | NUMBER | SIM | Valor total da comanda (R$) | `32.00` |
| `status_pagamento` | STRING | SIM | Status (`"aberta"`, `"paga"`, `"na_conta_jogador"`) | `"paga"` |
| `forma_pagamento` | STRING | NÃO | Método de quitação (`"PIX"`, `"Cartao"`, `"Dinheiro"`, `"Fichario"`) | `"PIX"` |

```json
{
  "id": 890,
  "game_id": "SP-98421",
  "numero_mesa": 3,
  "itens": [
    {
      "produto_id": 12,
      "nome": "Heineken Long Neck 330ml",
      "quantidade": 2,
      "preco_unitario": 16.00,
      "subtotal": 32.00
    }
  ],
  "valor_total": 32.00,
  "status_pagamento": "paga",
  "forma_pagamento": "PIX"
}
```

---

## 2.6 KPIs do Dashboard (`dashboard_kpis`)
Estrutura de dados retornada para renderização dos cards principais do painel.

```json
{
  "faturamento": 86320.00,
  "faturamento_var_pct": 12.0,
  "rake_total": 14780.00,
  "rake_var_pct": 8.0,
  "jogadores_unicos": 214,
  "novos_cadastros": 31,
  "despesas": 22140.00,
  "despesas_var_pct": -4.0,
  "jackpot_acumulado": 48950.00,
  "periodo": "ultimos_7_dias"
}
```

---

# 🚫 3. Campos Proibidos (Anti-Bloat)
Para manter o sistema veloz, escalável e focado na operação do salão:
- ❌ Dados de cartão de crédito não tokenizados (PCI Compliance).
- ❌ Históricos redundantes desnecessários dentro de objetos de visualização rápida.
- ❌ Campos de preferências gráficas no payload transacional do caixa.

✅ Arquivo SCHEMA.md atualizado com a Constituição de Dados do STATPOKER!
