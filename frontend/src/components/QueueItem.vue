<template>
    <sui-table-row>
        <sui-table-cell>{{user.name}}</sui-table-cell>
        <sui-table-cell>{{user.questions_asked}}</sui-table-cell>
        <sui-table-cell>{{user.join_time}}</sui-table-cell>
        <sui-table-cell collapsing text-align="right">
            <sui-button primary v-on:click="leaveQueue">Leave</sui-button>
        </sui-table-cell>
    </sui-table-row>
</template>


<script>
  export default {
    name: 'QueueItem',
    components: {},
    props: [
      "config",
      "user",
      "socket"
    ],
    methods: {
      leaveQueue(e) {
        e.preventDefault();

        this.socket.emit('leave', {
          user: this.user,
          queue: this.config.id
        });
      },
    }
  }
</script>

<style scoped>
</style>
