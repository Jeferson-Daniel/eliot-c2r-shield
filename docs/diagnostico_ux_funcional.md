# Diagnóstico de UX e Funcionalidade (SBSeg 2026)

Este documento apresenta uma análise conceitual profunda da Experiência do Usuário (UX) e do estado funcional real do protótipo ELIOT C2R SHIELD. O foco é identificar o que está maduro e o que pode gerar ruído ("sensação de bug") durante a avaliação acadêmica.

---

## 🟢 Pontos Fortes da UX Atual
- **Identidade Visual Premium:** O uso de glassmorphism, tipografia moderna (Inter/Display) e o padrão dark mode (Tailwind + Shadcn) transmitem extrema maturidade técnica.
- **Microinterações e Feedback:** Uso de `sonner` para Toasts elegantes e gavetas laterais (`Sheet`) com animações de slide-in, reduzindo a carga cognitiva (o usuário não perde o contexto da tela principal).
- **Resiliência Transparente:** O sistema trata as chamadas do banco de forma defensiva (fallback visual para o `mock.ts`), impedindo telas brancas e mantendo a navegabilidade.

---

## 🟡 Pontos Confusos ou Inconsistentes
- **Desconexão de Pontuação (XP):** A XP do usuário mostrada no Dashboard é originária do arquivo `mock.ts`, porém os novos reportes persistem no PostgreSQL com `pontos_atribuidos = 0`. O avaliador pode reportar um incidente e notar que seu nível XP global não aumenta imediatamente.
- **Hardcode de Textos Realistas:** Em `Meus Reportes`, o código substitui descrições curtas por textos longos de um dicionário chamado `REALISTIC_DESCRIPTIONS` baseado no título. Se um avaliador preencher um título diferente, a descrição exibida será a original, o que não é um bug, mas revela o uso de *fakes* para certos títulos.
- **Upload Mockado:** O formulário de reporte possui campo de anexo que visualmente interage bem, mas não faz POST `multipart/form-data` para armazenamento real no servidor (o arquivo é descartado em memória).

---

## 🔍 Avaliação Específica de Telas e Fluxos

### Login Demonstrativo
- **Estado:** Demonstrativo (Protegido por credenciais fixas).
- **Avaliação:** Muito melhor após a inserção da validação rígida. Antes, qualquer digitação avançava, passando impressão de sistema "quebrado". Agora, simula adequadamente a barreira de entrada e documenta de forma explícita que é um ambiente simulado (MVP).
- **Sensação do Avaliador:** Madura. Ele entende que a autenticação OAuth/SSO está fora do escopo, mas vê que a barreira de UX existe.

### Botão "Registrar Ocorrência" (`/app/reportar`)
- **Estado:** Realmente integrado ao Backend e Banco.
- **Avaliação:** O formulário é bem estruturado e o mapeamento dos campos (título, descrição, ameaça e link) para o PostgreSQL está 100% aderente aos *enums* do Prisma. O redirecionamento rápido com o `Toast` dá certeza da ação.
- **Sensação do Avaliador:** Robusta, é o coração funcional atestando o Selo F.

### Fluxo "Meus Reportes"
- **Estado:** Parcialmente integrado.
- **Avaliação:** Puxa a lista via API REST `GET /api/incidentes`, o que é ótimo. No entanto, o fluxo visual em barra (`IncidentFlow`) baseia-se num status estático. A mudança cirúrgica de status inicial `"Pendente"` para `"Em análise"` resolveu o problema de percepção de abandono do reporte recém criado.
- **Sensação do Avaliador:** Adequada, mostra o ciclo de vida do incidente, mesmo que ainda não possa avançar os steps em tempo real via UI de usuário comum.

### Fluxo "Admin Analytics"
- **Estado:** Totalmente integrado (Real).
- **Avaliação:** A tabela consome o banco real e tem filtros ricos no frontend. O clique exibe o `IncidentDrawer`.
- **Sensação do Avaliador:** Muito robusta. Ao clicar em "Validar Incidente" ou "Arquivar" na gaveta, uma chamada PUT atualiza o status diretamente no PostgreSQL, o `Toast` dispara e a linha na tabela reflete imediatamente o novo status visualmente, fechando o loop de ponta a ponta perfeitamente.

### Navegação Mobile / Sidebar
- **Estado:** Demonstrativo visual/Responsivo.
- **Avaliação:** Uso de um design "floating" e ícones claros. Com a recente correção do TypeScript no `AppShell.tsx`, o menu lateral em telas menores está limpo e não causa erros de ref nulos, operando bem.

---

## 🎯 Recomendações Priorizadas

### 🚨 Urgente (Risco Alto para Avaliação)
- Nenhuma correção urgente pendente. O último ponto crítico (persistência de status no Analytics) já foi resolvido e está coberto por testes.

### ⚠️ Recomendado (Refinamento UX)
1. **Clarificar XP (Gamificação):** Atualizar o Dashboard para consumir a soma dos pontos baseada no banco real (`pontos_atribuidos`), em vez do XP fixo do mock.

### 💡 Opcional (Micro melhorias)
1. Desabilitar o formulário de "Arquivos/Anexos" com um tooltip de "Em breve" ou mantê-lo aceitando arquivo apenas por estética.
2. Rotação automática de avisos no Dashboard para simular a perna de "Conscientização" ativa.
