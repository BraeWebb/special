<template>
  <sui-card :id="config.id" v-bind:style="'width:' + config.width + '; height:' + config.height" class="ui container center aligned">
    <sui-card-content>
      <sui-card-header>
        <h1>{{config.title}}</h1>
      </sui-card-header>
    </sui-card-content>

    <sui-button v-if="!joined" positive attached="bottom" v-on:click="joinQueue" class="spring-green-button">
      <sui-icon name="add" /> Join
    </sui-button>
    <sui-button v-if="joined" attached="bottom" v-on:click="leaveQueue" color="red">
      <sui-icon name="minus" /> Leave
    </sui-button>

    <sui-card-content>
      <sui-table basic="very" celled>
        <sui-table-header>
          <tr>
            <th>Name</th>
            <th>Questions asked</th>
            <th>Wait time</th>
            <th>Signed on</th>
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
    "user",
  ],
  data() {
    return {
      waiting: [],
      joined: false
    }
  },
  methods: {
    updateJoined(inverse) {
      return (data) => {
        this.joined = data["queue"] === this.config.id;
        if (inverse && this.joined) {
          this.joined = !this.joined;
        }
      }
    },
    joinQueue(e) {
      e.preventDefault();

      this.socket.emit('join', {
        user: {
          id: Math.floor(Math.random() * 3000), // Simulate random users joining
          name: "Mr Maybe",
          questions_asked: 0,
          signed_on: true,
          join_time: new Date().toLocaleString(),
        },
        queue: this.config.id
      });
    },
    leaveQueue(e) {
      e.preventDefault();

      this.socket.emit('leave', {
        user: this.user,
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
    this.socket.on('joined', this.updateJoined(false));
    this.socket.on('left', this.updateJoined(true));
  }
}
</script>

<!--<style scoped>-->
    <!--#queue {-->
        <!--float: left;-->
    <!--}-->
<!--</style>-->
