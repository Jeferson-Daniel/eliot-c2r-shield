# Análise Arquitetural e Plano de Integração: ELIOT C2R SHIELD

Este relatório apresenta uma análise crítica, institucional e acadêmica da arquitetura de banco de dados do projeto **ELIOT C2R SHIELD**, confrontando o esquema PostgreSQL (`incib_db_comrade.sql`) com o modelo de dados esperado pelo protótipo frontend em React (`types/eliot.ts` e `data/mock.ts`).

---

## 1. Análise da Arquitetura Atual do Banco

A modelagem apresentada utiliza PostgreSQL e é composta por 5 tabelas principais, implementando o núcleo de um sistema de denúncia de incidentes gamificado:

1. **`usuario`**: Armazena dados básicos do usuário (matrícula, nome, cargo, pontuação total).
2. **`incidente`**: Centraliza o reporte, ligando-o a um relator e a um possível validador. Contém o status, tipo de ameaça e pontos atribuídos.
3. **`anexo_incidente`**: Permite 1-N anexos por incidente, armazenando caminho e hash MD5 (boa prática forense).
4. **`insignia`**: Catálogo de conquistas/badges disponíveis.
5. **`usuario_insignia`**: Tabela associativa (N-N) registrando as insígnias desbloqueadas pelos usuários.

**Pontos Positivos Observados:**
- **Integridade Referencial**: Uso correto de chaves primárias e estrangeiras. As ações em deleção (`ON DELETE CASCADE` para anexos e `ON DELETE RESTRICT/SET NULL` para usuários em incidentes) demonstram maturidade no desenho, evitando orfandade de dados críticos sem perder o histórico do incidente caso um usuário seja excluído.
- **Tipagem**: Uso adequado de sequências automáticas (`SERIAL`/`SEQUENCE`) para IDs e controle básico de timestamps (`CURRENT_TIMESTAMP`).

---

## 2. Validação de Coerência (Frontend vs Backend)

Ao cruzar o script SQL com as interfaces TypeScript presentes no protótipo, identificam-se lacunas importantes que impedirão a integração sem ajustes.

> [!WARNING]
> O frontend (mock) consome diversas entidades e propriedades que ainda não existem no banco de dados.

### Inconsistências e Problemas de Modelagem
* **Tamanho de Colunas Subdimensionado**: Em `incidente`, o campo `ameaca` é `VARCHAR(20)`. No frontend, categorias como *"Phishing Institucional"* ocupam 22 caracteres, o que gerará erros de *truncation* na inserção.
* **Propriedades Faltantes em `incidente`**:
  * O frontend exige o nível de gravidade (`severity`: "Baixa", "Média", "Alta", "Crítica"), mas não há uma coluna equivalente (`severidade`) no banco.
  * Falta um campo para rastrear a data da última atualização ou validação do incidente (ex: `data_atualizacao` e `data_validacao`).
* **Propriedades Faltantes em `usuario`**:
  * O frontend utiliza `avatarSeed` e `department` (departamento), que estão ausentes na tabela.
* **Lacunas na Gamificação (`insignia`)**:
  * Faltam colunas de `descricao` em `insignia`.
  * A relação `usuario_insignia` não registra a data em que o usuário obteve a conquista (falta `data_obtencao TIMESTAMP`).
* **Lacunas em Anexos (`anexo_incidente`)**:
  * O frontend renderiza o tamanho do arquivo (`size`). O banco não possui a coluna `tamanho_bytes`.
* **Entidades Completamente Ausentes**:
  * **Notificações (`Notification`)**: Necessário para o sino de alertas do SOC.
  * **Treinamentos (`Training` e Lessons)**: Necessário para a aba de capacitação do protótipo.
  * **Segurança e Autenticação**: A tabela `usuario` atual não possui `senha_hash` nem `salt`, impossibilitando o login real.

---

## 3. Sugestões de Melhorias Arquiteturais (Abordagem Acadêmica)

Para viabilizar o TCC de forma robusta e simples, sugere-se aplicar as seguintes mutações ao banco antes de iniciar a construção da API:

1. **Adequação de Tipos e Tamanhos**: Aumentar `VARCHAR(20)` para `VARCHAR(50)` nos campos textuais de classificação.
2. **Campos de Auditoria**: Adicionar `created_at` e `updated_at` de forma sistêmica em todas as tabelas transacionais, gerenciados via `Triggers` no PostgreSQL.
3. **Novas Tabelas Recomendadas**:
   * `notificacao` (id, id_usuario, titulo, corpo, tipo, lida, data_criacao)
   * `treinamento` (id, titulo, descricao, categoria)
   * `usuario_treinamento` (id_usuario, id_treinamento, progresso_percentual)
4. **Campos de Auth**: Adicionar `senha_hash VARCHAR(255)` na tabela `usuario`.

---

## 4. Arquitetura da API e Stack Recomendada

Para manter a simplicidade, agilidade de desenvolvimento e relevância acadêmica (modernidade), sugere-se o seguinte conjunto de tecnologias:

> [!TIP]
> **Stack Backend Ideal**: Node.js + TypeScript utilizando **Express** e **Prisma ORM**.
> *Por que Prisma?* Ele oferece uma modelagem declarativa, integra-se perfeitamente com o TypeScript (evitando erros de mismatch com o frontend) e automatiza as migrações (migrations) do banco de dados, sendo muito bem avaliado em bancas de TCC.

### Estrutura Recomendada para o Backend (Design Pattern MVC/Camadas)
* **`src/controllers/`**: Recebe a requisição HTTP (REST) e devolve a resposta.
* **`src/services/`**: Concentra a lógica de negócio (ex: cálculo de XP ao validar incidente, validação de regras de gamificação).
* **`src/repositories/`** ou camada Prisma: Manipulação direta do banco de dados.
* **`src/middlewares/`**: Validação de token JWT, controle de CORS, tratamento de erros.

### Autenticação Ideal
O padrão de mercado mais adequado é o **JWT (JSON Web Token)**.
1. O frontend envia `matricula` e `senha`.
2. O backend usa `bcrypt` para comparar o hash. Se validado, gera um token JWT (com curto tempo de expiração) assinado com um `SECRET`.
3. O frontend salva o token e o anexa no cabeçalho `Authorization: Bearer <token>` em todas as requisições subsequentes.

### Endpoints Necessários (RESTful)
* **Autenticação**:
  * `POST /api/auth/login`
  * `GET /api/auth/me` (Retorna dados do usuário e perfil de acesso)
* **Incidentes**:
  * `GET /api/incidents` (Lista com filtros para SOC ou lista do usuário comum)
  * `POST /api/incidents` (Criar reporte com form-data para arquivos)
  * `PATCH /api/incidents/:id/status` (Rota para validadores alterarem status)
* **Gamificação**:
  * `GET /api/users/:id/badges`
  * `GET /api/leaderboard`
* **Notificações e Treinos**:
  * `GET /api/notifications`
  * `GET /api/trainings`

---

## 5. Integração com o Frontend (React/Vite)

> [!IMPORTANT]
> **Como o frontend deve consumir o banco**: O frontend **jamais** deve se conectar diretamente ao PostgreSQL. Toda a comunicação deve ser intermediada pela API Backend proposta acima.

No projeto atual, nota-se a presença da pasta `.tanstack`, indicando o uso ou planejamento do *TanStack Query (React Query)* e *TanStack Router*.
1. Substituir as importações do `src/data/mock.ts` por hooks de requisição (ex: `useQuery({ queryKey: ['incidents'], queryFn: fetchIncidents })`).
2. Configurar o **Axios** (ou `fetch` nativo) apontando para uma `baseURL` definida em variável de ambiente (`.env.local` apontando para `http://localhost:3000/api`).

---

## 6. Roadmap Profissional para Integração Gradual

Para que o desenvolvimento evolua sem quebrar o visual existente, siga este plano faseado:

**Fase 1: Ajuste do Banco (Semana 1)**
* [ ] Executar scripts adicionando colunas faltantes (`severidade`, `departamento`, `avatar_seed`, tabelas de notificações).
* [ ] Gerar dados de teste diretos no SQL (`INSERTs` simulando o `mock.ts`).

**Fase 2: Fundação do Backend (Semana 1-2)**
* [ ] Iniciar projeto Node.js (`npm init -y`, `npm i express typescript prisma`).
* [ ] Executar `npx prisma pull` para gerar o modelo Prisma a partir do PostgreSQL existente.
* [ ] Criar endpoint base de Saúde (`GET /health`).

**Fase 3: Autenticação & Usuários (Semana 2)**
* [ ] Implementar login local com JWT e bcrypt.
* [ ] Substituir o "usuário mockado" no frontend por contexto dinâmico vindo do backend (`/auth/me`).

**Fase 4: Incidentes (CRUD Principal) (Semana 3)**
* [ ] Implementar leitura (`GET`) de incidentes. Integrar no painel.
* [ ] Implementar criação (`POST`), vinculando com a autenticação atual.
* [ ] Lidar com upload de anexos (usar `multer` no Express para salvar na pasta `/uploads` e guardar o caminho no banco).

**Fase 5: Gamificação e Ajustes Finais (Semana 4)**
* [ ] Criar lógica de serviço: quando um incidente for setado como "Validado", adicionar XP à tabela `usuario`.
* [ ] Substituir os mocks de Notificações e Treinamentos por rotas reais.

---
*Análise focada em garantir máxima coerência arquitetural e solidez institucional para avaliação e defesa técnica do protótipo.*
