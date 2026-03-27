export const tailwindDocsLinks = [
  {
    title: "Site principal do Tailwind",
    title_en: "Tailwind main site",
    href: "https://tailwindcss.com/docs",
    description:
      "Referência oficial com todas as classes, exemplos, guias e possibilidades de customização.",
    description_en:
      "Official reference with all classes, examples, guides, and customization options.",
  },
  {
    title: "Guia oficial com React + Vite",
    title_en: "Official React + Vite guide",
    href: "https://tailwindcss.com/docs/installation/using-vite",
    description:
      "Fluxo recomendado para instalar e configurar Tailwind CSS em projetos React com Vite.",
    description_en:
      "Recommended flow to install and configure Tailwind CSS in React projects using Vite.",
  },
];

export const tailwindUsageTips = [
  {
    text: "Pense primeiro no efeito que deseja alcançar, como centralizar, espaçar, alinhar ou destacar.",
    text_en:
      "Think first about the effect you want to achieve, such as centering, spacing, aligning, or highlighting.",
  },
  {
    text: "Procure o padrão principal, como flex + justify-center + items-center para centralização completa.",
    text_en:
      "Look for the main pattern, such as flex + justify-center + items-center for full centering.",
  },
  {
    text: "Combine classes pequenas em vez de tentar decorar receitas grandes prontas.",
    text_en:
      "Combine small classes instead of trying to memorize large ready-made recipes.",
  },
  {
    text: "Use a documentação oficial e o autocomplete do VS Code como apoio constante.",
    text_en:
      "Use the official documentation and VS Code autocomplete as constant support.",
  },
];

export const tailwindWhatYouFind = [
  {
    title: "Instalação com React + Vite",
    title_en: "Installation with React + Vite",
    description:
      "Passo a passo oficial com npm, configuração do Vite, import do Tailwind e integração com React.",
    description_en:
      "Official step-by-step guide with npm, Vite setup, Tailwind import, and React integration.",
  },
  {
    title: "Referência completa de classes",
    title_en: "Complete class reference",
    description:
      "Layout, Flexbox, Grid, spacing, tipografia, cores, efeitos, transições e transforms.",
    description_en:
      "Layout, Flexbox, Grid, spacing, typography, colors, effects, transitions, and transforms.",
  },
  {
    title: "Exemplos práticos",
    title_en: "Practical examples",
    description:
      "Botões, cards, formulários e blocos completos prontos para adaptação em projetos reais.",
    description_en:
      "Buttons, cards, forms, and complete blocks ready to be adapted to real projects.",
  },
  {
    title: "Customização",
    title_en: "Customization",
    description:
      "Mudança de cores, criação de temas e ajustes no arquivo tailwind.config.js.",
    description_en:
      "Changing colors, creating themes, and editing the tailwind.config.js file.",
  },
];

export const tailwindQuickPatterns = [
  { pattern: "p-*", meaning: "padding", meaning_en: "padding" },
  { pattern: "m-*", meaning: "margin", meaning_en: "margin" },
  { pattern: "w-*", meaning: "largura", meaning_en: "width" },
  { pattern: "h-*", meaning: "altura", meaning_en: "height" },
  { pattern: "bg-*", meaning: "fundo", meaning_en: "background" },
  { pattern: "text-*", meaning: "texto", meaning_en: "text" },
  { pattern: "flex", meaning: "layout flex", meaning_en: "flex layout" },
  { pattern: "grid", meaning: "layout grid", meaning_en: "grid layout" },
];

export const tailwindInstallFlow = `npm create vite@latest
npm install
npm install tailwindcss @tailwindcss/vite`;

export const tailwindResponsiveExample = `<div class="text-sm md:text-lg lg:text-2xl"></div>`;

export const tailwindFinalExample = `<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-xl shadow-lg text-center w-80">
    <h1 class="text-2xl font-bold text-blue-600">Dashboard</h1>
    <p class="mt-2 text-gray-600">Bem-vindo ao sistema</p>
    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Entrar
    </button>
  </div>
</div>`;

export const tailwindCheatSheetSections = [
  {
    id: "layout",
    title: "1. Layout",
    title_en: "1. Layout",
    description: "Mostra classes base para estruturar blocos, containers e o tipo principal de exibição dos elementos.",
    description_en: "Shows core classes for structuring blocks, containers, and the main display mode of elements.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "container", explanation: "Container responsivo centralizado", explanation_en: "Responsive centered container" },
      { class: "block", explanation: "Ocupa linha inteira", explanation_en: "Takes the full line" },
      { class: "inline", explanation: "Fica na mesma linha", explanation_en: "Stays on the same line" },
      { class: "inline-block", explanation: "Mistura inline + bloco", explanation_en: "Mixes inline behavior with block sizing" },
      { class: "hidden", explanation: "Esconde o elemento", explanation_en: "Hides the element" },
      { class: "flex", explanation: "Ativa Flexbox", explanation_en: "Enables Flexbox" },
      { class: "grid", explanation: "Ativa Grid", explanation_en: "Enables Grid" },
    ],
  },
  {
    id: "flexbox",
    title: "2. Flexbox",
    title_en: "2. Flexbox",
    description: "Resume as classes usadas para organizar itens em linha ou coluna e controlar alinhamento e espaçamento.",
    description_en: "Summarizes the classes used to organize items in rows or columns and control alignment and spacing.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "flex-row", explanation: "Itens em linha", explanation_en: "Items in a row" },
      { class: "flex-col", explanation: "Itens em coluna", explanation_en: "Items in a column" },
      { class: "justify-start", explanation: "Alinha à esquerda", explanation_en: "Aligns to the start" },
      { class: "justify-center", explanation: "Centraliza horizontal", explanation_en: "Centers horizontally" },
      { class: "justify-end", explanation: "Direita", explanation_en: "Aligns to the end" },
      { class: "justify-between", explanation: "Espaço entre", explanation_en: "Adds space between items" },
      { class: "items-start", explanation: "Topo", explanation_en: "Aligns to the top" },
      { class: "items-center", explanation: "Centro vertical", explanation_en: "Centers vertically" },
      { class: "items-end", explanation: "Base", explanation_en: "Aligns to the bottom" },
      { class: "gap-4", explanation: "Espaçamento entre itens", explanation_en: "Spacing between items" },
    ],
  },
  {
    id: "spacing",
    title: "3. Espaçamento",
    title_en: "3. Spacing",
    description: "Reúne as classes mais usadas para aplicar padding e margin com rapidez no layout.",
    description_en: "Brings together the most common classes for applying padding and margin quickly in layouts.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "p-4", explanation: "Padding geral", explanation_en: "General padding" },
      { class: "px-4", explanation: "Padding horizontal", explanation_en: "Horizontal padding" },
      { class: "py-4", explanation: "Padding vertical", explanation_en: "Vertical padding" },
      { class: "pt-4", explanation: "Padding top", explanation_en: "Top padding" },
      { class: "pb-4", explanation: "Padding bottom", explanation_en: "Bottom padding" },
      { class: "pl-4", explanation: "Padding left", explanation_en: "Left padding" },
      { class: "pr-4", explanation: "Padding right", explanation_en: "Right padding" },
      { class: "m-4", explanation: "Margin geral", explanation_en: "General margin" },
      { class: "mx-auto", explanation: "Centraliza horizontal", explanation_en: "Centers horizontally" },
      { class: "mt-4", explanation: "Margin top", explanation_en: "Top margin" },
    ],
  },
  {
    id: "size",
    title: "4. Tamanho",
    title_en: "4. Sizing",
    description: "Apresenta classes para definir largura e altura de elementos em valores fixos, proporcionais ou totais.",
    description_en: "Presents classes for defining element width and height with fixed, proportional, or full values.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "w-full", explanation: "Largura total", explanation_en: "Full width" },
      { class: "w-1/2", explanation: "50%", explanation_en: "50%" },
      { class: "w-64", explanation: "Largura fixa", explanation_en: "Fixed width" },
      { class: "h-full", explanation: "Altura total", explanation_en: "Full height" },
      { class: "h-screen", explanation: "Altura da tela", explanation_en: "Viewport height" },
    ],
  },
  {
    id: "colors",
    title: "5. Cores",
    title_en: "5. Colors",
    description: "Mostra como aplicar cores de fundo e texto para criar contraste e hierarquia visual.",
    description_en: "Shows how to apply background and text colors to create contrast and visual hierarchy.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "bg-blue-500", explanation: "Fundo azul", explanation_en: "Blue background" },
      { class: "bg-red-600", explanation: "Fundo vermelho", explanation_en: "Red background" },
      { class: "bg-gray-100", explanation: "Fundo cinza", explanation_en: "Gray background" },
      { class: "text-white", explanation: "Texto branco", explanation_en: "White text" },
      { class: "text-black", explanation: "Texto preto", explanation_en: "Black text" },
      { class: "text-gray-700", explanation: "Texto cinza", explanation_en: "Gray text" },
    ],
  },
  {
    id: "typography",
    title: "6. Tipografia",
    title_en: "6. Typography",
    description: "Cobre tamanho de fonte, peso e alinhamento do texto para montar títulos, textos e destaques.",
    description_en: "Covers font size, weight, and text alignment for building headings, body text, and highlights.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "text-xs", explanation: "Muito pequeno", explanation_en: "Extra small text" },
      { class: "text-sm", explanation: "Pequeno", explanation_en: "Small text" },
      { class: "text-lg", explanation: "Grande", explanation_en: "Large text" },
      { class: "text-xl", explanation: "Extra grande", explanation_en: "Extra large text" },
      { class: "text-3xl", explanation: "Muito grande", explanation_en: "Very large text" },
      { class: "font-light", explanation: "Fonte leve", explanation_en: "Light font weight" },
      { class: "font-medium", explanation: "Média", explanation_en: "Medium font weight" },
      { class: "font-bold", explanation: "Negrito", explanation_en: "Bold font weight" },
      { class: "text-left", explanation: "Esquerda", explanation_en: "Align left" },
      { class: "text-center", explanation: "Centro", explanation_en: "Align center" },
      { class: "text-right", explanation: "Direita", explanation_en: "Align right" },
    ],
  },
  {
    id: "borders",
    title: "7. Borda",
    title_en: "7. Borders",
    description: "Lista classes para bordas, espessura, cor e arredondamento de cantos.",
    description_en: "Lists classes for borders, thickness, color, and corner rounding.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "border", explanation: "Borda padrão", explanation_en: "Default border" },
      { class: "border-2", explanation: "Borda grossa", explanation_en: "Thicker border" },
      { class: "border-gray-300", explanation: "Cor da borda", explanation_en: "Border color" },
      { class: "rounded", explanation: "Borda arredondada", explanation_en: "Rounded corners" },
      { class: "rounded-lg", explanation: "Mais arredondado", explanation_en: "More rounded corners" },
      { class: "rounded-full", explanation: "Totalmente circular", explanation_en: "Fully rounded / circular" },
    ],
  },
  {
    id: "shadow",
    title: "8. Sombra",
    title_en: "8. Shadow",
    description: "Ajuda a escolher o nível de sombra ideal para destacar cards, caixas e áreas interativas.",
    description_en: "Helps you choose the right shadow level to highlight cards, panels, and interactive areas.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "shadow", explanation: "Sombra leve", explanation_en: "Light shadow" },
      { class: "shadow-md", explanation: "Média", explanation_en: "Medium shadow" },
      { class: "shadow-lg", explanation: "Forte", explanation_en: "Strong shadow" },
      { class: "shadow-xl", explanation: "Muito forte", explanation_en: "Extra strong shadow" },
    ],
  },
  {
    id: "position",
    title: "9. Posição",
    title_en: "9. Position",
    description: "Explica classes de posicionamento para controlar a localização dos elementos na tela.",
    description_en: "Explains positioning classes used to control where elements appear on screen.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "relative", explanation: "Relativo", explanation_en: "Relative positioning" },
      { class: "absolute", explanation: "Absoluto", explanation_en: "Absolute positioning" },
      { class: "fixed", explanation: "Fixo", explanation_en: "Fixed positioning" },
      { class: "top-0", explanation: "Topo", explanation_en: "Top" },
      { class: "left-0", explanation: "Esquerda", explanation_en: "Left" },
      { class: "right-0", explanation: "Direita", explanation_en: "Right" },
      { class: "bottom-0", explanation: "Base", explanation_en: "Bottom" },
    ],
  },
  {
    id: "overflow",
    title: "10. Overflow",
    title_en: "10. Overflow",
    description: "Resume como tratar conteúdo excedente, escondendo ou liberando rolagem quando necessário.",
    description_en: "Summarizes how to handle overflowing content by hiding it or enabling scrolling when needed.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "overflow-hidden", explanation: "Esconde excesso", explanation_en: "Hides overflow" },
      { class: "overflow-auto", explanation: "Scroll automático", explanation_en: "Automatic scroll when needed" },
      { class: "overflow-scroll", explanation: "Scroll sempre", explanation_en: "Always shows scroll" },
    ],
  },
  {
    id: "interaction",
    title: "11. Interação",
    title_en: "11. Interaction",
    description: "Mostra classes para hover e comportamento visual que indicam interatividade ao usuário.",
    description_en: "Shows hover and visual behavior classes that communicate interactivity to the user.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "hover:bg-blue-700", explanation: "Cor ao passar mouse", explanation_en: "Changes color on hover" },
      { class: "hover:scale-105", explanation: "Aumenta no hover", explanation_en: "Scales up on hover" },
      { class: "cursor-pointer", explanation: "Cursor clicável", explanation_en: "Clickable cursor" },
    ],
  },
  {
    id: "responsive",
    title: "12. Responsividade",
    title_en: "12. Responsiveness",
    description: "Apresenta os prefixos que permitem adaptar o estilo conforme o tamanho da tela.",
    description_en: "Presents the prefixes that let you adapt styles according to screen size.",
    columns: [
      { key: "prefix", label: "Prefixo", label_en: "Prefix" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { prefix: "sm:", explanation: "Pequenas telas", explanation_en: "Small screens" },
      { prefix: "md:", explanation: "Tablets", explanation_en: "Tablets" },
      { prefix: "lg:", explanation: "Desktop", explanation_en: "Desktop" },
      { prefix: "xl:", explanation: "Grandes telas", explanation_en: "Large screens" },
    ],
  },
  {
    id: "transitions",
    title: "13. Transições",
    title_en: "13. Transitions",
    description: "Agrupa classes para ativar transições suaves e controlar duração e easing.",
    description_en: "Groups classes for enabling smooth transitions and controlling duration and easing.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "transition", explanation: "Ativa transição", explanation_en: "Enables transitions" },
      { class: "duration-300", explanation: "Tempo", explanation_en: "Duration" },
      { class: "ease-in-out", explanation: "Suavização", explanation_en: "Easing" },
    ],
  },
  {
    id: "transforms",
    title: "14. Transformações",
    title_en: "14. Transforms",
    description: "Traz utilidades para escalar, rotacionar e mover elementos com transformações visuais.",
    description_en: "Brings utilities for scaling, rotating, and moving elements with visual transforms.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "scale-110", explanation: "Aumenta", explanation_en: "Scales up" },
      { class: "rotate-45", explanation: "Rotaciona", explanation_en: "Rotates" },
      { class: "translate-x-4", explanation: "Move eixo X", explanation_en: "Moves on the X axis" },
    ],
  },
  {
    id: "dynamic-utilities",
    title: "15. Utilidades dinâmicas",
    title_en: "15. Dynamic utilities",
    description: "Mostra como usar valores personalizados quando as classes prontas não cobrem o caso desejado.",
    description_en: "Shows how to use custom values when the default classes do not cover the desired case.",
    columns: [
      { key: "class", label: "Classe", label_en: "Class" },
      { key: "explanation", label: "Explicação", label_en: "Explanation" },
    ],
    items: [
      { class: "w-[300px]", explanation: "Largura custom", explanation_en: "Custom width" },
      { class: "p-[22px]", explanation: "Padding custom", explanation_en: "Custom padding" },
      { class: "bg-[#123456]", explanation: "Cor personalizada", explanation_en: "Custom color" },
    ],
  },
];
