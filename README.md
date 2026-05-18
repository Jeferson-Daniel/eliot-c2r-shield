# ELIOT — Plataforma C2R de Cibersegurança Institucional

Bem-vindo ao repositório do **ELIOT**, uma plataforma de cibersegurança desenhada especificamente para instituições públicas de ensino superior.

## O que é o ELIOT?
O ELIOT é um SaaS (Software as a Service) focado em **capacitar pessoas, conscientizar comunidades e facilitar o reporte de ameaças cibernéticas** no ambiente acadêmico. Ele centraliza as ações de segurança da informação com uma interface limpa, moderna e humanizada, combatendo ameaças como phishing, engenharia social e vazamento de dados.

## Metodologia C2R
A plataforma foi concebida sob a metodologia C2R, estruturada em três pilares contínuos:
- **Capacitar:** Trilhas curtas e práticas sobre senhas, phishing e boas práticas (foco na rotina acadêmica).
- **Conscientizar:** Lembretes e campanhas sem gerar fadiga de alertas.
- **Reportar:** Fluxo rápido, simples e seguro para que qualquer pessoa consiga relatar incidentes cibernéticos para a equipe de TI.

## Stack Tecnológica
O ELIOT foi construído utilizando tecnologias modernas e de alta performance:
- **React 19**
- **Vite** (Build e desenvolvimento super rápidos)
- **TanStack Router / Start** (Roteamento tipado e avançado)
- **Tailwind CSS v4** (Estilização baseada em tokens)
- **Shadcn / Radix UI** (Componentes de interface acessíveis)
- **Lucide React** (Ícones)

## Estrutura de Pastas
O projeto segue a arquitetura padrão do TanStack Router:
```
├── src/
│   ├── components/      # Componentes de UI e negócio
│   │   ├── eliot/       # Componentes específicos do domínio ELIOT
│   │   └── ui/          # Componentes genéricos de UI (primitivos)
│   ├── data/            # Dados mockados da aplicação
│   ├── routes/          # Páginas e rotas da aplicação (file-based routing)
│   ├── lib/             # Utilitários e helpers (ex: utils.ts para tailwind)
│   ├── styles.css       # Configurações globais e de tokens (oklch)
│   └── start.ts         # Entry point da aplicação
├── vite.config.ts       # Configuração do bundler
└── package.json         # Dependências e scripts
```

## Instalação e Uso

### Pré-requisitos
- [Node.js](https://nodejs.org/pt-br/) (versão 20 ou superior recomendada)
- `npm`

### Como rodar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse a aplicação no seu navegador padrão (`http://localhost:8080` ou equivalente indicado no terminal).

> **Aviso Importante:** A versão atual do ELIOT é um **MVP** focado na validação do conceito e da interface. Por conta disso, ele utiliza **dados simulados (mockados)** localizados no arquivo `src/data/mock.ts`. Não há backend real conectado nesta versão.
