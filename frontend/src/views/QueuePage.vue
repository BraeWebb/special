<template>
    <div id="queue">
        <img alt="Vue logo" src="../assets/logo.png">
        <Queue
                v-bind:socket="socket"
                v-bind:config="queue"
                v-bind:user="user"
                v-bind:key="queue.id"
                v-for="queue in queues"
        />
    </div>
</template>

<script>
  import Queue from '../components/Queue.vue'
  import io from 'socket.io-client';

  export default {
    name: 'QueuePage',
    components: {
      Queue
    },
    data() {
      return {
        queues: [
          {
            "id": "left-queue",
            "title": "Left Magic Queue",
            "width": "40%",
            "height": "100%",
          },
          {
            "id": "right-queue",
            "title": "Right Magic Queue",
            "width": "40%",
            "height": "100%",
          }
        ],
        user: {
          id: Math.floor(Math.random() * 10),
          name: "Mr Webb"
        },
        socket: io("localhost:3000")
      };
    },
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
