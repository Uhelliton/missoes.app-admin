/**
 * Service de Fornecedores (Suppliers)
 * Dados mockados para demonstração
 */

export interface Supplier {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  email: string;
  telefone: string;
  celular?: string;
  site?: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  contato: {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
  };
  categorias: string[];
  status: 'ativo' | 'inativo' | 'bloqueado';
  observacoes?: string;
  dataCadastro: string;
}

// Dados mockados
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    razaoSocial: 'Tech Solutions Ltda',
    nomeFantasia: 'Tech Solutions',
    cnpj: '12.345.678/0001-90',
    email: 'contato@techsolutions.com.br',
    telefone: '(11) 3456-7890',
    celular: '(11) 98765-4321',
    site: 'www.techsolutions.com.br',
    endereco: {
      cep: '01310-100',
      logradouro: 'Av. Paulista',
      numero: '1000',
      complemento: 'Sala 501',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    contato: {
      nome: 'João Silva',
      cargo: 'Gerente Comercial',
      email: 'joao@techsolutions.com.br',
      telefone: '(11) 98765-4321',
    },
    categorias: ['Tecnologia', 'Software'],
    status: 'ativo',
    observacoes: 'Fornecedor preferencial de soluções tecnológicas',
    dataCadastro: '2024-01-15',
  },
  {
    id: '2',
    razaoSocial: 'Materiais de Construção XYZ S.A.',
    nomeFantasia: 'Construção XYZ',
    cnpj: '98.765.432/0001-10',
    email: 'vendas@construcaoxyz.com.br',
    telefone: '(21) 2345-6789',
    celular: '(21) 99876-5432',
    endereco: {
      cep: '20040-020',
      logradouro: 'Rua da Assembleia',
      numero: '250',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
    },
    contato: {
      nome: 'Maria Santos',
      cargo: 'Diretora de Vendas',
      email: 'maria@construcaoxyz.com.br',
      telefone: '(21) 99876-5432',
    },
    categorias: ['Construção', 'Materiais'],
    status: 'ativo',
    dataCadastro: '2024-02-20',
  },
  {
    id: '3',
    razaoSocial: 'Alimentos Frescos Brasil Ltda',
    nomeFantasia: 'Frescos Brasil',
    cnpj: '11.222.333/0001-44',
    email: 'comercial@frescosbrasil.com.br',
    telefone: '(31) 3111-2222',
    celular: '(31) 99111-2222',
    site: 'www.frescosbrasil.com.br',
    endereco: {
      cep: '30130-100',
      logradouro: 'Av. Afonso Pena',
      numero: '1500',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
    contato: {
      nome: 'Carlos Oliveira',
      cargo: 'Supervisor Comercial',
      email: 'carlos@frescosbrasil.com.br',
      telefone: '(31) 99111-2222',
    },
    categorias: ['Alimentos', 'Bebidas'],
    status: 'ativo',
    dataCadastro: '2023-11-10',
  },
  {
    id: '4',
    razaoSocial: 'Transporte Rápido Logística ME',
    nomeFantasia: 'Rápido Log',
    cnpj: '55.666.777/0001-88',
    email: 'atendimento@rapidolog.com.br',
    telefone: '(41) 3222-3333',
    celular: '(41) 99222-3333',
    endereco: {
      cep: '80010-000',
      logradouro: 'Rua XV de Novembro',
      numero: '800',
      bairro: 'Centro',
      cidade: 'Curitiba',
      estado: 'PR',
    },
    contato: {
      nome: 'Ana Paula Costa',
      cargo: 'Coordenadora',
      email: 'ana@rapidolog.com.br',
      telefone: '(41) 99222-3333',
    },
    categorias: ['Logística', 'Transporte'],
    status: 'inativo',
    observacoes: 'Aguardando renovação de contrato',
    dataCadastro: '2024-03-05',
  },
  {
    id: '5',
    razaoSocial: 'Equipamentos Industriais Norte S.A.',
    nomeFantasia: 'EQP Norte',
    cnpj: '22.333.444/0001-55',
    email: 'vendas@eqpnorte.com.br',
    telefone: '(85) 3444-5555',
    celular: '(85) 99444-5555',
    site: 'www.eqpnorte.com.br',
    endereco: {
      cep: '60160-230',
      logradouro: 'Av. Beira Mar',
      numero: '3000',
      bairro: 'Meireles',
      cidade: 'Fortaleza',
      estado: 'CE',
    },
    contato: {
      nome: 'Roberto Almeida',
      cargo: 'Gerente de Contas',
      email: 'roberto@eqpnorte.com.br',
      telefone: '(85) 99444-5555',
    },
    categorias: ['Equipamentos', 'Industrial'],
    status: 'ativo',
    dataCadastro: '2024-01-08',
  },
];

export const SupplierService = () => {
  /**
   * Buscar todos os fornecedores
   */
  const getAll = async () => {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    return {
      data: {
        items: mockSuppliers,
        meta: {
          currentPage: 1,
          perPage: 10,
          totalItems: mockSuppliers.length,
          totalPages: 1,
        },
      },
    };
  };

  /**
   * Buscar fornecedor por ID
   */
  const getById = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const supplier = mockSuppliers.find((s) => s.id === id);
    
    if (!supplier) {
      throw new Error('Fornecedor não encontrado');
    }
    
    return {
      data: supplier,
    };
  };

  /**
   * Criar novo fornecedor
   */
  const create = async (supplier: Omit<Supplier, 'id' | 'dataCadastro'>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newSupplier: Supplier = {
      ...supplier,
      id: String(mockSuppliers.length + 1),
      dataCadastro: new Date().toISOString().split('T')[0],
    };
    
    mockSuppliers.push(newSupplier);
    
    return {
      data: newSupplier,
      message: 'Fornecedor cadastrado com sucesso!',
    };
  };

  /**
   * Atualizar fornecedor
   */
  const update = async (id: string, supplier: Partial<Supplier>) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const index = mockSuppliers.findIndex((s) => s.id === id);
    
    if (index === -1) {
      throw new Error('Fornecedor não encontrado');
    }
    
    mockSuppliers[index] = {
      ...mockSuppliers[index],
      ...supplier,
    };
    
    return {
      data: mockSuppliers[index],
      message: 'Fornecedor atualizado com sucesso!',
    };
  };

  /**
   * Deletar fornecedor
   */
  const remove = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockSuppliers.findIndex((s) => s.id === id);
    
    if (index === -1) {
      throw new Error('Fornecedor não encontrado');
    }
    
    mockSuppliers.splice(index, 1);
    
    return {
      message: 'Fornecedor removido com sucesso!',
    };
  };

  /**
   * Alternar status do fornecedor
   */
  const toggleStatus = async (id: string) => {
    const supplier = mockSuppliers.find((s) => s.id === id);
    
    if (!supplier) {
      throw new Error('Fornecedor não encontrado');
    }
    
    supplier.status = supplier.status === 'ativo' ? 'inativo' : 'ativo';
    
    return {
      data: supplier,
      message: `Fornecedor ${supplier.status === 'ativo' ? 'ativado' : 'desativado'} com sucesso!`,
    };
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    toggleStatus,
  };
};
