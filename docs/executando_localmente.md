# Executando Localmente (Guia de Setup)

Este guia apresenta o passo a passo completo para que revisores e avaliadores do SBSeg consigam rodar o projeto **ELIOT C2R SHIELD** localmente de maneira reproduzÃ­vel e sem atritos.

---

## 1. Requisitos do Sistema

Para executar a aplicaÃ§Ã£o em ambiente local, certifique-se de ter instalado:
- **Node.js:** VersÃ£o 20 ou superior (versÃ£o recomendada v24.x).
- **Gerenciador de Pacotes:** `npm` (embutido no Node.js).
- **PostgreSQL:** Servidor local rodando na porta `5432` (versÃ£o 14+).

---

## 2. Preparação e Banco de Dados

O projeto oferece dois modos de inicialização do banco de dados, permitindo flexibilidade para desenvolvedores e facilidade de reprodução para os avaliadores.

### Modo Desenvolvimento
Se você já possui um PostgreSQL instalado na sua máquina ou deseja conectar a um banco remoto:
1. Certifique-se de que o serviço do PostgreSQL está rodando ou acessível.
2. Crie um banco de dados vazio chamado `eliot_db`:
   ```sql
   CREATE DATABASE eliot_db;
   ```
3. Configure a `DATABASE_URL` no arquivo `backend/.env` manualmente para apontar para o seu banco.

### Modo Avaliação SBSeg (Recomendado via Docker)
Este é o modo ideal para uma avaliação rápida, isolada e sem atritos, utilizando o `docker-compose` preparado na raiz do projeto. Subirá um container PostgreSQL isolado na porta `5432` com credenciais padrão.

1. Na raiz do projeto, suba o container do banco de dados em background:
   ```bash
   docker compose up -d
   ```
*(Este comando lerá o arquivo `docker-compose.yml` e deixará o banco de dados acessível na porta 5432).*

Para desligar o banco de dados após a avaliação:
```bash
docker compose down
```
Se precisar limpar o banco local completamente e começar do zero (destrói o volume de dados):
```bash
docker compose down -v
```

---

## 3. ConfiguraÃ§Ã£o do Backend

O backend Ã© a camada de API e conexÃ£o com o banco de dados. Navegue atÃ© o diretÃ³rio correspondente e configure as credenciais.

1. Acesse o diretÃ³rio do backend:
   ```bash
   cd backend
   ```
2. Instale as dependÃªncias:
   ```bash
   npm install
   ```
3. Configure as variÃ¡veis de ambiente:
   - Duplique o arquivo `.env.example` e renomeie para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` para garantir que a `DATABASE_URL` aponta para o seu usuÃ¡rio e senha do PostgreSQL configurado no passo anterior.
     Exemplo:
     ```env
     DATABASE_URL="postgresql://postgres:suasenha123@localhost:5432/eliot_db"
     PORT=3001
     ```

### MigraÃ§Ãµes e Dados Iniciais (Seed)
Para sincronizar as tabelas do Prisma com o seu banco de dados vazio e popular dados realistas institucionais (Mock Rico), execute:

1. Gere o client do Prisma:
   ```bash
   npx prisma generate
   ```
2. Rode as migraÃ§Ãµes no banco:
   ```bash
   npx prisma db push
   ```
3. Execute o script de Seed:
   ```bash
   npm run seed
   ```
*(VocÃª deverÃ¡ ver a mensagem "Seed rico e realista concluÃ­do com sucesso!").*

### Inicializando o Backend
Com o banco configurado, suba o servidor backend (API):
```bash
npm start
```
A API RESTful estarÃ¡ rodando em `http://localhost:3001`.

---

## 4. ConfiguraÃ§Ã£o do Frontend

O frontend consome a API do backend. Ã‰ recomendÃ¡vel abrir uma **nova janela de terminal** para mantÃª-los rodando simultaneamente.

1. Na raiz do projeto, instale as dependÃªncias:
   ```bash
   npm install
   ```
2. Configure as variÃ¡veis de ambiente:
   - Copie o arquivo de exemplo:
     ```bash
     cp .env.example .env
     ```
   - O `.env` na raiz informarÃ¡ o frontend onde a API estÃ¡:
     ```env
     VITE_API_URL=http://localhost:3001/api
     ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicaÃ§Ã£o subirÃ¡ atravÃ©s do Vite.

---

## 5. URLs Principais

Com os servidores rodando, acesse no navegador:

- **Frontend (Interface do UsuÃ¡rio):** `http://localhost:8080` (ou a porta mostrada no terminal do Vite, como `:5173`).
- **Backend (VerificaÃ§Ã£o Base):** `http://localhost:3001/api/incidentes` (deve retornar um JSON com a listagem gerada pelo Seed).

---

## 6. Troubleshooting (SoluÃ§Ã£o de Problemas)

- **`PrismaClientInitializationError` / "ECONNREFUSED":**
  - Causa: O backend nÃ£o conseguiu conectar ao PostgreSQL.
  - SoluÃ§Ã£o: Verifique se o seu PostgreSQL local estÃ¡ rodando, se a porta 5432 estÃ¡ correta e se os dados (user/senha) definidos na `DATABASE_URL` do `backend/.env` estÃ£o corretos.
  
- **Frontend exibe Toast "Erro ao registrar a ocorrÃªncia":**
  - Causa: A comunicaÃ§Ã£o entre Frontend e Backend falhou no momento de um POST.
  - SoluÃ§Ã£o: Confira se o `.env` na raiz do projeto estÃ¡ apontando para `http://localhost:3001/api` e se a janela de terminal do backend (`npm start`) ainda estÃ¡ rodando sem erros.
  
- **Tabelas faltando ou erros de schema:**
  - SoluÃ§Ã£o: No terminal do `backend/`, pare a execuÃ§Ã£o, rode `npx prisma db push` e reinicie com `npm start`.

---

## 7. Testes Automatizados (Selo F e Selo S)

O backend possui uma suite de testes mínimos implementada com Vitest e Supertest para garantir a integridade dos endpoints (Health Check, Incidentes, Dashboard e Ranking).

Para executar os testes automatizados, certifique-se de que o banco de dados PostgreSQL esteja rodando com a seed aplicada e execute os seguintes comandos:

`ash
cd backend
npm run build
npm test
``n
Você deverá ver o relatório do Vitest indicando que todos os testes de API passaram com sucesso.
