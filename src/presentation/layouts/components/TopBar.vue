<template>
  <div class="topbar d-print-none">
    <div class="container-fluid px-md-4">
      <nav
        class="topbar-custom d-flex justify-content-between"
        id="topbar-custom"
      >
        <ul
          class="topbar-item list-unstyled d-inline-flex align-items-center mb-0"
        >
          <li>
            <button
              class="nav-link mobile-menu-btn nav-icon"
              id="togglemenu"
              @click="toggleLeftSideBar"
            >
              <i class="iconoir-menu-scale"></i>
            </button>
          </li>
<!--          <li class="mx-3 welcome-text">
            <h3 class="mb-0 fw-bold text-truncate">Olá, {{ userAuth?.name }}</h3>
            &lt;!&ndash; <h6 class="mb-0 fw-normal text-muted text-truncate fs-14">Here's your overview this week.</h6> &ndash;&gt;
          </li>-->
        </ul>
        <ul
          class="topbar-item list-unstyled d-inline-flex align-items-center mb-0"
        >
          <li class="topbar-item">
            <a
              class="nav-link nav-icon"
              href="javascript:void(0);"
              id="light-dark-mode"
              @click="toggleTheme"
            >
              <i class="icofont-sun dark-mode"></i>
              <i class="icofont-moon light-mode"></i>
            </a>
          </li>

          <DropDown is="li" custom-class="topbar-item">
            <a
              class="nav-link dropdown-toggle arrow-none nav-icon"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <img :src="avatar1" alt="" class="thumb-lg rounded-circle" />
            </a>
            <div class="dropdown-menu dropdown-menu-end py-0">
              <div
                class="d-flex align-items-center dropdown-item py-2 bg-secondary-subtle"
              >
                <div class="flex-shrink-0">
                  <img :src="avatar1" alt="" class="thumb-md rounded-circle" />
                </div>
                <div class="flex-grow-1 ms-2 text-truncate align-self-center">
                  <h6 class="my-0 fw-medium text-dark fs-13">{{ userAuth?.email }}</h6>
                  <small class="text-muted mb-0">Admin</small>
                </div>
              </div>
              <div class="dropdown-divider mt-0"></div>
              <small class="text-muted px-2 pb-1 d-block">Conta</small>
              <router-link class="dropdown-item" to="/">
                <i class="las la-user fs-18 me-1 align-text-bottom"></i>
                Profile
              </router-link>
<!--              <small class="text-muted px-2 py-1 d-block">Settings</small>
              <router-link class="dropdown-item" to="/">
                <i class="las la-cog fs-18 me-1 align-text-bottom"></i>
                Configurações
              </router-link>
              <router-link class="dropdown-item" to="/">
                <i
                  class="las la-question-circle fs-18 me-1 align-text-bottom"
                ></i>
                Ajuda
              </router-link>-->
              <div class="dropdown-divider mb-0"></div>
              <a href="javascript:" class="dropdown-item text-danger" @click="removeSession">
                <i class="las la-power-off fs-18 me-1 align-text-bottom"></i>
                Sair
              </a>
            </div>
          </DropDown>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import simplebar from "simplebar-vue";
import DropDown from "@/components/DropDown.vue";
import { useLayoutStore } from "@/stores/layout";

const show = ref("all-tab");
const useLayout = useLayoutStore();
const  { userAuth, removeSession  } = useAuthStore();
const { layout, setLeftSideBarSize } = useLayout;

const toggleTheme = () => {
  if (useLayout.layout.theme === "light") {
    return useLayout.setTheme("dark");
  }
  useLayout.setTheme("light");
};

const toggleLeftSideBar = () => {
  if (useLayout.layout.leftSideBarSize === "default") {
    return useLayout.setLeftSideBarSize("collapsed");
  }
  if (useLayout.layout.leftSideBarSize === "collapsed") {
    return useLayout.setLeftSideBarSize("default");
  }
};

const resize = () => {
  if (window.innerWidth < 1441) {
    setLeftSideBarSize("collapsed");
  } else {
    setLeftSideBarSize(
      layout.leftSideBarSize === "collapsed"
        ? "default"
        : layout.leftSideBarSize,
    );
  }
};

import usFlag from "@/assets/images/flags/us_flag.jpg";
import spainFlag from "@/assets/images/flags/spain_flag.jpg";
import germanyFlag from "@/assets/images/flags/germany_flag.jpg";
import frenchFlag from "@/assets/images/flags/french_flag.jpg";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import {useAuthStore} from "@/modules/auth/stores/auth";

const windowScroll = () => {
  const navbar = document.getElementById("topbar-custom");
  if (navbar) {
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
};

const leftSideBarClick = () => {
  window.addEventListener("click", (e: any) => {
    const startbar = document.getElementById("startbar");
    const togglemenu = document.getElementById("togglemenu");
    if (!(startbar && startbar.contains(e.target))) {
      if (window.innerWidth < 1441) {
        if (togglemenu && togglemenu.contains(e.target)) {
          setLeftSideBarSize("default");
        } else {
          setLeftSideBarSize("collapsed");
        }
      }
    }
  });
};

onMounted(() => {
  useLayout.init();
  resize();
  window.addEventListener("scroll", (ev) => {
    ev.preventDefault();
    windowScroll();
  });
  window.addEventListener("resize", () => {
    resize();
  });
  leftSideBarClick();
});
</script>
