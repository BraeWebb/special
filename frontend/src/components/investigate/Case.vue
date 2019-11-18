<template>
    <div v-if="!loading" class="ui segment">
        <h2 class="ui header">{{item.report.title}} <h3 class="ui sub header">Case {{item.number}}</h3></h2>

        <a class="ui teal image label">
            {{item.lines}}
            <div class="detail">Lines Matched</div>
        </a>
        <a class="ui green image label">
            {{item.status}}
            <div class="detail">Status</div>
        </a>
        <br/>
        <br/>

        <div class="ui two column grid attached left aligned">
            <div class="ui column">
                <div class="ui segment">
                    <h3 class="ui header">{{item.student1.id}}<div class="ui label">{{item.student1.percent}}%</div></h3>
                    <span v-html="item.student1.script"></span>
                </div>
            </div>
            <div class="ui column">
                <div class="ui segment">
                    <h3 class="ui header">{{item.student2.id}}<div class="ui label">{{item.student2.percent}}%</div></h3>
                    <span v-html="item.student2.script"></span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
  import { GET_CASE } from "../../queries/cases";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let caseId = pathParts[pathParts.length - 1];
  let reportId = pathParts[pathParts.length - 3];

  export default {
    name: 'Case',
    mounted() {
      $('table').tablesort();
      // hljs.highlight();
    },
    data() {
      return {
        loading: 0,
      }
    },
    apollo: {
      item: {
        query: GET_CASE,
        variables: {
          number: parseInt(caseId),
          report: reportId
        }
      }
    }
  }
</script>
