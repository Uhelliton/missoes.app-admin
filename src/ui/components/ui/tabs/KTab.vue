<template>
  <button
    :class="['kt-tab-toggle', { active: isActive }, className]"
    :data-kt-tab-toggle="target"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  target: string; // ID do painel alvo (ex: "#tab_1")
  isActive?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  className: '',
});

interface Emits {
  (e: 'click', event: MouseEvent): void;
}

const emit = defineEmits<Emits>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>
