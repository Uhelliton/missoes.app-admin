/**
 * Service de Contas a Pagar (Payables)
 * Dados mockados para demonstração
 */

export interface Payable {
  id: string;
  descricao: string;
  fornecedor: {
    id: string;
    nome: string;
    cnpj: string;
  };
  categoria: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'cancelado';
  formaPagamento?: 'dinheiro' | 'pix' | 'boleto' | 'transferencia' | 'cartao_credito' | 'cartao_debito';
  numeroParcela?: string; // Ex: "1/3"
  observacoes?: string;
  anexos?: string[];
  contaBancaria?: string;
  centroCusto?: string;
  projeto?: string;
  dataCadastro: string;
}

/** Dados mockados (reutilizáveis no dashboard e na demo). */
export const mockPayables: Payable[] = [
  {
    id: '1',
    descricao: 'Fornecimento de equipamentos de TI',
    fornecedor: {
      id: '1',
      nome: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
    },
    categoria: 'Equipamentos',
    valor: 15000.00,
    dataVencimento: '2026-03-20',
    status: 'pendente',
    formaPagamento: 'boleto',
    numeroParcela: '1/3',
    contaBancaria: 'Banco do Brasil - CC 12345-6',
    centroCusto: 'TI',
    dataCadastro: '2026-02-15',
  },
  {
    id: '2',
    descricao: 'Materiais de construção para reforma',
    fornecedor: {
      id: '2',
      nome: 'Construção XYZ',
      cnpj: '98.765.432/0001-10',
    },
    categoria: 'Infraestrutura',
    valor: 8500.50,
    dataVencimento: '2026-03-15',
    dataPagamento: '2026-03-14',
    status: 'pago',
    formaPagamento: 'transferencia',
    contaBancaria: 'Caixa Econômica - CC 98765-4',
    centroCusto: 'Infraestrutura',
    observacoes: 'Pago com desconto de 5%',
    dataCadastro: '2026-02-20',
  },
  {
    id: '3',
    descricao: 'Fornecimento de alimentos para evento',
    fornecedor: {
      id: '3',
      nome: 'Frescos Brasil',
      cnpj: '11.222.333/0001-44',
    },
    categoria: 'Eventos',
    valor: 3200.00,
    dataVencimento: '2026-03-10',
    status: 'atrasado',
    formaPagamento: 'pix',
    projeto: 'Evento Anual 2026',
    observacoes: 'Aguardando aprovação do gestor',
    dataCadastro: '2026-02-25',
  },
  {
    id: '4',
    descricao: 'Serviço de transporte de mercadorias',
    fornecedor: {
      id: '4',
      nome: 'Rápido Log',
      cnpj: '55.666.777/0001-88',
    },
    categoria: 'Logística',
    valor: 1250.00,
    dataVencimento: '2026-03-25',
    status: 'pendente',
    formaPagamento: 'transferencia',
    numeroParcela: '2/2',
    contaBancaria: 'Bradesco - CC 54321-0',
    centroCusto: 'Logística',
    dataCadastro: '2026-03-01',
  },
  {
    id: '5',
    descricao: 'Manutenção de equipamentos industriais',
    fornecedor: {
      id: '5',
      nome: 'EQP Norte',
      cnpj: '22.333.444/0001-55',
    },
    categoria: 'Manutenção',
    valor: 5800.00,
    dataVencimento: '2026-04-05',
    status: 'pendente',
    formaPagamento: 'boleto',
    contaBancaria: 'Itaú - CC 11223-3',
    centroCusto: 'Produção',
    dataCadastro: '2026-03-05',
  },
  {
    id: '6',
    descricao: 'Aluguel de escritório - Março/2026',
    fornecedor: {
      id: '6',
      nome: 'Imobiliária Prime',
      cnpj: '33.444.555/0001-66',
    },
    categoria: 'Aluguel',
    valor: 4500.00,
    dataVencimento: '2026-03-05',
    dataPagamento: '2026-03-05',
    status: 'pago',
    formaPagamento: 'transferencia',
    contaBancaria: 'Banco do Brasil - CC 12345-6',
    centroCusto: 'Administrativo',
    dataCadastro: '2026-02-01',
  },
  {
    id: '7',
    descricao: 'Licença de software anual',
    fornecedor: {
      id: '1',
      nome: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
    },
    categoria: 'Software',
    valor: 12000.00,
    dataVencimento: '2026-03-30',
    status: 'pendente',
    formaPagamento: 'cartao_credito',
    numeroParcela: '1/12',
    centroCusto: 'TI',
    dataCadastro: '2026-03-01',
  },
];

export const PayableService = () => {
  /**
   * Buscar todas as contas a pagar
   */
  const getAll = async (filters?: {
    status?: string;
    dataInicio?: string;
    dataFim?: string;
    fornecedor?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let filteredPayables = [...mockPayables];
    
    // Aplicar filtros
    if (filters?.status) {
      filteredPayables = filteredPayables.filter(p => p.status === filters.status);
    }
    
    if (filters?.fornecedor) {
      filteredPayables = filteredPayables.filter(p => 
        p.fornecedor.nome.toLowerCase().includes(filters.fornecedor!.toLowerCase())
      );
    }
    
    // Calcular totalizadores
    const totais = {
      pendente: mockPayables.filter(p => p.status === 'pendente').reduce((sum, p) => sum + p.valor, 0),
      pago: mockPayables.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.valor, 0),
      atrasado: mockPayables.filter(p => p.status === 'atrasado').reduce((sum, p) => sum + p.valor, 0),
      total: mockPayables.reduce((sum, p) => sum + p.valor, 0),
    };
    
    return {
      data: {
        items: filteredPayables,
        totais,
        meta: {
          currentPage: 1,
          perPage: 10,
          totalItems: filteredPayables.length,
          totalPages: Math.ceil(filteredPayables.length / 10),
        },
      },
    };
  };

  /**
   * Buscar conta a pagar por ID
   */
  const getById = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const payable = mockPayables.find((p) => p.id === id);
    
    if (!payable) {
      throw new Error('Conta a pagar não encontrada');
    }
    
    return {
      data: payable,
    };
  };

  /**
   * Criar nova conta a pagar
   */
  const create = async (payable: Omit<Payable, 'id' | 'dataCadastro'>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newPayable: Payable = {
      ...payable,
      id: String(mockPayables.length + 1),
      dataCadastro: new Date().toISOString().split('T')[0],
    };
    
    // Verificar se está atrasado
    const today = new Date().toISOString().split('T')[0];
    if (newPayable.dataVencimento < today && newPayable.status === 'pendente') {
      newPayable.status = 'atrasado';
    }
    
    mockPayables.push(newPayable);
    
    return {
      data: newPayable,
      message: 'Conta a pagar cadastrada com sucesso!',
    };
  };

  /**
   * Atualizar conta a pagar
   */
  const update = async (id: string, payable: Partial<Payable>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = mockPayables.findIndex((p) => p.id === id);
    
    if (index === -1) {
      throw new Error('Conta a pagar não encontrada');
    }
    
    mockPayables[index] = {
      ...mockPayables[index],
      ...payable,
    };
    
    return {
      data: mockPayables[index],
      message: 'Conta a pagar atualizada com sucesso!',
    };
  };

  /**
   * Efetuar pagamento
   */
  const pay = async (id: string, data: {
    dataPagamento: string;
    formaPagamento: string;
    valorPago?: number;
    observacoes?: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = mockPayables.findIndex((p) => p.id === id);
    
    if (index === -1) {
      throw new Error('Conta a pagar não encontrada');
    }
    
    mockPayables[index] = {
      ...mockPayables[index],
      status: 'pago',
      dataPagamento: data.dataPagamento,
      formaPagamento: data.formaPagamento as any,
      observacoes: data.observacoes || mockPayables[index].observacoes,
    };
    
    return {
      data: mockPayables[index],
      message: 'Pagamento registrado com sucesso!',
    };
  };

  /**
   * Cancelar conta a pagar
   */
  const cancel = async (id: string, motivo?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockPayables.findIndex((p) => p.id === id);
    
    if (index === -1) {
      throw new Error('Conta a pagar não encontrada');
    }
    
    mockPayables[index] = {
      ...mockPayables[index],
      status: 'cancelado',
      observacoes: motivo ? `Cancelado: ${motivo}` : mockPayables[index].observacoes,
    };
    
    return {
      data: mockPayables[index],
      message: 'Conta cancelada com sucesso!',
    };
  };

  /**
   * Deletar conta a pagar
   */
  const remove = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockPayables.findIndex((p) => p.id === id);
    
    if (index === -1) {
      throw new Error('Conta a pagar não encontrada');
    }
    
    mockPayables.splice(index, 1);
    
    return {
      message: 'Conta a pagar removida com sucesso!',
    };
  };

  return {
    getAll,
    getById,
    create,
    update,
    pay,
    cancel,
    remove,
  };
};
