<template>
  <div class="container-xxl">
    <b-row class="vh-100 d-flex justify-content-center">
      <b-col cols="12" class="align-self-center">
        <b-card-body>
          <b-row>
            <b-col lg="4" class="mx-auto">
              <b-card no-body>
                <b-card-body class="p-0 bg-black auth-header-box rounded-top">
                  <div class="text-center p-3">
                    <router-link to="/" class="logo logo-admin">
                      <img :src="logoSm" height="50" alt="logo" class="auth-logo" />
                    </router-link>
                    <h4 class="mt-3 mb-1 fw-semibold text-white fs-18">
                      Oops! Sorry page does not found
                    </h4>
                    <p class="text-muted fw-medium mb-0">Back to dashboard </p>
                  </div>
                </b-card-body>
                <b-card-body class="pt-0">
                  <div class="ex-page-content text-center">
                    <img :src="error" alt="0" class="" height="170" />
                    <h1 class="my-2">404!</h1>
                    <h5 class="fs-16 text-muted mb-3">Somthing went wrong</h5>
                  </div>
                  <router-link class="btn btn-primary w-100" to="/"
                  >Back to Dashboard <i class="fas fa-redo ms-1"></i
                  ></router-link>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-card-body>
      </b-col>
    </b-row>
  </div>
</template>
<script setup lang="ts">
import logoSm from "@/assets/images/logo-sm.png";
import error from "@/assets/images/extra/error.svg";

import AuthLayout from "@/presentation/layouts/AuthLayout.vue";
</script>
