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
                    <sui-table-headerCell>Actions</sui-table-headerCell>
                </sui-table-row>
            </sui-table-header>

            <sui-table-body v-for="cls in sessions" v-bind:key="cls.id">
                <ClassItem v-bind:id="cls.id" v-bind:day="cls.day" v-bind:startTime="cls.start_time"
                            v-bind:duration="cls.duration" v-bind:minTutors="cls.lower_tutor_count"
                            v-bind:maxTutors="cls.upper_tutor_count" v-bind:remove="remove" v-bind:add="add"/>
            </sui-table-body>
        </sui-table>

        <sui-button class="spring-green-button" v-on:click="generateCSV(sessions)"
                    v-bind:style="'width: 100%'">Download Info CSV</sui-button><br>
        <UploadBox :socket="socket" :logs.sync="logs" @uploaded="infoFileUploaded"
                   :text="'Upload Info CSV'"
                   v-bind:style="'padding-top: 10px;'"></UploadBox>
    </div>
</template>

<script>
    import ClassItem from './ClassItem.vue'
    import UploadBox from '../UploadBox.vue'

    import io from 'socket.io-client';

    let host = process.env.VUE_APP_ALLOC_HOST ? process.env.VUE_APP_ALLOC_HOST : "localhost";
    let port = process.env.VUE_APP_ALLOC_PORT ? process.env.VUE_APP_ALLOC_PORT : "3051";
    let socket = io(host + ":" + port);

    export default {
        name: "ClassList",
        props: ["sessions"],
        components: {
            ClassItem,
            UploadBox
        },
        data () {
            return {
                socket: socket
            }
        },
        methods: {
            add: function(sessionId) {
                for (let i = 0; i < this.sessions.length; i++) {
                    if (sessionId === this.sessions[i].id) {
                        this.sessions.splice(i + 1, 0, {
                            "duration": 1,
                            "lower_tutor_count": 1,
                            "upper_tutor_count": 1
                        });
                        break;
                    }
                }
            },
            remove: function(sessionId) {
                let index = -1;
                for (let i = 0; i < this.sessions.length; i++) {
                    if (sessionId === this.sessions[i].id) {
                        this.sessions.splice(index, 1);
                    }
                }
            },
            generateCSV: function (sessions) {
                // TODO: make this work for new data
                let result = "ID,MIN_TUTORS,MAX_TUTORS,DAY,START_TIME,DURATION\n";
                for (let i = 0; i < sessions.length; i++) {
                    let session = sessions[i];
                    result += [session.id, session.lower_tutor_count, session.upper_tutor_count, session.day,
                        session.time, session.duration].join(",") + "\n";
                }
                download("classes.csv", result);
            },
            infoFileUploaded: function (fileInfo) {

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