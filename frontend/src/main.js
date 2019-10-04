import Vue from 'vue'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue';
import App from './App.vue'
import Home from './views/Home.vue'
import Queue from './views/QueuePage.vue'
import AllocatePage from './views/allocation/AllocatePage.vue'
import InvestigatePage from './views/InvestigatePage.vue'
import Services from './views/Services.vue'
import Users from './views/Users.vue'
import Profile from './views/Profile.vue'

Vue.use(VueRouter);
Vue.use(SuiVue);


let services = [
  {
    "id": "rMdbVHPmCW0",
    "name": "CSSE1001 Queue",
    "endpoint": "/queue", // TODO temp
    "host": "localhost",
    "port": "3000",
    "servicetypeByType": {
      "name": "Queue",
      "description": "Question Queue"
    }
  },
  {
    "id": "tZNBy-BdM2A",
    "name": "ITEE MoSS Management",
    "endpoint": "/investigate", // TODO temp
    "host": "localhost",
    "port": "3050",
    "servicetypeByType": {
      "name": "MoSS",
      "description": "Generate MoSS Reports"
    }
  },
  {
    "id": "???", // TODO no backend for allocation yet...
    "name": "Tutor Allocation",
    "endpoint": "/allocate", // TODO temp
    "host": "localhost",
    "port": "????",
    "servicetypeByType": {
      "name": "Allocate",
      "description": "Tutor allocation system"
    }
  }
];


const routes = [
  { path: '/', component: Home, props: {services: services} },
  { path: '/queue', component: Queue },
  { path: '/allocate', component: AllocatePage },
  { path: '/investigate', component: InvestigatePage },
  { path: '/users', component: Users },
  { path: '/services', component: Services, props: {services: services} },
  { path: '/profile', component: Profile },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
