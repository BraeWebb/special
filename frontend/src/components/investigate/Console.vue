<template>
    <div class="ui fluid attached container inverted segment" style="text-align:left">
        <p v-for="(log, index) in logs"
           :key="index">
            {{log}}
        </p>
    </div>
</template>

<script>
    export default {
      props: ["logs"]
    }
</script>
