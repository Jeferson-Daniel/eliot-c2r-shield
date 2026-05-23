# Auditoria de Artefato - ELIOT C2R SHIELD (SBSeg 2026)

Este relatório apresenta uma auditoria crítica e direta do repositório do projeto ELIOT, avaliando sua prontidão para submissão na Trilha de Artefatos do **SBSeg 2026**. O projeto busca a certificação nos quatro selos de qualidade: **SeloD (Disponível)**, **SeloF (Funcional)**, **SeloS (Sustentável)** e **SeloR (Reprodutível)**.

---

## 1. Avaliação do README.md e Metadados Básicos
A primeira impressão de um revisor vem da documentação inicial. O README atual possui pontos fortes, mas apresenta **falhas críticas para submissão acadêmica**.

**O que tem de bom:**
- Título claro e resumo (metodologia C2R).
- Estrutura de pastas descrita.
- Stack tecnológica documentada.
- Instruções de instalação e execução do frontend.

**O que está faltando ou errado:**
- **Selos Considerados:** O README não especifica explicitamente que está pleiteando os selos D, F, S, e R.
- **Licença:** Nenhuma licença (ex: MIT, GPL) foi especificada no README nem no repositório.
- **README Desatualizado:** Existe um aviso afirmando: *"Não há backend real conectado nesta versão"*, o que invalida as avaliações de banco de dados e backend.
- **Teste Mínimo e Experimentos:** Não há uma seção dizendo como o avaliador pode testar a funcionalidade fim-a-fim ou reproduzir as reivindicações do artigo.
- **Backend Setup:** O README só ensina a rodar o frontend (`npm run dev` na raiz), ignorando que o backend precisa ser iniciado com um banco de dados.

---

## 2. Análise por Selo (Percentual de Prontidão)

### 🏅 SeloD: Artefatos Disponíveis (Nota Estimada: 60%)
O selo D exige que o código seja acessível e que os metadados existam e orientem adequadamente a avaliação.
- **Código Disponível:** Sim, frontend e backend constam no repositório.
- **Licença:** **FALHA CRÍTICA.** Falta o arquivo `LICENSE`. Nenhum artefato é aceito sem licença clara.
- **Base de Dados:** Os scripts de seed estão disponíveis, garantindo que a base pode ser gerada, mas o arquivo `.env` com senhas reais expostas quebra a postura de segurança do repositório.

### 🏅 SeloF: Artefatos Funcionais (Nota Estimada: 80%)
O sistema compila e opera. Suas funcionalidades básicas (dashboard, roteamento, frontend/backend via REST) funcionam.
- **O Sistema Roda:** Sim, as pilhas Vite/React e Express/Prisma sobem corretamente.
- **Testes Mínimos:** **FALHA.** Não há scripts de teste (`npm test`, Jest, Vitest, etc.) configurados no `package.json` do back ou do front. Para comprovar funcionalidade, a presença de automação básica é altamente recomendada.
- **Operação Core:** A conexão e integração front-back existe e a criação/leitura de incidentes está operacional.

### 🏅 SeloS: Artefatos Sustentáveis (Nota Estimada: 85%)
Reflete modularidade, arquitetura e facilidade de manutenção para a comunidade acadêmica.
- **Arquitetura & Design:** Excelente divisão. Uso de tokens (Tailwind CSS v4), roteamento file-based (TanStack), e componentes isolados (Shadcn UI). Backend bem dividido em rotas, serviços e controllers.
- **Legibilidade & Tipagem:** Código legível, com TypeScript guiando os tipos do domínio.
- **Fragilidades:** Falta padronização nas documentações internas das funções e ausência de testes automatizados.

### 🏅 SeloR: Experimentos Reprodutíveis (Nota Estimada: 20%)
Este é o selo mais difícil e é onde o ELIOT se encontra mais vulnerável. Um revisor que tentar rodar o repositório hoje vai falhar.
- **Dependência de Banco Remoto:** O `DATABASE_URL` no `.env` do backend aponta para `100.100.152.32`. Se o revisor não estiver na mesma rede VPN privada (Tailscale), o backend quebra ("ECONNREFUSED"). O SBSeg exige reprodutibilidade **offline ou conteinerizada**.
- **Falta de Docker-Compose:** Não há ambiente de contêineres para levantar um PostgreSQL limpo automaticamente.
- **Seed Não-Determinística:** A seed do Prisma usa `Date.now()`. Para reprodutibilidade acadêmica restrita, as datas e números aleatórios não devem mudar a cada execução, para que o output de um experimento bata com precisão com o paper submetido.

---

## 3. Principais Fragilidades e Riscos Encontrados

1. **Credenciais Reais Versionadas:** Existe um arquivo `.env` commitado ou versionado com senhas reais expostas e apontamentos IP. Isso deve ser removido do Git (embora conste no `.gitignore`, ele existe localmente). Deve-se usar um `.env.example`.
2. **Ausência de Docker:** Fundamental para reprodutibilidade no mundo acadêmico.
3. **Falta de Arquivo LICENSE:** Bloqueante para o Selo D.
4. **README Contraditório:** Diz que é apenas um Mock, desconsiderando a implementação real.

---

## 4. Plano de Ação Priorizado

### 🔴 Prioridade Máxima (Obrigatório para submissão)
1. **Adicionar `docker-compose.yml`**: Configurar um banco de dados PostgreSQL local que inicializa limpo na máquina do avaliador.
2. **Limpar `.env`**: Remover credenciais e IPs remotos; apontar o backend para rodar no Docker local (ex: `postgres://postgres:postgres@localhost:5432/eliot_db`); subir apenas um `.env.example`.
3. **Criar arquivo `LICENSE`**: Adicionar MIT, Apache ou GPL na raiz do projeto.
4. **Reescrever o README.md**:
   - Adicionar explicitamente as tags dos Selos do SBSeg.
   - Remover o aviso de "Não há backend real".
   - Detalhar claramente como levantar o backend e o front-end passo-a-passo.

### 🟡 Prioridade Alta (Importante para Selos F e R)
1. **Criar Testes Automatizados**: Adicionar Vitest (Front) ou Jest/Supertest (Back) e escrever no mínimo 2 a 3 testes básicos (ex: sucesso no endpoint `/api/incidentes`) para justificar e comprovar a funcionalidade.
2. **Determinismo da Seed**: Substituir os cálculos de tempo baseados em `Date.now()` para datas estáticas hardcoded (ex: `new Date('2026-05-20')`) garantindo determinismo total na avaliação.

### 🟢 Melhorias Opcionais (Diferenciais competitivos)
1. **Makefile ou Script Único (`npm run start:all`)**: Configurar um roteiro automatizado usando ferramentas como `concurrently` para o revisor levantar backend, banco (via docker) e frontend com apenas um clique.
2. **Swagger/OpenAPI**: Uma página ou arquivo YAML estático descrevendo as rotas da API elevaria substancialmente a nota para o SeloS.
