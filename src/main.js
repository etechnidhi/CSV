import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import Table from "./pages/Table.vue";
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import JsonExcel from 'vue-json-excel'
import store from "./store";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('downloadExcel', JsonExcel)
Vue.use(Vuetify)
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.config.productionTip = false

const routes = [
  { path: "/", component: Home },
  { path: "/table", component:Table}
];
const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App),
  store
}).$mount('#app')
