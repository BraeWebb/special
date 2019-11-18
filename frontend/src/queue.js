import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import VueApollo from 'vue-apollo';
import VueCircleSlider from 'vue-circle-slider';
import QueuePage from './views/QueuePage.vue';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

Vue.use(SuiVue);
Vue.use(VueApollo);
Vue.use(VueCircleSlider);

Vue.component('time-since',{
  template:`
<span>{{days}} days {{hours}} hours {{minutes}} minutes {{seconds}} seconds</span>
`,
  data() {
    return {
      interval:null,
      days:0,
      hours:0,
      minutes:0,
      seconds:0,
      intervals:{
        second: 1000,
        minute: 1000 * 60,
        hour: 1000 * 60 * 60,
        day: 1000 * 60 * 60 * 24
      }
    }
  },
  props:{
    date:{
      required:true
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.updateDiffs();
    },1000);

    this.updateDiffs();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods:{
    updateDiffs() {
      //lets figure out our diffs
      let diff = Math.abs(Date.now() - this.date.getTime());
      this.days = Math.floor(diff / this.intervals.day);
      diff -= this.days * this.intervals.day;
      this.hours = Math.floor(diff / this.intervals.hour);
      diff -= this.hours * this.intervals.hour;
      this.minutes = Math.floor(diff / this.intervals.minute);
      diff -= this.minutes * this.intervals.minute;
      this.seconds = Math.floor(diff / this.intervals.second);
    }
  }
});

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
