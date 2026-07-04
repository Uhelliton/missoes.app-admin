<script setup lang="ts">
import { reactive, onMounted, ref, computed } from 'vue';
import { KDataTable, KButton } from '@/ui/components';
import { PayableService, type Payable } from '../services/payable.service.ts';
import PayableForm from '../components/PayableForm.vue';
import { useToast } from '../../../infra/composables/useToast.ts';

const payableService = PayableService();
const toast = useToast();

const payableFormRef = ref(null);

const dataTable = reactive({
  items: [] as Payable[],
  columns: [
    { key: 'descricao', label: 'Descrição' },
    { key: 'fornecedor', label: 'Fornecedor' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'valor', label: 'Valor' },
    { key: 'dataVencimento', label: 'Vencimento' },
    { key: 'status', label: 'Status' },
  ],
  pagination: {
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
  },
  loading: false,
});

const totais = reactive({
  pendente: 0,
  pago: 0,
  atrasado: 0,
  total: 0,
});

const loadPayables = async () => {
  dataTable.loading = true;
  try {
    const response = await payableService.getAll();
    dataTable.items = response.data.items;
    dataTable.pagination = response.data.meta;

    // Atualizar totalizadores
    totais.pendente = response.data.totais.pendente;
    totais.pago = response.data.totais.pago;
    totais.atrasado = response.data.totais.atrasado;
    totais.total = response.data.totais.total;
  } catch (error) {
    toast.error('Erro ao carregar contas a pagar');
    console.error(error);
  } finally {
    dataTable.loading = false;
  }
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

const handleCreatePayable = () => {
  if (payableFormRef.value) {
    (payableFormRef.value as any).openModal();
  }
};

const handleEditPayable = (payable: Payable) => {
  if (payableFormRef.value) {
    (payableFormRef.value as any).openModal(payable);
  }
};

const handlePayPayable = async (payable: Payable) => {
  if (confirm(`Confirmar pagamento de "${payable.descricao}"?`)) {
    try {
      await payableService.pay(payable.id, {
        dataPagamento: new Date().toISOString().split('T')[0],
        formaPagamento: 'pix',
      });
      toast.success('Pagamento registrado com sucesso!');
      await loadPayables();
    } catch (error) {
      toast.error('Erro ao registrar pagamento');
      console.error(error);
    }
  }
};

const handleCancelPayable = async (payable: Payable) => {
  const motivo = prompt('Informe o motivo do cancelamento:');
  if (motivo) {
    try {
      await payableService.cancel(payable.id, motivo);
      toast.success('Conta cancelada com sucesso!');
      await loadPayables();
    } catch (error) {
      toast.error('Erro ao cancelar conta');
      console.error(error);
    }
  }
};

const handleDeletePayable = async (payable: Payable) => {
  if (confirm(`Deseja realmente remover a conta "${payable.descricao}"?`)) {
    try {
      await payableService.remove(payable.id);
      toast.success('Conta removida com sucesso!');
      await loadPayables();
    } catch (error) {
      toast.error('Erro ao remover conta');
      console.error(error);
    }
  }
};

onMounted(async () => {
  await loadPayables();
  window.addEventListener('payable-updated', loadPayables);
});
</script>

<template>
  <div class="kt-container-fluid">
    <!-- Header -->
    <div class="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
      <div class="flex flex-col justify-center gap-2">
        <h1 class="text-xl font-medium leading-none text-mono">
          Contas a Pagar
        </h1>
        <div class="flex items-center gap-2 text-sm font-normal text-secondary-foreground ">
          Gestão de Contas a Pagar
        </div>
      </div>
      <div class="flex items-center gap-2.5">
        <KButton variant="primary" @click="handleCreatePayable">
          <i class="ki-filled ki-plus"></i>
          Nova Conta a Pagar
        </KButton>
      </div>
    </div>

    <!-- Cards de Totalizadores -->
    <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-10 w-full">
      <div class="kt-card">
        <div class="kt-card-body p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-secondary-foreground mb-1">Total</div>
              <div class="text-2xl font-bold">{{ formatCurrency(totais.total) }}</div>
            </div>
            <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <i class="ki-filled ki-dollar text-primary text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="kt-card">
        <div class="kt-card-body p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-secondary-foreground mb-1">Pendente</div>
              <div class="text-2xl font-bold text-warning">{{ formatCurrency(totais.pendente) }}</div>
            </div>
            <div class="size-12 rounded-full bg-warning/10 flex items-center justify-center">
              <i class="ki-filled ki-time text-warning text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="kt-card">
        <div class="kt-card-body p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-secondary-foreground mb-1">Pago</div>
              <div class="text-2xl font-bold text-success">{{ formatCurrency(totais.pago) }}</div>
            </div>
            <div class="size-12 rounded-full bg-success/10 flex items-center justify-center">
              <i class="ki-filled ki-check-circle text-success text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="kt-card">
        <div class="kt-card-body p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-secondary-foreground mb-1">Atrasado</div>
              <div class="text-2xl font-bold text-destructive">{{ formatCurrency(totais.atrasado) }}</div>
            </div>
            <div class="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <i class="ki-filled ki-information text-destructive text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela -->
    <div class="grid gap-5 lg:gap-7.5">
      <div class="kt-card kt-card-grid min-w-full">
        <div class="kt-card-header flex-wrap gap-2">
          <h3 class="kt-card-title text-sm"></h3>
          <div class="flex flex-wrap gap-2 lg:gap-5">
            <div class="flex">
              <label class="kt-input">
                <i class="ki-filled ki-magnifier"></i>
                <input
                  placeholder="Buscar contas"
                  type="text"
                />
              </label>
            </div>
          </div>
        </div>

        <div class="kt-card-content">
          <div class="kt-scrollable-x-auto">
            <KDataTable
              :items="dataTable.items"
              :columns="dataTable.columns"
              :total-items="dataTable.pagination.totalItems"
              :has-actions="true"
            >
              <!-- Descrição -->
              <template #cell-descricao="{ item }">
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ item.descricao }}</span>
                  <span v-if="item.numeroParcela" class="text-xs text-secondary-foreground">
                    Parcela: {{ item.numeroParcela }}
                  </span>
                </div>
              </template>

              <!-- Fornecedor -->
              <template #cell-fornecedor="{ item }">
                <div class="flex flex-col">
                  <span class="text-sm font-medium">{{ item.fornecedor.nome }}</span>
                  <span class="text-xs text-secondary-foreground">{{ item.fornecedor.cnpj }}</span>
                </div>
              </template>

              <!-- Categoria -->
              <template #cell-categoria="{ item }">
                <span class="kt-badge kt-badge-light">{{ item.categoria }}</span>
              </template>

              <!-- Valor -->
              <template #cell-valor="{ item }">
                <span class="text-sm font-semibold">{{ formatCurrency(item.valor) }}</span>
              </template>

              <!-- Vencimento -->
              <template #cell-dataVencimento="{ item }">
                <div class="flex flex-col">
                  <span class="text-sm">{{ formatDate(item.dataVencimento) }}</span>
                  <span v-if="item.dataPagamento" class="text-xs text-success">
                    Pago em: {{ formatDate(item.dataPagamento) }}
                  </span>
                </div>
              </template>

              <!-- Status -->
              <template #cell-status="{ item }">
                <span
                  :class="[
                    'kt-badge kt-badge-outline',
                    item.status === 'pago' ? 'kt-badge-success' :
                    item.status === 'pendente' ? 'kt-badge-warning' :
                    item.status === 'atrasado' ? 'kt-badge-danger' :
                    'kt-badge-secondary'
                  ]"
                >
                  <span class="kt-badge-dot size-1.5"></span>
                  {{ item.status === 'pago' ? 'Pago' :
                     item.status === 'pendente' ? 'Pendente' :
                     item.status === 'atrasado' ? 'Atrasado' :
                     'Cancelado' }}
                </span>
              </template>

              <!-- Ações -->
              <template #actions="{ item }">
                <div class="flex justify-center items-center gap-2.5">
                  <!-- Botão Editar -->
                  <button
                    v-if="item.status !== 'cancelado'"
                    class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                    @click="handleEditPayable(item)"
                    title="Editar"
                  >
                    <i class="ki-outline ki-notepad-edit"></i>
                  </button>

                  <!-- Botão Pagar -->
                  <button
                    v-if="item.status === 'pendente' || item.status === 'atrasado'"
                    class="kt-btn kt-btn-sm kt-btn-icon kt-btn-success"
                    @click="handlePayPayable(item)"
                    title="Registrar Pagamento"
                  >
                    <i class="ki-filled ki-check"></i>
                  </button>

                  <!-- Menu de Ações -->
                  <div class="kt-menu" data-kt-menu="true">
                    <div
                      class="kt-menu-item"
                      data-kt-menu-item-offset="0, 10px"
                      data-kt-menu-item-placement="bottom-end"
                      data-kt-menu-item-toggle="dropdown"
                      data-kt-menu-item-trigger="hover"
                    >
                      <button class="kt-menu-toggle kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost">
                        <i class="ki-filled ki-dots-vertical text-lg"></i>
                      </button>

                      <div class="kt-menu-dropdown kt-menu-default w-full max-w-[200px]" data-kt-menu-dismiss="true">
                        <!-- Visualizar -->
                        <div class="kt-menu-item">
                          <a class="kt-menu-link" href="#" @click.prevent>
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-eye"></i>
                            </span>
                            <span class="kt-menu-title">Visualizar</span>
                          </a>
                        </div>

                        <!-- Cancelar -->
                        <div v-if="item.status !== 'cancelado'" class="kt-menu-item">
                          <a
                            class="kt-menu-link"
                            href="#"
                            @click.prevent="handleCancelPayable(item)"
                          >
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-cross-circle"></i>
                            </span>
                            <span class="kt-menu-title">Cancelar</span>
                          </a>
                        </div>

                        <div class="kt-menu-separator"></div>

                        <!-- Remover -->
                        <div class="kt-menu-item">
                          <a
                            class="kt-menu-link"
                            href="#"
                            @click.prevent="handleDeletePayable(item)"
                          >
                            <span class="kt-menu-icon">
                              <i class="ki-filled ki-trash"></i>
                            </span>
                            <span class="kt-menu-title text-destructive">Remover</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </KDataTable>
          </div>

          <!-- Footer -->
          <div class="kt-card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-secondary-foreground text-sm font-medium">
            <div class="flex items-center gap-2 order-2 md:order-1">
              Exibindo {{ dataTable.items.length }} de {{ dataTable.pagination.totalItems }} contas
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Formulário -->
  <PayableForm ref="payableFormRef" />
</template>
