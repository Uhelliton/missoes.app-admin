import { ref, computed } from 'vue';
import type { 
  DashboardData, 
  DashboardFilters,
  DashboardStats,
  Compromisso,
  Contribuicao,
  Membro,
  Aviso,
  EstatisticaSemanal
} from '../types/dashboard.types';

/**
 * Composable para gerenciar dados do Dashboard
 */
export function useDashboard() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  // Estados
  const stats = ref<DashboardStats>({
    proximosEventos: {
      total: 3,
      label: 'nos próximos dias',
      icon: 'ki-filled ki-calendar',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    membrosAtivos: {
      total: 542,
      incremento: 20,
      label: 'esta semana',
      icon: 'ki-filled ki-profile-user',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    dizimosOfertas: {
      total: 4750,
      percentual: 15,
      label: 'esta semana',
      icon: 'ki-filled ki-dollar',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    celulasAtivas: {
      total: 42,
      incremento: 2,
      label: 'esta semana',
      icon: 'ki-filled ki-home-2',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500'
    }
  });
  
  const compromissos = ref<Compromisso[]>([]);
  const contribuicoes = ref<Contribuicao[]>([]);
  const membros = ref<Membro[]>([]);
  const avisos = ref<Aviso[]>([]);
  const estatisticas = ref<EstatisticaSemanal>({
    total: 9850,
    percentual: 18,
    label: 'comparado à semana anterior',
    novosMembros: 48,
    crescimentoMembros: 54,
    outroIndicador: 33
  });
  
  // Filtros
  const filters = ref<DashboardFilters>({
    periodo: 'semana'
  });
  
  /**
   * Buscar todos os dados do dashboard
   */
  const fetchDashboardData = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // TODO: Implementar chamadas reais à API
      // const response = await api.get('/dashboard', { params: filters.value });
      
      // Mock de dados
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular dados da API
      compromissos.value = [
        {
          id: 1,
          titulo: 'Culto de Domingo',
          data: 'Dom, 28 Abr',
          hora: '10:00',
          local: 'Igreja Sede',
          icon: 'ki-filled ki-calendar',
          tipo: 'culto'
        },
        {
          id: 2,
          titulo: 'Reunião da Liderança',
          data: 'Qua, 01 Mai',
          hora: '19:30',
          local: 'Sala de Reuniões',
          icon: 'ki-filled ki-people',
          tipo: 'reuniao'
        }
      ];
      
      contribuicoes.value = [
        {
          id: 1,
          nome: 'Jéssica Pereira',
          valor: 150.00,
          horario: 'hoje às 09:15',
          avatar: '/media/avatars/300-1.png',
          percentual: 84,
          badge: '+4%',
          online: true,
          tipo: 'dizimo'
        }
      ];
      
    } catch (err) {
      error.value = 'Erro ao carregar dados do dashboard';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  /**
   * Atualizar filtros e recarregar dados
   */
  const updateFilters = async (newFilters: Partial<DashboardFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
    await fetchDashboardData();
  };
  
  /**
   * Formatar moeda em BRL
   */
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  /**
   * Formatar número
   */
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };
  
  // Computed
  const totalContribuicoesHoje = computed(() => {
    return contribuicoes.value
      .filter(c => c.horario.includes('hoje'))
      .reduce((sum, c) => sum + c.valor, 0);
  });
  
  const compromissosProximos = computed(() => {
    // Ordenar por data (mock - implementar ordenação real)
    return compromissos.value.slice(0, 5);
  });
  
  return {
    // Estado
    loading,
    error,
    stats,
    compromissos,
    contribuicoes,
    membros,
    avisos,
    estatisticas,
    filters,
    
    // Computed
    totalContribuicoesHoje,
    compromissosProximos,
    
    // Métodos
    fetchDashboardData,
    updateFilters,
    formatCurrency,
    formatNumber
  };
}
