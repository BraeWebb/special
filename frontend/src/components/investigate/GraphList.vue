<template>
    <div v-if="!loading" class="ui segment">
        <h2 class="ui header">{{report.title}}</h2>

        <table class="ui sortable celled table left aligned" id="user-table">
            <thead>
            <tr>
                <th class="sorted descending">Min Percent</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="row in 100"
                v-bind:key="row">
                <td>{{row}}</td>
                <td>
                    <a :href="'/public/images/' + reportId + '/' + row + '.png'">
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
  import { GET_REPORT } from "../../queries/reports";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let reportId = pathParts[pathParts.length - 2];

  export default {
    name: 'GraphList',
    data() {
      return {
        reportId: reportId,
        loading: 0
      }
    },
    apollo: {
      report: {
        query: GET_REPORT,
        variables: {
          id: reportId
        }
      }
    }
  }
</script>
