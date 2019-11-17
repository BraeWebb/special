<template>
    <sui-table-row>
        <sui-table-cell>{{user.user.name}}</sui-table-cell>
        <sui-table-cell>{{user.questions_asked}}</sui-table-cell>
        <sui-table-cell>{{user.joined}}</sui-table-cell>
        <sui-table-cell v-if="user.signed_on"><i class="check icon"></i></sui-table-cell>
        <sui-table-cell v-else><i class="close icon"></i></sui-table-cell>
        <sui-table-cell collapsing text-align="right">
          <!--<div class="ui icon buttons">-->
            <!--<button class="ui positive button" v-on:click="leaveQueue"><i class="check icon"></i></button>-->
            <!--<button class="ui negative button" v-on:click="leaveQueue"><i class="close icon"></i></button>-->
          <!--</div>-->
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
