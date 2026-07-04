<template>
	<component v-if="ready" :is="layout">
		<router-view />
	</component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefaultLayout from '@/ui/layouts/default.vue';
import AuthLayout from '@/ui/layouts/AuthLayout.vue';
import { useLayout } from '~/stores/layout'

const route = useRoute();
const router = useRouter();
const layoutStore = useLayout()

const ready = ref(false);

const layout = computed(() => {
	return route.meta.layout === 'auth' ? AuthLayout : DefaultLayout;
});

// waits for the first navigation to be ready
onMounted(async () => {
	await router.isReady();
	ready.value = true;
});
</script>
