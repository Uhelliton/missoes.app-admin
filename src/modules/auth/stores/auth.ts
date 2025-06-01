import { defineStore } from "pinia";
import router from "@/core/router";
import { useLocalStorage } from "@vueuse/core";
import type { User } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage<string | null>("app_user", null);
  const token = useLocalStorage<string | null>("app_token", null);

  const saveSession = (newUser: User) => {
    user.value = JSON.stringify(newUser);
    token.value = String(newUser.token)
  };

  const removeSession = () => {
    user.value = null;
    router.push("/auth/login");
  };

  const isAuthenticated = () => user.value != null;

  return {
    user,
    saveSession,
    removeSession,
    isAuthenticated,
  };
});
