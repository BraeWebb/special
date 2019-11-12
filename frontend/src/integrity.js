import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import VueApollo from 'vue-apollo';
import InvestigatePage from './views/InvestigatePage.vue';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(SuiVue);
Vue.use(VueApollo);

const httpLink = new HttpLink({
  uri: 'http://0.0.0.0:4000/graphql'
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
});


new Vue({
  render: h => h(InvestigatePage),
  provide: apolloProvider.provide(),
}).$mount('#app');
