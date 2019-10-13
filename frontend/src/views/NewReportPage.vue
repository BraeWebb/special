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
        </keep-alive>
    </div>
</template>

<script>
  import NewReport from '../components/investigate/NewReport';
  import Console from '../components/investigate/Console';

  export default {
    name: 'NewReportPage',
    props: [
      'socket'
    ],
    components: {
      NewReport,
      Console,
    },
    data() {
      return {
        tabs: {
          "new": {id: "new", title: "New Report"},
          "log": {id: "log", title: "Console Log"},
        },
        currentTab: "new",

        logs: ["No logs yet... awaiting execution..."],

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
      this.socket.on("connect_error", this.socketDisconnect);

      this.socket.on("reconnect", this.socketReconnect);

      this.socket.on("log", (msg) => {
        this.logs.push(msg);
      });
    }
  }
</script>
