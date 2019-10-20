<template>
    <div>
        <sui-table celled striped>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-headerCell>Tutor</sui-table-headerCell>
                    <sui-table-headerCell>Sessions</sui-table-headerCell>
                </sui-table-row>
            </sui-table-header>

            <sui-table-body v-for="(sessions, tutor) in alloc" v-bind:key="tutor">
                <sui-table-row>
                    <sui-table-cell>{{tutor}}</sui-table-cell>
                    <sui-table-cell><sui-dropdown
                            placeholder="No classes"
                            selection
                            fluid
                            multiple
                            :options="sessionIds"
                            v-model="alloc[tutor]"
                    /></sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <sui-button class="spring-green-button" v-on:click="generateCSV()"
                    v-bind:style="'width: 100%'">Download Allocation CSV</sui-button><br>
    </div>
</template>

<script>
    export default {
        name: "Allocation",
        props: ["alloc", "sessions", "download"],
        data() {
            let sessionIds = [];
            for (let i = 0; i < this.sessions.length; i++) {
                sessionIds.push({
                    "text": this.sessions[i].id,
                    "value": this.sessions[i].id
                });
            }
            return {
                sessionIds: sessionIds,
                hrs: {}
            };
        },
        methods: {
            generateCSV: function() {
                let result = "";
                for (let i = 0; i < this.sessions.length; i++) {
                    result += "," + this.sessions[i].id;
                }
                result += "\n";

                for (const [ tutor, tutorSessions ] of Object.entries(this.alloc)) {
                    result += tutor;
                    for (let j = 0; j < this.sessions.length; j++) {
                        if (tutorSessions.includes(this.sessions[j].id)) {
                            result += ",Y";
                        } else {
                            result += ",N";
                        }
                    }
                    result += "\n";
                }

                this.download("alloc.csv", result);
            },
            updateHrs: function () {
                for (const [ tutor, tutorSessions ] of Object.entries(this.alloc)) {
                    let total = 0;
                    for (let i = 0; i < tutorSessions.length; i++) {
                        for (let j = 0; j < this.sessions.length; i++) {
                            if (this.allocation[tutor][i].includes(this.sessions[j].name)) {
                                total += this.sessions[j].duration;
                            }
                        }
                    }
                    this.hrs[tutor] = total;
                }
            }
        }
    }
</script>

<style scoped>

</style>