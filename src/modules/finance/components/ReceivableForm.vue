<script lang="ts" setup>
import { ref, computed } from 'vue';
import { KDialog, KInput, KSelect, KTextarea, KButton, KDatePicker } from '@/ui/components';
import { useModal } from '../../../infra/composables/useModal.ts';
import { useToast } from '../../../infra/composables/useToast.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { ReceivableService, type Receivable } from '../services/receivable.service.ts';

const modal = useModal();
const toast = useToast();
const receivableService = ReceivableService();

const dialogRef = 'receivable_modal';
const isEditMode = ref(false);
const currentReceivableId = ref<string | null>(null);

// Schema de validação
const receivableSchema = z.object({
  descricao: z.string().min(3, 'Descrição é obrigatória'),
  clienteId: z.string().min(1, 'Cliente é obrigatório'),
  clienteNome: z.string().min(1, 'Nome do cliente é obrigatório'),
  clienteCpfCnpj: z.string().min(11, 'CPF/CNPJ é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  valor: z.string().min(1, 'Valor é obrigatório'),
  dataVencimento: z.string().min(1, 'Data de vencimento é obrigatória'),
  status: z.enum(['pendente', 'recebido', 'atrasado', 'cancelado']),
  formaRecebimento: z.string().optional(),
  numeroParcela: z.string().optional(),
  contaBancaria: z.string().optional(),
  centroCusto: z.string().optional(),
  projeto: z.string().optional(),
  observacoes: z.string().optional(),
});

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(receivableSchema),
});

// Definir campos
const [descricao] = defineField('descricao');
const [clienteId] = defineField('clienteId');
const [clienteNome] = defineField('clienteNome');
const [clienteCpfCnpj] = defineField('clienteCpfCnpj');
const [categoria] = defineField('categoria');
const [valor] = defineField('valor');
const [dataVencimento] = defineField('dataVencimento');
const [status] = defineField('status');
const [formaRecebimento] = defineField('formaRecebimento');
const [numeroParcela] = defineField('numeroParcela');
const [contaBancaria] = defineField('contaBancaria');
const [centroCusto] = defineField('centroCusto');
const [projeto] = defineField('projeto');
const [observacoes] = defineField('observacoes');

const modalTitle = computed(() => 
  isEditMode.value ? 'Editar Conta a Receber' : 'Nova Conta a Receber'
);

// Opções de select
const categoriaOptions = [
  { value: 'Mensalidade', label: 'Mensalidade' },
  { value: 'Doação', label: 'Doação' },
  { value: 'Vendas', label: 'Vendas' },
  { value: 'Aluguel', label: 'Aluguel' },
  { value: 'Cursos', label: 'Cursos' },
  { value: 'Serviços', label: 'Serviços' },
  { value: 'Eventos', label: 'Eventos' },
  { value: 'Outros', label: 'Outros' },
];

const statusOptions = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'recebido', label: 'Recebido' },
  { value: 'atrasado', label: 'Atrasado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const formaRecebimentoOptions = [
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'pix', label: 'PIX' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'transferencia', label: 'Transferência' },
  { value: 'cartao_credito', label: 'Cartão de Crédito' },
  { value: 'cartao_debito', label: 'Cartão de Débito' },
];

const openModal = (receivable?: Receivable) => {
  if (receivable) {
    isEditMode.value = true;
    currentReceivableId.value = receivable.id;
    setValues({
      descricao: receivable.descricao,
      clienteId: receivable.cliente.id,
      clienteNome: receivable.cliente.nome,
      clienteCpfCnpj: receivable.cliente.cpfCnpj,
      categoria: receivable.categoria,
      valor: String(receivable.valor),
      dataVencimento: receivable.dataVencimento,
      status: receivable.status,
      formaRecebimento: receivable.formaRecebimento || '',
      numeroParcela: receivable.numeroParcela || '',
      contaBancaria: receivable.contaBancaria || '',
      centroCusto: receivable.centroCusto || '',
      projeto: receivable.projeto || '',
      observacoes: receivable.observacoes || '',
    });
  } else {
    isEditMode.value = false;
    currentReceivableId.value = null;
    resetForm();
    setValues({ status: 'pendente' });
  }
  modal.open(dialogRef);
};

const closeModal = () => {
  modal.close(dialogRef);
  resetForm();
  isEditMode.value = false;
  currentReceivableId.value = null;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const receivableData = {
      descricao: values.descricao,
      cliente: {
        id: values.clienteId,
        nome: values.clienteNome,
        cpfCnpj: values.clienteCpfCnpj,
      },
      categoria: values.categoria,
      valor: parseFloat(values.valor.replace(',', '.')),
      dataVencimento: values.dataVencimento,
      status: values.status as 'pendente' | 'recebido' | 'atrasado' | 'cancelado',
      formaRecebimento: values.formaRecebimento as any,
      numeroParcela: values.numeroParcela,
      contaBancaria: values.contaBancaria,
      centroCusto: values.centroCusto,
      projeto: values.projeto,
      observacoes: values.observacoes,
    };

    if (isEditMode.value && currentReceivableId.value) {
      await receivableService.update(currentReceivableId.value, receivableData);
      toast.success('Conta a receber atualizada com sucesso!');
    } else {
      await receivableService.create(receivableData);
      toast.success('Conta a receber cadastrada com sucesso!');
    }

    closeModal();
    window.dispatchEvent(new Event('receivable-updated'));
  } catch (error) {
    toast.error('Erro ao salvar conta a receber');
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
              placeholder="Ex: Mensalidade - Janeiro/2026"
              :error="errors.descricao"
              required
            />
          </div>
          <KInput
            v-model="clienteNome"
            name="clienteNome"
            label="Cliente"
            placeholder="Nome do cliente"
            :error="errors.clienteNome"
            required
          />
          <KInput
            v-model="clienteCpfCnpj"
            name="clienteCpfCnpj"
            label="CPF/CNPJ"
            placeholder="000.000.000-00"
            :error="errors.clienteCpfCnpj"
            :mask="['###.###.###-##', '##.###.###/####-##']"
            required
          />
          <KInput
            v-model="clienteId"
            name="clienteId"
            label="ID Cliente"
            placeholder="ID do sistema"
            :error="errors.clienteId"
            helper="ID do cliente no sistema"
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
            v-model="formaRecebimento"
            name="formaRecebimento"
            label="Forma de Recebimento"
            :options="formaRecebimentoOptions"
            :error="errors.formaRecebimento"
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
            placeholder="Ex: Receitas, Administrativo"
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
