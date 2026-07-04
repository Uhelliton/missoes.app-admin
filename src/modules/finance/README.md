# Módulo Financeiro

## 📦 Estrutura

```
src/modules/finance/
├── components/
│   ├── PayableForm.vue          # Modal de criação/edição de contas a pagar
│   └── ReceivableForm.vue       # Modal de criação/edição de contas a receber
├── pages/
│   ├── PayableIndex.vue         # Listagem de contas a pagar
│   └── ReceivableIndex.vue      # Listagem de contas a receber
├── services/
│   ├── payable.service.ts       # Serviço de contas a pagar (mockado)
│   └── receivable.service.ts    # Serviço de contas a receber (mockado)
└── README.md
```

## 🚀 Funcionalidades

### 💸 Contas a Pagar

#### Listagem
- Visualização em tabela com KDataTable
- **Cards de totalizadores**:
  - Total geral
  - Pendente (amarelo)
  - Pago (verde)
  - Atrasado (vermelho)
- Campos exibidos:
  - Descrição (com número de parcela)
  - Fornecedor (nome e CNPJ)
  - Categoria
  - Valor (formatado em R$)
  - Data de vencimento (e data de pagamento se aplicável)
  - Status com badge colorido
- Busca por texto
- Paginação

#### Criar/Editar
- Modal completo com formulário validado (Zod)
- Seções organizadas:
  - **Informações Básicas**: Descrição, Fornecedor, CNPJ, ID, Categoria
  - **Valores e Datas**: Valor, Vencimento, Status, Forma de Pagamento
  - **Informações Adicionais**: Parcela, Conta Bancária, Centro de Custo, Projeto, Observações
- Máscaras de input (CNPJ, valores)
- Validação em tempo real

#### Ações
- ✏️ Editar conta
- ✅ Registrar pagamento (para contas pendentes/atrasadas)
- ❌ Cancelar conta
- 🗑️ Remover conta
- 👁️ Visualizar detalhes (placeholder)

### 💰 Contas a Receber

#### Listagem
- Visualização em tabela com KDataTable
- **Cards de totalizadores**:
  - Total geral
  - Pendente (amarelo)
  - Recebido (verde)
  - Atrasado (vermelho)
- Campos exibidos:
  - Descrição (com número de parcela)
  - Cliente (nome e CPF/CNPJ)
  - Categoria
  - Valor (formatado em R$)
  - Data de vencimento (e data de recebimento se aplicável)
  - Status com badge colorido
- Busca por texto
- Paginação

#### Criar/Editar
- Modal completo com formulário validado (Zod)
- Seções organizadas:
  - **Informações Básicas**: Descrição, Cliente, CPF/CNPJ, ID, Categoria
  - **Valores e Datas**: Valor, Vencimento, Status, Forma de Recebimento
  - **Informações Adicionais**: Parcela, Conta Bancária, Centro de Custo, Projeto, Observações
- Máscaras de input (CPF/CNPJ com auto-detecção, valores)
- Validação em tempo real

#### Ações
- ✏️ Editar conta
- ✅ Registrar recebimento (para contas pendentes/atrasadas)
- ❌ Cancelar conta
- 🗑️ Remover conta
- 👁️ Visualizar detalhes (placeholder)

## 📊 Interfaces

### Payable (Contas a Pagar)

```typescript
interface Payable {
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
  numeroParcela?: string;
  observacoes?: string;
  anexos?: string[];
  contaBancaria?: string;
  centroCusto?: string;
  projeto?: string;
  dataCadastro: string;
}
```

### Receivable (Contas a Receber)

```typescript
interface Receivable {
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
  numeroParcela?: string;
  observacoes?: string;
  anexos?: string[];
  contaBancaria?: string;
  centroCusto?: string;
  projeto?: string;
  dataCadastro: string;
}
```

## 🔄 Services

### PayableService (payable.service.ts)

**Métodos Disponíveis:**
- `getAll(filters?)` - Buscar todas as contas a pagar (com filtros opcionais e totalizadores)
- `getById(id)` - Buscar por ID
- `create(payable)` - Criar nova conta
- `update(id, payable)` - Atualizar conta
- `pay(id, data)` - Registrar pagamento
- `cancel(id, motivo?)` - Cancelar conta
- `remove(id)` - Remover conta

**Dados Mockados:** 7 contas a pagar de exemplo

### ReceivableService (receivable.service.ts)

**Métodos Disponíveis:**
- `getAll(filters?)` - Buscar todas as contas a receber (com filtros opcionais e totalizadores)
- `getById(id)` - Buscar por ID
- `create(receivable)` - Criar nova conta
- `update(id, receivable)` - Atualizar conta
- `receive(id, data)` - Registrar recebimento
- `cancel(id, motivo?)` - Cancelar conta
- `remove(id)` - Remover conta

**Dados Mockados:** 9 contas a receber de exemplo (incluindo mensalidades, doações, vendas)

## 🎨 Componentes Utilizados

- `KDataTable` - Tabela de dados
- `KDialog` - Modal
- `KInput` - Inputs (bootstrap-vue-next)
- `KSelect` - Select dropdown
- `KTextarea` - Textarea
- `KButton` - Botões
- `KDatePicker` - Seletor de data

## 🛣️ Rotas

```
/finance/payables      # Contas a Pagar
/finance/receivables   # Contas a Receber
```

Configuradas em `src/ui/router/routes.ts` com:
- Layout: default
- Auth: requerida
- Admin: apenas administradores

## 📝 Menu Lateral

Adicionado em `Sidebar.vue` na seção **Financeiro**:
- Ícone: `ki-filled ki-financial-schedule`
- Submenus:
  - Contas a Pagar → `/finance/payables`
  - Contas a Receber → `/finance/receivables`
  - Transferência (placeholder)

## 📈 Recursos Especiais

### Totalizadores em Tempo Real
Ambas as páginas exibem cards no topo com:
- Total geral
- Total pendente
- Total pago/recebido
- Total atrasado

### Status Automático
O sistema detecta automaticamente contas atrasadas comparando a data de vencimento com a data atual.

### Badges Coloridos
- 🟢 Verde: Pago/Recebido
- 🟡 Amarelo: Pendente
- 🔴 Vermelho: Atrasado
- ⚫ Cinza: Cancelado

### Formatação
- Valores monetários em BRL (R$)
- Datas em formato brasileiro (DD/MM/AAAA)
- Máscaras automáticas para CPF/CNPJ

## 🔄 Próximos Passos (Integração com API Real)

Para integrar com uma API real:

1. **Atualizar os services**:
```typescript
import { api } from '@/infra/lib/api';

const getAll = async () => {
  const response = await api.get('/api/payables');
  return response.data;
};
```

2. **Remover dados mockados**

3. **Ajustar interfaces conforme backend**

4. **Implementar upload de anexos**

5. **Adicionar relatórios e exportação**

6. **Implementar módulo de Transferências**

## 📚 Exemplo de Uso

### Contas a Pagar

```vue
<script setup>
import { PayableService } from '@/modules/finance/services/payable.service';

const payableService = PayableService();

// Buscar todas
const { data } = await payableService.getAll();
console.log('Totais:', data.totais);

// Registrar pagamento
await payableService.pay('1', {
  dataPagamento: '2026-03-15',
  formaPagamento: 'pix',
});
</script>
```

### Contas a Receber

```vue
<script setup>
import { ReceivableService } from '@/modules/finance/services/receivable.service';

const receivableService = ReceivableService();

// Buscar com filtro
const { data } = await receivableService.getAll({
  status: 'pendente',
  cliente: 'Maria',
});

// Registrar recebimento
await receivableService.receive('3', {
  dataRecebimento: '2026-03-15',
  formaRecebimento: 'transferencia',
});
</script>
```

## 🎯 Categorias Disponíveis

### Contas a Pagar
- Equipamentos
- Infraestrutura
- Eventos
- Logística
- Manutenção
- Aluguel
- Software
- Serviços
- Materiais
- Outros

### Contas a Receber
- Mensalidade
- Doação
- Vendas
- Aluguel
- Cursos
- Serviços
- Eventos
- Outros

## 💳 Formas de Pagamento/Recebimento

- Dinheiro
- PIX
- Boleto
- Transferência
- Cartão de Crédito
- Cartão de Débito
