<template>
    <div id="investigate">
        <div class="ui top attached tabular menu">
            <a class="item" v-bind:class="{active: !displayConsole}" v-on:click="displayConsole = false">{{report.title}}</a>
            <a class="item" v-bind:class="{active: displayConsole}" v-on:click="displayConsole = true">Console Log</a>
        </div>

        <div v-if="!displayConsole" class="ui fluid attached container segment">
            <div v-if="steps.started">
                <div class="ui ordered vertical steps">
                    <div class="step" v-bind:class="{completed: steps.queued}">
                        <div class="content">
                            <div class="title">Job Queued</div>
                            <div class="description">Waiting for processor to accept</div>
                        </div>
                    </div>
                    <div class="step" v-bind:class="{completed: steps.accepted}">
                        <div class="content">
                            <div class="title">Job Started</div>
                            <div class="description">Job accepted by processor</div>
                        </div>
                    </div>
                    <div class="step" v-bind:class="{completed: steps.extracted}">
                        <div class="content">
                            <div class="title">Submissions Extracted</div>
                            <div class="description">Uploaded zip has been extracted</div>
                        </div>
                    </div>
                    <div class="step" v-bind:class="{completed: steps.sent}">
                        <div class="content">
                            <div class="title">Submissions Sent</div>
                            <div class="description">Submissions sent to MoSS</div>
                        </div>
                    </div>
                    <div class="step" v-bind:class="{completed: steps.generated}">
                        <div class="content">
                            <div class="title">Report Generated</div>
                            <div class="description">Report URL Generated</div>
                        </div>
                    </div>
                </div>
                <br/>

                <div v-if="result !== null" class="ui steps">
                    <div class="step">
                        <div class="content">
                            <div class="title">Result</div>
                            <div class="description"><a :href="result" target="_blank">{{result}}</a></div>
                        </div>
                    </div>
                </div>

            </div>

            <div v-else-if="uploading.uploadError !== null" class="ui active inverted dimmer">
                Error connecting to backend: {{uploading.uploadError}}
                <div class="ui loader"></div>
            </div>

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
                        <input type="text" placeholder="Max Matches" v-model="report.maxMatches">
                        <i class="icon bullseye"></i>
                    </div>
                </div>
                <div class="column">
                    <div class="ui segment attached" style="display: flex; align-items: center">
                        <div v-if="!uploading.displayUpload" style="width: 100%;">
                            <sui-progress id="progress" progress :percent="uploading.progress" :state="uploading.uploadState">
                            </sui-progress>
                        </div>

                        <label v-else class="fluid" style="width: 100%; height: 100%;">
                            <i class="large archive file outline icon"></i>
                            <span v-if="uploading.uploadState === UploadState.NOT_STARTED">Upload a submissions zip</span>
                            <span v-if="uploading.uploadState === UploadState.FILE_SELECTED">{{uploading.file.name}}</span>
                            <input class="hide" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                        </label>
                    </div>
                    <button class="ui button attached"
                            v-if="uploading.displayUpload"
                            v-on:click="uploadFile()">
                        Upload
                    </button>
                </div>
                </div>
                <sui-button class="ui fluid primary button attached"
                            :disabled="!(uploading.uploadState === UploadState.COMPLETED && report.language != null)"
                            v-on:click="submitReport()">
                    Submit
                </sui-button>
            </div>
        </div>


        <div v-else class="ui fluid attached container inverted segment" style="text-align:left">
            <p v-for="log in logs"
               :key="log">
                {{log}}
            </p>
        </div>
    </div>
</template>

<script>
  import io from 'socket.io-client';
  import SocketIOFileClient from 'socket.io-file-client';

  const UploadState = {
    NOT_STARTED: 'not_started',
    FILE_SELECTED: 'file_selected',
    UPLOADING: 'active',
    ABORTED: 'warning',
    ERROR: 'error',
    COMPLETED: 'success'
  };

  let host = process.env.VUE_APP_MOSS_HOST ? process.env.VUE_APP_MOSS_HOST : "localhost";
  let port = process.env.VUE_APP_MOSS_PORT ? process.env.VUE_APP_MOSS_PORT : "3050";
  let socket = io(host + ":" + port);

  export default {
    name: 'InvestigatePage',
    data() {
      return {
        UploadState: UploadState,

        uploading: {
          file: '',
          uploadState: UploadState.NOT_STARTED,
          displayUpload: true,
          progress: 0,
          uploadError: null
        },

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

        report: {
          language: null,
          maxMatches: 10,
          title: "Untitled",
          reportPath: null
        },

        steps: {
          started: false,
          queued: false,
          accepted: false,
          extracted: false,
          sent: false,
          generated: false
        },
        result: null,

        displayConsole: false,
        logs: ["No logs yet... awaiting execution..."],

        socket: socket
      }
    },
    methods: {
      socketDisconnect(err) {
        this.uploading.uploadError = err;
        this.logs.push("Lost backend connection...");
      },

      socketReconnect(attempts) {
        this.uploading.uploadError = null;
        this.logs.push("Re-established connection!");
      },

      handleFileUpload() {
        this.uploading.file = this.$refs.file.files[0];
        this.uploading.uploadState = UploadState.FILE_SELECTED;
        this.logs.push("Selected file: " + this.uploading.file.name);
      },

      uploadFile() {
        var uploader = new SocketIOFileClient(this.socket);

        let logs = this.logs;
        let report = this.report;
        let state = this.uploading;

        uploader.on('ready', function() {
          uploader.upload([state.file]);
        });

        uploader.on('start', function(fileInfo) {
          logs.push("Began uploading file: " + state.file.name);
          state.uploadState = UploadState.UPLOADING;
          state.fileInfo = fileInfo;
          state.displayUpload = false;
        });
        uploader.on('stream', function(fileInfo) {
          logs.push("Uploading file (" + fileInfo.sent + "/" + fileInfo.size + "): " + state.file.name);
          state.progress = Math.round((fileInfo.sent / fileInfo.size) * 100);
        });
        uploader.on('complete', function(fileInfo) {
          logs.push("File uploaded: " + state.file.name);
          state.progress = 100;
          state.uploadState = UploadState.COMPLETED;
          report.reportPath = fileInfo.name;
        });

        uploader.on('abort', function(fileInfo) {
          logs.push("Aborted uploading file: " + state.file.name);
          state.uploadState = UploadState.ABORTED;
        });

        uploader.on('error', function(error, fileInfo) {
          logs.push("Error occurred when uploading: " + state.file.name);
          state.uploadState = UploadState.ERROR;
        });
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
      socket.on("connect_error", this.socketDisconnect);

      socket.on("reconnect", this.socketReconnect);

      socket.on("log", function(msg) {
        this.logs.push(msg);
      });

      socket.on("queued", this.updateStep("queued"));
      socket.on("accepted", this.updateStep("accepted"));
      socket.on("extracted", this.updateStep("extracted"));
      socket.on("sent", this.updateStep("sent"));
      socket.on("generated", this.updateStep("generated"));

      socket.on("generated", this.reportGenerated);
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
