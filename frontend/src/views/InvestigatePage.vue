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
                    <div class="ui left fluid dropdown labeled search icon button">
                        <i class="code icon"></i>
                        <span class="text">Select Language</span>
                        <div class="menu">
                            <div class="item">Python</div>
                            <div class="item">Java</div>
                            <div class="item">C</div>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="ui segment" style="display: flex; align-items: center">
                        <i class="large archive file outline icon"></i>
                        <span>Upload a submissions zip</span>
                    </div>
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
  export default {
    name: 'InvestigatePage',
    data() {
      return {
        reportID: Math.random().toString(36).substr(2, 7).toUpperCase()
      }
    },
  }
</script>

<style>
</style>
