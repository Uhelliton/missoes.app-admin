<template>
  <BModal
    v-model="isOpen"
    :title="'Associar Membros: ' + team.name"
    title-class="m-0"
    size="lg"
    cancel-variant="outline-danger"
    @close="closeModal"
    :hideFooter="false"
  >
    <div class="row px-2 py-2 list-box">
      <div class="col-md-6">
        <h5>Membros Disponíveis</h5>
        <b-form-input v-model="searchQuery" placeholder="Filtrar membro..." class="mb-2" />
        <div class="scroll-box">
          <b-list-group>
            <b-list-group-item
              v-for="item in filteredAvailableItems"
              :key="`available-${item.id}`"
              :active="selectedAvailable.includes(item.id)"
              @click="toggleSelection(item.id, 'available')"
              button
              :disabled="item.teamMember !== null"
              class="position-relative mb-1"
            >
              <i class="la la-arrow-right text-secondary me-2"></i> {{ item.name }}
              <template v-if="item.teamMember !== null">
                <div class="position-absolute float-end" style="right: 5px; bottom: 4px">
                  <div class="d-flex align-items-center">
                    <span
                      class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle"
                    >
                      {{ getPrefixName(item.teamMember.team.name) }}
                    </span>
                  </div>
                </div>
              </template>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>

      <div class="col-md-1 d-flex flex-column justify-content-center align-items-center">
        <b-button class="mb-2" variant="primary" @click="moveToSelected"> &gt;&gt; </b-button>
        <b-button variant="danger" @click="moveToAvailable"> &lt;&lt; </b-button>
      </div>

      <div class="col-md-5">
        <h5>Membros <i class="la la-arrow-right text-secondary me-1"></i> {{ team.name }}</h5>
        <div class="scroll-box mt-4">
          <b-list-group>
            <b-list-group-item
              v-for="item in selectedItems"
              :key="item.id"
              :active="selectedSelected.includes(item.id)"
              @click="toggleSelection(item.id, 'selected')"
              button
              class="mb-1"
            >
              <i class="la la-arrow-left text-secondary me-2"></i> {{ item.name }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
    <template #ok>
      <b-button type="button" variant="primary" @click="onSubmit" :disabled="isLoading">
        <b-spinner small v-if="isLoading" />
        {{ isLoading ? 'Salvando...' : 'Confimar' }}
      </b-button>
    </template>
    <template #cancel>
      <b-button variant="outline-secondary" @click="closeModal">Cancelar</b-button>
    </template>
  </BModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRefs } from 'vue'
import type { IMember, IMemberSimplified } from '@/modules/team/types/member.interface'
import { MemberService } from '@/modules/team/services/member.service'
import { TeamService } from '@/modules/team/services/team.service'
import type { ITeam, ITeamMemberPayload } from '@/modules/team/types/team.interface'
import { useNotify } from '@/infra/composables/useNotify'
import { wait } from '@/infra/helpers/helper'

interface IProps {
  isOpen: boolean
  teamMembers: Array<IMemberSimplified>
  team: ITeam
}

const props = withDefaults(defineProps<IProps>(), {
  isOpen: false,
  teamMembers: [],
})

interface IEmits {
  (event: 'update:isOpen', value: boolean): void
  (event: 'close'): void
  (event: 'update:list', value: boolean): void
}
const emit = defineEmits<IEmits>()

const memberService = MemberService()
const { updateTeamMembers } = TeamService()
const notify = useNotify()

const { isOpen } = toRefs(props)
const searchQuery = ref('')
const selectedAvailable = ref([])
const selectedSelected = ref([])
const selected = ref<IMemberSimplified[]>([...props.teamMembers]) // copia
const items = ref<IMember[]>([])
const isLoading = ref(false)

watch(
  () => isOpen.value,
  async (value: boolean) => {
    if (value) {
      await fetchMembers()
      selected.value = [...props.teamMembers]
    }
  },
)

const fetchMembers = async () => {
  const response = await memberService.getAll({ limit: 500 })
  items.value = response.data.items
}

const availableItems = computed(() => {
  const selectedIds = selected.value.map(({ id }) => id)
  return items.value.filter((item) => !selectedIds.includes(item.id))
})

const filteredAvailableItems = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return availableItems.value.filter((item) => item.name.toLowerCase().includes(query))
})

const selectedItems = computed(() => selected.value)

function toggleSelection(id, listType) {
  const selected = listType === 'available' ? selectedAvailable : selectedSelected
  const index = selected.value.indexOf(id)
  if (index === -1) {
    selected.value.push(id)
  } else {
    selected.value.splice(index, 1)
  }
}

function moveToSelected() {
  const toAdd = items.value.filter((item) => selectedAvailable.value.includes(item.id))

  for (const member of toAdd) {
    if (!selected.value.some((s) => s.id === member.id)) {
      selected.value.push(member)
    }
  }

  selectedAvailable.value = []
}

function moveToAvailable() {
  selected.value = selected.value.filter((member) => !selectedSelected.value.includes(member.id))

  selectedSelected.value = []
}

const onSubmit = async () => {
  isLoading.value =  true

  try {
    const payload: ITeamMemberPayload = { memberIds: selectedItems.value.map(({ id }) => id) }
    await updateTeamMembers(props.team.id, payload)
    notify.success('Os membros foram atualizado com sucesso na equipe!')

    await wait()
    emit('update:list', true)
    closeModal()
  } catch (error) {
    const message = error.response?.data?.message
    notify.httpError(message)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
  emit('close')
}

const getPrefixName = (name: string) => {
  const split = name.split(' ')
  const strPart = String(split[1] || '').toUpperCase()
  return strPart[0] + strPart[1]
}
</script>

<style scoped lang="scss">
.list-box {
  .list-group-item {
    color: var(--bs-body-color);
    border-radius: 6px !important;
  }
  .list-group-item.disabled,
  .list-group-item:disabled {
    color: var(--bs-list-group-disabled-color) !important;
  }
}
.scroll-box {
  max-height: 340px;
  overflow-y: auto;
  border-radius: 0.25rem;
}
</style>
