<template>
    <div class="ui segment">
        <h2 class="ui header">{{report.title}}</h2>
        <a class="ui teal image label">
            {{report.userByGenerator.name}}
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

            <tr v-for="row in report.casesByReport.nodes"
                v-bind:key="row.id">
                <td>{{row.id}}</td>
                <td class="center aligned">{{row.student1}}</td>
                <td :data-sort-value="row.student1Percent" class="center aligned">{{row.student1Percent}}%</td>
                <td class="center aligned">{{row.student2}}</td>
                <td :data-sort-value="row.student2Percent" class="center aligned">{{row.student2Percent}}%</td>
                <td :data-sort-value="row.lines" class="center aligned">{{row.lines}}</td>
                <td>
                    <a :href="'/integrity/report/' + reportId + '/case/' + row.id">
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
    let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
    let reportId = pathParts[pathParts.length - 1];

    export default {
    name: 'Report',
    props: [
      'socket'
    ],
    data() {
      return {
        reportId: reportId,
        report: {
          title: "Loading...",
          generator: "",
          url: "",
          casesByReport: {
            nodes: []
          }
        },
      }
    },
    mounted() {
      $('table').tablesort();

      this.socket.emit("getReport", {id: reportId});
      this.socket.on("report", (report) => {
        this.report = report;
      });
    }
  }
</script>
