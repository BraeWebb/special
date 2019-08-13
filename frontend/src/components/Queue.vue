<template>
  <div id="queue" v-bind:style="'width:' + config.width + '; height:' + config.height">
    <h1>{{config.title}}
    <br/>
    <button v-on:click="joinQueue">Join</button>
    </h1>
      <p>{{config}}</p>
      <p>{{waiting}}</p>
      <QueueItem
              v-for="waiter in waiting"
              v-bind:key="waiter.id"
              v-bind:user="waiter"

              v-bind:config="config"
              v-bind:socket="socket"
      />
  </div>
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
          name: "Mr Webb"
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
