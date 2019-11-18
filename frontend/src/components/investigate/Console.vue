<template>
    <div class="ui fluid attached container inverted segment" style="text-align:left">
        <p v-for="(log, index) in logs"
           :key="index">
            {{log}}
        </p>
    </div>
</template>

<script>
    import { LOG_SUBSCRIPTION } from '../../queries/files';

    export default {
      data() {
        return {
          logs: ["No logs yet..."]
        }
      },
      methods: {
        reverse: function (array) {
          return array.slice().reverse()
        }
      },
      apollo: {
        $subscribe: {
          logs: {
            query: LOG_SUBSCRIPTION,

            result ({ data }) {
              this.logs = [data.log, ...this.logs];
            },
          },
        }
      }
    }
</script>
