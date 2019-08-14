import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Queue from './views/QueuePage.vue'

Vue.use(VueRouter);


const routes = [
  { path: '/', component: Home },
  { path: '/queue', component: Queue }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
