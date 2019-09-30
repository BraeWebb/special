<template>
    <div id="investigate">
        <div class="ui top attached tabular menu">
            <div class="active item">{{reportID}}</div>
        </div>
        <div class="ui fluid attached container segment">
            <div class="ui stackable two column grid">
                <div class="stretched row">
                <div class="column">
                    <div class="ui left icon fluid input">
                        <input type="text" v-model="reportID">
                        <i class="tag icon"></i>
                    </div>
                    <br/>
                    <sui-dropdown
                            placeholder="Select a Language"
                            selection
                            search
                            :options="languages"
                            v-model="selectedLanguage"
                    />
                    <br/>
                    <div class="ui left icon fluid input">
                        <input type="text" v-model="maxMatches">
                        <i class="tag bullseye"></i>
                    </div>
                </div>
                <div class="column">
                    <div class="ui segment attached" style="display: flex; align-items: center">

                        <label class="fluid" style="width: 100%; height: 100%;">
                            <i class="large archive file outline icon"></i>
                            <span v-if="!fileUploaded">Upload a submissions zip</span>
                            <span v-if="fileUploaded">{{file.name}}</span>
                            <input class="hide" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                        </label>
                    </div>
                    <button class="ui button attached" v-on:click="uploadFile()">Upload</button>
                </div>
                </div>
            </div>
            <br/>
            <button class="ui button">
                Submit
            </button>
        </div>
    </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'InvestigatePage',
    data() {
      return {
        file: '',
        fileUploaded: false,
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
        selectedLanguage: null,
        maxMatches: 10,
        reportID: Math.random().toString(36).substr(2, 7).toUpperCase()
      }
    },
    methods: {
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
        this.fileUploaded = true;
      },
      uploadFile() {
        let formData = new FormData();
        formData.append('file', this.file);
        axios.post('/single-file', // TODO: Replace this with file upload endpoint when it exists
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      }
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
