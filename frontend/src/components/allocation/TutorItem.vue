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
        <sui-table-cell><sui-dropdown
                placeholder="None"
                selection
                fluid
                multiple
                :options="sessionIds"
                v-model="currentSessions"
        /></sui-table-cell>
        <sui-table-cell><div class="ui icon buttons">
            <button class="ui positive button" v-on:click="add(name)"><i class="plus icon"></i></button>
            <button class="ui negative button" v-on:click="remove(name)"><i class="close icon"></i></button>
        </div></sui-table-cell>
    </sui-table-row>

</template>

<script>
    export default {
        name: "TutorItem",
        props: ["name", "minHrs", "maxHrs", "minTuteHrs", "minPracHrs", "minStudioHrs", "isJunior", "dailyMax",
            "prefContig", "sessions", "add", "remove"],
        data() {
            let sessionIds = [];
            for (let i = 0; i < this.sessions.length; i++) {
                sessionIds.push({
                   "text": this.sessions[i].id,
                   "value": this.sessions[i].id
                });
            }
            return {currentSessions: null, sessionIds: sessionIds};
        }
    }
</script>

<style scoped>

</style>