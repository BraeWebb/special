import Vue from 'vue'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue';
import App from './App.vue'
import Home from './views/Home.vue'
import Queue from './views/QueuePage.vue'
import AllocatePage from './views/allocation/AllocatePage.vue'
import InvestigatePage from './views/InvestigatePage.vue'
import QueueCustomizationPage from './views/QueueCustomizationPage.vue'
import VueCircleSlider from 'vue-circle-slider'

Vue.use(VueRouter);
Vue.use(SuiVue);
Vue.use(VueCircleSlider);

const routes = [
  { path: '/', component: Home },
  { path: '/queue', component: Queue },
  { path: '/allocate', component: AllocatePage },
  { path: '/investigate', component: InvestigatePage },
    { path: '/queue/customize', component: QueueCustomizationPage },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
