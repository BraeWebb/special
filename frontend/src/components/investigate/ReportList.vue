<template>
    <div>
        <table class="ui sortable celled table left aligned" id="user-table">
            <thead>
            <tr>
                <th class="sorted descending">ID</th>
                <th>Title</th>
                <th>Generator</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="row in reports"
                v-bind:key="row.id">
                <td>{{row.id}}</td>
                <td>{{row.title}}</td>
                <td>{{row.generator.name}}</td>
                <td>
                    <a :href="row.url" target="_blank">
                        <button class="ui icon button" role="button">
                            <i class="globe right icon"></i>
                        </button>
                    </a>
                    <a :href="'/integrity/report/' + row.id">
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
  import { ALL_REPORTS, ALL_REPORTS_SUBSCRIPTION } from "../../queries/reports";

  export default {
    name: 'Report',
    apollo: {
      reports: {
        query: ALL_REPORTS,
        subscribeToMore: {
          document: ALL_REPORTS_SUBSCRIPTION,
          updateQuery: (previous, { subscriptionData }) => {
            const newReports = [
              subscriptionData.data.newReports,
              ...previous.reports
            ];
            return {
              ...previous,
              reports: newReports
            };
          }
        }
      }
    }
  }
</script>
