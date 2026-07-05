import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import routes from '../../../ui/router/routes.ts';
import { useAuthStore } from '../../../modules/auth/stores/auth.ts';
// import { storeToRefs } from 'pinia';

const base = import.meta.env.BASE_URL || '/';

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
});


router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const requiresAuth = routeTo.matched.some((route) => route.meta.requiresAuth);

  // If auth isn't required for the route, just continue.
  if (!requiresAuth) return next();

  // If auth is required and the user is logged in...
  const useAuth = useAuthStore();
  if (useAuth.isAuthenticated()) {
    return next();
  }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin();

  function redirectToLogin() {
    // Pass the original route to the login component
    return  next({ name: "auth.login" });
  }
});

export default router;
