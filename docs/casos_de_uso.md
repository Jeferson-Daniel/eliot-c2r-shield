# Casos de Uso — ELIOT C2R SHIELD

Este documento descreve os principais casos de uso da plataforma ELIOT, mapeando as interações dos atores com o sistema para fins de auditoria e entendimento funcional (SBSeg 2026).

---

## 👥 Atores do Sistema

1. **Usuário Institucional (Relator):** Estudante, docente ou técnico administrativo que utiliza a plataforma para se capacitar e reportar incidentes de segurança.
2. **Administrador (Equipe de TI/SecOps):** Membro da equipe de segurança responsável por monitorar, triar e validar os reportes recebidos.
3. **Avaliador SBSeg (Demonstrativo):** Ator externo que interage com o sistema em ambiente isolado (local/Docker), testando fluxos de ponta a ponta através do login demonstrativo.

---

## 📋 Lista de Casos de Uso

### UC01: Autenticação Demonstrativa
* **Descrição:** O usuário acessa o sistema utilizando credenciais institucionais (simuladas no escopo MVP).
* **Pré-condições:** O sistema (frontend) deve estar rodando.
* **Fluxo Principal:**
  1. Usuário acessa a rota `/login`.
  2. A tela exibe o formulário preenchido com credenciais demonstrativas (`paulo.anjos@ifam.edu.br` / `demo1234`).
  3. Usuário clica em "Entrar".
  4. O sistema valida as credenciais hardcoded.
  5. O usuário é redirecionado para o `/app/dashboard`.
* **Fluxo Alternativo:** Se o usuário alterar as credenciais para valores incorretos, o sistema exibe um alerta de "Credenciais inválidas" e bloqueia o acesso.
* **Observações:** O login é **demonstrativo**; não há geração de token JWT real ou checagem de banco no MVP.

### UC02: Reportar Incidente de Segurança
* **Descrição:** O usuário institucional envia informações sobre uma suspeita de phishing, malware ou vulnerabilidade.
* **Pré-condições:** Usuário autenticado. Backend e banco de dados ativos.
* **Fluxo Principal:**
  1. Usuário acessa `/app/reportar`.
  2. Preenche título, descrição detalhada, categoria (ex: Phishing, Malware) e links suspeitos.
  3. Envia o formulário.
  4. O frontend envia um `POST /api/incidentes` para o backend.
  5. O backend salva a ocorrência no PostgreSQL com status inicial `"Em análise"`.
  6. O usuário vê uma mensagem de sucesso e é redirecionado para "Meus Reportes".
* **Fluxos Alternativos:**
  - **Falha na API:** Se a API estiver offline, a requisição falha e o frontend notifica, mas pode usar fallback visual em alguns fluxos dependendo da UI.
* **Observações:** Persistência **real** no PostgreSQL.

### UC03: Acompanhar Meus Reportes
* **Descrição:** O usuário visualiza o histórico e o status das suas denúncias.
* **Pré-condições:** Usuário autenticado.
* **Fluxo Principal:**
  1. Usuário acessa `/app/meus-reportes`.
  2. O frontend requisita `GET /api/incidentes` ao backend.
  3. O sistema lista os reportes reais, processando no frontend para o ID do relator.
  4. O usuário clica em um reporte para abrir uma gaveta lateral com os detalhes do fluxo de análise.
* **Fluxo de Fallback:** Se a API falhar (ex: backend desligado), o frontend loga o erro silenciosamente e carrega os dados estáticos do Mock (`mock.ts`), mantendo a tela preenchida para demonstração de UX.

### UC04: Visualizar Dashboard e Gamificação
* **Descrição:** O usuário acompanha suas métricas de experiência (XP), evolução de nível e insígnias.
* **Pré-condições:** Usuário autenticado.
* **Fluxo Principal:**
  1. Usuário acessa `/app/dashboard`.
  2. O sistema exibe o nível, XP até o próximo nível, e badges.
* **Observações:** Dados de gamificação são oriundos de mocks locais que simulam a perna de "Conscientização" e engajamento.

### UC05: Triagem Operacional de Incidentes (Admin Analytics)
* **Descrição:** O administrador visualiza, filtra e analisa os incidentes reportados pela rede.
* **Pré-condições:** Usuário com perfil de administrador.
* **Fluxo Principal:**
  1. Administrador acessa `/app/admin/analytics`.
  2. Frontend busca `GET /api/incidentes` da API real.
  3. A tabela renderiza dados persistidos no Postgres.
  4. Admin utiliza os filtros nativos (Status, Categoria, Severidade).
  5. Clicando numa linha, abre-se a Drawer de detalhes onde há os botões simulados de "Arquivar" ou "Validar Incidente" (geram Toast e fecham gaveta sem disparar PUT real).
* **Fluxo de Fallback:** Se `GET` falha, a tabela é preenchida com `incidents` estáticos do Mock, para o avaliador continuar inspecionando a interface do admin.

### UC06: Consumir Trilhas de Capacitação
* **Descrição:** O usuário acessa conteúdos de conscientização cibernética.
* **Pré-condições:** Usuário autenticado.
* **Fluxo Principal:**
  1. Usuário acessa `/app/capacitacao`.
  2. Visualiza vídeos e módulos de boas práticas (UI simulada).
* **Observações:** Atesta a perna de "Capacitação" da metodologia C2R.

---
*Gerado por Auditoria Funcional ELIOT - Documentação Preparatória para SBSeg 2026*
