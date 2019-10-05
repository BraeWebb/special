<template>
    <sui-table-row>
        <sui-table-cell><sui-input v-bind:value=id /></sui-table-cell>
        <sui-table-cell><sui-dropdown
            placeholder="Day"
            selection
            :options="days"
            v-model="currentDay"
            /></sui-table-cell>
        <sui-table-cell><sui-input v-bind:value=startTime type="Number" v-bind:style="'width: 60px'" />:00</sui-table-cell>
        <sui-table-cell><sui-input v-bind:value=duration type="Number" v-bind:style="'width: 60px'" /> hrs</sui-table-cell>
        <sui-table-cell>min <sui-input v-bind:value=minTutors type="Number" v-bind:style="'width: 60px'" /> -
            <sui-input v-bind:value=maxTutors type="Number" v-bind:style="'width: 60px'" /> max</sui-table-cell>
        <sui-table-cell><div class="ui icon buttons">
            <button class="ui positive button" v-on:click="add(id)"><i class="plus icon"></i></button>
            <button class="ui negative button" v-on:click="remove(id)"><i class="close icon"></i></button>
            </div></sui-table-cell>
    </sui-table-row>
</template>

<script>
    export default {
        name: "ClassItem",
        props: ["id", "minTutors", "maxTutors", "day", "startTime", "duration", "add", "remove"],
        data() {
            return {
                currentDay: this.day,
                days: [{
                    text: 'Mon',
                    value: 'Mon',
                }, {
                    text: 'Tue',
                    value: 'Tue',
                }, {
                    text: 'Wed',
                    value: 'Wed',
                }, {
                    text: 'Thu',
                    value: 'Thu',
                }, {
                    text: 'Fri',
                    value: 'Fri',
                }],
            };
        }
    }
</script>

<style scoped>
    .ui.button {
        align-content: center !important;
    }
</style>