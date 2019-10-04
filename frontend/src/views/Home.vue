<template>
    <div id="home">
        <div class="ui segment">
            <h2 class="ui header">Special Topics Deployment Hub</h2>

            <p>
                Welcome to the special topics deployment hub.
            </p>
            <p>
                From here you are able to specify the dynamic deployment
                of application servers and manage user and group permissions.
            </p>

            <div class="ui button primary">
                Deploy Service
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Home',
    props: [
      "services",
    ],
    components: {
    },
  }
</script>

<style scoped>
</style>
