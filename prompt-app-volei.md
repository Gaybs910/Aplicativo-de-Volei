# Prompt para criar o app de Vôlei Tático + Educacional

Copie o texto abaixo e use como prompt para uma IA de desenvolvimento (Claude, ChatGPT, Claude Code, etc.) ou como especificação de projeto para você mesmo desenvolver.

---

## PROMPT

Quero que você me ajude a criar um aplicativo (web ou mobile) de vôlei que combine duas funções principais:

### 1. Prancheta tática interativa
- Quadra de vôlei desenhada em escala (9m x 9m por lado, rede, linha de ataque a 3m).
- 6 jogadores representados como ícones/bolinhas arrastáveis (drag-and-drop) dentro da quadra, mais o líbero quando aplicável.
- Cada jogador deve poder ser identificado por posição de rotação (P1 a P6) e por função (levantador, oposto, ponteiro 1, ponteiro 2, central 1, central 2, líbero).
- Validação automática das **regras de posicionamento/overlap** (rotational overlap): impedir ou avisar quando um jogador está fora da posição permitida em relação aos vizinhos no momento do saque.
- Botão de "rotacionar" que gira a formação no sentido horário (regra oficial do vôlei), simulando a rotação real da equipe.
- Possibilidade de desenhar setas/trajetórias no board (movimentação de ataque, cobertura, rodízio defensivo) — tipo "lousa tática" com caneta.
- Salvar e carregar jogadas/sistemas táticos.

### 2. Módulo educacional (aprendizado progressivo)
- Conteúdo estruturado do básico ao avançado, com foco nos sistemas táticos de verdade, não só nas regras genéricas do esporte.
- Tópicos obrigatórios:
  - Posições em quadra (P1–P6) e o que significam.
  - Rodízio (rotação) e como ele funciona ao longo do set.
  - **Sistema 5x1** (1 levantador fixo, 5 atacantes) — explicar como o levantador transita entre as 6 posições e como o time se ajusta em cada rotação (ataque com 3 opções vs. ataque com 2 opções quando o levantador está na rede).
  - Comparar rapidamente com o sistema 4x2 e 6x2, para o usuário entender por que o 5x1 é o mais usado no vôlei de alto nível.
  - Conceitos de "levantador na rede" (front row) vs "levantador de fundo" (back row).
  - Cobertura de ataque, rodízio defensivo (base defensiva), e transição.
- Formato do conteúdo: misto de texto curto, diagramas visuais da quadra (reaproveitando o mesmo componente da prancheta tática) e quizzes/exercícios interativos (ex: "arraste os jogadores para a posição correta na rotação 3").
- Progressão gamificada: módulos desbloqueiam conforme o usuário avança (ex: Iniciante → Posições e Rodízio → Sistemas Táticos → 5x1 Avançado).

### Requisitos técnicos
- Sugira uma stack adequada para um projeto de portfólio (considerando que tenho conhecimento intermediário de Python e básico de Java, e estou aprendendo desenvolvimento). Pode sugerir alternativas em JavaScript/React caso seja mais adequado para interatividade de arrastar-e-soltar.
- A quadra e os jogadores devem ser desenhados com SVG ou Canvas, sem depender de assets pagos.
- Persistência simples (local storage ou banco de dados leve) para salvar jogadas criadas pelo usuário e progresso no módulo educacional.
- Estrutura de código organizada em componentes reutilizáveis (o componente "quadra + jogadores" deve servir tanto para o modo tático quanto para o modo educacional).

### Entregáveis esperados
1. Sugestão de stack e arquitetura do projeto.
2. Estrutura de pastas/componentes.
3. Lógica de validação das regras de overlap (regra oficial da FIVB) explicada e implementada.
4. Lógica de rotação (P1→P6 sentido horário) implementada.
5. Roteiro de conteúdo do módulo educacional (tópicos em ordem de progressão) com o sistema 5x1 detalhado.
6. Protótipo inicial funcional da quadra interativa.

---

*Dica: se for usar esse prompt com Claude Code ou outra ferramenta de codificação, pode colar direto — ele já está estruturado como especificação técnica.*
