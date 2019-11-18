<template>
    <div v-if="!loading">
        <div class="ui form">
            <h3>Title</h3>
            <div class="field">
                <div class="ui action input fluid">
                    <input type="text" autocomplete="off" :value="page.title">
                    <div class="ui button" @click="updateTitle">Save</div>
                </div>
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
        <div class="field">
            <div class="ui action input fluid">
                <input type="text" placeholder="Queue Title" v-model="newQueueTitle"/>
                <div class="ui button" @click="newQueue">Add Queue</div>
            </div>
        </div>
    </div>
</template>

<script>
  import { GET_QUEUE_PAGE_CONFIG, NEW_QUEUE } from '../../queries/queues';

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let queueId = pathParts[pathParts.length - 1];

  export default {
    name: "QueuePageConfig",
    data() {
      return {
        newQueueTitle: "",
        loading: 0
      }
    },
    methods: {
      updateTitle() {

      },
      newQueue() {
        this.$apollo.mutate({
          mutation: NEW_QUEUE,
          variables: {
            page: queueId,
            title: this.newQueueTitle
          }
        }).then(data => {
          this.$apollo.queries.page.refetch();
          this.newQueueTitle = "";
        })
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
