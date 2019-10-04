<template>
    <div id="services">
        <div class="ui cards">
            <div v-for="service in services"
                 v-bind:key="service.id"
                 class="ui card">
                <div class="content">
                    <div class="header">{{service.name}}</div>
                </div>
                <div class="content">
                    <div class="ui segment">
                        <h4 class="ui header">{{service.servicetypeByType.name}}</h4>
                        <p>{{service.servicetypeByType.description}}</p>
                    </div>
                </div>
                <div class="extra content">
                    <div class="ui label green">
                        Up
                    </div>
                    <div class="ui label">
                        Admin
                    </div>
                </div>
                <button class="ui attached primary button">Manage</button>
                <router-link :to="service.endpoint" is="sui-button">Launch</router-link>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'Services',
    props: [
      "services",
    ],
    components: {
    },
  }
</script>

<style scoped>
</style>
