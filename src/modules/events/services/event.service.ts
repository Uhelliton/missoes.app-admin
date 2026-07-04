/**
 * Service de Eventos (Events)
 * Dados mockados para demonstração
 */

export interface Event {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO 8601 format
  end?: string; // ISO 8601 format
  allDay?: boolean;
  location?: string;
  type: 'culto' | 'reuniao' | 'evento' | 'conferencia' | 'treinamento' | 'outros';
  status: 'confirmado' | 'pendente' | 'cancelado';
  color?: string;
  responsavel?: {
    id: string;
    nome: string;
  };
  participantes?: number;
  observacoes?: string;
  dataCadastro: string;
}

// Cores por tipo de evento
export const EventColors = {
  culto: '#3b82f6', // blue
  reuniao: '#10b981', // green
  evento: '#f59e0b', // amber
  conferencia: '#8b5cf6', // violet
  treinamento: '#06b6d4', // cyan
  outros: '#6b7280', // gray
};

// Dados mockados
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Culto Domingo - Manhã',
    description: 'Culto dominical matutino com pregação e louvor',
    start: '2026-03-16T09:00:00',
    end: '2026-03-16T11:00:00',
    allDay: false,
    location: 'Templo Principal',
    type: 'culto',
    status: 'confirmado',
    color: EventColors.culto,
    responsavel: {
      id: '1',
      nome: 'Pastor João Silva',
    },
    participantes: 150,
    dataCadastro: '2026-03-01',
  },
  {
    id: '2',
    title: 'Reunião de Líderes',
    description: 'Reunião mensal com líderes de células e ministérios',
    start: '2026-03-18T19:00:00',
    end: '2026-03-18T21:00:00',
    allDay: false,
    location: 'Sala de Reuniões',
    type: 'reuniao',
    status: 'confirmado',
    color: EventColors.reuniao,
    responsavel: {
      id: '2',
      nome: 'Pastor Marcos Costa',
    },
    participantes: 25,
    observacoes: 'Trazer relatórios mensais',
    dataCadastro: '2026-03-05',
  },
  {
    id: '3',
    title: 'Conferência Anual 2026',
    description: 'Conferência anual com palestrantes nacionais',
    start: '2026-03-22T00:00:00',
    end: '2026-03-24T00:00:00',
    allDay: true,
    location: 'Centro de Convenções',
    type: 'conferencia',
    status: 'confirmado',
    color: EventColors.conferencia,
    responsavel: {
      id: '1',
      nome: 'Pastor João Silva',
    },
    participantes: 500,
    observacoes: 'Inscrições abertas até 20/03',
    dataCadastro: '2026-01-15',
  },
  {
    id: '4',
    title: 'Culto Quarta-feira',
    description: 'Culto de oração e ensinamento',
    start: '2026-03-19T19:30:00',
    end: '2026-03-19T21:00:00',
    allDay: false,
    location: 'Templo Principal',
    type: 'culto',
    status: 'confirmado',
    color: EventColors.culto,
    responsavel: {
      id: '3',
      nome: 'Pastora Maria Santos',
    },
    participantes: 80,
    dataCadastro: '2026-03-01',
  },
  {
    id: '5',
    title: 'Treinamento de Novos Membros',
    description: 'Curso de integração para novos membros',
    start: '2026-03-20T18:00:00',
    end: '2026-03-20T20:00:00',
    allDay: false,
    location: 'Sala 3',
    type: 'treinamento',
    status: 'confirmado',
    color: EventColors.treinamento,
    responsavel: {
      id: '4',
      nome: 'Líder Ana Paula',
    },
    participantes: 15,
    dataCadastro: '2026-03-10',
  },
  {
    id: '6',
    title: 'Evento Jovens - Noite de Louvor',
    description: 'Noite especial de louvor e adoração para jovens',
    start: '2026-03-21T20:00:00',
    end: '2026-03-21T23:00:00',
    allDay: false,
    location: 'Auditório',
    type: 'evento',
    status: 'confirmado',
    color: EventColors.evento,
    responsavel: {
      id: '5',
      nome: 'Líder Carlos Mendes',
    },
    participantes: 120,
    observacoes: 'Aberto para convidados',
    dataCadastro: '2026-03-08',
  },
  {
    id: '7',
    title: 'Reunião Administrativa',
    description: 'Reunião do conselho administrativo',
    start: '2026-03-25T14:00:00',
    end: '2026-03-25T17:00:00',
    allDay: false,
    location: 'Sala de Reuniões',
    type: 'reuniao',
    status: 'pendente',
    color: EventColors.reuniao,
    responsavel: {
      id: '6',
      nome: 'Conselho Administrativo',
    },
    participantes: 10,
    dataCadastro: '2026-03-12',
  },
  {
    id: '8',
    title: 'Culto Domingo - Noite',
    description: 'Culto dominical noturno',
    start: '2026-03-16T18:00:00',
    end: '2026-03-16T20:00:00',
    allDay: false,
    location: 'Templo Principal',
    type: 'culto',
    status: 'confirmado',
    color: EventColors.culto,
    responsavel: {
      id: '1',
      nome: 'Pastor João Silva',
    },
    participantes: 200,
    dataCadastro: '2026-03-01',
  },
];

export const EventService = () => {
  /**
   * Buscar todos os eventos
   */
  const getAll = async (filters?: {
    start?: string;
    end?: string;
    type?: string;
    status?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let filteredEvents = [...mockEvents];
    
    // Aplicar filtros
    if (filters?.type) {
      filteredEvents = filteredEvents.filter(e => e.type === filters.type);
    }
    
    if (filters?.status) {
      filteredEvents = filteredEvents.filter(e => e.status === filters.status);
    }
    
    if (filters?.start && filters?.end) {
      filteredEvents = filteredEvents.filter(e => {
        return e.start >= filters.start! && e.start <= filters.end!;
      });
    }
    
    return {
      data: {
        items: filteredEvents,
        meta: {
          totalItems: filteredEvents.length,
        },
      },
    };
  };

  /**
   * Buscar evento por ID
   */
  const getById = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const event = mockEvents.find((e) => e.id === id);
    
    if (!event) {
      throw new Error('Evento não encontrado');
    }
    
    return {
      data: event,
    };
  };

  /**
   * Criar novo evento
   */
  const create = async (event: Omit<Event, 'id' | 'dataCadastro'>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newEvent: Event = {
      ...event,
      id: String(mockEvents.length + 1),
      color: event.color || EventColors[event.type],
      dataCadastro: new Date().toISOString().split('T')[0],
    };
    
    mockEvents.push(newEvent);
    
    return {
      data: newEvent,
      message: 'Evento cadastrado com sucesso!',
    };
  };

  /**
   * Atualizar evento
   */
  const update = async (id: string, event: Partial<Event>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = mockEvents.findIndex((e) => e.id === id);
    
    if (index === -1) {
      throw new Error('Evento não encontrado');
    }
    
    mockEvents[index] = {
      ...mockEvents[index],
      ...event,
    };
    
    return {
      data: mockEvents[index],
      message: 'Evento atualizado com sucesso!',
    };
  };

  /**
   * Atualizar datas do evento (drag & drop / resize)
   */
  const updateDates = async (id: string, start: string, end?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const index = mockEvents.findIndex((e) => e.id === id);
    
    if (index === -1) {
      throw new Error('Evento não encontrado');
    }
    
    mockEvents[index] = {
      ...mockEvents[index],
      start,
      end: end || mockEvents[index].end,
    };
    
    return {
      data: mockEvents[index],
      message: 'Datas atualizadas com sucesso!',
    };
  };

  /**
   * Cancelar evento
   */
  const cancel = async (id: string, motivo?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockEvents.findIndex((e) => e.id === id);
    
    if (index === -1) {
      throw new Error('Evento não encontrado');
    }
    
    mockEvents[index] = {
      ...mockEvents[index],
      status: 'cancelado',
      observacoes: motivo ? `Cancelado: ${motivo}` : mockEvents[index].observacoes,
    };
    
    return {
      data: mockEvents[index],
      message: 'Evento cancelado com sucesso!',
    };
  };

  /**
   * Deletar evento
   */
  const remove = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockEvents.findIndex((e) => e.id === id);
    
    if (index === -1) {
      throw new Error('Evento não encontrado');
    }
    
    mockEvents.splice(index, 1);
    
    return {
      message: 'Evento removido com sucesso!',
    };
  };

  return {
    getAll,
    getById,
    create,
    update,
    updateDates,
    cancel,
    remove,
  };
};
