# Changelog — Aplicar setas + Formações de Ataque/Defesa

Cole esse texto como contexto numa conversa do Claude Code (no VS Code, dentro da pasta do projeto) pra ele entender o que já foi feito.

---

## Prompt para o Claude Code

Depois do redesign visual, adicionei duas funcionalidades novas na prancheta tática:

### 1. Botão "Aplicar setas" (mover peças até onde as setas apontam)

- **`src/store/useTacticalStore.ts`**: nova ação `applyArrowsToPlayers()`. Para cada seta desenhada, encontra o jogador mais próximo do **início** da seta e move esse jogador até o **fim** da seta (com `clampToOwnCourt` pra não deixar sair da quadra). Depois de aplicar, limpa todas as setas (`arrows: []`).
- **`src/components/tactical/TacticalBoard.tsx`**: o botão "→ Aplicar setas" só aparece quando existe pelo menos uma seta desenhada (`arrows.length > 0`). Texto de ajuda abaixo da quadra também avisa sobre o botão quando há setas pendentes e o modo de desenho está desligado.

### 2. Formações prontas: Base / Ataque / Defesa

- **`src/lib/court.ts`**:
  - Novo tipo `Formation = 'base' | 'attack' | 'defense' | 'custom'`.
  - `getDefenseSlot(player)`: formação defensiva "perimetral" — linha de frente postada perto da rede (bloqueio), linha de fundo recuada nos cantos e no centro do fundo.
  - `getAttackSlot(player)`: formação de ataque — linha de frente espalhada junto à rede; o jogador com `role === 'levantador'` **sempre** vai pra perto da rede (x=6.3, y=NET_Y+0.5), esteja ele na linha de frente ou de fundo, pra ilustrar a transição do 5x1; o `role === 'oposto'` no fundo aproxima da linha de ataque (ataque de segunda linha / pipe); os demais jogadores de fundo ficam em posição de recepção.
  - `applyFormationSlots(players, formation)`: aplica a formação escolhida a todos os jogadores, mantendo `role` e `position` (rodízio) intactos — só muda `x`/`y`.
- **`src/store/useTacticalStore.ts`**:
  - Novo campo de estado `activeFormation: Formation` (começa em `'base'`).
  - Nova ação `setFormation(formation)`: chama `applyFormationSlots` e atualiza `activeFormation`.
  - `activeFormation` também é atualizado nos outros pontos que mexem na posição dos jogadores: `movePlayer` e `applyArrowsToPlayers` viram `'custom'` (edição manual), `rotate` também vira `'custom'` (já não é mais a formação "base" pura), `resetToDefault` volta pra `'base'`, `loadSystem`/`loadPreset` viram `'custom'`.
- **`src/components/tactical/TacticalBoard.tsx`**: novo painel "Formação" acima dos botões de ação, com três botões (Base / ⚡ Ataque / 🛡️ Defesa) que ficam destacados conforme `activeFormation` atual, e uma linha explicando o que cada formação faz.

---

## Observações

- As posições de ataque/defesa são uma simplificação didática (defesa "perimetral" clássica, ataque com levantador sempre indo pra rede) — não cobrem todos os sistemas de defesa que existem (ex.: defesa "rotacional" com o P1 curto). Se quiser, dá pra adicionar isso como uma variante extra depois.
- `npx tsc -b` rodou sem erros depois dessas mudanças.
