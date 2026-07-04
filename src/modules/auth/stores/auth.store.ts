import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { computed } from 'vue';
import { AuthService } from '../services/auth.service';
import type { AuthPayload, AuthResponse, User } from '../interfaces/auth.interface';
import router from '../../../infra/lib/router';

export const useAuthStore = defineStore("auth", () => {
  const authService = AuthService()
  const user = useLocalStorage<User | null>("inuvy_user", null);
  const token = useLocalStorage<string | null>("inuvy_token", null);

  const checkAuth = () => {
    // Verifique se há um token armazenado e se ele é válido
    // Isso é útil para persistir a sessão após recarregar a página

    // Opcional: verificar se o token está expirado ou é válido com o backend
    return !!token.value;
  };


  const authenticate = async (payload: AuthPayload) => {
    try {
      const response = await authService.authenticate<AuthResponse>(payload);
      const auth = response.data as AuthResponse;

      user.value = JSON.stringify(auth.user);
      token.value = String(auth.token);

      return auth;
    } catch (error) {
      throw error;
    }
  };

  const userAuth = computed(() => {
    if (!user.value) return null;
    try {
      return JSON.parse(user.value as string) as User;
    } catch {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem('inuvy_user')
    localStorage.removeItem('inuvy_token')
    user.value = null;
    token.value = null;
    router.push('/');
  };

  const isAuthenticated = computed(() => user.value != null);

  const isAdmin = computed(() => {
    const userData = userAuth.value;
    return userData?.roles?.some(role => role.name === 'admin') ?? false;
  })

  return {
    user,
    authenticate,
    logout,
    checkAuth,
    isAuthenticated,
    isAdmin,
    userAuth,
  };
});
