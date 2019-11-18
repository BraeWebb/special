<template>
    <div id="investigate">
        <div class="ui top attached tabular menu">
            <a class="item"
               v-for="tab in tabs"
               v-bind:key="tab.id"
               v-bind:class="{active: currentTab === tab.id}"
               v-on:click="currentTab = tab.id">
                {{tab.title}}
            </a>
        </div>

        <keep-alive>
            <NewReport v-if="currentTab === 'new'"></NewReport>
            <Console v-else-if="currentTab === 'log'"></Console>
        </keep-alive>
    </div>
</template>

<script>
  import NewReport from '../components/investigate/NewReport';
  import Console from '../components/investigate/Console';

  export default {
    name: 'NewReportPage',
    props: [],
    components: {
      NewReport,
      Console,
    },
    data() {
      return {
        tabs: {
          "new": {id: "new", title: "New Report"},
          "log": {id: "log", title: "Console Log"},
        },
        currentTab: "new",

        error: null
      }
    }
  }
</script>
