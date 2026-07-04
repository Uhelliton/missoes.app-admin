/**
 * Service de Contas a Receber (Receivables)
 * Dados mockados para demonstração
 */

export interface Receivable {
  id: string;
  descricao: string;
  cliente: {
    id: string;
    nome: string;
    cpfCnpj: string;
  };
  categoria: string;
  valor: number;
  dataVencimento: string;
  dataRecebimento?: string;
  status: 'pendente' | 'recebido' | 'atrasado' | 'cancelado';
  formaRecebimento?: 'dinheiro' | 'pix' | 'boleto' | 'transferencia' | 'cartao_credito' | 'cartao_debito';
  numeroParcela?: string; // Ex: "1/3"
  observacoes?: string;
  anexos?: string[];
  contaBancaria?: string;
  centroCusto?: string;
  projeto?: string;
  dataCadastro: string;
}

// Dados mockados
const mockReceivables: Receivable[] = [
  {
    id: '1',
    descricao: 'Mensalidade - Janeiro/2026',
    cliente: {
      id: '1',
      nome: 'Maria Silva Santos',
      cpfCnpj: '123.456.789-00',
    },
    categoria: 'Mensalidade',
    valor: 250.00,
    dataVencimento: '2026-01-10',
    dataRecebimento: '2026-01-09',
    status: 'recebido',
    formaRecebimento: 'pix',
    contaBancaria: 'Banco do Brasil - CC 12345-6',
    centroCusto: 'Receitas',
    dataCadastro: '2026-01-01',
  },
  {
    id: '2',
    descricao: 'Mensalidade - Fevereiro/2026',
    cliente: {
      id: '1',
      nome: 'Maria Silva Santos',
      cpfCnpj: '123.456.789-00',
    },
    categoria: 'Mensalidade',
    valor: 250.00,
    dataVencimento: '2026-02-10',
    dataRecebimento: '2026-02-10',
    status: 'recebido',
    formaRecebimento: 'transferencia',
    contaBancaria: 'Banco do Brasil - CC 12345-6',
    centroCusto: 'Receitas',
    dataCadastro: '2026-02-01',
  },
  {
    id: '3',
    descricao: 'Mensalidade - Março/2026',
    cliente: {
      id: '1',
      nome: 'Maria Silva Santos',
      cpfCnpj: '123.456.789-00',
    },
    categoria: 'Mensalidade',
    valor: 250.00,
    dataVencimento: '2026-03-10',
    status: 'pendente',
    formaRecebimento: 'pix',
    contaBancaria: 'Banco do Brasil - CC 12345-6',
    centroCusto: 'Receitas',
    dataCadastro: '2026-03-01',
  },
  {
    id: '4',
    descricao: 'Doação - Evento Anual',
    cliente: {
      id: '2',
      nome: 'João Pedro Oliveira',
      cpfCnpj: '987.654.321-00',
    },
    categoria: 'Doação',
    valor: 1000.00,
    dataVencimento: '2026-03-15',
    status: 'pendente',
    projeto: 'Evento Anual 2026',
    observacoes: 'Aguardando confirmação',
    dataCadastro: '2026-03-05',
  },
  {
    id: '5',
    descricao: 'Mensalidade - Março/2026',
    cliente: {
      id: '3',
      nome: 'Carlos Alberto Costa',
      cpfCnpj: '111.222.333-44',
    },
    categoria: 'Mensalidade',
    valor: 250.00,
    dataVencimento: '2026-03-05',
    status: 'atrasado',
    observacoes: 'Cliente solicitou prorrogação',
    dataCadastro: '2026-03-01',
  },
  {
    id: '6',
    descricao: 'Venda de produtos - Bazar',
    cliente: {
      id: '4',
      nome: 'Ana Paula Ferreira',
      cpfCnpj: '555.666.777-88',
    },
    categoria: 'Vendas',
    valor: 350.00,
    dataVencimento: '2026-03-20',
    status: 'pendente',
    formaRecebimento: 'dinheiro',
    projeto: 'Bazar Beneficente',
    dataCadastro: '2026-03-10',
  },
  {
    id: '7',
    descricao: 'Mensalidade - Março/2026',
    cliente: {
      id: '5',
      nome: 'Roberto Silva Mendes',
      cpfCnpj: '444.555.666-77',
    },
    categoria: 'Mensalidade',
    valor: 250.00,
    dataVencimento: '2026-03-10',
    dataRecebimento: '2026-03-11',
    status: 'recebido',
    formaRecebimento: 'cartao_credito',
    numeroParcela: '1/1',
    contaBancaria: 'Caixa Econômica - CC 98765-4',
    centroCusto: 'Receitas',
    dataCadastro: '2026-03-01',
  },
  {
    id: '8',
    descricao: 'Aluguel de espaço - Evento',
    cliente: {
      id: '6',
      nome: 'Empresa ABC Ltda',
      cpfCnpj: '12.345.678/0001-90',
    },
    categoria: 'Aluguel',
    valor: 2500.00,
    dataVencimento: '2026-03-25',
    status: 'pendente',
    formaRecebimento: 'boleto',
    contaBancaria: 'Bradesco - CC 54321-0',
    centroCusto: 'Receitas Extras',
    dataCadastro: '2026-03-08',
  },
  {
    id: '9',
    descricao: 'Curso de capacitação',
    cliente: {
      id: '7',
      nome: 'Fernanda Lima Santos',
      cpfCnpj: '222.333.444-55',
    },
    categoria: 'Cursos',
    valor: 450.00,
    dataVencimento: '2026-03-30',
    status: 'pendente',
    formaRecebimento: 'pix',
    numeroParcela: '1/3',
    observacoes: 'Primeira parcela de 3',
    dataCadastro: '2026-03-12',
  },
];

export const ReceivableService = () => {
  /**
   * Buscar todas as contas a receber
   */
  const getAll = async (filters?: {
    status?: string;
    dataInicio?: string;
    dataFim?: string;
    cliente?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let filteredReceivables = [...mockReceivables];
    
    // Aplicar filtros
    if (filters?.status) {
      filteredReceivables = filteredReceivables.filter(r => r.status === filters.status);
    }
    
    if (filters?.cliente) {
      filteredReceivables = filteredReceivables.filter(r => 
        r.cliente.nome.toLowerCase().includes(filters.cliente!.toLowerCase())
      );
    }
    
    // Calcular totalizadores
    const totais = {
      pendente: mockReceivables.filter(r => r.status === 'pendente').reduce((sum, r) => sum + r.valor, 0),
      recebido: mockReceivables.filter(r => r.status === 'recebido').reduce((sum, r) => sum + r.valor, 0),
      atrasado: mockReceivables.filter(r => r.status === 'atrasado').reduce((sum, r) => sum + r.valor, 0),
      total: mockReceivables.reduce((sum, r) => sum + r.valor, 0),
    };
    
    return {
      data: {
        items: filteredReceivables,
        totais,
        meta: {
          currentPage: 1,
          perPage: 10,
          totalItems: filteredReceivables.length,
          totalPages: Math.ceil(filteredReceivables.length / 10),
        },
      },
    };
  };

  /**
   * Buscar conta a receber por ID
   */
  const getById = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const receivable = mockReceivables.find((r) => r.id === id);
    
    if (!receivable) {
      throw new Error('Conta a receber não encontrada');
    }
    
    return {
      data: receivable,
    };
  };

  /**
   * Criar nova conta a receber
   */
  const create = async (receivable: Omit<Receivable, 'id' | 'dataCadastro'>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newReceivable: Receivable = {
      ...receivable,
      id: String(mockReceivables.length + 1),
      dataCadastro: new Date().toISOString().split('T')[0],
    };
    
    // Verificar se está atrasado
    const today = new Date().toISOString().split('T')[0];
    if (newReceivable.dataVencimento < today && newReceivable.status === 'pendente') {
      newReceivable.status = 'atrasado';
    }
    
    mockReceivables.push(newReceivable);
    
    return {
      data: newReceivable,
      message: 'Conta a receber cadastrada com sucesso!',
    };
  };

  /**
   * Atualizar conta a receber
   */
  const update = async (id: string, receivable: Partial<Receivable>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = mockReceivables.findIndex((r) => r.id === id);
    
    if (index === -1) {
      throw new Error('Conta a receber não encontrada');
    }
    
    mockReceivables[index] = {
      ...mockReceivables[index],
      ...receivable,
    };
    
    return {
      data: mockReceivables[index],
      message: 'Conta a receber atualizada com sucesso!',
    };
  };

  /**
   * Registrar recebimento
   */
  const receive = async (id: string, data: {
    dataRecebimento: string;
    formaRecebimento: string;
    valorRecebido?: number;
    observacoes?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = mockReceivables.findIndex((r) => r.id === id);
    
    if (index === -1) {
      throw new Error('Conta a receber não encontrada');
    }
    
    mockReceivables[index] = {
      ...mockReceivables[index],
      status: 'recebido',
      dataRecebimento: data.dataRecebimento,
      formaRecebimento: data.formaRecebimento as any,
      observacoes: data.observacoes || mockReceivables[index].observacoes,
    };
    
    return {
      data: mockReceivables[index],
      message: 'Recebimento registrado com sucesso!',
    };
  };

  /**
   * Cancelar conta a receber
   */
  const cancel = async (id: string, motivo?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockReceivables.findIndex((r) => r.id === id);
    
    if (index === -1) {
      throw new Error('Conta a receber não encontrada');
    }
    
    mockReceivables[index] = {
      ...mockReceivables[index],
      status: 'cancelado',
      observacoes: motivo ? `Cancelado: ${motivo}` : mockReceivables[index].observacoes,
    };
    
    return {
      data: mockReceivables[index],
      message: 'Conta cancelada com sucesso!',
    };
  };

  /**
   * Deletar conta a receber
   */
  const remove = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockReceivables.findIndex((r) => r.id === id);
    
    if (index === -1) {
      throw new Error('Conta a receber não encontrada');
    }
    
    mockReceivables.splice(index, 1);
    
    return {
      message: 'Conta a receber removida com sucesso!',
    };
  };

  return {
    getAll,
    getById,
    create,
    update,
    receive,
    cancel,
    remove,
  };
};
