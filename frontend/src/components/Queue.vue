<template>
  <sui-card id="queue" v-bind:style="'width:' + config.width + '; height:' + config.height">
    <sui-card-content>
      <sui-card-header>
        <h1>{{config.title}}</h1>
      </sui-card-header>
    </sui-card-content>

    <sui-button positive attached="bottom" v-on:click="joinQueue" style="background-color: #00FAA4; color: #005236;">
      <sui-icon name="add" /> Join
    </sui-button>

    <sui-card-content>
      <sui-table basic="very" celled>
        <sui-table-header>
          <tr>
            <th>Name</th>
            <th>Questions asked</th>
            <th>Wait time</th>
            <th></th>
          </tr>
        </sui-table-header>
        <sui-table-body>
          <QueueItem
                  v-for="waiter in waiting"
                  v-bind:key="waiter.id"
                  v-bind:user="waiter"

                  v-bind:config="config"
                  v-bind:socket="socket"
          />
        </sui-table-body>
      </sui-table>
    </sui-card-content>
  </sui-card>
</template>


<script>
import QueueItem from "./QueueItem";

export default {
  name: 'Queue',
  components: {
    QueueItem
  },
  props: [
    "config",
    "socket",
    "user"
  ],
  data() {
    return {
      waiting: []
    }
  },
  methods: {
    joinQueue(e) {
      e.preventDefault();

      this.socket.emit('join', {
        user: {
          id: Math.floor(Math.random() * 3000), // Simulate random users joining
          name: "Mr Maybe",
          questions_asked: 0,
          join_time: new Date().toLocaleString(),
        },
        queue: this.config.id
      });
    },
  },
  mounted() {
    this.socket.on('update', (data) => {
      if (data["queue"] === this.config.id) {
        this.waiting = Object.values(data["waiting"]);
      }
    });
  }
}
</script>

<style scoped>
    #queue {
        float: left;
    }
</style>
