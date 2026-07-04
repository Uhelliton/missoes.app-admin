<script lang="ts" setup>
import { ref, computed } from 'vue';
import { KDialog, KInput, KSelect, KTextarea, KButton } from '@/ui/components';
import { useModal } from '../../../infra/composables/useModal.ts';
import { useToast } from '../../../infra/composables/useToast.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { SupplierService, type Supplier } from '../services/supplier.service.ts';

const modal = useModal();
const toast = useToast();
const supplierService = SupplierService();

const dialogRef = 'supplier_modal';
const isEditMode = ref(false);
const currentSupplierId = ref<string | null>(null);

// Schema de validação
const supplierSchema = z.object({
  razaoSocial: z.string().min(3, 'Razão social é obrigatória'),
  nomeFantasia: z.string().min(3, 'Nome fantasia é obrigatório'),
  cnpj: z.string().min(18, 'CNPJ inválido'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(14, 'Telefone inválido'),
  celular: z.string().optional(),
  site: z.string().optional(),
  cep: z.string().min(9, 'CEP inválido'),
  logradouro: z.string().min(3, 'Endereço é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatório'),
  contatoNome: z.string().min(3, 'Nome do contato é obrigatório'),
  contatoCargo: z.string().min(2, 'Cargo é obrigatório'),
  contatoEmail: z.string().email('Email inválido'),
  contatoTelefone: z.string().min(14, 'Telefone inválido'),
  categorias: z.string().min(1, 'Selecione ao menos uma categoria'),
  status: z.enum(['ativo', 'inativo', 'bloqueado']),
  observacoes: z.string().optional(),
});

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(supplierSchema),
});

// Definir campos
const [razaoSocial] = defineField('razaoSocial');
const [nomeFantasia] = defineField('nomeFantasia');
const [cnpj] = defineField('cnpj');
const [email] = defineField('email');
const [telefone] = defineField('telefone');
const [celular] = defineField('celular');
const [site] = defineField('site');
const [cep] = defineField('cep');
const [logradouro] = defineField('logradouro');
const [numero] = defineField('numero');
const [complemento] = defineField('complemento');
const [bairro] = defineField('bairro');
const [cidade] = defineField('cidade');
const [estado] = defineField('estado');
const [contatoNome] = defineField('contatoNome');
const [contatoCargo] = defineField('contatoCargo');
const [contatoEmail] = defineField('contatoEmail');
const [contatoTelefone] = defineField('contatoTelefone');
const [categorias] = defineField('categorias');
const [status] = defineField('status');
const [observacoes] = defineField('observacoes');

const modalTitle = computed(() => 
  isEditMode.value ? 'Editar Fornecedor' : 'Novo Fornecedor'
);

const openModal = (supplier?: Supplier) => {
  if (supplier) {
    isEditMode.value = true;
    currentSupplierId.value = supplier.id;
    setValues({
      razaoSocial: supplier.razaoSocial,
      nomeFantasia: supplier.nomeFantasia,
      cnpj: supplier.cnpj,
      email: supplier.email,
      telefone: supplier.telefone,
      celular: supplier.celular || '',
      site: supplier.site || '',
      cep: supplier.endereco.cep,
      logradouro: supplier.endereco.logradouro,
      numero: supplier.endereco.numero,
      complemento: supplier.endereco.complemento || '',
      bairro: supplier.endereco.bairro,
      cidade: supplier.endereco.cidade,
      estado: supplier.endereco.estado,
      contatoNome: supplier.contato.nome,
      contatoCargo: supplier.contato.cargo,
      contatoEmail: supplier.contato.email,
      contatoTelefone: supplier.contato.telefone,
      categorias: supplier.categorias.join(', '),
      status: supplier.status,
      observacoes: supplier.observacoes || '',
    });
  } else {
    isEditMode.value = false;
    currentSupplierId.value = null;
    resetForm();
    setValues({ status: 'ativo' });
  }
  modal.open(dialogRef);
};

const closeModal = () => {
  modal.close(dialogRef);
  resetForm();
  isEditMode.value = false;
  currentSupplierId.value = null;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const supplierData = {
      razaoSocial: values.razaoSocial,
      nomeFantasia: values.nomeFantasia,
      cnpj: values.cnpj,
      email: values.email,
      telefone: values.telefone,
      celular: values.celular,
      site: values.site,
      endereco: {
        cep: values.cep,
        logradouro: values.logradouro,
        numero: values.numero,
        complemento: values.complemento,
        bairro: values.bairro,
        cidade: values.cidade,
        estado: values.estado,
      },
      contato: {
        nome: values.contatoNome,
        cargo: values.contatoCargo,
        email: values.contatoEmail,
        telefone: values.contatoTelefone,
      },
      categorias: values.categorias.split(',').map(c => c.trim()),
      status: values.status as 'ativo' | 'inativo' | 'bloqueado',
      observacoes: values.observacoes,
    };

    if (isEditMode.value && currentSupplierId.value) {
      await supplierService.update(currentSupplierId.value, supplierData);
      toast.success('Fornecedor atualizado com sucesso!');
    } else {
      await supplierService.create(supplierData);
      toast.success('Fornecedor cadastrado com sucesso!');
    }

    closeModal();
    // Emitir evento para recarregar a lista
    window.dispatchEvent(new Event('supplier-updated'));
  } catch (error) {
    toast.error('Erro ao salvar fornecedor');
    console.error(error);
  }
});

defineExpose({
  openModal,
});
</script>

<template>
  <KDialog :id="dialogRef" :title="modalTitle" max-width="900px">
    <form @submit="onSubmit" class="space-y-6">
      <!-- Dados da Empresa -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Dados da Empresa</h3>
        <div class="grid grid-cols-2 gap-4">
          <KInput
            v-model="razaoSocial"
            name="razaoSocial"
            label="Razão Social"
            placeholder="Digite a razão social"
            :error="errors.razaoSocial"
            required
          />
          <KInput
            v-model="nomeFantasia"
            name="nomeFantasia"
            label="Nome Fantasia"
            placeholder="Digite o nome fantasia"
            :error="errors.nomeFantasia"
            required
          />
          <KInput
            v-model="cnpj"
            name="cnpj"
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            :error="errors.cnpj"
            mask="##.###.###/####-##"
            required
          />
          <KInput
            v-model="email"
            name="email"
            label="Email"
            type="email"
            placeholder="contato@empresa.com.br"
            :error="errors.email"
            required
          />
          <KInput
            v-model="telefone"
            name="telefone"
            label="Telefone"
            placeholder="(00) 0000-0000"
            :error="errors.telefone"
            mask="(##) ####-####"
            required
          />
          <KInput
            v-model="celular"
            name="celular"
            label="Celular"
            placeholder="(00) 00000-0000"
            :error="errors.celular"
            mask="(##) #####-####"
          />
          <div class="col-span-2">
            <KInput
              v-model="site"
              name="site"
              label="Website"
              placeholder="www.empresa.com.br"
              :error="errors.site"
            />
          </div>
        </div>
      </div>

      <!-- Endereço -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Endereço</h3>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-3">
            <KInput
              v-model="cep"
              name="cep"
              label="CEP"
              placeholder="00000-000"
              :error="errors.cep"
              mask="#####-###"
              required
            />
          </div>
          <div class="col-span-7">
            <KInput
              v-model="logradouro"
              name="logradouro"
              label="Endereço"
              placeholder="Rua, Avenida, etc"
              :error="errors.logradouro"
              required
            />
          </div>
          <div class="col-span-2">
            <KInput
              v-model="numero"
              name="numero"
              label="Número"
              placeholder="123"
              :error="errors.numero"
              required
            />
          </div>
          <div class="col-span-6">
            <KInput
              v-model="complemento"
              name="complemento"
              label="Complemento"
              placeholder="Sala, Bloco, etc"
              :error="errors.complemento"
            />
          </div>
          <div class="col-span-6">
            <KInput
              v-model="bairro"
              name="bairro"
              label="Bairro"
              placeholder="Centro"
              :error="errors.bairro"
              required
            />
          </div>
          <div class="col-span-6">
            <KInput
              v-model="cidade"
              name="cidade"
              label="Cidade"
              placeholder="São Paulo"
              :error="errors.cidade"
              required
            />
          </div>
          <div class="col-span-6">
            <KInput
              v-model="estado"
              name="estado"
              label="Estado"
              placeholder="SP"
              :error="errors.estado"
              maxlength="2"
              required
            />
          </div>
        </div>
      </div>

      <!-- Pessoa de Contato -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Pessoa de Contato</h3>
        <div class="grid grid-cols-2 gap-4">
          <KInput
            v-model="contatoNome"
            name="contatoNome"
            label="Nome"
            placeholder="João Silva"
            :error="errors.contatoNome"
            required
          />
          <KInput
            v-model="contatoCargo"
            name="contatoCargo"
            label="Cargo"
            placeholder="Gerente Comercial"
            :error="errors.contatoCargo"
            required
          />
          <KInput
            v-model="contatoEmail"
            name="contatoEmail"
            label="Email"
            type="email"
            placeholder="joao@empresa.com.br"
            :error="errors.contatoEmail"
            required
          />
          <KInput
            v-model="contatoTelefone"
            name="contatoTelefone"
            label="Telefone"
            placeholder="(00) 00000-0000"
            :error="errors.contatoTelefone"
            mask="(##) #####-####"
            required
          />
        </div>
      </div>

      <!-- Informações Adicionais -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Informações Adicionais</h3>
        <div class="grid grid-cols-2 gap-4">
          <KInput
            v-model="categorias"
            name="categorias"
            label="Categorias"
            placeholder="Tecnologia, Software (separados por vírgula)"
            :error="errors.categorias"
            helper="Separe as categorias por vírgula"
            required
          />
          <KSelect
            v-model="status"
            name="status"
            label="Status"
            :options="[
              { value: 'ativo', label: 'Ativo' },
              { value: 'inativo', label: 'Inativo' },
              { value: 'bloqueado', label: 'Bloqueado' },
            ]"
            :error="errors.status"
            required
          />
          <div class="col-span-2">
            <KTextarea
              v-model="observacoes"
              name="observacoes"
              label="Observações"
              placeholder="Informações adicionais sobre o fornecedor"
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
