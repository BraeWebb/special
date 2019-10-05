<template>
    <div id="investigate">
        <div class="ui top attached tabular menu">
            <a class="item"
               v-for="tab in tabs"
               v-bind:key="tab.id"
               v-bind:class="{active: currentTab === tab.id}"
               v-on:click="currentTab = tab.id">
                {{tab.title}}
            </a>
        </div>

        <keep-alive>
        <NewReport v-if="currentTab === 'new'" :socket="socket" :logs.sync="logs"></NewReport>
        <Console v-else-if="currentTab === 'log'" :logs.sync="logs"></Console>
        <Report v-else-if="currentTab === 'report'"></Report>
        </keep-alive>
    </div>
</template>

<script>
  import io from 'socket.io-client';

  import NewReport from '../components/investigate/NewReport';
  import Console from '../components/investigate/Console';
  import Report from '../components/investigate/Report';

  let host = process.env.VUE_APP_MOSS_HOST ? process.env.VUE_APP_MOSS_HOST : "localhost";
  let port = process.env.VUE_APP_MOSS_PORT ? process.env.VUE_APP_MOSS_PORT : "3050";
  let socket = io(host + ":" + port);

  export default {
    name: 'InvestigatePage',
    components: {
      NewReport,
      Console,
      Report
    },
    data() {
      return {
        tabs: {
          "new": {id: "new", component: NewReport, title: "Untitled"},
          "log": {id: "log", component: Console, title: "Console Log"},
          "report": {id: "report", component: Report, title: "Example Report"},
        },
        currentTab: "new",

        logs: ["No logs yet... awaiting execution..."],

        socket: socket,
        error: null
      }
    },
    methods: {
      socketDisconnect(err) {
        this.error = err;
        this.logs.push("Lost backend connection...");
      },

      socketReconnect(attempts) {
        this.error = null;
        this.logs.push("Re-established connection!");
      },
    },
    mounted() {
      socket.on("connect_error", this.socketDisconnect);

      socket.on("reconnect", this.socketReconnect);

      socket.on("log", (msg) => {
        this.logs.push(msg);
      });
    }
  }
</script>
