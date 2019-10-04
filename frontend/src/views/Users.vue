<template>
    <table class="ui sortable celled table left aligned" id="user-table">
        <thead>
        <tr>
            <th class="sorted descending">ID</th>
            <th>Prefix</th>
            <th>Full Name</th>
            <th></th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="user in users"
            v-bind:key="user.id">
            <td>{{user.id}}</td>
            <td class="center aligned">{{user.prefix}}</td>
            <td>{{user.name}}</td>
            <td>
                <div v-if="user.admin" class="ui red label">
                    Admin
                </div>
                <div v-if="user.groups !== undefined" class="ui label">
                    <i class="icon group"></i>
                    Groups
                    <div class="detail">{{user.groups}}</div>
                </div>
                <div v-if="user.services !== undefined" class="ui label">
                    <i class="icon server"></i>
                    Services
                    <div class="detail">{{user.services}}</div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>

  let users = [
    {
      "id": "s4434180",
      "name": "Henry OBrien",
      "services": 9
    },
    {
      "id": "s4435400",
      "name": "Brae Webb",
      "prefix": "🐨",
      "admin": true
    },
    {
      "id": "s4439491",
      "name": "Emily Bennett",
      "services": 4,
      "groups": 10
    }
    ,
    {
      "id": "s4261833",
      "name": "Nicholas Lambourne",
      "groups": 1
    }
  ];

  export default {
    name: 'Users',
    data() {
      return {
        users: users
      }
    },
    mounted() {
      $('table').tablesort()
    }
  }
</script>

<style scoped>
</style>
