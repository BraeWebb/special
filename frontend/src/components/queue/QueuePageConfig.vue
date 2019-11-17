<template>
    <div v-if="!loading">
        <div class="ui form">
            <h3>Title</h3>
            <div class="field">
                <input type="text" autocomplete="off" :value="page.title">
            </div>
        </div>
        <table class="ui sortable celled table left aligned" id="user-table">
            <thead>
            <tr>
                <th class="sorted descending">ID</th>
                <th>Title</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="row in page.queues"
                v-bind:key="row.id">
                <td>{{row.id}}</td>
                <td>{{row.title}}</td>
                <td>
                    <a :href="'/queue/config/' + row.id">
                        <button class="ui icon button" role="button">
                            <i class="angle right icon"></i>
                        </button>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import { GET_QUEUE_PAGE_CONFIG } from '../../queries/queues';

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let queueId = pathParts[pathParts.length - 1];

  export default {
    name: "QueuePageConfig",
    data() {
      return {
        loading: 0
      }
    },
    apollo: {
      page: {
        query: GET_QUEUE_PAGE_CONFIG,
        variables: {
          id: queueId
        }
      }
    }
  }
</script>

<style scoped>

</style>
