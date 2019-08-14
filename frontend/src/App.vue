<template>
  <div id="app">
    <sui-menu pointing secondary>
      <router-link to="/" is="sui-menu-item">Home</router-link>
      <router-link to="/queue" is="sui-menu-item">Queue</router-link>
      <sui-menu-menu position="right">
        <router-link to="/logout"
                is="sui-menu-item"
                content="Logout"
                @click="select('Logout')"
        />
      </sui-menu-menu>
    </sui-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
