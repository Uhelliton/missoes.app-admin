<template>
  <div
    :id="id"
    :class="[{ hidden: !isActive }, className]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string; // ID do painel (ex: "tab_1")
  isActive?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  className: '',
});
</script>
