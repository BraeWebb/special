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

    export default {
        name: "ClassList",
        props: ["sessions", "socket", "download"],
        components: {
            ClassItem,
            UploadBox
        },
        mounted() {
            this.socket.on("classfile", (msg) => {
                let lines = msg.trim().split("\n");
                while (this.sessions.length > 0) {
                    this.remove(this.sessions[0].id)
                }
                for (let i = 1; i < lines.length; i++) {
                    alert(lines[i]);
                    let line = lines[i].split(",");
                    this.sessions.push({
                        "id": line[0],
                        "lower_tutor_count": parseInt(line[1]),
                        "upper_tutor_count": parseInt(line[2]),
                        "day": line[3],
                        "start_time": parseInt(line[4]),
                        "duration": parseInt(line[5])
                    });
                }
                for (let i = 0; i < this.sessions.length; i++) {
                    alert(this.sessions[i].id);
                }
            });
        },
        data() {
            return {
                logs: []
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
                let result = "ID,MIN_TUTORS,MAX_TUTORS,DAY,START_TIME,DURATION\n";
                for (let i = 0; i < sessions.length; i++) {
                    let session = sessions[i];
                    result += [session.id, session.lower_tutor_count, session.upper_tutor_count, session.day,
                        session.start_time, session.duration].join(",") + "\n";
                }
                this.download("classes.csv", result);
            },
            infoFileUploaded: function (fileInfo) {
                this.socket.emit("classfile", fileInfo);
            }
        }
    }

</script>

<style scoped>

</style>