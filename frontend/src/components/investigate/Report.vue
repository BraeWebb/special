<template>
    <div v-if="!loading" class="ui segment">
        <h2 class="ui header">{{report.title}}</h2>
        <a class="ui teal image label">
            {{report.generator.name}}
            <div class="detail">Generator</div>
        </a>
        <a class="ui green image label">
            {{report.url}}
            <div class="detail">URL</div>
        </a>
        <a class="ui blue image label">
            {{reportId}}
            <div class="detail">ID</div>
        </a>
        <a class="ui yellow image label">
            {{report.status}}
            <div class="detail">Status</div>
        </a>
        <a class="ui yellow image label" :href="'/integrity/report/' + reportId + '/graphs'">
            <i class="image icon"></i>
            <div class="detail">Graphs</div>
        </a>

        <table class="ui sortable celled table left aligned" id="user-table">
            <thead>
            <tr>
                <th class="sorted descending">ID</th>
                <th>Student #1</th>
                <th>Percent Match</th>
                <th>Student #2</th>
                <th>Percent Match</th>
                <th>Lines Matched</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="row in report.cases"
                v-bind:key="row.number">
                <td>{{row.number}}</td>
                <td class="center aligned">{{row.student1.id}}</td>
                <td :data-sort-value="row.student1.percent" class="center aligned">{{row.student1.percent}}%</td>
                <td class="center aligned">{{row.student2.id}}</td>
                <td :data-sort-value="row.student2.percent" class="center aligned">{{row.student2.percent}}%</td>
                <td :data-sort-value="row.lines" class="center aligned">{{row.lines}}</td>
                <td>
                    <a :href="'/integrity/report/' + reportId + '/case/' + row.number">
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
    let reportId = pathParts[pathParts.length - 1];

    export default {
    name: 'Report',
    data() {
      return {
        reportId: reportId,
        loading: 0
      }
    },
    mounted() {
      $('table').tablesort();
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
