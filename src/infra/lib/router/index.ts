import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import routes from '../../../ui/router/routes.ts';
import { useAuthStore } from '../../../modules/auth/stores/auth.store.ts';
import { storeToRefs } from 'pinia';

const base = import.meta.env.BASE_URL || '/';

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated, isAdmin } = storeToRefs(authStore);

  // Força verificação de autenticação
  authStore.checkAuth();

  // Permitir acesso à página de login
  if (to.path === '/' && !isAuthenticated.value) {
    next();
    return;
  }

  // Usuário autenticado tentando acessar login → redirecionar
  if (to.path === '/' && isAuthenticated.value) {
    if (isAdmin.value) {
      next('/dashboard');
    } else {
      // Não é admin → fazer logout e mostrar erro
      authStore.logout();
      // Opcional: adicionar mensagem de erro
      alert('Acesso negado. Apenas administradores podem acessar este sistema.');
      next('/');
    }
    return;
  }

  // Rota requer autenticação
  if (to.meta.requiresAuth) {
    if (!isAuthenticated.value) {
      next('/');
      return;
    }

    // Autenticado mas não é admin → logout
    if (!isAdmin.value) {
      authStore.logout();
      alert('Acesso negado. Apenas administradores podem acessar este sistema.');
      next('/');
      return;
    }
  }

  // Permitir navegação
  next();
});

export default router;
