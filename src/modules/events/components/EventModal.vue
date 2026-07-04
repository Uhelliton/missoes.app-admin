<script lang="ts" setup>
import { ref, computed } from 'vue';
import { KDialog, KInput, KSelect, KTextarea, KButton, KCheckbox, KDatePicker } from '@/ui/components';
import { useModal } from '../../../infra/composables/useModal.ts';
import { useToast } from '../../../infra/composables/useToast.ts';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { EventService, type Event, EventColors } from '../services/event.service.ts';

const modal = useModal();
const toast = useToast();
const eventService = EventService();

const dialogRef = 'event_modal';
const isEditMode = ref(false);
const currentEventId = ref<string | null>(null);

// Schema de validação
const eventSchema = z.object({
  title: z.string().min(3, 'Título é obrigatório'),
  description: z.string().optional(),
  start: z.string().min(1, 'Data de início é obrigatória'),
  startTime: z.string().optional(),
  end: z.string().optional(),
  endTime: z.string().optional(),
  allDay: z.boolean().default(false),
  location: z.string().optional(),
  type: z.enum(['culto', 'reuniao', 'evento', 'conferencia', 'treinamento', 'outros']),
  status: z.enum(['confirmado', 'pendente', 'cancelado']),
  responsavelId: z.string().optional(),
  responsavelNome: z.string().optional(),
  participantes: z.string().optional(),
  observacoes: z.string().optional(),
});

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: toTypedSchema(eventSchema),
});

// Definir campos
const [title] = defineField('title');
const [description] = defineField('description');
const [start] = defineField('start');
const [startTime] = defineField('startTime');
const [end] = defineField('end');
const [endTime] = defineField('endTime');
const [allDay] = defineField('allDay');
const [location] = defineField('location');
const [type] = defineField('type');
const [status] = defineField('status');
const [responsavelId] = defineField('responsavelId');
const [responsavelNome] = defineField('responsavelNome');
const [participantes] = defineField('participantes');
const [observacoes] = defineField('observacoes');

const modalTitle = computed(() => 
  isEditMode.value ? 'Editar Evento' : 'Novo Evento'
);

// Opções de select
const typeOptions = [
  { value: 'culto', label: 'Culto' },
  { value: 'reuniao', label: 'Reunião' },
  { value: 'evento', label: 'Evento' },
  { value: 'conferencia', label: 'Conferência' },
  { value: 'treinamento', label: 'Treinamento' },
  { value: 'outros', label: 'Outros' },
];

const statusOptions = [
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'cancelado', label: 'Cancelado' },
];

const openModal = (event?: Event, dateInfo?: { dateStr: string }) => {
  if (event) {
    isEditMode.value = true;
    currentEventId.value = event.id;
    
    // Separar data e hora
    const startDate = event.start.split('T')[0];
    const startTimeValue = event.start.includes('T') ? event.start.split('T')[1].substring(0, 5) : '';
    
    const endDate = event.end ? event.end.split('T')[0] : '';
    const endTimeValue = event.end && event.end.includes('T') ? event.end.split('T')[1].substring(0, 5) : '';
    
    setValues({
      title: event.title,
      description: event.description || '',
      start: startDate,
      startTime: startTimeValue,
      end: endDate,
      endTime: endTimeValue,
      allDay: event.allDay || false,
      location: event.location || '',
      type: event.type,
      status: event.status,
      responsavelId: event.responsavel?.id || '',
      responsavelNome: event.responsavel?.nome || '',
      participantes: String(event.participantes || ''),
      observacoes: event.observacoes || '',
    });
  } else {
    isEditMode.value = false;
    currentEventId.value = null;
    resetForm();
    
    // Se foi clicado em uma data, usar essa data
    if (dateInfo) {
      setValues({ 
        start: dateInfo.dateStr,
        status: 'confirmado',
        allDay: false,
        type: 'evento',
      });
    } else {
      setValues({ 
        status: 'confirmado',
        allDay: false,
        type: 'evento',
      });
    }
  }
  modal.open(dialogRef);
};

const closeModal = () => {
  modal.close(dialogRef);
  resetForm();
  isEditMode.value = false;
  currentEventId.value = null;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    // Construir datas ISO 8601
    let startISO = values.start;
    if (!values.allDay && values.startTime) {
      startISO = `${values.start}T${values.startTime}:00`;
    } else if (values.allDay) {
      startISO = `${values.start}T00:00:00`;
    }
    
    let endISO = values.end || undefined;
    if (values.end) {
      if (!values.allDay && values.endTime) {
        endISO = `${values.end}T${values.endTime}:00`;
      } else if (values.allDay) {
        endISO = `${values.end}T00:00:00`;
      } else {
        endISO = `${values.end}T${values.startTime || '00:00'}:00`;
      }
    }
    
    const eventData = {
      title: values.title,
      description: values.description,
      start: startISO,
      end: endISO,
      allDay: values.allDay,
      location: values.location,
      type: values.type as any,
      status: values.status as any,
      responsavel: values.responsavelNome ? {
        id: values.responsavelId || '1',
        nome: values.responsavelNome,
      } : undefined,
      participantes: values.participantes ? parseInt(values.participantes) : undefined,
      observacoes: values.observacoes,
      color: EventColors[values.type as keyof typeof EventColors],
    };

    if (isEditMode.value && currentEventId.value) {
      await eventService.update(currentEventId.value, eventData);
      toast.success('Evento atualizado com sucesso!');
    } else {
      await eventService.create(eventData);
      toast.success('Evento cadastrado com sucesso!');
    }

    closeModal();
    window.dispatchEvent(new Event('event-updated'));
  } catch (error) {
    toast.error('Erro ao salvar evento');
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
        <h3 class="text-lg font-semibold mb-4">Informações do Evento</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <KInput
              v-model="title"
              name="title"
              label="Título do Evento"
              placeholder="Ex: Culto Domingo"
              :error="errors.title"
              required
            />
          </div>
          
          <KSelect
            v-model="type"
            name="type"
            label="Tipo de Evento"
            :options="typeOptions"
            :error="errors.type"
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
          
          <div class="col-span-2">
            <KTextarea
              v-model="description"
              name="description"
              label="Descrição"
              placeholder="Descrição detalhada do evento"
              :error="errors.description"
              rows="2"
            />
          </div>
          
          <div class="col-span-2">
            <KInput
              v-model="location"
              name="location"
              label="Local"
              placeholder="Ex: Templo Principal, Sala 1"
              :error="errors.location"
              prefix-icon="ki-filled ki-geolocation"
            />
          </div>
        </div>
      </div>

      <!-- Data e Hora -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Data e Hora</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <KCheckbox id="allDay" v-model="allDay" label="Evento de dia inteiro" />
          </div>
          
          <KDatePicker
            v-model="start"
            name="start"
            label="Data de Início"
            :error="errors.start"
            required
          />
          
          <KInput
            v-if="!allDay"
            v-model="startTime"
            name="startTime"
            label="Hora de Início"
            type="time"
            :error="errors.startTime"
          />
          
          <KDatePicker
            v-model="end"
            name="end"
            label="Data de Término"
            :error="errors.end"
          />
          
          <KInput
            v-if="!allDay"
            v-model="endTime"
            name="endTime"
            label="Hora de Término"
            type="time"
            :error="errors.endTime"
          />
        </div>
      </div>

      <!-- Informações Adicionais -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Informações Adicionais</h3>
        <div class="grid grid-cols-2 gap-4">
          <KInput
            v-model="responsavelNome"
            name="responsavelNome"
            label="Responsável"
            placeholder="Nome do responsável"
            :error="errors.responsavelNome"
          />
          
          <KInput
            v-model="participantes"
            name="participantes"
            label="Número de Participantes"
            type="number"
            placeholder="0"
            :error="errors.participantes"
          />
          
          <div class="col-span-2">
            <KTextarea
              v-model="observacoes"
              name="observacoes"
              label="Observações"
              placeholder="Informações adicionais sobre o evento"
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
