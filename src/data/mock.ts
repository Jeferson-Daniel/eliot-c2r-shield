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
  { slug: "primeiro-reporte", name: "Primeiro Reporte", description: "Registrou seu primeiro incidente." },
  { slug: "cacador-phishing", name: "Caçador de Phishing", description: "Identificou 5+ tentativas de phishing." },
  { slug: "alerta-preventivo", name: "Alerta Preventivo", description: "Reportou ameaça antes de afetar a instituição." },
  { slug: "colaborador-ativo", name: "Colaborador Ativo", description: "Mantém-se ativo por 30 dias consecutivos." },
  { slug: "guardiao-seguranca", name: "Guardião da Segurança", description: "Atingiu 5.000 pontos protegendo a comunidade." },
  { slug: "olhar-clinico", name: "Olhar Clínico", description: "Detalhou um reporte com evidências completas." },
  { slug: "mentor-digital", name: "Mentor Digital", description: "Concluiu todas as trilhas de capacitação." },
  { slug: "resposta-rapida", name: "Resposta Rápida", description: "Reportou um incidente em menos de 2 minutos." },
  { slug: "sentinela-noturna", name: "Sentinela Noturna", description: "Reportou ameaça fora do horário comercial." },
  { slug: "guardiao-dados", name: "Guardião de Dados", description: "Identificou tentativa de vazamento de dados." },
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
  "Phishing", "Malware", "Link suspeito", "Engenharia social",
  "Vazamento de dados", "Acesso indevido", "Anexo suspeito", "Outro",
];
const severities: IncidentSeverity[] = ["Baixa", "Média", "Alta", "Crítica"];
const statuses: IncidentStatus[] = ["Pendente", "Em análise", "Validado", "Rejeitado", "Concluído"];

const titles = [
  "E-mail suspeito solicitando senha", "Link encurtado recebido por WhatsApp",
  "Anexo .exe em mensagem institucional", "Tentativa de login fora do horário",
  "Página falsa do SIGAA", "Pedido de PIX por suposto chefe",
  "Arquivo com vírus no Drive compartilhado", "Spam recorrente no e-mail institucional",
  "Site clonado da biblioteca", "Mensagem se passando pela reitoria",
  "QR code suspeito no mural", "Acesso indevido ao laboratório virtual",
  "Vazamento de planilha com matrículas", "Engenharia social via telefone",
  "Pendrive desconhecido na sala dos professores",
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const incidents: Incident[] = Array.from({ length: 24 }).map((_, i) => {
  const u = users[i % users.length];
  const cat = categories[i % categories.length];
  const sev = severities[i % severities.length];
  const st = statuses[i % statuses.length];
  const points = st === "Validado" || st === "Concluído"
    ? sev === "Crítica" ? 200 : sev === "Alta" ? 150 : sev === "Média" ? 100 : 50
    : undefined;
  return {
    id: `INC-${String(2026000 + i).padStart(7, "0")}`,
    title: titles[i % titles.length],
    description:
      "Descrição detalhada do incidente reportado pelo usuário, incluindo contexto, horário aproximado e canal pelo qual a ameaça foi recebida. O denunciante anexou evidências para apoiar a análise da equipe.",
    category: cat,
    severity: sev,
    status: st,
    reporterId: u.id,
    reporterName: u.name,
    reporterRole: u.role,
    link: i % 2 === 0 ? "https://www.acesso-institucional-falso.example/login" : undefined,
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
  { id: "n1", title: "Reporte validado", body: "Seu reporte sobre link suspeito foi validado (+150 pontos).", createdAt: daysAgo(0), kind: "success" },
  { id: "n2", title: "Alerta institucional", body: "Detectada nova campanha de phishing contra contas .edu. Atenção redobrada.", createdAt: daysAgo(1), kind: "warning" },
  { id: "n3", title: "Nova trilha disponível", body: "‘Engenharia social no ambiente acadêmico’ acaba de ser publicada.", createdAt: daysAgo(2), kind: "info" },
  { id: "n4", title: "Incidente crítico próximo", body: "Um incidente crítico foi reportado no seu setor.", createdAt: daysAgo(3), kind: "critical" },
];

export const trainings: Training[] = [
  {
    id: "t-phishing", title: "Phishing: identifique antes de clicar", description: "Aprenda a reconhecer e-mails, sites e mensagens fraudulentas.",
    durationMin: 12, category: "Conscientização", progress: 80,
    lessons: [
      { title: "O que é phishing", body: "Phishing é a tentativa de obter informações sensíveis fingindo ser uma fonte confiável. No ambiente acadêmico, costuma se passar por reitoria, biblioteca, sistemas internos e bancos." },
      { title: "Sinais clássicos", body: "Senso de urgência, erros sutis no remetente, domínios trocados, anexos inesperados e pedidos de senha são sinais clássicos." },
      { title: "Como agir", body: "Não clique, não responda, encaminhe o caso via ELIOT e, se possível, anexe o cabeçalho da mensagem." },
    ],
  },
  {
    id: "t-links", title: "Links suspeitos no dia a dia", description: "Como inspecionar URLs antes de abrir.",
    durationMin: 8, category: "Capacitação", progress: 40,
    lessons: [
      { title: "Anatomia de uma URL", body: "Aprenda a ler o domínio principal, subdomínios e parâmetros de uma URL." },
      { title: "Encurtadores", body: "Use pré-visualizadores antes de abrir links encurtados recebidos por canais não verificados." },
    ],
  },
  {
    id: "t-senhas", title: "Senhas fortes e gerenciadores", description: "Construa senhas únicas e armazene-as com segurança.",
    durationMin: 10, category: "Boas práticas", progress: 100,
    lessons: [
      { title: "Frases-senha", body: "Combine quatro palavras incomuns para criar uma senha forte e memorável." },
      { title: "Gerenciadores", body: "Use um gerenciador para que cada serviço tenha uma senha única." },
    ],
  },
  {
    id: "t-engsocial", title: "Engenharia social no ambiente acadêmico", description: "Pressões emocionais, autoridade e urgência.",
    durationMin: 15, category: "Conscientização", progress: 0,
    lessons: [
      { title: "Gatilhos comuns", body: "Autoridade, urgência, reciprocidade e prova social são os gatilhos mais explorados." },
      { title: "Como responder", body: "Desacelere, confirme por outro canal e relate via ELIOT." },
    ],
  },
  {
    id: "t-anexos", title: "Cuidados com anexos", description: "Tipos de arquivo, macros e isolamento.",
    durationMin: 7, category: "Capacitação", progress: 20,
    lessons: [{ title: "Extensões de risco", body: "Atenção a .exe, .scr, .js, .vbs, .iso e documentos com macros." }],
  },
  {
    id: "t-reportar", title: "Como reportar corretamente", description: "Boas práticas para registrar incidentes no ELIOT.",
    durationMin: 6, category: "Capacitação", progress: 60,
    lessons: [{ title: "O que descrever", body: "Inclua data, hora, canal, conteúdo e prints. Quanto melhor o reporte, mais rápida a resposta." }],
  },
];

export const monthlyVolume = [
  { month: "Jan", value: 62 }, { month: "Fev", value: 74 }, { month: "Mar", value: 81 },
  { month: "Abr", value: 95 }, { month: "Mai", value: 108 }, { month: "Jun", value: 124 },
  { month: "Jul", value: 96 }, { month: "Ago", value: 88 }, { month: "Set", value: 102 },
  { month: "Out", value: 117 }, { month: "Nov", value: 109 }, { month: "Dez", value: 132 },
];

export const typeDistribution = [
  { name: "Phishing", value: 42 },
  { name: "Link suspeito", value: 28 },
  { name: "Engenharia social", value: 12 },
  { name: "Malware", value: 9 },
  { name: "Outros", value: 9 },
];

export const adminKpis = {
  pending: 14,
  completed: 722,
  rejected: 86,
  pointsDistributed: 28_000,
  light: 134, moderate: 590, critical: 98, resolutionRate: 96,
};
