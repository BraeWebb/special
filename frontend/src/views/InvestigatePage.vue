<template>
    <div id="investigate">
        <div class="ui menu">
            <sui-dropdown item icon="book" simple>
                Reports
                <sui-dropdown-menu>
                    <a class="ui item" href="/integrity/">List</a>
                    <a class="ui item" href="/integrity/new">New</a>
                </sui-dropdown-menu>
            </sui-dropdown>

            <div class="ui secondary menu right">
                <sui-dropdown item icon="user" simple>
                    Mr Webb
                    <sui-dropdown-menu>
                        <a class="ui item" href="/logout">Logout</a>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>
        </div>

        <ReportList v-if="display === 'list'" :socket="socket"></ReportList>
        <NewReportPage v-else-if="display === 'new'" :socket="socket"></NewReportPage>
        <Report v-else-if="display === 'report'"></Report>
        <Case v-else-if="display === 'case'"></Case>
    </div>
</template>

<script>
  import io from 'socket.io-client';

  import ReportList from '../components/investigate/ReportList';
  import Report from '../components/investigate/Report';
  import Case from '../components/investigate/Case';
  import NewReportPage from "./NewReportPage";

  let host = process.env.VUE_APP_MOSS_HOST ? process.env.VUE_APP_MOSS_HOST : "localhost";
  let port = process.env.VUE_APP_MOSS_PORT ? process.env.VUE_APP_MOSS_PORT : "3050";
  let socket = io(host + ":" + port);

  let display = "list";

  let pathParts = window.location.pathname.split("/");
  if (pathParts[pathParts.length - 1] === "new") {
    display = "new";
  }

  export default {
    name: 'InvestigatePage',
    components: {
      NewReportPage,
      ReportList,
      Report,
      Case
    },
    data() {
      return {
        display: display,
        socket: socket,
      }
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
