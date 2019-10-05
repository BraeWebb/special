<template>
    <div class="ui segment">

    </div>
</template>


<script>
  export default {
    name: 'Report',
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
    }
  }
</script>
