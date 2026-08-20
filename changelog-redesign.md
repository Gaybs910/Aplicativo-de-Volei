# Changelog — Redesign visual do app de Vôlei Tático

Cole esse texto como contexto inicial numa conversa do Claude Code (no VS Code, dentro da pasta do projeto) para ele entender o que já foi feito antes de pedir os próximos ajustes.

---

## Prompt para o Claude Code

Este projeto React + Vite + Tailwind (app de vôlei tático/educacional) passou por um redesign visual. Aqui está o que foi alterado, pra você ter contexto antes de mexer em qualquer coisa:

### 1. Novo sistema de design (tokens)
- **`tailwind.config.js`**: adicionei paleta de cores própria no lugar do slate/emerald genérico do Tailwind:
  - `arena.950/900/800/700/600` — fundo escuro "de ginásio" (preto-azulado), substitui `slate-950/900/800/700`.
  - `court` / `courtDark` — verde da quadra (era `emerald-600`).
  - `ball.blue` (#2E6FF2) e `ball.yellow` (#FFC93C) — cores da própria bola de vôlei, usadas como acento (substituem `sky-500` e `amber-*`).
  - `scoreboard` (#FF7A33) — laranja de placar, para botões de destaque.
  - `chalk` (#F4F1EA) — branco quente, texto principal.
  - Fontes: `font-display` (Oswald), `font-body` (Inter), `font-mono` (Space Mono) — importadas via Google Fonts no `index.html`.
  - Shadows customizadas: `shadow-panel`, `shadow-court`.
  - Background utilitário `bg-wood-grain` (textura sutil tipo piso de madeira, usada na moldura da quadra).

- **`src/index.css`**: criei classes reutilizáveis em `@layer components` para não repetir estilo em cada componente:
  - `.panel` — card padrão (borda + fundo + sombra + padding), substitui `rounded-lg border border-slate-800 bg-slate-900 p-4` que estava espalhado em vários arquivos.
  - `.panel-title` — título pequeno em caixa alta dentro de um panel.
  - `.eyebrow` — label pequena em mono/amarelo, usada acima dos títulos H1 de cada página.
  - `.btn`, `.btn-primary`, `.btn-accent`, `.btn-ghost`, `.btn-ghost-active` — variantes de botão padronizadas.

### 2. Layout e espaçamento
- **`src/App.tsx`**: padding do `<main>` aumentado (`px-6 py-10 md:px-10 md:py-14`), antes era `p-6` fixo.
- Em todas as páginas (`TacticalBoard`, `EducationHome`, `PresetPlaysPage`), troquei `gap-6` por `gap-10` entre as seções principais, e adicionei um cabeçalho padrão (eyebrow + H1 + subtítulo) que não existia antes.

### 3. Componentes reescritos
- **`src/components/layout/NavBar.tsx`**: virou uma faixa fixa no topo com logo "5×1" e os links como abas em maiúsculo (font-display).
- **`src/components/court/Court.tsx`**: o `<svg>` da quadra agora fica dentro de uma moldura (`div` com `bg-wood-grain`, borda e `shadow-court`) simulando o piso do ginásio ao redor da quadra.
- **`src/components/court/PlayerToken.tsx`**: tokens dos jogadores agora usam `ball.blue`/`ball.yellow`, têm uma elipse de sombra embaixo (efeito de profundidade) e um anel branco translúcido na borda.
- **`src/components/tactical/TacticalBoard.tsx`** e **`SaveLoadPanel.tsx`**: reescritos para usar `.panel` e `.btn-*` em vez de classes soltas.
- **`src/components/education/EducationHome.tsx`**, **`src/components/plays/PresetPlaysPage.tsx`**, **`PresetGallery.tsx`**: mesma tratativa (cabeçalho padrão + `.panel`).
- **`LessonView.tsx`, `RotationExplorer.tsx`, `AttackCoverageDiagram.tsx`, `QuizDragDrop.tsx`, `PlayAnimator.tsx`**: só tiveram as classes de cor antigas (`slate-*`, `emerald-*`, `amber-*`, `sky-*`) trocadas pelas novas (`arena-*`, `court`, `scoreboard`, `ball-blue`) via find-and-replace — a estrutura desses componentes não mudou, então pode ser que ainda precisem de um passe de espaçamento/hierarquia como os outros.

### 4. Correção de bug (não relacionada ao visual)
- Faltava o arquivo `src/vite-env.d.ts` (`/// <reference types="vite/client" />`), o que quebrava o build (`tsc -b`) com erro de import do `index.css`. Criado e resolvido.

---

## Próximos passos sugeridos (ainda não feitos)
- `LessonView.tsx`, `RotationExplorer.tsx`, `AttackCoverageDiagram.tsx` e `QuizDragDrop.tsx` receberam só a troca de cor — vale revisar se o espaçamento e a hierarquia deles também merecem o mesmo tratamento dos outros (cabeçalho eyebrow+H1, `.panel`, mais `gap`).
- Testar responsividade em mobile (o grid da prancheta tática usa `lg:grid-cols-[minmax(0,540px)_1fr]`, vale conferir em telas menores).
- Rodar `npm install` novamente se o `node_modules` não estiver presente (foi removido do zip para ficar mais leve).
