# Arquitetura do ELIOT C2R SHIELD

Este documento detalha a arquitetura de software, fluxo de dados e os módulos do **ELIOT C2R SHIELD**, estruturado para a trilha de artefatos do SBSeg 2026.

## 1. Visão Geral da Arquitetura

O ELIOT é desenhado em uma arquitetura moderna e desacoplada, dividindo claramente as responsabilidades entre o cliente (Frontend) e o servidor (Backend), garantindo escalabilidade, fácil manutenção e segurança.

**Componentes Principais:**
- **Frontend (Client-Side):** Desenvolvido em **React 19** e **Vite**, gerenciando roteamento via **TanStack Router**. É responsável pela renderização da interface, gerenciamento de estado da UI e comunicação via API REST.
- **Backend (Server-Side):** API RESTful desenvolvida com **Node.js** e **Express**. Orquestra as regras de negócio, autenticação e comunicação com o banco de dados.
- **ORM e Banco de Dados:** O **Prisma ORM** serve como camada de abstração (Data Access Layer) conectando o backend a um banco de dados relacional **PostgreSQL**.

---

## 2. Fluxo de Dados: Frontend → API → Prisma → PostgreSQL

A comunicação entre os componentes segue um modelo requisição-resposta tradicional e síncrono para operações de domínio:

1. **Ação do Usuário:** O usuário interage com o Frontend (ex: envia um formulário de reporte de incidente).
2. **Requisição HTTP (Frontend):** O serviço central (`src/services/api.ts`) converte a ação em uma requisição HTTP REST via `fetch()` (ex: `POST /api/incidentes`).
3. **Controlador e Validação (Backend):** O Express intercepta a rota (`incidentes.controller.ts`), valida o payload (presença de título, descrição, categoria, etc.) e o encaminha para o serviço correspondente.
4. **Regra de Negócio (Serviço):** O `incidentes.service.ts` executa regras específicas (ex: bypass seguro de permissão de sequências PostgreSQL buscando o ID máximo e incrementando manualmente).
5. **Persistência (Prisma ORM):** O Prisma traduz a chamada de objeto para uma instrução SQL segura e a executa contra o banco de dados.
6. **Retorno:** O PostgreSQL devolve o resultado, que cascateia de volta até a interface do usuário com um feedback visual (notificações toast).

---

## 3. Principais Módulos e Responsabilidades

A estrutura modular visa o princípio da responsabilidade única (SRP).

### Módulos do Frontend:
- **`app.reportar`:** Interface simplificada e humana para relato de incidentes cibernéticos (Phishing, Malware, etc).
- **`app.dashboard` / Analytics:** Motor de visualização de métricas institucionais, status de ameaças e gamificação.
- **`app.admin.analytics`:** Painel operacional de Gestão, onde administradores (TI) visualizam, triam e analisam os relatórios crus com detalhes ricos.
- **`app.meus-reportes`:** Acompanhamento do ciclo de vida das ocorrências enviadas pelo usuário (Status: Pendente, Em análise, Validado, Concluído).

### Módulos do Backend:
- **Controllers (`src/controllers`):** Manipulam `req` e `res`, extraem parâmetros e gerenciam as respostas HTTP.
- **Services (`src/services`):** Isolam regras de persistência e orquestração de dados.
- **Rotas (`src/routes`):** Mapeamento direto de verbos HTTP para os controllers.

---

## 4. Fluxo do Reporte de Incidente

O reporte de incidentes é o núcleo do sistema. O fluxo operacional é:
1. O usuário preenche evidências (URL, Título, Descrição, Ameaça) na rota `/app/reportar`.
2. Os dados são enviados ao endpoint `POST /api/incidentes`.
3. O Backend armazena a ocorrência com o status inicial **"Pendente"** e atribuição de **0 pontos**.
4. Imediatamente após o registro, a ocorrência aparece no painel do administrador (`/app/admin/analytics`) para triagem.
5. O usuário visualiza o andamento em "Meus Reportes".

---

## 5. Estrutura C2R e Gamificação

A plataforma sustenta-se na metodologia **C2R (Capacitar, Conscientizar, Reportar)**. 
Para incentivar o pilar **Reportar** em uma comunidade acadêmica sem impor fadiga de alertas, o sistema implementa uma camada de **Gamificação**:

- **Pontos e Ranking (`app.ranking`):** Incidentes válidos resultam em pontos de experiência (XP) distribuídos aos usuários pela equipe de segurança. O ranking institucional estimula a competição saudável.
- **Insígnias / Emblemas Institucionais:** Metas atingidas (ex: reportar 5 phishings) desbloqueiam conquistas (ex: "Caçador de Phishing"), que agregam prestígio ao perfil do estudante ou servidor.

---

## 6. Dashboard e Analytics

O Dashboard consolida a inteligência obtida via crowdsourcing (relatos dos usuários).
- No frontend, os componentes recuperam resumos numéricos (`getDashboardResumo()`) que calculam métricas diretamente do banco de dados (Total de Usuários, Incidentes, Resolvidos, Pendentes).
- A UI utiliza progress-bars dinâmicas, *cards* interativos com design dark/cyber, e alertas ricos desenhados com a biblioteca **Radix UI** para prover uma experiência visual analítica fluida.
