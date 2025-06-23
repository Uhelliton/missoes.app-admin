import { defineStore } from "pinia";
import router from "@/core/router";
import { useLocalStorage } from "@vueuse/core";
import type { User } from "@/types/auth";
import {computed} from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage<string | null>("app_user", null);
  const token = useLocalStorage<string | null>("app_token", null);

  const saveSession = (newUser: User) => {
    user.value = JSON.stringify(newUser);
    token.value = String(newUser.token)
  };

  const userAuth = computed(() => {
    const session = JSON.parse(user.value)
    return session?.user
  })

  const isAdministrator = computed(() => {
    return userAuth.value?.tenancy.name === 'Administrador'
  })

  const isTenancyTeam = computed(() => {
    return userAuth.value?.tenancy.name === 'Equipe'
  })


  const removeSession = () => {
    localStorage.removeItem('app_user')
    localStorage.removeItem('app_token')
    user.value = null;
    router.push({ name: 'auth.login' });
  };

  const isAuthenticated = () => user.value != null;

  return {
    user,
    saveSession,
    removeSession,
    isAuthenticated,
    userAuth,
    isTenancyTeam,
    isAdministrator,
  };
});
