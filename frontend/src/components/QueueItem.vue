<template>
    <sui-table-row>
        <sui-table-cell>{{user.name}}</sui-table-cell>
        <sui-table-cell>{{user.questions_asked}}</sui-table-cell>
        <sui-table-cell>{{user.join_time}}</sui-table-cell>
        <sui-table-cell collapsing text-align="right">
            <sui-button primary v-on:click="leaveQueue" style="background-color: #00FAA4; color: #005236;"><sui-icon name="check"/></sui-button>
            <sui-button primary v-on:click="leaveQueue" style="background-color: #cf0000; color: #ffe3e3;"><sui-icon name="close icon" style="font-size: inherit;"/></sui-button>
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
