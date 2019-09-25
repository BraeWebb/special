<template>
    <!--<div id="card-container" class="card-group-container">-->
    <!--<div id="card-container" class="ui container center aligned">-->
        <div id="queue" class="card-group">
            <!--<img alt="Vue logo" src="../assets/logo.png">-->
            <sui-card-group :items-per-row="2" v-bind:style="'width:100%'">
                <Queue
                        v-bind:socket="socket"
                        v-bind:config="queue"
                        v-bind:user="user"
                        v-bind:key="queue.id"
                        v-for="queue in queues"
                />
            </sui-card-group>
        </div>
    <!--</div>-->
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
            "id": "quick",
            "title": "Quick Questions",
            "width": "45%",
            "height": "100%",
          },
          {
            "id": "long",
            "title": "Long Questions",
            "width": "45%",
            "height": "100%",
          }
        ],
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
