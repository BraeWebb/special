<template>
    <div>
        <sui-table celled striped>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-headerCell>Class</sui-table-headerCell>
                    <sui-table-headerCell>Day</sui-table-headerCell>
                    <sui-table-headerCell>Time</sui-table-headerCell>
                    <sui-table-headerCell>Duration</sui-table-headerCell>
                    <sui-table-headerCell>Tutors</sui-table-headerCell>
                </sui-table-row>
            </sui-table-header>

            <sui-table-body v-for="cls in sessions" v-bind:key="cls.id">
                <ClassItem v-bind:id="cls.id" v-bind:day="cls.day" v-bind:startTime="cls.startTime"
                            v-bind:duration="cls.duration" v-bind:minTutors="cls.minTutors"
                            v-bind:maxTutors="cls.maxTutors"/>
            </sui-table-body>
        </sui-table>

        <sui-button class="spring-green-button" fluid v-on:click="generateCSV(sessions)">Download CSV</sui-button>
        <br>
        <sui-button fluid>Upload CSV</sui-button>
    </div>
</template>

<script>
    import ClassItem from './ClassItem.vue'

    export default {
        name: "ClassList",
        props: ["sessions"],
        components: {
            ClassItem
        },
        methods: {
            generateCSV: function (sessions) {
                // TODO: make this work for new data
                let result = "ID,DAY,TIME,DURATION,TUTORS\n";
                for (let i = 0; i < sessions.length; i++) {
                    let session = sessions[i];
                    result += session.id + "," + session.day + "," + session.time + "," + session.duration + "," + session.tutors + "\n";
                }
                download("classes.csv", result);
            }
        }
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
</script>

<style scoped>

</style>