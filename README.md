# ELIOT — Plataforma C2R de Cibersegurança Institucional

![SeloD](https://img.shields.io/badge/SBSeg-Selo_D-blue?style=for-the-badge) ![SeloF](https://img.shields.io/badge/SBSeg-Selo_F-green?style=for-the-badge) ![SeloS](https://img.shields.io/badge/SBSeg-Selo_S-yellow?style=for-the-badge)

Bem-vindo ao repositório do **ELIOT C2R SHIELD**, uma plataforma de cibersegurança e threat intelligence crowdsourced desenhada especificamente para instituições públicas de ensino superior.

## Selos SBSeg 2026 Pretendidos
A arquitetura deste repositório e a documentação adjacente foram organizadas visando a candidatura formal aos seguintes selos de qualidade de artefatos do SBSeg:
- 🏅 **Selo D (Disponível):** Código-fonte e artefatos estruturados abertamente sob a licença MIT.
- 🏅 **Selo F (Funcional):** Rotas sistêmicas, fluxos de negócio, interface frontend integrados e persistência de banco de dados rodando perfeitamente.
- 🏅 **Selo S (Sustentável):** Arquitetura frontend/backend modularizada, uso moderno de frameworks baseados em tokens tipados, permitindo expansões por pesquisadores futuros da academia.

---

## 1. Visão Geral e Objetivo do Sistema

O **ELIOT** atua como um SaaS focado em **capacitar pessoas, conscientizar comunidades e agilizar o reporte de ameaças cibernéticas**. Seu objetivo principal é descentralizar a identificação de incidentes. Em ambientes acadêmicos complexos, a equipe de TI sozinha não consegue monitorar todas as ameaças de Engenharia Social e Phishing. O ELIOT instrumentaliza a comunidade inteira (estudantes, técnicos e professores) como uma primeira barreira humana de detecção.

### A Metodologia C2R
O sistema implementa conceitualmente a pirâmide da metodologia **C2R**:
- **Capacitar:** Trilhas de micro-learning contínuo.
- **Conscientizar:** Lembretes proativos baseados no contexto do campus.
- **Reportar:** Fluxo rápido, amigável e desburocratizado para enviar evidências de URLs suspeitas e malwares, alimentando um fluxo de inteligência interna.

---

## 2. Arquitetura e Stack Tecnológica

O sistema foi modernizado adotando uma separação estrita entre Client (SPA) e Server (API REST). Veja mais detalhes na nossa [Documentação de Arquitetura](docs/arquitetura.md).

**Frontend (Client):**
- **React 19** e **Vite** (Build e Hot Reload rápidos)
- **TanStack Router** (Roteamento baseado em arquivos com Typescript 100% tipado)
- **Tailwind CSS v4** + **Shadcn/Radix UI** (Padrões de microinteração dark e acessibilidade)

**Backend (API & Dados):**
- **Node.js** + **Express** (API REST enxuta)
- **Prisma ORM** (Tipagem forte na camada de dados e integrações seguras)
- **PostgreSQL** (Armazenamento relacional e integridade de transações)

### Estrutura de Pastas
```
├── backend/             # Diretório da API REST e Banco de Dados
│   ├── prisma/          # Schemas do DB, Migrations e Seeds
│   └── src/             # Controllers, Services e rotas do Express
├── docs/                # Documentações estendidas do artefato
├── src/                 # Diretório do Frontend React
│   ├── components/      # Componentes UI (primitivos) e de negócio (Eliot)
│   └── routes/          # Páginas (Dashboard, Analytics, Formulários)
└── package.json         # Scripts de gerenciamento da raiz do frontend
```

---

## 3. Funcionalidades e Fluxo Operacional

### Funcionalidades Implementadas (Core Funcional)
1. **Reporte de Ameaças:** Usuários enviam formulários contendo títulos, descrições, URL suspeita e anexo. As ocorrências disparam diretamente pro PostgreSQL.
2. **Dashboard Institucional:** Consome os dados e exibe métricas processadas (incidentes resolvidos vs pendentes) baseadas em registros reais do banco.
3. **Analytics Administrativo:** A "Mesa da TI". Uma tabela com ordenação e filtragem avançada para analisar os relatórios recebidos, com metadados do relator.
4. **Ranking e Gamificação:** Listagem de pontuações baseada nos reconhecimentos acadêmicos de participação (Insígnias de Caçador de Phishing).

### Limitações Atuais do Protótipo (Escopo Avaliativo)
Neste momento de maturação metodológica, **não existe módulo de Autenticação/Login (JWT ou OAuth)**. Os testes e o frontend inserem dados (como o registro do autor do incidente) amarrados a perfis hardcoded (mock id) que existem garantidamente na semente do banco de dados (seed) para facilitar o teste unificado e fluido aos validadores. Upload binário de evidências no front ainda está mockado, mas a persistência no Backend já existe para arquivos/anexos baseados em hashes/URLs (schema `anexo_incidente`).

---

## 4. Setup Completo e Execução Local

Você deve rodar dois serviços simultaneamente na sua máquina (Frontend na porta `8080/5173` e Backend na porta `3001`). O guia completo em formato de tutorial acadêmico está presente em [docs/executando_localmente.md](docs/executando_localmente.md). A versão resumida segue abaixo:

### 4.1 Requisitos e Banco de Dados
- Node.js v20+ e PostgreSQL (porta 5432).
- Crie um banco local: `CREATE DATABASE eliot_db;`

### 4.2 Executando o Backend e Seed
1. `cd backend`
2. `npm install`
3. Crie e ajuste o arquivo `.env` a partir do exemplo fornecido:
   ```bash
   cp .env.example .env
   ```
   *Edite no `.env`: `DATABASE_URL="postgresql://SEU_USER:SUA_SENHA@localhost:5432/eliot_db"`*
4. Execute e popule o banco (isso criará as tabelas e inserirá o histórico necessário):
   ```bash
   npx prisma db push
   npm run seed
   ```
5. `npm start` *(API online)*

### 4.3 Executando o Frontend
Em uma nova aba do terminal:
1. Volte para a raiz do repositório
2. `npm install`
3. Crie o arquivo `.env` do Front:
   ```bash
   cp .env.example .env
   ```
4. `npm run dev`

Pronto, a aplicação estará viva e consumindo dados operacionais.

---

## 5. Rotas Principais da API REST

A comunicação é efetuada nas seguintes rotas:
- `GET /api/incidentes` : Lista o histórico populado com associações completas ao relator (usado na gestão/analytics).
- `POST /api/incidentes` : Recebe o *payload* do frontend (título, descrição, tipo de ameaça, id_relator) e persiste ativamente no PostgreSQL.
- `GET /api/dashboard/resumo` : Processa indicadores estatísticos pro frontend.
- `GET /api/ranking` e `GET /api/usuarios` : Obtém metadados de usuários e listagens para rankings de gamificação.

---

**Licença MIT** - Consulte o arquivo `LICENSE` para detalhes. Desenvolvimento destinado ao Simpósio Brasileiro de Segurança (SBSeg).
