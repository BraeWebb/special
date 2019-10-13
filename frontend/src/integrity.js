import Vue from 'vue'
import SuiVue from 'semantic-ui-vue';
import InvestigatePage from './views/InvestigatePage.vue'

Vue.use(SuiVue);

new Vue({
  render: h => h(InvestigatePage)
}).$mount('#app');
