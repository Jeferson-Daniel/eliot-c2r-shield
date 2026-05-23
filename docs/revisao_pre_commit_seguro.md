# Revisão Pré-Commit (Segurança e Estabilidade)

Este documento reflete a análise do estado atual da *working tree* do Git após as intervenções cirúrgicas focadas nos selos D, F e S do SBSeg. 

O objetivo é garantir que apenas código validado, seguro e funcional suba para o repositório, evitando lixo de desenvolvimento e dados sensíveis.

---

## 🟢 1. Arquivos que DEVEM entrar no commit (Aprovados)

As seguintes alterações foram validadas, estão estáveis e alinham-se ao objetivo de integração real do PostgreSQL, resiliência do frontend e segurança de credenciais:

### Modificações Seguras:
1. **`.gitignore`**
   - *Motivo:* Inclusão de `.env`, `.env.*` e `.vite`. Essencial para evitar vazamento futuro de senhas reais.
2. **`backend/src/controllers/incidentes.controller.ts`**
   - *Motivo:* Melhoria no log de erros (captura de `details` e `stack`), facilitando o debug de falhas reais do Prisma. Não quebra regras de negócio.
3. **`backend/src/services/incidentes.service.ts`**
   - *Motivo:* Implementação vital do *bypass* da sequência de autoincremento (`incidente_id_incidente_seq`). Como o banco remoto atual nega acesso à sequence para o usuário configurado, a busca do `_max` e injeção do `nextId` garante o funcionamento da persistência.
4. **`src/routes/app.reportar.tsx`**
   - *Motivo:* Remoção do falso positivo (`setTimeout`) no bloco `catch`. Se o backend falhar, o frontend agora exibe o erro real. Isso aumenta a transparência do artefato.

### Novos Arquivos Seguros:
5. **`LICENSE`** (Raiz)
   - *Motivo:* Exigência para o Selo D (Artefatos Disponíveis).
6. **`.env.example`** (Raiz) e **`backend/.env.example`**
   - *Motivo:* Modelos seguros e sem credenciais de produção para guiar os revisores (Selo R).
7. **`docs/auditoria_artefato_sbseg2026.md`**
   - *Motivo:* Registro histórico da auditoria do artefato.

---

## 🔴 2. Arquivos que NÃO DEVEM entrar no commit (Bloqueados)

Estes arquivos foram detectados como "Untracked" pelo git, mas são scripts temporários usados exclusivamente para investigar a falha de sequência no banco de dados.

1. **`backend/check.js`**
   - *Status:* Script raw do pacote `pg` usado para inspecionar `information_schema.sequences`. Lixo de debug. **DEVE SER REMOVIDO.**
2. **`backend/test-insert.js`**
   - *Status:* Script de teste isolado do Prisma. Lixo de debug. **DEVE SER REMOVIDO.**

*(O arquivo `.env` já não aparece na lista de commitáveis, pois foi adequadamente destracionado pelo comando `git rm --cached`).*

---

## ⚠️ 3. Riscos Encontrados

- **Débito Técnico no Insert:** A correção feita em `incidentes.service.ts` (pegando o `max + 1`) resolve perfeitamente a indisponibilidade imediata e garante que o artefato rode sem alterar o DB remoto. Contudo, em uma aplicação de alta concorrência do mundo real, isso geraria *race conditions*. Sendo um artefato acadêmico submetido para avaliação, isso é um risco perfeitamente aceitável, mas digno de nota.
- **Sobras Temporárias:** A presença dos scripts `.js` soltos na pasta backend demonstra que a área de trabalho não foi limpa. Se entrarem no commit, poluirião a submissão no SBSeg.

---

## 💡 4. Recomendações (Ações Imediatas)

Antes de executar `git add .` e `git commit`:

1. **Exclua fisicamente** os arquivos de debug para evitar que acidentalmente sejam "adicionados" no git:
   ```bash
   rm backend/check.js
   rm backend/test-insert.js
   ```

2. Após apagar o lixo, proceda com o stage seguro:
   ```bash
   git add .gitignore LICENSE docs/ .env.example backend/.env.example
   git add backend/src/controllers/incidentes.controller.ts
   git add backend/src/services/incidentes.service.ts
   git add src/routes/app.reportar.tsx
   ```

3. Realize o commit finalizando esta etapa cirúrgica:
   ```bash
   git commit -m "fix: padronizacao de ambiente, fallbacks e persistencia no db"
   ```
