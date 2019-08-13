<template>
    <div>
        <h4>{{user.name}}
            <button v-on:click="leaveQueue">Leave</button>
        </h4>
    </div>
</template>


<script>
  export default {
    name: 'QueueItem',
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
