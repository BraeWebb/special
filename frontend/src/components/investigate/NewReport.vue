<template>
    <div class="ui fluid attached container segment">
        <NewReportSteps v-if="steps.started" :steps.sync="steps" :result.sync="result"></NewReportSteps>
        <div v-else class="ui stackable two column grid">
            <div class="stretched row">
                <div class="column">
                    <div class="ui left icon fluid input">
                        <input type="text" v-model="report.title">
                        <i class="icon tag"></i>
                    </div>
                    <br/>
                    <sui-dropdown
                            placeholder="Select a Language"
                            selection
                            search
                            :options="languages"
                            v-model="report.language"
                    />
                    <br/>
                    <div class="ui left icon fluid input">
                        <input type="number" placeholder="Max Matches" v-model="report.maxMatches">
                        <i class="icon bullseye"></i>
                    </div>
                    <br/>
                    <div class="ui left icon fluid input">
                        <input type="number" placeholder="Max Cases" v-model="report.maxCases">
                        <i class="icon thermometer full"></i>
                    </div>
                </div>
                <UploadBox :socket="socket" :logs.sync="logs" @uploaded="fileUploaded"></UploadBox>
            </div>
            <sui-button class="ui fluid primary button attached"
                        :disabled="!(uploaded && report.language != null)"
                        v-on:click="submitReport()">
                Submit
            </sui-button>
        </div>
    </div>
</template>

<script>
  import UploadBox from '../UploadBox';
  import NewReportSteps from '../investigate/NewReportSteps';

  export default {
    name: 'NewReport',
    components: {
      UploadBox,
      NewReportSteps
    },
    props: [
      'socket',
      'logs'
    ],
    data() {
      return {
        languages: [
          {
            text: 'Java',
            value: "java",
          },
          {
            text: 'Python',
            value: "python",
          },
          {
            text: 'C',
            value: "c",
          }
        ],

        uploaded: false,

        report: {
          language: null,
          maxMatches: 10,
          maxCases: 250,
          title: "Untitled",
          reportPath: null
        },

        steps: {
          started: false,
          queued: false,
          accepted: false,
          extracted: false,
          sent: false,
          generated: false,
          parsed: false,
        },
        result: null
      }
    },
    methods: {
      fileUploaded(fileInfo) {
        this.uploaded = true;
        this.report.reportPath = fileInfo.name;
      },

      submitReport() {
        this.steps.started = true;
        this.logs.push("Report submitted: " + this.report.toString());
        this.socket.emit("generate", {report: this.report})
      },

      reportGenerated(data) {
        this.result = data;
      },

      updateStep(step) {
        return (data) => {
          this.logs.push("Report " + step + ".");
          this.steps[step] = true;
        };
      }
    },
    mounted() {
      this.socket.on("queued", this.updateStep("queued"));
      this.socket.on("accepted", this.updateStep("accepted"));
      this.socket.on("extracted", this.updateStep("extracted"));
      this.socket.on("sent", this.updateStep("sent"));
      this.socket.on("generated", this.updateStep("generated"));
      this.socket.on("parsed", this.updateStep("parsed"));

      this.socket.on("generated", this.reportGenerated);

      this.socket.emit("getLanguages");
      this.socket.on("languages", (languages) => {
        this.languages = languages;
      });
    }
  }
</script>

<style>
    .hide {
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
</style>
