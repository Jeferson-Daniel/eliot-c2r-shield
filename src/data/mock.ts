import type {
  AppUser,
  Incident,
  IncidentCategory,
  IncidentSeverity,
  IncidentStatus,
  Level,
  Notification,
  Training,
  UserBadge,
} from "@/types/eliot";

export const LEVELS: Level[] = [
  { slug: "observador", name: "Observador Digital", minXp: 0, description: "Está começando a perceber riscos no ambiente digital." },
  { slug: "guardiao-inicial", name: "Guardião Inicial", minXp: 500, description: "Reporta com frequência e ajuda colegas a se proteger." },
  { slug: "sentinela", name: "Sentinela Cibernético", minXp: 1500, description: "Identifica ameaças com precisão e contribui ativamente." },
  { slug: "analista", name: "Analista Colaborador", minXp: 4000, description: "Apoia a análise e classificação de incidentes." },
  { slug: "guardiao-institucional", name: "Guardião Institucional", minXp: 10000, description: "Referência institucional em segurança da informação." },
];

export function getLevel(xp: number): Level {
  return [...LEVELS].reverse().find((l) => xp >= l.minXp) ?? LEVELS[0];
}
export function getNextLevel(xp: number): Level | null {
  return LEVELS.find((l) => l.minXp > xp) ?? null;
}
export function levelProgress(xp: number): { pct: number; current: Level; next: Level | null; toNext: number } {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return { pct: 100, current, next: null, toNext: 0 };
  const span = next.minXp - current.minXp;
  const into = xp - current.minXp;
  return { pct: Math.round((into / span) * 100), current, next, toNext: next.minXp - xp };
}

export const BADGES: UserBadge[] = [
  { slug: "primeiro-reporte", name: "Primeiro Reporte", description: "Registrou seu primeiro incidente e colaborou com a triagem." },
  { slug: "cacador-phishing", name: "Caçador de Phishing", description: "Identificou e reportou 5+ tentativas de phishing institucional." },
  { slug: "alerta-preventivo", name: "Alerta Preventivo", description: "Reportou uma vulnerabilidade crítica antes de qualquer dano à rede." },
  { slug: "colaborador-ativo", name: "Monitoramento Contínuo", description: "Mantém-se ativo no painel de monitoramento por 30 dias consecutivos." },
  { slug: "guardiao-seguranca", name: "Referência Institucional", description: "Atingiu pontuação exemplar protegendo os sistemas acadêmicos." },
  { slug: "olhar-clinico", name: "Análise Criteriosa", description: "Enviou um reporte contendo evidências, links e cabeçalhos detalhados." },
  { slug: "mentor-digital", name: "Capacitação Concluída", description: "Finalizou todos os módulos de boas práticas e conscientização." },
  { slug: "resposta-rapida", name: "Tempo de Resposta", description: "Reportou um incidente em tempo hábil para bloqueio de firewall." },
  { slug: "sentinela-noturna", name: "Vigilância Estendida", description: "Reportou um acesso anômalo fora do expediente acadêmico." },
  { slug: "guardiao-dados", name: "Proteção de Dados (LGPD)", description: "Identificou e preveniu a exposição indevida de dados sensíveis." },
];

export const currentUser: AppUser = {
  id: "u-001",
  name: "Paulo Anjos",
  role: "Técnico Administrativo",
  avatarSeed: "paulo",
  xp: 4350,
  badges: ["primeiro-reporte", "cacador-phishing", "alerta-preventivo", "olhar-clinico", "resposta-rapida"],
  department: "CTIC",
};

export const users: AppUser[] = [
  currentUser,
  { id: "u-002", name: "José Haroldo", role: "Servidor", avatarSeed: "jose", xp: 9400, badges: ["primeiro-reporte", "cacador-phishing", "guardiao-seguranca"] },
  { id: "u-003", name: "Felipe Carvalho", role: "Discente", avatarSeed: "felipe", xp: 9380, badges: ["primeiro-reporte", "alerta-preventivo"] },
  { id: "u-004", name: "Lara Glória", role: "Docente", avatarSeed: "lara", xp: 9380, badges: ["primeiro-reporte", "mentor-digital"] },
  { id: "u-005", name: "Maria Eduarda", role: "Discente", avatarSeed: "maria", xp: 9280, badges: ["primeiro-reporte"] },
  { id: "u-006", name: "Raimundo Júnior", role: "Servidor", avatarSeed: "raimundo", xp: 9250, badges: ["primeiro-reporte", "colaborador-ativo"] },
  { id: "u-007", name: "Ediane Bó", role: "Docente", avatarSeed: "ediane", xp: 8000, badges: ["primeiro-reporte"] },
  { id: "u-008", name: "Emanuel Raimundo", role: "Discente", avatarSeed: "emanuel", xp: 7896, badges: ["primeiro-reporte"] },
  { id: "u-009", name: "Carlos Eduardo", role: "Servidor", avatarSeed: "carlos", xp: 6100, badges: ["primeiro-reporte"] },
  { id: "u-010", name: "Ester Santos", role: "Discente", avatarSeed: "ester", xp: 3000, badges: ["primeiro-reporte"] },
  { id: "u-011", name: "Fernanda Santos", role: "Servidora", avatarSeed: "fernanda", xp: 1000, badges: ["primeiro-reporte"] },
  { id: "u-012", name: "Jane Mendes", role: "Docente", avatarSeed: "jane", xp: 500, badges: [] },
];

const categories: IncidentCategory[] = [
  "Phishing Institucional", "Infraestrutura Física", "Acesso Suspeito", "Engenharia Social",
  "Vazamento de Dados", "Fraude Financeira", "Malware / Ransomware", "Outro",
] as const;
const severities: IncidentSeverity[] = ["Baixa", "Média", "Alta", "Crítica"];
const statuses: IncidentStatus[] = ["Pendente", "Em análise", "Validado", "Rejeitado", "Concluído"];

const mockScenarios = [
  { title: "E-mail falso solicitando renovação de credenciais do SIGAA", cat: "Phishing Institucional", link: "https://sigaa-renovacao-institucional.net" },
  { title: "Pedido de PIX falso via WhatsApp em nome da Coordenação", cat: "Fraude Financeira" },
  { title: "Múltiplas tentativas de login no portal docente (IP externo)", cat: "Acesso Suspeito" },
  { title: "QR Code suspeito colado sobre informativo no bloco central", cat: "Infraestrutura Física" },
  { title: "Planilha com dados e CPFs de alunos aberta no Google Drive", cat: "Vazamento de Dados", link: "https://docs.google.com/spreadsheets/d/public-share" },
  { title: "Compartilhamento externo não autorizado em pasta administrativa", cat: "Vazamento de Dados" },
  { title: "Falso suporte técnico solicitando acesso remoto (AnyDesk)", cat: "Engenharia Social" },
  { title: "Anexo malicioso (.exe) simulando boleto de matrícula/taxa", cat: "Malware / Ransomware", link: "boleto_mensalidade_05.exe" },
  { title: "Convite suspeito para reunião urgente no Microsoft Teams", cat: "Phishing Institucional" },
  { title: "Desativação inesperada do MFA na conta administrativa", cat: "Acesso Suspeito" },
  { title: "Roteador Wi-Fi clandestino detectado na biblioteca", cat: "Infraestrutura Física" },
  { title: "Acesso em horário atípico (03:45) no laboratório de pesquisa", cat: "Acesso Suspeito" },
  { title: "Link encurtado suspeito enviado no grupo oficial do curso", cat: "Phishing Institucional", link: "https://bit.ly/matricula-urgente" },
  { title: "E-mail com ameaça de suspensão de bolsa se não atualizar dados", cat: "Engenharia Social" },
  { title: "Pendrive não identificado na sala de servidores do CTIC", cat: "Infraestrutura Física" },
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const incidents: Incident[] = Array.from({ length: 24 }).map((_, i) => {
  const u = users[i % users.length];
  const scenario = mockScenarios[i % mockScenarios.length];
  const sev = severities[i % severities.length];
  const st = statuses[i % statuses.length];
  const points = st === "Validado" || st === "Concluído"
    ? sev === "Crítica" ? 200 : sev === "Alta" ? 150 : sev === "Média" ? 100 : 50
    : undefined;
  return {
    id: `INC-${String(2026000 + i).padStart(7, "0")}`,
    title: scenario.title,
    description: "Descrição registrada pelo denunciante através do portal. O contexto e os detalhes fornecidos (hora, canal, mensagens anexas) estão sendo utilizados pela equipe do SOC acadêmico para compor a análise preliminar e determinar a necessidade de bloqueio ou notificação em massa.",
    category: scenario.cat as IncidentCategory,
    severity: sev,
    status: st,
    reporterId: u.id,
    reporterName: u.name,
    reporterRole: u.role,
    link: scenario.link,
    createdAt: daysAgo(i * 3 + 1),
    points,
    attachments: i % 3 === 0 ? [{ name: "evidencia.png", size: 124_500 }] : [],
  };
});

export const myIncidents: Incident[] = incidents
  .filter((_, i) => i % 2 === 0)
  .slice(0, 8)
  .map((inc) => ({ ...inc, reporterId: currentUser.id, reporterName: currentUser.name, reporterRole: currentUser.role }));

export const notifications: Notification[] = [
  { id: "n1", title: "Ocorrência validada", body: "Sua ocorrência sobre link suspeito foi validada pelo SOC (+150 pontos).", createdAt: daysAgo(0), kind: "success" },
  { id: "n2", title: "Aviso Institucional", body: "Detectada campanha de phishing envolvendo falsos boletos. Atenção redobrada.", createdAt: daysAgo(1), kind: "warning" },
  { id: "n3", title: "Nova trilha de conscientização", body: "Módulo sobre 'Engenharia Social no Campus' publicado.", createdAt: daysAgo(2), kind: "info" },
  { id: "n4", title: "Alerta Crítico", body: "Um incidente crítico envolvendo vazamento de dados foi reportado no seu setor.", createdAt: daysAgo(3), kind: "critical" },
];

export const trainings: Training[] = [
  {
    id: "t-phishing", title: "Phishing Institucional: Identificação e Resposta", description: "Aprenda a reconhecer comunicados fraudulentos fingindo ser a Reitoria ou Biblioteca.",
    durationMin: 12, category: "Prevenção", progress: 80,
    lessons: [
      { title: "O que é phishing", body: "É a tentativa de obter informações sensíveis fingindo ser uma fonte confiável. No ambiente acadêmico, costuma se passar por reitoria, biblioteca, sistemas internos e bancos." },
      { title: "Sinais clássicos", body: "Senso de urgência, erros sutis no remetente, domínios trocados, anexos inesperados e pedidos de senha são sinais clássicos." },
      { title: "Como agir", body: "Não clique, não responda, encaminhe o caso via sistema de triagem e, se possível, anexe o cabeçalho da mensagem." },
    ],
  },
  {
    id: "t-links", title: "Análise de Links e Encurtadores", description: "Boas práticas para inspecionar URLs suspeitas e links enviados via WhatsApp.",
    durationMin: 8, category: "Análise Técnica", progress: 40,
    lessons: [
      { title: "Anatomia de uma URL", body: "Aprenda a ler o domínio principal, subdomínios e parâmetros de uma URL." },
      { title: "Encurtadores", body: "Use pré-visualizadores antes de abrir links encurtados recebidos por canais não verificados." },
    ],
  },
  {
    id: "t-senhas", title: "Gestão de Identidade e MFA", description: "Proteção de credenciais acadêmicas e a importância da Autenticação em Múltiplos Fatores.",
    durationMin: 10, category: "Políticas Internas", progress: 100,
    lessons: [
      { title: "Frases-senha", body: "Combine quatro palavras incomuns para criar uma senha forte e memorável." },
      { title: "Gerenciadores", body: "Use um gerenciador para que cada serviço tenha uma senha única." },
    ],
  },
  {
    id: "t-engsocial", title: "Engenharia Social no Ambiente Acadêmico", description: "Pressões emocionais, abuso de autoridade por falsos coordenadores.",
    durationMin: 15, category: "Conscientização", progress: 0,
    lessons: [
      { title: "Gatilhos comuns", body: "Autoridade, urgência, reciprocidade e prova social são os gatilhos mais explorados." },
      { title: "Como responder", body: "Desacelere, confirme por outro canal e relate à segurança corporativa." },
    ],
  },
  {
    id: "t-anexos", title: "Tratamento de Anexos Maliciosos", description: "Identificação de planilhas e PDFs contendo macros ou scripts ocultos.",
    durationMin: 7, category: "Prevenção", progress: 20,
    lessons: [{ title: "Extensões de risco", body: "Atenção a .exe, .scr, .js, .vbs, .iso e documentos com macros." }],
  },
  {
    id: "t-reportar", title: "Como redigir um reporte pericial", description: "Boas práticas para registrar ocorrências para o SOC institucional.",
    durationMin: 6, category: "Procedimento", progress: 60,
    lessons: [{ title: "O que descrever", body: "Inclua data, hora, canal, conteúdo e prints. Quanto melhor a evidência, mais rápida a resposta." }],
  },
];

export const monthlyVolume = [
  { month: "Jan", value: 62 }, { month: "Fev", value: 74 }, { month: "Mar", value: 81 },
  { month: "Abr", value: 95 }, { month: "Mai", value: 108 }, { month: "Jun", value: 124 },
  { month: "Jul", value: 96 }, { month: "Ago", value: 88 }, { month: "Set", value: 102 },
  { month: "Out", value: 117 }, { month: "Nov", value: 109 }, { month: "Dez", value: 132 },
];

export const typeDistribution = [
  { name: "Phishing Institucional", value: 42 },
  { name: "Acesso Suspeito", value: 28 },
  { name: "Engenharia Social", value: 12 },
  { name: "Vazamento de Dados", value: 9 },
  { name: "Infraestrutura Física", value: 9 },
];

export const adminKpis = {
  mttr: "45 min",
  falsePositivesRate: "8%",
  mfaAdoption: "78%",
  pending: 14,
  completed: 722,
  rejected: 86,
  light: 134, moderate: 590, critical: 98, resolutionRate: 96,
};
