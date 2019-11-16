import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import VueApollo from 'vue-apollo';
import QueuePage from './views/QueuePage.vue';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

Vue.use(SuiVue);
Vue.use(VueApollo);

const httpLink = new HttpLink({
  uri: 'http://0.0.0.0:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://0.0.0.0:4000/graphql',
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: link,
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
  render: h => h(QueuePage),
  apolloProvider: apolloProvider,
}).$mount('#app');
