<template>
    <div class="ui fluid attached container segment">
        <NewReportSteps v-if="steps.started" :report="report" :steps.sync="steps" :result.sync="result"></NewReportSteps>
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
                        <input type="number" placeholder="Max Matches (default: 10)" v-model="report.maxMatches">
                        <i class="icon bullseye"></i>
                    </div>
                    <br/>
                    <div class="ui left icon fluid input">
                        <input type="number" placeholder="Max Cases (default: 200)" v-model="report.maxCases">
                        <i class="icon thermometer full"></i>
                    </div>
                </div>
                <div class="column">
                    <UploadBox :text="'Upload submissions zip'" @uploaded="fileUploaded"></UploadBox>
                    <UploadBox :text="'Upload base files'" @uploaded="baseFilesUploaded"></UploadBox>
                </div>
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
  import { GET_LANGUAGES } from '../../queries/languages';
  import { GENERATE_REPORT, STEP_SUBSCRIPTION } from '../../queries/reports';
  import UploadBox from '../UploadBox';
  import NewReportSteps from '../investigate/NewReportSteps';

  export default {
    name: 'NewReport',
    components: {
      UploadBox,
      NewReportSteps
    },
    data() {
      return {
        languages: [],

        uploaded: false,

        report: {
          language: null,
          maxMatches: null,
          maxCases: null,
          title: "Untitled",
          file: null,
          base: null
        },

        steps: {
          cases: 0,
          started: false,
          accepted: false,
          extracted: false,
          sent: false,
          generated: false,
          parsed: false,
          fin: false,
        },
        result: null
      }
    },
    methods: {
      fileUploaded(fileInfo) {
        this.uploaded = true;
        this.report.file = fileInfo.filename;
      },

      baseFilesUploaded(fileInfo) {
        this.report.base = fileInfo.filename;
      },

      submitReport() {
        this.steps.started = true;
        this.$apollo.mutate({
          mutation: GENERATE_REPORT,
          variables: this.report
        }).then(data => {
          this.subToSteps(data.data.requestReport);
        });
      },

      subToSteps(data) {
        const observer = this.$apollo.subscribe({
          query: STEP_SUBSCRIPTION,
          variables: {
            id: data.id
          }
        });

        let state = this;

        observer.subscribe({
          next (data) {
            data = data.data.steps;

            if (data.step === "generated") {
              state.result = data.url
            }

            state.steps[data.step] = true
          },
          error (error) {
            console.error(error)
          },
        })
      },

      caseParsed(data) {
        this.steps.cases += 1;
      }
    },
    apollo: {
      languages: GET_LANGUAGES,
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
