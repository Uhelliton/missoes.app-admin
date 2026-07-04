import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createBootstrap } from 'bootstrap-vue-next'
import VueApexCharts from "vue3-apexcharts";
import { MaskInput } from "vue-mask-next";
import MasonryWall from "@yeger/vue-masonry-wall";
import { QuillEditor } from '@vueup/vue-quill';
import flatPickr from 'vue-flatpickr-component';
import VueECharts from 'vue-echarts';
import PDF from 'pdf-vue3';
import SimpleTypeahead from 'vue3-simple-typeahead';
import Vidle from 'v-idle';

import '~/ui/theme/app.scss'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './infra/lib/router';

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(createBootstrap())
app.use(router)
app.component('VueApexCharts', VueApexCharts);
app.component("MaskInput", MaskInput);
app.use(MasonryWall);
app.component('QuillEditor', QuillEditor)
app.component('FlatPickr', flatPickr);
app.component('VueECharts', VueECharts);
app.component('PDF', PDF);
app.component('SimpleTypeahead', SimpleTypeahead);
app.component('Vidle', Vidle);

app.mount('#app')
