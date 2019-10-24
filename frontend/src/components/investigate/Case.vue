<template>
    <div class="ui two column grid segment attached left aligned">
        <div class="ui column">
            <div class="ui segment">
                <h3 class="ui header">{{data.student1}}<div class="ui label">{{data.student1Percent}}%</div></h3>
                <div v-for="(file, name) in code[0]">
                    <div class="ui top attached tabular menu">
                        <div class="active item">
                            {{name}}
                        </div>
                    </div>
                    <pre style="margin: 0px"><code class="java">
{{file}}
                </code></pre>
                    <br/>
                </div>
            </div>
        </div>
        <div class="ui column">
            <div class="ui segment">
                <h3 class="ui header">{{data.student2}}<div class="ui label">{{data.student2Percent}}%</div></h3>
              <div v-for="(file, name) in code[1]">
                  <div class="ui top attached tabular menu">
                      <div class="active item">
                          {{name}}
                      </div>
                  </div>
                  <pre style="margin: 0px"><code class="java">
{{file}}
                </code></pre>
                  <br/>
              </div>

            </div>
        </div>
    </div>
</template>


<script>
  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let caseId = pathParts[pathParts.length - 1];
  let reportId = pathParts[pathParts.length - 3];

  export default {
    name: 'Case',
    props: ['socket'],
    mounted() {
      $('table').tablesort();

      this.socket.emit("getCase", {report: reportId, case: caseId});
      this.socket.on("case", (scripts) => {
        this.data = scripts[0];
        let stu1Code = "{}";
        if (scripts[1] !== null) {
          stu1Code = scripts[1]["content"];
        }
        let stu2Code = "{}";
        if (scripts[2] !== null) {
          stu2Code = scripts[2]["content"];
        }
        this.code = [JSON.parse(stu1Code), JSON.parse(stu2Code)];
        document.querySelectorAll('pre code').forEach((block) => {
          console.log(block);
          hljs.highlightBlock(block);
        });
      });
    },
    data() {
      return {
        data: {
          student1: "Loading...",
          student2: "Loading...",
          student1Percent: "Loading...",
          student2Percent: "Loading...",
        },
        code: []
      }
    }
  }
</script>
