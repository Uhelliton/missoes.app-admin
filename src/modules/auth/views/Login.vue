<template>
  <b-col lg="4" class="mx-auto">
    <b-card no-body>
      <b-card-body class="p-0 bg-black auth-header-box rounded-top">
        <div class="text-center p-3">
          <router-link to="/" class="logo logo-admin">
            <img :src="logoSm" height="50" alt="logo" class="auth-logo" />
          </router-link>
          <h4 class="mt-3 mb-1 fw-semibold text-white fs-18">
           Missões 360
          </h4>
        </div>
      </b-card-body>
      <b-card-body class="pt-0">
        <b-form class="my-4" @submit.prevent="handleLogin">
          <b-form-group class="mb-2" label="Email" label-for="username">
            <b-form-input
              type="text"
              placeholder="email"
              v-model="v.email.$model"
            />
            <div v-if="v.email.$error" class="text-danger">
              <span v-for="(err, idx) in v.email.$errors" :key="idx">
                {{ err.$message }}
              </span>
            </div>
          </b-form-group>

          <b-form-group class="mb-2" label="Senha">
            <b-form-input
              type="password"
              placeholder="password"
              v-model="v.password.$model"
            />
            <div v-if="v.password.$errors" class="text-danger">
              <span v-for="(err, idx) in v.password.$errors" :key="idx">
                {{ err.$message }}
              </span>
            </div>
          </b-form-group>

          <div class="form-group row mt-3">
            <b-col sm="6">
              <div class="form-switch-success">
                <b-form-checkbox switch>Remember me</b-form-checkbox>
              </div>
            </b-col>
          </div>

          <b-form-group class="mb-0 row">
            <b-col cols="12">
              <div class="d-grid mt-3">
                <b-button variant="primary" type="submit"
                  >Entrar <i class="fas fa-sign-in-alt ms-1"></i
                ></b-button>
              </div>
            </b-col>
          </b-form-group>
        </b-form>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";

import logoSm from "@/assets/images/logo-sm.png";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import HttpClient from "@/infra/helpers/http-client";
import { useAuthStore } from "@/modules/auth/stores/auth";
import { useRoute } from "vue-router";

import type { AxiosResponse } from "axios";
import type { User } from "@/types/auth";
import router from "@/core/router";

const credentials = reactive({
  email: "user@email.com",
  password: "password",
});

const vuelidateRules = computed(() => ({
  email: { required, email },
  password: { required },
}));

const v = useVuelidate(vuelidateRules, credentials);

const useAuth = useAuthStore();
const route = useRoute();
const query = route.query;

const error = ref("");

const handleLogin = async () => {
  const result = await v.value.$validate();

  if (result) {
    try {
      const res: AxiosResponse<User> = await HttpClient.post(
        "/sign-in",
        credentials,
      );

      if (res.data.token) {
        useAuth.saveSession({
          ...res.data,
          token: res.data.token,
        });
        redirectUser();
      }
    } catch (e: any) {
      if (e.response?.data?.error) {
        if (error.value.length == 0) error.value = e.response?.data?.error;
      }
    }
  }
};

const redirectUser = () => {
  if (query.redirectedFrom) {
    return router.push(`${query.redirectedFrom}`);
  }
  return router.push("/");
};
</script>
