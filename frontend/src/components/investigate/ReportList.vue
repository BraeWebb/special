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
                <td>{{row.userByGenerator.name}}</td>
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
  export default {
    name: 'Report',
    props: [
      "socket"
    ],
    data() {
      return {
        reports: []
      }
    },
    mounted() {
      this.socket.emit("getReports");
      this.socket.on("reports", (reports) => {
        this.reports = reports;
      });
    }
  }
</script>
