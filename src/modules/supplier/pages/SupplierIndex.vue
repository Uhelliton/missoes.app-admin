<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { KDataTable, KButton } from '@/ui/components';
import { SupplierService, type Supplier } from '../services/supplier.service.ts';
import SupplierForm from '../components/SupplierForm.vue';
import { useToast } from '../../../infra/composables/useToast.ts';

const supplierService = SupplierService();
const toast = useToast();

const supplierFormRef = ref(null);

const dataTable = reactive({
  items: [] as Supplier[],
  columns: [
    { key: 'razaoSocial', label: 'Razão Social' },
    { key: 'nomeFantasia', label: 'Nome Fantasia' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'status', label: 'Status' },
  ],
  pagination: {
    currentPage: 1,
    perPage: 10,
    totalItems: 0,
  },
  loading: false,
});

const loadSuppliers = async () => {
  dataTable.loading = true;
  try {
    const response = await supplierService.getAll();
    dataTable.items = response.data.items;
    dataTable.pagination = response.data.meta;
  } catch (error) {
    toast.error('Erro ao carregar fornecedores');
    console.error(error);
  } finally {
    dataTable.loading = false;
  }
};

const handleCreateSupplier = () => {
  if (supplierFormRef.value) {
    (supplierFormRef.value as any).openModal();
  }
};

const handleEditSupplier = (supplier: Supplier) => {
  if (supplierFormRef.value) {
    (supplierFormRef.value as any).openModal(supplier);
  }
};

const handleDeleteSupplier = async (supplier: Supplier) => {
  if (confirm(`Deseja realmente remover o fornecedor "${supplier.nomeFantasia}"?`)) {
    try {
      await supplierService.remove(supplier.id);
      toast.success('Fornecedor removido com sucesso!');
      await loadSuppliers();
    } catch (error) {
      toast.error('Erro ao remover fornecedor');
      console.error(error);
    }
  }
};

const handleToggleStatus = async (supplier: Supplier) => {
  try {
    await supplierService.toggleStatus(supplier.id);
    toast.success('Status atualizado com sucesso!');
    await loadSuppliers();
  } catch (error) {
    toast.error('Erro ao atualizar status');
    console.error(error);
  }
};

onMounted(async () => {
  await loadSuppliers();
  
  // Listener para recarregar quando o modal for fechado
  window.addEventListener('supplier-updated', loadSuppliers);
});
</script>

<template>
  <div class="kt-container-fluid">
    <!-- Header -->
    <div class="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
      <div class="flex flex-col justify-center gap-2">
        <h1 class="text-xl font-medium leading-none text-mono">
          Gestão de Fornecedores
        </h1>
        <div class="flex items-center gap-2 text-sm font-normal text-secondary-foreground">
          Listagem de Fornecedores
        </div>
      </div>
      <div class="flex items-center gap-2.5">
        <KButton variant="primary" @click="handleCreateSupplier">
          <i class="ki-filled ki-plus"></i>
          Novo Fornecedor
        </KButton>
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
                  placeholder="Buscar fornecedores" 
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
              <!-- Razão Social com CNPJ -->
              <template #cell-razaoSocial="{ item }">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-mono">
                    {{ item.razaoSocial }}
                  </span>
                  <span class="text-xs text-secondary-foreground">
                    CNPJ: {{ item.cnpj }}
                  </span>
                </div>
              </template>

              <!-- Nome Fantasia com Email -->
              <template #cell-nomeFantasia="{ item }">
                <div class="flex flex-col">
                  <span class="text-sm font-medium">
                    {{ item.nomeFantasia }}
                  </span>
                  <span class="text-xs text-secondary-foreground">
                    {{ item.email }}
                  </span>
                </div>
              </template>

              <!-- CNPJ -->
              <template #cell-cnpj="{ item }">
                <span class="text-sm">{{ item.cnpj }}</span>
              </template>

              <!-- Telefone -->
              <template #cell-telefone="{ item }">
                <div class="flex flex-col">
                  <span class="text-sm">{{ item.telefone }}</span>
                  <span v-if="item.celular" class="text-xs text-secondary-foreground">
                    {{ item.celular }}
                  </span>
                </div>
              </template>

              <!-- Status -->
              <template #cell-status="{ item }">
                <span 
                  :class="[
                    'kt-badge kt-badge-outline',
                    item.status === 'ativo' ? 'kt-badge-success' : 
                    item.status === 'inativo' ? 'kt-badge-warning' : 
                    'kt-badge-danger'
                  ]"
                >
                  <span class="kt-badge-dot size-1.5"></span>
                  {{ item.status === 'ativo' ? 'Ativo' : 
                     item.status === 'inativo' ? 'Inativo' : 
                     'Bloqueado' }}
                </span>
              </template>

              <!-- Ações -->
              <template #actions="{ item }">
                <div class="flex justify-center items-center gap-2.5">
                  <!-- Botão Editar -->
                  <button 
                    class="kt-btn kt-btn-sm kt-btn-icon kt-btn-ghost"
                    @click="handleEditSupplier(item)"
                    title="Editar"
                  >
                    <i class="ki-outline ki-notepad-edit"></i>
                  </button>

                  <!-- Menu de Ações -->
                  <div class="kt-menu" data-kt-menu="true">
                    <div 
                      class="kt-menu-item" 
                      data-kt-menu-item-offset="0, 10px" 
                      data-kt-menu-item-placement="bottom-end" 
                      data-kt-menu-item-placement-rtl="bottom-start" 
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

                        <!-- Alternar Status -->
                        <div class="kt-menu-item">
                          <a 
                            class="kt-menu-link" 
                            href="#" 
                            @click.prevent="handleToggleStatus(item)"
                          >
                            <span class="kt-menu-icon">
                              <i :class="item.status === 'ativo' ? 'ki-filled ki-toggle-off' : 'ki-filled ki-toggle-on'"></i>
                            </span>
                            <span class="kt-menu-title">
                              {{ item.status === 'ativo' ? 'Desativar' : 'Ativar' }}
                            </span>
                          </a>
                        </div>

                        <div class="kt-menu-separator"></div>

                        <!-- Remover -->
                        <div class="kt-menu-item">
                          <a 
                            class="kt-menu-link" 
                            href="#" 
                            @click.prevent="handleDeleteSupplier(item)"
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

          <!-- Footer com paginação -->
          <div class="kt-card-footer justify-center md:justify-between flex-col md:flex-row gap-5 text-secondary-foreground text-sm font-medium">
            <div class="flex items-center gap-2 order-2 md:order-1">
              Exibindo {{ dataTable.items.length }} de {{ dataTable.pagination.totalItems }} fornecedores
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Formulário -->
  <SupplierForm ref="supplierFormRef" />
</template>
