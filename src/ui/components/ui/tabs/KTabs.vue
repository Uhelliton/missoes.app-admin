<template>
  <div
    ref="tabsRef"
    :class="['kt-tabs', variantClass, className]"
    data-kt-tabs="true"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { KTTabs } from '@/ui/theme/init';
import { KInput } from '~/ui/components'

interface Props {
  variant?: 'line' | 'pill' | 'outline';
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'line',
  className: '',
});

const tabsRef = ref<HTMLElement | null>(null);

const variantClass = computed(() => {
  const variants = {
    line: 'kt-tabs-line',
    pill: 'kt-tabs-pill',
    outline: 'kt-tabs-outline',
  };
  return variants[props.variant];
});

onMounted(() => {
  nextTick(() => {
    if (tabsRef.value && !tabsRef.value.hasAttribute('data-kt-tabs-initialized')) {
      try {
        new (KTTabs as any)(tabsRef.value);
        tabsRef.value.setAttribute('data-kt-tabs-initialized', 'true');
      } catch (e) {
        console.warn('Erro ao inicializar KTTabs:', e);
      }
    }
  });
});
</script>
