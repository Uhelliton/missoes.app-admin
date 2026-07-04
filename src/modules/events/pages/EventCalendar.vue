<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { KButton } from '@/ui/components';
import { EventService, type Event } from '../services/event.service.ts';
import EventModal from '../components/EventModal.vue';
import { useToast } from '../../../infra/composables/useToast.ts';

const toast = useToast();
const eventService = EventService();

const eventModalRef = ref(null);
const calendarEl = ref<HTMLElement | null>(null);
let calendar: any = null;

// Estatísticas
const stats = ref({
  total: 0,
  confirmados: 0,
  pendentes: 0,
  cancelados: 0,
});

/**
 * Inicializar FullCalendar
 */
const initializeCalendar = async () => {
  if (!calendarEl.value) return;

  // Verificar se FullCalendar está disponível
  if (typeof window === 'undefined' || !(window as any).FullCalendar) {
    console.error('FullCalendar não está carregado');
    toast.error('Erro ao carregar o calendário');
    return;
  }

  try {
    // Buscar eventos do service
    const response = await eventService.getAll();
    const events = response.data.items;

    // Atualizar estatísticas
    stats.value.total = events.length;
    stats.value.confirmados = events.filter(e => e.status === 'confirmado').length;
    stats.value.pendentes = events.filter(e => e.status === 'pendente').length;
    stats.value.cancelados = events.filter(e => e.status === 'cancelado').length;

    // Formatar eventos para o FullCalendar
    const calendarEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      backgroundColor: event.color,
      borderColor: event.color,
      extendedProps: {
        description: event.description,
        location: event.location,
        type: event.type,
        status: event.status,
        responsavel: event.responsavel,
        participantes: event.participantes,
        observacoes: event.observacoes,
      },
    }));

    // Inicializar FullCalendar
    calendar = new (window as any).FullCalendar.Calendar(calendarEl.value, {
      initialView: 'dayGridMonth',
      locale: 'pt-br',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        list: 'Lista',
      },
      views: {
        dayGridMonth: {
          titleFormat: { year: 'numeric', month: 'long' },
        },
        timeGridWeek: {
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        },
        timeGridDay: {
          titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        },
      },
      editable: true,
      droppable: true,
      eventResizableFromStart: true,
      events: calendarEvents,

      // Clique em data vazia - criar novo evento
      dateClick: function(info: any) {
        if (eventModalRef.value) {
          (eventModalRef.value as any).openModal(undefined, { dateStr: info.dateStr });
        }
      },

      // Clique em evento - editar
      eventClick: function(info: any) {
        const eventData: Event = {
          id: info.event.id,
          title: info.event.title,
          start: info.event.startStr,
          end: info.event.endStr || undefined,
          allDay: info.event.allDay,
          description: info.event.extendedProps.description,
          location: info.event.extendedProps.location,
          type: info.event.extendedProps.type,
          status: info.event.extendedProps.status,
          responsavel: info.event.extendedProps.responsavel,
          participantes: info.event.extendedProps.participantes,
          observacoes: info.event.extendedProps.observacoes,
          color: info.event.backgroundColor,
          dataCadastro: '',
        };

        if (eventModalRef.value) {
          (eventModalRef.value as any).openModal(eventData);
        }
      },

      // Arrastar evento (drag & drop)
      eventDrop: async function(info: any) {
        try {
          await eventService.updateDates(
            info.event.id,
            info.event.startStr,
            info.event.endStr || undefined
          );
          toast.success('Data do evento atualizada!');
        } catch (error) {
          info.revert();
          toast.error('Erro ao atualizar data do evento');
          console.error(error);
        }
      },

      // Redimensionar evento
      eventResize: async function(info: any) {
        try {
          await eventService.updateDates(
            info.event.id,
            info.event.startStr,
            info.event.endStr || undefined
          );
          toast.success('Duração do evento atualizada!');
        } catch (error) {
          info.revert();
          toast.error('Erro ao atualizar duração do evento');
          console.error(error);
        }
      },

      // Tooltip ao passar o mouse
      eventDidMount: function(info: any) {
        const props = info.event.extendedProps;
        let tooltipContent = `<strong>${info.event.title}</strong>`;

        if (props.description) {
          tooltipContent += `<br/>${props.description}`;
        }
        if (props.location) {
          tooltipContent += `<br/>📍 ${props.location}`;
        }
        if (props.responsavel) {
          tooltipContent += `<br/>👤 ${props.responsavel.nome}`;
        }
        if (props.participantes) {
          tooltipContent += `<br/>👥 ${props.participantes} participantes`;
        }

        info.el.setAttribute('title', tooltipContent.replace(/<br\/>/g, '\n'));
      },
    });

    calendar.render();
  } catch (error) {
    console.error('Erro ao inicializar calendário:', error);
    toast.error('Erro ao carregar eventos');
  }
};

/**
 * Recarregar eventos
 */
const reloadEvents = async () => {
  if (!calendar) return;

  try {
    const response = await eventService.getAll();
    const events = response.data.items;

    // Atualizar estatísticas
    stats.value.total = events.length;
    stats.value.confirmados = events.filter(e => e.status === 'confirmado').length;
    stats.value.pendentes = events.filter(e => e.status === 'pendente').length;
    stats.value.cancelados = events.filter(e => e.status === 'cancelado').length;

    // Formatar eventos
    const calendarEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      backgroundColor: event.color,
      borderColor: event.color,
      extendedProps: {
        description: event.description,
        location: event.location,
        type: event.type,
        status: event.status,
        responsavel: event.responsavel,
        participantes: event.participantes,
        observacoes: event.observacoes,
      },
    }));

    // Atualizar eventos no calendário
    calendar.removeAllEvents();
    calendar.addEventSource(calendarEvents);
  } catch (error) {
    console.error('Erro ao recarregar eventos:', error);
    toast.error('Erro ao recarregar eventos');
  }
};

const handleCreateEvent = () => {
  if (eventModalRef.value) {
    (eventModalRef.value as any).openModal();
  }
};

onMounted(() => {
  // Aguardar um pouco para garantir que o FullCalendar está carregado
  setTimeout(() => {
    initializeCalendar();
  }, 100);

  // Listener para recarregar eventos
  window.addEventListener('event-updated', reloadEvents);
});

onUnmounted(() => {
  window.removeEventListener('event-updated', reloadEvents);
  if (calendar) {
    calendar.destroy();
  }
});
</script>

<template>
  <div class="kt-container-fluid">
    <!-- Header -->
    <div class="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
      <div class="flex flex-col justify-center gap-2">
        <h1 class="text-xl font-medium leading-none text-mono">
          Calendário de Eventos
        </h1>
        <div class="flex items-center gap-2 text-sm font-normal text-secondary-foreground">
          Gestão de Eventos e Atividades
        </div>
      </div>
      <div class="flex items-center gap-2.5">
        <KButton variant="primary" @click="handleCreateEvent">
          <i class="ki-filled ki-plus"></i>
          Novo Evento
        </KButton>
      </div>
    </div>

    <!-- Cards de Estatísticas -->
    <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-10 w-full">
      <div class="kt-card">
        <div class="kt-card-body p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-secondary-foreground mb-1">Total de Eventos</div>
              <div class="text-2xl font-bold">{{ stats.total }}</div>
            </div>
            <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <i class="ki-filled ki-calendar text-primary text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="kt-card">
        <div class="kt-card-body p-5">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-secondary-foreground mb-1">Confirmados</div>
              <div class="text-2xl font-bold text-success">{{ stats.confirmados }}</div>
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
              <div class="text-sm text-secondary-foreground mb-1">Pendentes</div>
              <div class="text-2xl font-bold text-warning">{{ stats.pendentes }}</div>
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
              <div class="text-sm text-secondary-foreground mb-1">Cancelados</div>
              <div class="text-2xl font-bold text-destructive">{{ stats.cancelados }}</div>
            </div>
            <div class="size-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <i class="ki-filled ki-cross-circle text-destructive text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Calendário -->
    <div class="kt-card">
      <div class="kt-card-body p-5">
        <div ref="calendarEl" id="event-calendar"></div>
      </div>
    </div>

    <!-- Legenda -->
    <div class="kt-card mt-5">
      <div class="kt-card-body p-5">
        <h3 class="text-sm font-semibold mb-3">Legenda</h3>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <div class="size-4 rounded" style="background-color: #3b82f6;"></div>
            <span class="text-sm">Culto</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-4 rounded" style="background-color: #10b981;"></div>
            <span class="text-sm">Reunião</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-4 rounded" style="background-color: #f59e0b;"></div>
            <span class="text-sm">Evento</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-4 rounded" style="background-color: #8b5cf6;"></div>
            <span class="text-sm">Conferência</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-4 rounded" style="background-color: #06b6d4;"></div>
            <span class="text-sm">Treinamento</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-4 rounded" style="background-color: #6b7280;"></div>
            <span class="text-sm">Outros</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Evento -->
  <EventModal ref="eventModalRef" />
</template>
