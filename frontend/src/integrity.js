import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import VueApollo from 'vue-apollo';
import InvestigatePage from './views/InvestigatePage.vue';

import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

Vue.use(SuiVue);
Vue.use(VueApollo);

const graphqlPort = process.env.VUE_APP_GRAPHQL_PORT || "";
const graphql = window.location.hostname + ":" + graphqlPort + "/graphql";

const httpLink = new createUploadLink({
  uri: 'http://' + graphql
});

const wsLink = new WebSocketLink({
  uri: 'ws://' + graphql,
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
  render: h => h(InvestigatePage),
  apolloProvider: apolloProvider,
}).$mount('#app');
