# Matriz de Funcionalidades — ELIOT C2R SHIELD

Esta matriz documenta o status arquitetural e funcional detalhado dos módulos do sistema, oferecendo um mapeamento claro entre o que está operando em persistência real (Banco/API) e o que está estruturado como "Mock" visual focado em demonstração de UX e conceito.

---

| Funcionalidade | Tela / Rota / Módulo | Status Atual | Depende do Backend? | Depende do Banco? | Risco para Avaliação | Recomendação Técnica |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Login** | `/login` | Demonstrativo | Não | Não | 🟢 Baixo | Explicitar sempre que é MVP no painel. O uso da nova trava rígida ajudou muito. |
| **Dashboard** | `/app/dashboard` | Parcial | Não* | Não* | 🟡 Médio | Ele não puxa incidentes pendentes ou XP de forma 100% dinâmica ainda (pega partes do Mock). Recomenda-se integrar a XP do usuário logado via endpoint próprio antes da banca. |
| **Reportar Incidente** | `/app/reportar` | **Real** | Sim | Sim | 🟢 Baixo | Maturidade total (Selo F). Tudo persistido com enums corretos. |
| **Meus Reportes** | `/app/meus-reportes` | **Real** | Sim | Sim | 🟢 Baixo | Traz os dados via GET do Postgres. A barra de progresso visual se molda ao status. Excelente estabilidade. |
| **Admin Analytics** | `/app/admin/analytics` | Parcial | Sim | Sim | 🔴 Alto | A lista vem do Banco, mas os botões de ação ("Validar", "Arquivar") apenas mostram um Toast e **não efetuam chamada PUT** no banco. Gera impressão de bug ao reler a tabela sem a alteração. Corrigir com urgência. |
| **Ranking** | `/app/ranking` | Demonstrativo | Não | Não | 🟢 Baixo | UX incrível, cumpre o papel de gamificação (Conscientização), mas não altera a ordem em tempo real de acordo com interações no banco. |
| **Badges / Insígnias** | - | Demonstrativo | Não | Não | 🟢 Baixo | Componentes lindamente mapeados via Mock, fortalecem a proposta de ensino sem sobrecarregar a API inicial. |
| **Capacitação/Trilhas** | `/app/capacitacao` | Demonstrativo | Não | Não | 🟢 Baixo | Funciona como catálogo estático simulando trilha de vídeos. |
| **Configurações** | `/app/configuracoes` | Mock | Não | Não | 🟢 Baixo | Permite que o usuário clique em Toggles de Notificações que salvam localmente o estado React, garantindo UX interativa. |
| **Sidebar / Menu** | *AppShell* | **Real** | Não | Não | 🟢 Baixo | Corrigida a tipagem estrita no React 19. Menu flutuante maduro e responsivo (Mobile). |
| **Fallback Offline** | `api.ts` -> Telas | **Real** | Sim | Não | 🟢 Baixo | Estratégia de Catch robusta: se o banco/API estiverem mortos, preenche com `mock.ts` e evita tela branca. Garante Selo D sem depender de infra local perfeita na banca. |
| **Seed de Dados** | `backend/seed.ts` | **Real** | Sim | Sim | 🟢 Baixo | Semeia usuários, tipos de incidentes, e preenche a tabela relacional de forma completa com dados simulando o contexto do IFAM. |
| **Docker (Infra)** | `docker-compose.yml` | **Real** | Não | Sim | 🟢 Baixo | Container enxuto (Postgres 16) já na raiz. Garante o Selo F para examinadores sem atrito. |
| **CI GitHub Actions** | `.github/workflows/ci.yml` | **Real** | Sim | Sim | 🟢 Baixo | Workflow de validação de PR e Push validado rodando infraestrutura paralela de Service Container na nuvem. Agrega imenso valor para Selo S (Sustentabilidade). |
| **Testes Backend** | `vitest` API | **Real** | Sim | Sim | 🟢 Baixo | As asserções provam que as rotas de GET devolvem Payload OK (200 JSON). |

---

### Conclusão e Priorização para Submissão

1. **Maduro e Pronto (Não mexer):** Infra Docker, CI/CD Actions, Testes, Seed, Formulário de Reporte, Validação de Login simulada, e Gestão Operacional de Incidentes (Admin Analytics 100% conectada e realizando PUT no status).
2. **Pode causar impressão de bug:** A desassociação entre a pontuação estática do Mock no Dashboard e os eventos dinâmicos que estão sendo criados no banco de dados com XP real. Se houver tempo hábil, unificar essa chamada num endpoint `GET /api/meus-dados`.
