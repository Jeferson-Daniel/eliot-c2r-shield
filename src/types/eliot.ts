export type IncidentCategory =
  | "Phishing"
  | "Malware"
  | "Link suspeito"
  | "Engenharia social"
  | "Vazamento de dados"
  | "Acesso indevido"
  | "Anexo suspeito"
  | "Outro";

export type IncidentSeverity = "Baixa" | "Média" | "Alta" | "Crítica";

export type IncidentStatus =
  | "Pendente"
  | "Em análise"
  | "Validado"
  | "Rejeitado"
  | "Concluído";

export interface Incident {
  id: string;
  title: string;
  description: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reporterId: string;
  reporterName: string;
  reporterRole: string;
  link?: string;
  createdAt: string; // ISO
  points?: number;
  attachments?: { name: string; size: number }[];
}

export interface UserBadge {
  slug: string;
  name: string;
  description: string;
  earnedAt?: string;
}

export interface AppUser {
  id: string;
  name: string;
  role: string;
  avatarSeed: string;
  xp: number;
  badges: string[]; // slugs
  department?: string;
}

export interface Level {
  slug: string;
  name: string;
  minXp: number;
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read?: boolean;
  kind: "info" | "success" | "warning" | "critical";
}

export interface Training {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  category: string;
  progress: number; // 0-100
  lessons: { title: string; body: string }[];
}
