/**
 * Tipos do Dashboard - Genesiis Admin
 */

export interface StatItem {
  total: number;
  label: string;
  icon: string;
  bgColor: string;
  iconColor: string;
  incremento?: number;
  percentual?: number;
}

export interface DashboardStats {
  proximosEventos: StatItem;
  membrosAtivos: StatItem;
  dizimosOfertas: StatItem;
  celulasAtivas: StatItem;
}

export interface Compromisso {
  id: number;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  icon: string;
  tipo?: 'culto' | 'reuniao' | 'evento' | 'oracao';
}

export interface Contribuicao {
  id: number;
  nome: string;
  valor: number;
  horario: string;
  avatar: string;
  percentual: number;
  badge: string;
  online: boolean;
  tipo?: 'dizimo' | 'oferta' | 'doacao';
}

export interface Membro {
  id: number;
  nome: string;
  horario: string;
  avatar: string;
  email?: string;
  telefone?: string;
  status?: 'ativo' | 'inativo' | 'visitante';
}

export interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  tipo?: 'info' | 'alerta' | 'urgente';
  dataExpiracao?: string;
}

export interface EstatisticaSemanal {
  total: number;
  percentual: number;
  label: string;
  novosMembros: number;
  crescimentoMembros: number;
  outroIndicador: number;
  dadosGrafico?: {
    labels: string[];
    valores: number[];
  };
}

export interface DashboardData {
  stats: DashboardStats;
  compromissos: Compromisso[];
  contribuicoes: Contribuicao[];
  membros: Membro[];
  avisos: Aviso[];
  estatisticas: EstatisticaSemanal;
}

// Tipos para API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Tipos para filtros
export interface DashboardFilters {
  periodo?: 'semana' | 'mes' | 'ano';
  dataInicio?: string;
  dataFim?: string;
}
