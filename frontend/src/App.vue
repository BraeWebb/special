<template>
  <div>
    <sui-menu pointing secondary>
      <router-link to="/" is="sui-menu-item">Home</router-link>
      <router-link to="/queue" is="sui-menu-item">Queue</router-link>
      <router-link to="/allocate" is="sui-menu-item">Allocate</router-link>
      <router-link to="/investigate" is="sui-menu-item">Investigate</router-link>
      <sui-menu-menu position="right">
        <sui-dropdown item icon="user" simple>
          Mr Webb
          <sui-dropdown-menu>
            <router-link to="/logout" is="sui-dropdown-item">Logout</router-link>
          </sui-dropdown-menu>
        </sui-dropdown>
      </sui-menu-menu>
    </sui-menu>

    <div id="app">
    <router-view></router-view>
    </div>
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
