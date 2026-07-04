<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Próximos eventos</BCardTitle>
      <RouterLink to="/events" class="btn btn-sm btn-light"> Calendário </RouterLink>
    </BCardHeader>
    <BCardBody class="p-0">
      <ul class="list-group list-group-flush">
        <li v-for="ev in eventos" :key="ev.id" class="list-group-item px-3 py-2">
          <div class="d-flex justify-content-between gap-2">
            <div class="min-w-0">
              <span class="fw-semibold d-block text-truncate" :title="ev.titulo">{{ ev.titulo }}</span>
              <small class="text-muted text-capitalize">{{ ev.tipo }}</small>
              <small v-if="ev.local" class="text-muted d-block text-truncate">{{ ev.local }}</small>
            </div>
            <small class="text-nowrap text-muted">{{ formatWhen(ev.inicio) }}</small>
          </div>
        </li>
        <li v-if="!eventos.length" class="list-group-item text-muted">Nenhum evento futuro na agenda.</li>
      </ul>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import type { EventoResumoItem } from '../types/dashboard.types'

defineProps<{
  eventos: EventoResumoItem[]
}>()

function formatWhen(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}
</script>
