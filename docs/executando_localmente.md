# Executando Localmente (Guia de Setup)

Este guia apresenta o passo a passo completo para que revisores e avaliadores do SBSeg consigam rodar o projeto **ELIOT C2R SHIELD** localmente de maneira reproduzível e sem atritos.

---

## 1. Requisitos do Sistema

Para executar a aplicação em ambiente local, certifique-se de ter instalado:
- **Node.js:** Versão 20 ou superior (versão recomendada v24.x).
- **Gerenciador de Pacotes:** `npm` (embutido no Node.js).
- **PostgreSQL:** Servidor local rodando na porta `5432` (versão 14+).

---

## 2. Preparação e Banco de Dados

1. Certifique-se de que o serviço do PostgreSQL está rodando em sua máquina.
2. Crie um banco de dados em branco chamado `eliot_db`:
   ```sql
   CREATE DATABASE eliot_db;
   ```
*(Alternativamente, você pode usar um usuário existente, mas garanta acesso de persistência ao DB).*

---

## 3. Configuração do Backend

O backend é a camada de API e conexão com o banco de dados. Navegue até o diretório correspondente e configure as credenciais.

1. Acesse o diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Duplique o arquivo `.env.example` e renomeie para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` para garantir que a `DATABASE_URL` aponta para o seu usuário e senha do PostgreSQL configurado no passo anterior.
     Exemplo:
     ```env
     DATABASE_URL="postgresql://postgres:suasenha123@localhost:5432/eliot_db"
     PORT=3001
     ```

### Migrações e Dados Iniciais (Seed)
Para sincronizar as tabelas do Prisma com o seu banco de dados vazio e popular dados realistas institucionais (Mock Rico), execute:

1. Gere o client do Prisma:
   ```bash
   npx prisma generate
   ```
2. Rode as migrações no banco:
   ```bash
   npx prisma db push
   ```
3. Execute o script de Seed:
   ```bash
   npm run seed
   ```
*(Você deverá ver a mensagem "Seed rico e realista concluído com sucesso!").*

### Inicializando o Backend
Com o banco configurado, suba o servidor backend (API):
```bash
npm start
```
A API RESTful estará rodando em `http://localhost:3001`.

---

## 4. Configuração do Frontend

O frontend consome a API do backend. É recomendável abrir uma **nova janela de terminal** para mantê-los rodando simultaneamente.

1. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente:
   - Copie o arquivo de exemplo:
     ```bash
     cp .env.example .env
     ```
   - O `.env` na raiz informará o frontend onde a API está:
     ```env
     VITE_API_URL=http://localhost:3001/api
     ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

A aplicação subirá através do Vite.

---

## 5. URLs Principais

Com os servidores rodando, acesse no navegador:

- **Frontend (Interface do Usuário):** `http://localhost:8080` (ou a porta mostrada no terminal do Vite, como `:5173`).
- **Backend (Verificação Base):** `http://localhost:3001/api/incidentes` (deve retornar um JSON com a listagem gerada pelo Seed).

---

## 6. Troubleshooting (Solução de Problemas)

- **`PrismaClientInitializationError` / "ECONNREFUSED":**
  - Causa: O backend não conseguiu conectar ao PostgreSQL.
  - Solução: Verifique se o seu PostgreSQL local está rodando, se a porta 5432 está correta e se os dados (user/senha) definidos na `DATABASE_URL` do `backend/.env` estão corretos.
  
- **Frontend exibe Toast "Erro ao registrar a ocorrência":**
  - Causa: A comunicação entre Frontend e Backend falhou no momento de um POST.
  - Solução: Confira se o `.env` na raiz do projeto está apontando para `http://localhost:3001/api` e se a janela de terminal do backend (`npm start`) ainda está rodando sem erros.
  
- **Tabelas faltando ou erros de schema:**
  - Solução: No terminal do `backend/`, pare a execução, rode `npx prisma db push` e reinicie com `npm start`.

---

## 7. Testes Automatizados (Selo F e Selo S)

O backend possui uma suite de testes m�nimos implementada com Vitest e Supertest para garantir a integridade dos endpoints (Health Check, Incidentes, Dashboard e Ranking).

Para executar os testes automatizados, certifique-se de que o banco de dados PostgreSQL esteja rodando com a seed aplicada e execute os seguintes comandos:

`ash
cd backend
npm run build
npm test
``n
Voc� dever� ver o relat�rio do Vitest indicando que todos os testes de API passaram com sucesso.
