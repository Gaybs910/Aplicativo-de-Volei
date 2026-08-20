# Vôlei Tático + Educacional

Protótipo de app web que combina uma prancheta tática interativa de vôlei com um módulo educacional progressivo sobre sistemas táticos (com foco no 5x1).

## Stack

- **React 18 + TypeScript + Vite** — interatividade de arrastar-e-soltar e build rápido.
- **Tailwind CSS** — estilização.
- **Zustand** — estado global (jogadores/quadra tática e progresso educacional).
- **React Router** — navegação entre a prancheta e o módulo de aprendizado.
- **SVG nativo** (sem libs de canvas/drag-and-drop) — a quadra é desenhada em `viewBox="0 0 9 18"` (metros reais), e o arraste dos jogadores usa Pointer Events + `getScreenCTM()` para converter coordenadas de tela em coordenadas da quadra.
- **localStorage** — persistência das jogadas salvas e do progresso educacional (sem backend).

## Como rodar

Este ambiente não tem Node.js instalado. Para rodar o projeto:

1. Instale o [Node.js LTS](https://nodejs.org/) (18+).
2. Na pasta do projeto:
   ```
   npm install
   npm run dev
   ```
3. Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Estrutura

```
src/
  types/volleyball.ts       # Player, Arrow, TacticalSystem, RotationPosition, PlayerRole
  types/education.ts        # Module, Lesson, RotationQuiz
  lib/court.ts               # dimensões da quadra, slots de posição P1-P6, escalação padrão (5x1)
  lib/rotation.ts             # rotação horária P1→P6
  lib/overlap.ts               # validação de overlap (regra FIVB 7.4/7.5)
  lib/storage.ts                # helpers de localStorage
  store/useTacticalStore.ts      # estado da prancheta: jogadores, setas, líbero, salvar/carregar
  store/useProgressStore.ts       # progresso do módulo educacional (lições concluídas, módulos desbloqueados)
  components/court/Court.tsx       # quadra SVG reutilizável (drag de jogadores + desenho de setas)
  components/court/PlayerToken.tsx  # ícone do jogador
  components/tactical/                # prancheta tática (board, toolbar, salvar/carregar)
  components/education/                # módulo educacional (lista de módulos, lição, quiz de arrastar)
  data/lessons.ts                       # roteiro de conteúdo (posições, rodízio, 4x2/6x2/5x1, cobertura/transição)
```

O componente `Court` é o mesmo em ambos os modos: na prancheta tática ele é editável e mostra setas; nas lições ele é somente leitura para diagramas, e no quiz ele é editável sem setas.

## O que já está implementado

- Quadra em escala real (9m x 9m por lado) com rede e linhas de ataque.
- 6 jogadores arrastáveis, identificados por posição de rodízio (P1–P6) e função tática.
- Líbero opcional, que substitui automaticamente o central que estiver na linha de fundo.
- Validação em tempo real das regras de overlap (FIVB), com aviso de quais jogadores estão em conflito.
- Botão de rotação (sentido horário oficial).
- Desenho de setas de trajetória na quadra.
- Salvar/carregar jogadas via localStorage.
- Módulo educacional com 4 blocos progressivos (Iniciante → Posições e Rodízio → Sistemas Táticos → 5x1 Avançado), incluindo comparação 4x2/6x2/5x1, levantador de rede vs. fundo, cobertura de ataque, base defensiva e transição.
- Quiz de arrastar-e-soltar (arraste os jogadores para a posição correta de uma rotação).

## Próximos passos sugeridos

- Setas multi-segmento (hoje são retas ponto-a-ponto).
- Editar/renomear jogadas salvas.
- Exportar diagrama como imagem.
- Testes automatizados para `rotation.ts` e `overlap.ts` (a lógica mais sensível a erro do projeto).
