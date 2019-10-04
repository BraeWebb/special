<template>
  <div>
    <sui-menu pointing secondary>
      <router-link to="/" is="sui-menu-item">Home</router-link>
      <router-link to="/services" is="sui-menu-item">Services</router-link>
      <router-link to="/users" is="sui-menu-item">Users</router-link>
      <router-link to="/groups" is="sui-menu-item">Groups</router-link>

      <sui-menu-menu position="right">
        <sui-dropdown item icon="d" simple>
          🐨 Brae Webb <div class="ui label red">Admin</div>
          <sui-dropdown-menu>
            <router-link to="/profile" is="sui-dropdown-item">Profile</router-link>
            <router-link to="/settings" is="sui-dropdown-item">Settings</router-link>
            <router-link to="/admin" is="sui-dropdown-item">Admin Settings</router-link>
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
