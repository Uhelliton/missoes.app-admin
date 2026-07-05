<template>
  <div class="position-absolute top-0 end-0">
    <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
  </div>

  <div class="position-absolute start-0 bottom-0" style="transform: rotate(180deg)">
    <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
  </div>
  <div class="auth-box d-flex align-items-center">
    <BContainer fluid="xxl">
      <BRow class="align-items-center justify-content-center">
        <BCol xl="10">
          <BCard no-body class="rounded-4">
            <BRow class="justify-content-between g-0">
              <BCol lg="6">
                <BCardBody class="position-relative">
                  <div class="auth-brand text-center mb-4 position-relative">
                    <AuthLogo />
                    <h4 class="fw-bold mt-3">Que bom te ver por aqui!</h4>
                    <p class="text-muted w-lg-75 mx-auto">Vamos efetuar o seu login. Digite seu e-mail e senha para continuar.</p>
                  </div>
                  <BForm @submit.prevent="onSubmit">
                    <div class="mb-3">
                      <label for="userEmail" class="form-label">
                        Email
                        <span class="text-danger">*</span>
                      </label>
                      <div class="app-search">
                        <BFormInput
                          v-model="username"
                          type="email"
                          id="userEmail"
                          placeholder="email@demo.com"
                          :class="{ 'is-invalid': errors.username }"
                        />
                        <Icon icon="mail" class="app-search-icon text-muted" />
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="userPassword" class="form-label">
                        Senha
                        <span class="text-danger">*</span>
                      </label>
                      <div class="app-search">
                        <BFormInput
                          v-model="password"
                          type="password"
                          id="userPassword"
                          placeholder="••••••••"
                          :class="{ 'is-invalid': errors.password }"
                        />
                        <Icon icon="lock-password" class="app-search-icon text-muted" />
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <BFormCheckbox name="termAndPolicy"> Manter-me conectado </BFormCheckbox>
                    </div>

                    <div class="d-grid">
                      <BButton type="submit" variant="primary" class="fw-semibold py-2"> Login</BButton>
                    </div>
                  </BForm>

                  <p class="text-center text-muted mt-4 mb-0">
                    © 2026
                  </p>
                </BCardBody>
              </BCol>

              <BCol lg="6" class="d-none d-lg-block">
                <div class="h-100 position-relative card-side-img rounded-end overflow-hidden" style="background-image: url(/images/auth.jpg)">
                  <div class="p-4 card-img-overlay rounded-end auth-overlay d-flex align-items-end justify-content-center" />
                </div>
              </BCol>
            </BRow>
          </BCard>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import router from "@/infra/lib/router";

import { useAuthStore } from "@/modules/auth/stores/auth";
import { useRoute } from "vue-router";
import { AuthService } from '../services/auth.service'
import { useToast } from "@/infra/composables/useToast";

const { authenticate } = AuthService()
const useAuth = useAuthStore();
const route = useRoute();
const query = route.query;
const notify = useToast()

const error = ref("");

const loginSchema = z.object({
  username: z.string().min(1).email('Email inválido'),
  password: z.string().min(6)
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    username: '',
    password: '',
  }
});

// Conectar os campos ao Vee-Validate
const { value: username } = useField('username');
const { value: password } = useField('password');

onBeforeMount(() => {
  if (useAuth.isAuthenticated) {
    router.push("/dashboard")
  }
})

const onSubmit = handleSubmit(async (formValues) => {
  try {
    const response = await authenticate(formValues)
    useAuth.saveSession({
       ...response.data,
       token: response.data.token,
      });

    router.push("/dashboard")
  } catch (error) {
    const message = error.response?.data?.message
    notify.httpError(message)
  }
});

</script>
