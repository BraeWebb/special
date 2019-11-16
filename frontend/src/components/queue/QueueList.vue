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
                    <a :href="'/queue/queue/' + row.id">
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
  import { ALL_QUEUE_PAGES } from "../../queries/queues";

  export default {
    name: 'QueuePageList',
    apollo: {
      pages: ALL_QUEUE_PAGES
    }
  }
</script>
