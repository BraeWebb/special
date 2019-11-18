<template>
    <div id="queue">
        <div class="ui menu">
            <sui-dropdown item icon="book" simple>
                Queue
                <sui-dropdown-menu>
                    <a class="ui item" href="/queue/">List</a>
                </sui-dropdown-menu>
            </sui-dropdown>

            <div v-if="!loading" class="ui secondary menu right">
                <sui-dropdown item icon="user" simple>
                    {{me.name}}
                    <sui-dropdown-menu>
                        <a class="ui item" href="/profile">Profile</a>
                        <a class="ui item" href="/logout">Logout</a>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>
        </div>

        <QueuePageList v-if="display === 'list'"></QueuePageList>
        <Queue v-if="display === 'queue'"></Queue>
        <QueuePageConfig v-if="display === 'page'"></QueuePageConfig>
        <QueueConfig v-if="display === 'config'"></QueueConfig>
    </div>
</template>

<script>
  import { ME } from '../queries/users';
  import QueuePageList from "../components/queue/QueueList";
  import Queue from "../components/queue/Queue";
  import QueueConfig from "../components/queue/QueueConfig";
  import QueuePageConfig from "../components/queue/QueuePageConfig";

  let display = "list";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});

  if (pathParts[pathParts.length - 1] === "new") {
    display = "new";
  }
  if (pathParts[pathParts.length - 2] === "queue") {
    display = "queue";
  }
  if (pathParts[pathParts.length - 2] === "page") {
    display = "page";
  }
  if (pathParts[pathParts.length - 2] === "config") {
    display = "config";
  }

  export default {
    name: 'QueuePage',
    components: {
      QueuePageConfig,
      Queue,
      QueuePageList,
      QueueConfig
    },
    data() {
      return {
        display: display,
        loading: 0
      }
    },
    apollo: {
      me: ME
    }
  }
</script>

<style>
    #queue {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
