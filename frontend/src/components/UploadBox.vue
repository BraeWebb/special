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
                <span v-if="uploadState === UploadState.NOT_STARTED">{{text}}</span>
                <span v-if="uploadState === UploadState.FILE_SELECTED">{{file.name}}</span>
                <input class="hide" type="file" id="file" ref="file" v-on:change="handleFileUpload"/>
            </label>
        </div>
        <button class="ui button attached"
                v-if="displayUpload"
                v-on:click="upload">
            Upload
        </button>
    </div>
</template>

<script>
    import { UPLOAD_FILE } from "../queries/files";
    import {UploadState} from '../util';

    export default {
      props: [
        "text"
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
        },

        upload() {
          this.uploadState = UploadState.UPLOADING;
          this.displayUpload = false;

          this.$apollo
            .mutate({
              mutation: UPLOAD_FILE,
              variables: {
                file: this.file
              },
              context: {
                hasUpload: true
              }
            }).then(data => {
              this.uploadState = UploadState.COMPLETED;
              this.progress = 100;
              this.$emit('uploaded', data.data.uploadSubmissions);
          })
        }
      }
    }
</script>
