<template>
    <div class="column">
        <div class="ui segment attached" style="display: flex; align-items: center">
            <div v-if="!displayUpload" style="width: 100%;">
                <span>{{file.name}}</span>
                <sui-progress id="progress" progress :percent="progress" :state="uploadState">
                </sui-progress>
            </div>

            <label v-else class="fluid" style="width: 100%; height: 100%;">
                <i class="large archive file outline icon"></i>
                <span v-if="uploadState === UploadState.NOT_STARTED">Upload a submissions zip</span>
                <span v-if="uploadState === UploadState.FILE_SELECTED">{{file.name}}</span>
                <input class="hide" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </label>
        </div>
        <button class="ui button attached"
                v-if="displayUpload"
                v-on:click="uploadFile()">
            Upload
        </button>
    </div>
</template>

<script>
    import SocketIOFileClient from 'socket.io-file-client';
    import {UploadState} from '../util';

    export default {
      props: [
        "socket",
        "logs"
      ],
      data() {
        return {
          UploadState: UploadState,
          file: '',
          uploadState: UploadState.NOT_STARTED,
          displayUpload: true,
          progress: 0,
          uploadError: null,
          path: null
        };
      },
      methods: {
        handleFileUpload() {
          this.file = this.$refs.file.files[0];
          this.uploadState = UploadState.FILE_SELECTED;
          this.logs.push("Selected file: " + this.file.name);
        },

        uploadFile() {
          var uploader = new SocketIOFileClient(this.socket);

          let logs = this.logs;
          let state = this;

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
            state.path = fileInfo.name;
            state.$emit('uploaded', fileInfo);
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
      }
    }
</script>
