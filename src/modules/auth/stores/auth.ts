import { defineStore } from "pinia";
import router from "@/core/router";
import { useSessionStorage } from "@vueuse/core";
import type { User } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = useSessionStorage<string | null>("MISSION_USER", null);

  const saveSession = (newUser: User) => {
    user.value = JSON.stringify(newUser);
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
