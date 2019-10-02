<template>
    <div id="investigate">
        <div class="ui top attached tabular menu">
            <div class="active item">{{report.title}}</div>
        </div>
        <div class="ui fluid attached container segment">
            <div v-if="uploading.uploadError !== null" class="ui active inverted dimmer">
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
            </div>
            <br/>

        </div>
        <sui-button class="ui fluid primary button attached"
                :disabled="!(uploading.uploadState === UploadState.COMPLETED && report.language != null)"
                v-on:click="submitReport()">
            Submit
        </sui-button>
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

  let socket = io("localhost:3050");

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

        socket: socket
      }
    },
    methods: {
      socketDisconnect(err) {
        this.uploading.uploadError = err;
      },

      socketReconnect(attempts) {
        this.uploading.uploadError = null;
      },

      handleFileUpload() {
        this.uploading.file = this.$refs.file.files[0];
        this.uploading.uploadState = UploadState.FILE_SELECTED;
      },

      uploadFile() {
        var uploader = new SocketIOFileClient(this.socket);

        let report = this.report;
        let state = this.uploading;

        uploader.on('ready', function() {
          uploader.upload([state.file]);
        });

        uploader.on('start', function(fileInfo) {
          state.uploadState = UploadState.UPLOADING;
          state.fileInfo = fileInfo;
          state.displayUpload = false;
        });
        uploader.on('stream', function(fileInfo) {
          state.progress = Math.round((fileInfo.sent / fileInfo.size) * 100);
        });
        uploader.on('complete', function(fileInfo) {
          state.uploadState = UploadState.COMPLETED;
          report.reportPath = fileInfo.name;
        });

        uploader.on('abort', function(fileInfo) {
          state.uploadState = UploadState.ABORTED;
        });

        uploader.on('error', function(error, fileInfo) {
          state.uploadState = UploadState.ERROR;
        });
      },

      submitReport() {
        this.socket.emit("generate", {report: this.report})
      }
    },
    mounted() {
      socket.on("connect_error", this.socketDisconnect);

      socket.on("reconnect", this.socketReconnect);
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
