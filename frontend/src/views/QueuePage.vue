<template>
    <div id="queue">
        <div class="ui menu">
            <sui-dropdown item icon="book" simple>
                Queue
                <sui-dropdown-menu>
                    <a class="ui item" href="/queue/">List</a>
                    <a class="ui item" href="/queue/new">New</a>
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
    </div>
</template>

<script>
  import { ME } from '../queries/users';
  import QueuePageList from "../components/queue/QueueList";
  import Queue from "../components/queue/Queue";

  let display = "list";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});

  if (pathParts[pathParts.length - 1] === "new") {
    display = "new";
  }
  if (pathParts[pathParts.length - 2] === "queue") {
    display = "queue";
  }

  export default {
    name: 'QueuePage',
    components: {
      Queue,
      QueuePageList
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
