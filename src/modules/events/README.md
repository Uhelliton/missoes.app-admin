# Módulo de Eventos

## 📦 Estrutura

```
src/modules/events/
├── components/
│   └── EventModal.vue           # Modal de criação/edição de eventos
├── pages/
│   └── EventCalendar.vue        # Página do calendário com FullCalendar
├── services/
│   └── event.service.ts         # Serviço de eventos (mockado)
└── README.md
```

## 🚀 Funcionalidades

### 📅 Calendário Interativo com FullCalendar

#### Visualizações
- **Mês** (dayGridMonth) - Visualização mensal com todos os eventos
- **Semana** (timeGridWeek) - Visualização semanal com horários
- **Dia** (timeGridDay) - Visualização diária detalhada
- **Lista** (listWeek) - Lista de eventos da semana

#### Recursos do Calendário
- ✅ **Drag & Drop** - Arraste eventos para outras datas
- ✅ **Resize** - Redimensione eventos para ajustar duração
- ✅ **Click em Data** - Clique em uma data vazia para criar novo evento
- ✅ **Click em Evento** - Clique em um evento para editar
- ✅ **Tooltip** - Passe o mouse para ver detalhes do evento
- ✅ **Cores por Tipo** - Cada tipo de evento tem uma cor específica
- ✅ **Localização PT-BR** - Interface em português brasileiro
- ✅ **Responsivo** - Adapta-se a diferentes tamanhos de tela

#### Cards de Estatísticas
- Total de Eventos
- Eventos Confirmados (verde)
- Eventos Pendentes (amarelo)
- Eventos Cancelados (vermelho)

### 📝 Criar/Editar Eventos

#### Modal com Formulário Completo
- **Informações do Evento**:
  - Título (obrigatório)
  - Tipo: Culto, Reunião, Evento, Conferência, Treinamento, Outros
  - Status: Confirmado, Pendente, Cancelado
  - Descrição
  - Local

- **Data e Hora**:
  - Data de Início (obrigatório)
  - Hora de Início
  - Data de Término
  - Hora de Término
  - Checkbox "Evento de dia inteiro"

- **Informações Adicionais**:
  - Responsável pelo evento
  - Número de participantes
  - Observações

#### Validação
- Validação com Zod
- Mensagens de erro em tempo real
- Campos obrigatórios marcados

## 📊 Interface Event

```typescript
interface Event {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO 8601 format
  end?: string; // ISO 8601 format
  allDay?: boolean;
  location?: string;
  type: 'culto' | 'reuniao' | 'evento' | 'conferencia' | 'treinamento' | 'outros';
  status: 'confirmado' | 'pendente' | 'cancelado';
  color?: string;
  responsavel?: {
    id: string;
    nome: string;
  };
  participantes?: number;
  observacoes?: string;
  dataCadastro: string;
}
```

## 🎨 Cores por Tipo de Evento

```typescript
const EventColors = {
  culto: '#3b82f6',         // Azul
  reuniao: '#10b981',       // Verde
  evento: '#f59e0b',        // Âmbar
  conferencia: '#8b5cf6',   // Violeta
  treinamento: '#06b6d4',   // Ciano
  outros: '#6b7280',        // Cinza
};
```

## 🔄 Service (event.service.ts)

### Métodos Disponíveis

- `getAll(filters?)` - Buscar todos os eventos (com filtros opcionais)
- `getById(id)` - Buscar evento por ID
- `create(event)` - Criar novo evento
- `update(id, event)` - Atualizar evento
- `updateDates(id, start, end?)` - Atualizar datas (usado no drag & drop)
- `cancel(id, motivo?)` - Cancelar evento
- `remove(id)` - Remover evento

### Filtros Disponíveis

```typescript
{
  start?: string;      // Data inicial
  end?: string;        // Data final
  type?: string;       // Tipo de evento
  status?: string;     // Status do evento
}
```

### Dados Mockados

8 eventos de exemplo incluindo:
- Cultos (domingo manhã, domingo noite, quarta-feira)
- Reuniões (líderes, administrativa)
- Conferência Anual 2026 (3 dias)
- Treinamento de novos membros
- Evento Jovens - Noite de Louvor

## 🎨 Componentes Utilizados

- `FullCalendar` v6.1.10 - Calendário interativo
- `KDialog` - Modal
- `KInput` - Inputs (bootstrap-vue-next)
- `KSelect` - Select dropdown
- `KTextarea` - Textarea
- `KButton` - Botões
- `KDatePicker` - Seletor de data

## 🛣️ Rota

```
/events
```

Configurada em `src/ui/router/routes.ts` com:
- Layout: default
- Auth: requerida
- Admin: apenas administradores

## 📝 Menu Lateral

Adicionado em `Sidebar.vue` na seção **Eventos**:
- Ícone: `ki-filled ki-calendar`
- Submenu: "Calendário de Eventos" → `/events`

## 🔧 Instalação do FullCalendar

> ℹ️ **Nota:** Usamos CDN ao invés de NPM por simplicidade e para evitar problemas de configuração. Veja [FULLCALENDAR_CDN.md](../../../FULLCALENDAR_CDN.md) para mais detalhes.

O FullCalendar é carregado via CDN no `index.html`:

```html
<!-- FullCalendar -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.10/locales/pt-br.global.min.js"></script>
```

### Configuração no Componente

```typescript
calendar = new (window as any).FullCalendar.Calendar(calendarEl.value, {
  initialView: 'dayGridMonth',
  locale: 'pt-br',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  },
  editable: true,
  droppable: true,
  events: calendarEvents,
  dateClick: function(info) { /* ... */ },
  eventClick: function(info) { /* ... */ },
  eventDrop: async function(info) { /* ... */ },
  eventResize: async function(info) { /* ... */ },
});
```

## 📈 Recursos Especiais

### Drag & Drop Inteligente
- Arraste eventos para outras datas
- Atualização automática no service
- Reversão automática em caso de erro
- Feedback visual durante o arraste

### Resize de Eventos
- Redimensione eventos clicando e arrastando as bordas
- Ajusta automaticamente a duração
- Atualização automática no service

### Tooltip Dinâmico
Ao passar o mouse sobre um evento, exibe:
- Título
- Descrição
- Local (com ícone 📍)
- Responsável (com ícone 👤)
- Número de participantes (com ícone 👥)

### Eventos de Dia Inteiro
- Checkbox no formulário
- Remove campos de hora quando marcado
- Exibe corretamente no calendário

### Integração com Modal
- Modal do Metronic totalmente integrado
- Formulário validado com Zod
- Máscaras e formatação automática

## 🔄 Fluxo de Dados

```
1. Usuário clica em data → Modal abre com data pré-preenchida
2. Usuário preenche formulário → Validação Zod
3. Salvar → EventService.create()
4. Service atualiza mockData → Dispara evento 'event-updated'
5. EventCalendar escuta evento → Recarrega eventos
6. FullCalendar re-renderiza → Novo evento aparece
```

## 🎯 Casos de Uso

### Criar Evento Rápido
1. Clique em uma data vazia no calendário
2. Preencha título e tipo
3. Salve

### Reagendar Evento
1. Arraste o evento para nova data
2. Confirmação automática

### Ajustar Duração
1. Clique na borda do evento
2. Arraste para cima ou para baixo
3. Confirmação automática

### Editar Detalhes
1. Clique no evento
2. Modal abre com dados preenchidos
3. Edite e salve

## 🔄 Próximos Passos (Integração com API Real)

### 1. Atualizar o Service

```typescript
import { api } from '@/infra/lib/api';

const getAll = async (filters?) => {
  const response = await api.get('/api/events', { params: filters });
  return response.data;
};

const updateDates = async (id: string, start: string, end?: string) => {
  const response = await api.patch(`/api/events/${id}/dates`, { start, end });
  return response.data;
};
```

### 2. Implementar Recursos Adicionais

- ✅ Upload de anexos (fotos, documentos)
- ✅ Lista de participantes com check-in
- ✅ Integração com módulo de pessoas
- ✅ Notificações/lembretes
- ✅ Recorrência de eventos (semanal, mensal)
- ✅ Exportar para iCal/Google Calendar
- ✅ Impressão de programação
- ✅ Relatórios de frequência

### 3. Melhorias de UX

- Loading skeleton durante carregamento
- Confirmação antes de excluir
- Undo/Redo para drag & drop
- Filtros avançados (por tipo, responsável, local)
- Busca de eventos
- Zoom no calendário

## 📚 Exemplo de Uso

### Buscar Eventos

```vue
<script setup>
import { EventService } from '@/modules/events/services/event.service';

const eventService = EventService();

// Buscar todos
const { data } = await eventService.getAll();

// Buscar com filtros
const { data: filtered } = await eventService.getAll({
  type: 'culto',
  status: 'confirmado',
  start: '2026-03-01',
  end: '2026-03-31',
});
</script>
```

### Criar Evento

```vue
<script setup>
const newEvent = await eventService.create({
  title: 'Culto de Páscoa',
  description: 'Culto especial de Páscoa',
  start: '2026-04-20T10:00:00',
  end: '2026-04-20T12:00:00',
  type: 'culto',
  status: 'confirmado',
  location: 'Templo Principal',
  responsavel: {
    id: '1',
    nome: 'Pastor João',
  },
  participantes: 300,
});
</script>
```

### Atualizar Datas (Drag & Drop)

```vue
<script setup>
await eventService.updateDates(
  '1',
  '2026-03-25T10:00:00',
  '2026-03-25T12:00:00'
);
</script>
```

## 🎨 Personalização de Cores

Para alterar as cores dos tipos de evento, edite `EventColors` em `event.service.ts`:

```typescript
export const EventColors = {
  culto: '#sua-cor-aqui',
  reuniao: '#sua-cor-aqui',
  // ...
};
```

## 🌐 Internacionalização

O calendário está configurado para português brasileiro. Para alterar:

```typescript
calendar = new FullCalendar.Calendar(calendarEl.value, {
  locale: 'en', // ou outro idioma suportado
  // ...
});
```

Idiomas suportados: pt-br, en, es, fr, de, it, ja, ko, zh-cn, e mais.

## 📖 Referências

- [FullCalendar Docs](https://fullcalendar.io/docs)
- [Metronic FullCalendar Plugin](https://keenthemes.com/metronic/tailwind/docs/plugins/fullcalendar)
- [FullCalendar Vue](https://fullcalendar.io/docs/vue)
