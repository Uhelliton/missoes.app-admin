# Módulo de Fornecedores

## 📦 Estrutura

```
src/modules/supplier/
├── components/
│   └── SupplierForm.vue       # Modal de criação/edição
├── pages/
│   └── SupplierIndex.vue      # Listagem de fornecedores
├── services/
│   └── supplier.service.ts    # Serviço com dados mockados
└── README.md
```

## 🚀 Funcionalidades

### ✅ Listagem de Fornecedores
- Visualização em tabela com KDataTable
- Campos exibidos:
  - Razão Social (com CNPJ)
  - Nome Fantasia (com email)
  - Telefone (com celular)
  - Status (Ativo/Inativo/Bloqueado)
- Busca por texto
- Paginação

### ✅ Criar/Editar Fornecedor
- Modal completo com formulário validado (Zod)
- Seções organizadas:
  - **Dados da Empresa**: Razão Social, Nome Fantasia, CNPJ, Email, Telefones, Website
  - **Endereço**: CEP, Logradouro, Número, Complemento, Bairro, Cidade, Estado
  - **Pessoa de Contato**: Nome, Cargo, Email, Telefone
  - **Informações Adicionais**: Categorias, Status, Observações
- Máscaras de input (CNPJ, CEP, telefones)
- Validação em tempo real

### ✅ Ações
- Editar fornecedor
- Alternar status (Ativo/Inativo)
- Remover fornecedor
- Visualizar detalhes (placeholder)

## 📊 Interface Supplier

```typescript
interface Supplier {
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
```

## 🔄 Service (supplier.service.ts)

### Métodos Disponíveis

- `getAll()` - Buscar todos os fornecedores
- `getById(id)` - Buscar por ID
- `create(supplier)` - Criar novo fornecedor
- `update(id, supplier)` - Atualizar fornecedor
- `remove(id)` - Remover fornecedor
- `toggleStatus(id)` - Alternar status ativo/inativo

### Dados Mockados

O serviço já vem com 5 fornecedores mockados:
1. Tech Solutions Ltda (Tecnologia/Software)
2. Materiais de Construção XYZ (Construção/Materiais)
3. Alimentos Frescos Brasil (Alimentos/Bebidas)
4. Transporte Rápido Logística (Logística/Transporte)
5. Equipamentos Industriais Norte (Equipamentos/Industrial)

## 🎨 Componentes Utilizados

- `KDataTable` - Tabela de dados
- `KDialog` - Modal
- `KInput` - Inputs (bootstrap-vue-next)
- `KSelect` - Select dropdown
- `KTextarea` - Textarea
- `KButton` - Botões

## 🛣️ Rota

```
/suppliers
```

Configurada em `src/ui/router/routes.ts` com:
- Layout: default
- Auth: requerida
- Admin: apenas administradores

## 📝 Menu Lateral

Adicionado em `Sidebar.vue` na seção:
- Ícone: `ki-filled ki-delivery-24`
- Label: "Fornecedores"
- Submenu: "Gestão de Fornecedores"

## 🔄 Próximos Passos (Integração com API Real)

Para integrar com uma API real, você precisa:

1. Atualizar `supplier.service.ts`:
```typescript
import { api } from '@/infra/lib/api'; // seu cliente HTTP

const getAll = async () => {
  const response = await api.get('/suppliers');
  return response.data;
};
```

2. Remover os dados mockados

3. Ajustar a interface `Supplier` conforme o backend

4. Implementar tratamento de erros adequado

## 📚 Exemplo de Uso

```vue
<script setup>
import { SupplierService } from '@/modules/supplier/services/supplier.service';

const supplierService = SupplierService();

// Buscar todos
const { data } = await supplierService.getAll();

// Criar novo
await supplierService.create({
  razaoSocial: 'Nova Empresa',
  // ... outros campos
});

// Atualizar
await supplierService.update('1', {
  status: 'inativo'
});
</script>
```
