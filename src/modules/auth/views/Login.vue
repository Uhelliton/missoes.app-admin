<template>
  <b-col lg="4" class="mx-auto">
    <b-card no-body>
      <b-card-body class="p-0 bg-black auth-header-box rounded-top">
        <div class="text-center p-3">
          <img :src="logoSm" height="50" alt="logo" class="auth-logo" />
          <h4 class="mt-3 mb-1 fw-semibold text-white fs-18">
           Missões
          </h4>
        </div>
      </b-card-body>
      <b-card-body class="pt-0">
        <b-form class="my-4" @submit.prevent="login">
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
import { ref, reactive, computed, onBeforeMount } from "vue";

import logoSm from "@/assets/images/logo-sm.png";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import router from "@/core/router";

import { useAuthStore } from "@/modules/auth/stores/auth";
import { useRoute } from "vue-router";
import { AuthService } from '../services/auth.service'
import {useNotify} from "@/infra/composables/useNotify";

const { authenticate } = AuthService()
const useAuth = useAuthStore();
const route = useRoute();
const query = route.query;
const notify = useNotify()

const error = ref("");
const credentials = reactive({
  email: "",
  password: "",
});

const vuelidateRules = computed(() => ({
  email: { required, email },
  password: { required },
}));

const v = useVuelidate(vuelidateRules, credentials);

onBeforeMount(() => {
  if (useAuth.isAuthenticated) {
    router.push("/dashboard")
  }
})

const login = async () => {
  const result = await v.value.$validate()
  if (!result) return

  try {
    const payload = { password: credentials.password, username: credentials.email }
    const response = await authenticate(payload)
    useAuth.saveSession({
       ...response.data,
       token: response.data.token,
      });

    router.push("/dashboard")
  } catch (error) {
    const message = error.response?.data?.message
    notify.httpError(message)
  }
}

</script>
