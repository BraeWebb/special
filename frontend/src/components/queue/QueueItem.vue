<template>
    <sui-table-row>
        <sui-table-cell>{{user.user.name}}</sui-table-cell>
        <sui-table-cell>{{user.questions_asked}}</sui-table-cell>
        <sui-table-cell>{{user.joined}}</sui-table-cell>
        <sui-table-cell v-if="user.signed_on"><i class="check icon"></i></sui-table-cell>
        <sui-table-cell v-else><i class="close icon"></i></sui-table-cell>
        <sui-table-cell v-if="config.isAdmin" collapsing text-align="right">
          <div class="ui icon buttons">
            <button class="ui positive button" v-on:click="kickQueue(config.id, user.user.id)"><i class="check icon"></i></button>
            <button class="ui negative button" v-on:click="kickQueue(config.id, user.user.id)"><i class="close icon"></i></button>
          </div>
        </sui-table-cell>
    </sui-table-row>
</template>


<script>
  import { KICK_QUEUE } from "../../queries/queues";

  export default {
    name: 'QueueItem',
    components: {},
    props: [
      "config",
      "user",
      "socket"
    ],
    methods: {
      kickQueue(queue, user) {
        console.log(user);
        console.log(queue);
        this.$apollo.mutate({
          mutation: KICK_QUEUE,
          variables: {
            queue: queue,
            user: user
          }
        })
      }
    }
  }
</script>
