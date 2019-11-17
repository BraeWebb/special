<template>
    <div>
        <table class="ui sortable celled table left aligned" id="user-table">
            <thead>
            <tr>
                <th class="sorted descending">ID</th>
                <th>Title</th>
                <th>Owner</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="row in pages"
                v-bind:key="row.id">
                <td>{{row.id}}</td>
                <td>{{row.title}}</td>
                <td>{{row.owner.name}}</td>
                <td>
                    <a :href="'/queue/page/' + row.id">
                        <button class="ui icon button" role="button">
                            <i class="cog icon"></i>
                        </button>
                    </a>
                    <a :href="'/queue/queue/' + row.id">
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
                <input type="text" placeholder="Page Title" v-model="newQueuePageTitle"/>
                <div class="ui button" @click="newQueue">New Page</div>
            </div>
        </div>
    </div>
</template>

<script>
  import { ALL_QUEUE_PAGES, NEW_QUEUE_PAGE } from "../../queries/queues";

  export default {
    name: 'QueuePageList',
    data() {
      return {
        newQueuePageTitle: ""
      }
    },
    methods: {
      newQueue() {
        this.$apollo.mutate({
          mutation: NEW_QUEUE_PAGE,
          variables: {
            title: this.newQueuePageTitle
          }
        }).then(data => {
          this.newQueuePageTitle = "";
          this.$apollo.queries.pages.refetch();
        });
      }
    },
    apollo: {
      pages: ALL_QUEUE_PAGES
    }
  }
</script>
