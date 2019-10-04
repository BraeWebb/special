<template>
    <sui-table-row>
        <sui-table-cell><sui-input v-bind:value=name /></sui-table-cell>
        <sui-table-cell>min <sui-input v-bind:value=minHrs type="Number" v-bind:style="'width: 60px'" /> -
            <sui-input v-bind:value=maxHrs type="Number" v-bind:style="'width: 60px'" /> max</sui-table-cell>
        <sui-table-cell><sui-input v-bind:value=dailyMax type="Number" v-bind:style="'width: 60px'" /> max</sui-table-cell>
        <sui-table-cell>T: min <sui-input v-bind:value=minTuteHrs type="Number" v-bind:style="'width: 60px'" /><br>
            P: min <sui-input v-bind:value=minPracHrs type="Number" v-bind:style="'width: 60px'" /><br>
            U: min <sui-input v-bind:value=minStudioHrs type="Number" v-bind:style="'width: 60px'" /></sui-table-cell>
        <sui-table-cell><sui-input type="checkbox" :checked=isJunior /></sui-table-cell>
        <sui-table-cell><sui-input type="checkbox" :checked=prefContig /></sui-table-cell>
    </sui-table-row>
</template>

<script>
    export default {
        name: "TutorItem",
        props: ["name", "minHrs", "maxHrs", "minTuteHrs", "minPracHrs", "minStudioHrs", "isJunior", "dailyMax", "prefContig"]
    }
</script>

<style scoped>

</style>