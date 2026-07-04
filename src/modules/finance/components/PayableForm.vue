<script lang="ts" setup>
import { ref, computed } from 'vue';
import { KDialog, KInput, KSelect, KTextarea, KButton, KDatePicker } from '@/ui/components';
import { useModal } from '../../../infra/composables/useModal.ts';
import { useToast } from '../../../infra/composables/useToast.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { PayableService, type Payable } from '../services/payable.service.ts';

const modal = useModal();
const toast = useToast();
const payableService = PayableService();

const dialogRef = 'payable_modal';
const isEditMode = ref(false);
const currentPayableId = ref<string | null>(null);

// Schema de validação
const payableSchema = z.object({
  descricao: z.string().min(3, 'Descrição é obrigatória'),
  fornecedorId: z.string().min(1, 'Fornecedor é obrigatório'),
  fornecedorNome: z.string().min(1, 'Nome do fornecedor é obrigatório'),
  fornecedorCnpj: z.string().min(14, 'CNPJ é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  valor: z.string().min(1, 'Valor é obrigatório'),
  dataVencimento: z.string().min(1, 'Data de vencimento é obrigatória'),
  status: z.enum(['pendente', 'pago', 'atrasado', 'cancelado']),
  formaPagamento: z.string().optional(),
  numeroParcela: z.string().optional(),
  contaBancaria: z.string().optional(),
  centroCusto: z.string().optional(),
  projeto: z.string().optional(),
  observacoes: z.string().optional(),
});

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(payableSchema),
});

// Definir campos
const [descricao] = defineField('descricao');
const [fornecedorId] = defineField('fornecedorId');
const [fornecedorNome] = defineField('fornecedorNome');
const [fornecedorCnpj] = defineField('fornecedorCnpj');
const [categoria] = defineField('categoria');
const [valor] = defineField('valor');
const [dataVencimento] = defineField('dataVencimento');
const [status] = defineField('status');
const [formaPagamento] = defineField('formaPagamento');
const [numeroParcela] = defineField('numeroParcela');
const [contaBancaria] = defineField('contaBancaria');
const [centroCusto] = defineField('centroCusto');
const [projeto] = defineField('projeto');
const [observacoes] = defineField('observacoes');

const modalTitle = computed(() => 
  isEditMode.value ? 'Editar Conta a Pagar' : 'Nova Conta a Pagar'
);

// Opções de select
const categoriaOptions = [
  { value: 'Equipamentos', label: 'Equipamentos' },
  { value: 'Infraestrutura', label: 'Infraestrutura' },
  { value: 'Eventos', label: 'Eventos' },
  { value: 'Logística', label: 'Logística' },
  { value: 'Manutenção', label: 'Manutenção' },
  { value: 'Aluguel', label: 'Aluguel' },
  { value: 'Software', label: 'Software' },
  { value: 'Serviços', label: 'Serviços' },
  { value: 'Materiais', label: 'Materiais' },
  { value: 'Outros', label: 'Outros' },
];

const statusOptions = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'pago', label: 'Pago' },
  { value: 'atrasado', label: 'Atrasado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const formaPagamentoOptions = [
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'pix', label: 'PIX' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'transferencia', label: 'Transferência' },
  { value: 'cartao_credito', label: 'Cartão de Crédito' },
  { value: 'cartao_debito', label: 'Cartão de Débito' },
];

const openModal = (payable?: Payable) => {
  if (payable) {
    isEditMode.value = true;
    currentPayableId.value = payable.id;
    setValues({
      descricao: payable.descricao,
      fornecedorId: payable.fornecedor.id,
      fornecedorNome: payable.fornecedor.nome,
      fornecedorCnpj: payable.fornecedor.cnpj,
      categoria: payable.categoria,
      valor: String(payable.valor),
      dataVencimento: payable.dataVencimento,
      status: payable.status,
      formaPagamento: payable.formaPagamento || '',
      numeroParcela: payable.numeroParcela || '',
      contaBancaria: payable.contaBancaria || '',
      centroCusto: payable.centroCusto || '',
      projeto: payable.projeto || '',
      observacoes: payable.observacoes || '',
    });
  } else {
    isEditMode.value = false;
    currentPayableId.value = null;
    resetForm();
    setValues({ status: 'pendente' });
  }
  modal.open(dialogRef);
};

const closeModal = () => {
  modal.close(dialogRef);
  resetForm();
  isEditMode.value = false;
  currentPayableId.value = null;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const payableData = {
      descricao: values.descricao,
      fornecedor: {
        id: values.fornecedorId,
        nome: values.fornecedorNome,
        cnpj: values.fornecedorCnpj,
      },
      categoria: values.categoria,
      valor: parseFloat(values.valor.replace(',', '.')),
      dataVencimento: values.dataVencimento,
      status: values.status as 'pendente' | 'pago' | 'atrasado' | 'cancelado',
      formaPagamento: values.formaPagamento as any,
      numeroParcela: values.numeroParcela,
      contaBancaria: values.contaBancaria,
      centroCusto: values.centroCusto,
      projeto: values.projeto,
      observacoes: values.observacoes,
    };

    if (isEditMode.value && currentPayableId.value) {
      await payableService.update(currentPayableId.value, payableData);
      toast.success('Conta a pagar atualizada com sucesso!');
    } else {
      await payableService.create(payableData);
      toast.success('Conta a pagar cadastrada com sucesso!');
    }

    closeModal();
    window.dispatchEvent(new Event('payable-updated'));
  } catch (error) {
    toast.error('Erro ao salvar conta a pagar');
    console.error(error);
  }
});

defineExpose({
  openModal,
});
</script>

<template>
  <KDialog :id="dialogRef" :title="modalTitle" max-width="800px">
    <form @submit="onSubmit" class="space-y-6">
      <!-- Informações Básicas -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Informações Básicas</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <KInput
              v-model="descricao"
              name="descricao"
              label="Descrição"
              placeholder="Ex: Fornecimento de equipamentos"
              :error="errors.descricao"
              required
            />
          </div>
          <KInput
            v-model="fornecedorNome"
            name="fornecedorNome"
            label="Fornecedor"
            placeholder="Nome do fornecedor"
            :error="errors.fornecedorNome"
            required
          />
          <KInput
            v-model="fornecedorCnpj"
            name="fornecedorCnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            :error="errors.fornecedorCnpj"
            mask="##.###.###/####-##"
            required
          />
          <KInput
            v-model="fornecedorId"
            name="fornecedorId"
            label="ID Fornecedor"
            placeholder="ID do sistema"
            :error="errors.fornecedorId"
            helper="ID do fornecedor no sistema"
            required
          />
          <KSelect
            v-model="categoria"
            name="categoria"
            label="Categoria"
            :options="categoriaOptions"
            :error="errors.categoria"
            required
          />
        </div>
      </div>

      <!-- Valores e Datas -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Valores e Datas</h3>
        <div class="grid grid-cols-2 gap-4">
          <KInput
            v-model="valor"
            name="valor"
            label="Valor"
            placeholder="0,00"
            :error="errors.valor"
            prefix-icon="ki-filled ki-dollar"
            required
          />
          <KDatePicker
            v-model="dataVencimento"
            name="dataVencimento"
            label="Data de Vencimento"
            :error="errors.dataVencimento"
            required
          />
          <KSelect
            v-model="status"
            name="status"
            label="Status"
            :options="statusOptions"
            :error="errors.status"
            required
          />
          <KSelect
            v-model="formaPagamento"
            name="formaPagamento"
            label="Forma de Pagamento"
            :options="formaPagamentoOptions"
            :error="errors.formaPagamento"
          />
        </div>
      </div>

      <!-- Informações Adicionais -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Informações Adicionais</h3>
        <div class="grid grid-cols-2 gap-4">
          <KInput
            v-model="numeroParcela"
            name="numeroParcela"
            label="Número da Parcela"
            placeholder="Ex: 1/3"
            :error="errors.numeroParcela"
            helper="Formato: parcela atual / total de parcelas"
          />
          <KInput
            v-model="contaBancaria"
            name="contaBancaria"
            label="Conta Bancária"
            placeholder="Ex: Banco do Brasil - CC 12345-6"
            :error="errors.contaBancaria"
          />
          <KInput
            v-model="centroCusto"
            name="centroCusto"
            label="Centro de Custo"
            placeholder="Ex: TI, Administrativo"
            :error="errors.centroCusto"
          />
          <KInput
            v-model="projeto"
            name="projeto"
            label="Projeto"
            placeholder="Ex: Evento Anual 2026"
            :error="errors.projeto"
          />
          <div class="col-span-2">
            <KTextarea
              v-model="observacoes"
              name="observacoes"
              label="Observações"
              placeholder="Informações adicionais"
              :error="errors.observacoes"
              rows="3"
            />
          </div>
        </div>
      </div>

      <!-- Botões -->
      <div class="flex justify-end gap-3 pt-4 border-t">
        <KButton type="button" variant="light" @click="closeModal">
          Cancelar
        </KButton>
        <KButton type="submit" variant="primary">
          {{ isEditMode ? 'Atualizar' : 'Cadastrar' }}
        </KButton>
      </div>
    </form>
  </KDialog>
</template>
