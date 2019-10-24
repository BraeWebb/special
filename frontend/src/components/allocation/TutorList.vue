<template>
    <div>

    <sui-table celled striped>
        <sui-table-header>
            <sui-table-row>
                <sui-table-headerCell>Tutor</sui-table-headerCell>
                <sui-table-headerCell>Weekly Hours</sui-table-headerCell>
                <sui-table-headerCell>Daily Hours</sui-table-headerCell>
                <sui-table-headerCell>Class Hours</sui-table-headerCell>
                <sui-table-headerCell>Junior?</sui-table-headerCell>
                <sui-table-headerCell>Prefer Contiguous?</sui-table-headerCell>
                <sui-table-headerCell>Availability</sui-table-headerCell>
                <sui-table-headerCell></sui-table-headerCell>
            </sui-table-row>
        </sui-table-header>

        <sui-table-body v-for="tutor in tutors" v-bind:key="tutor.name">
            <TutorItem v-bind:name="tutor.name" v-bind:minHrs="tutor.lower_hr_limit"
                       v-bind:maxHrs="tutor.upper_hr_limit" v-bind:minTuteHrs="tutor.lower_type_limits.T"
                       v-bind:minPracHrs="tutor.lower_type_limits.P" v-bind:minStudioHrs="tutor.lower_type_limits.U"
                       v-bind:isJunior="tutor.is_junior" v-bind:dailyMax="tutor.daily_max"
                       v-bind:prefContig="tutor.pref_contig" v-bind:sessions="sessions"
                       v-bind:availability="tutor.availability"
                       v-bind:add="add" v-bind:remove="remove" />
        </sui-table-body>
    </sui-table>


        <sui-grid>
            <sui-grid-row cols="2">
                <sui-grid-column v-bind:style="'width: 50%'">
                    <sui-button class="spring-green-button" v-on:click="generateInfoCSV(tutors)"
                        v-bind:style="'width: 100%'">Download Info CSV</sui-button><br>
                    <UploadBox :socket="socket" :logs.sync="logs" @uploaded="infoFileUploaded"
                        :text="'Upload Info File'" v-bind:style="'padding-top: 10px;'"></UploadBox>
                </sui-grid-column>
                <sui-grid-column v-bind:style="'width: 50%'">
                    <sui-button class="spring-green-button" v-on:click="generateAllocCSV(tutors, sessions)"
                                v-bind:style="'width: 100%'">Download Availability CSV</sui-button><br>
                    <!--<UploadBox :socket="socket" :logs.sync="logs" @uploaded="availFileUploaded"
                               :text="'Upload Availability File'" v-bind:style="'padding-top: 10px;'"></UploadBox>-->
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </div>
</template>

<script>
    import TutorItem from './TutorItem.vue'
    import UploadBox from '../UploadBox.vue'


    export default {
        name: "TutorList",
        props: ["tutors", "sessions", "socket", "download"],
        components: {
            TutorItem,
            UploadBox
        },
        mounted() {
            this.socket.on("tutorfile", (msg) => {
                let lines = msg.trim().split("\n");
                this.tutors = [];
                for (let i = 1; i < lines.length; i++) {
                    let line = lines[i].split(",");
                    this.tutors.push({
                        "name": line[0],
                        "lower_hr_limit": parseInt(line[1]),
                        "upper_hr_limit": parseInt(line[2]),
                        "lower_type_limits": {
                            "T": parseInt(line[3]),
                            "P": parseInt(line[4]),
                            "U": parseInt(line[5])
                        },
                        "is_junior": line[6] === "TRUE",
                        "daily_max": parseInt(line[7]),
                        "pref_contig": line[8] === "TRUE"
                    });
                }
            });
        },
        data() {
            return {
                logs: []
            }
        },
        methods: {
            add: function(name) {
                alert(this.logs);
                for (let i = 0; i < this.tutors.length; i++) {
                    if (name === this.tutors[i].name) {
                        this.tutors.splice(i + 1, 0, {
                            "name": "New" + (i + 1),
                            "lower_hr_limit": 1,
                            "upper_hr_limit": 60,
                            "lower_type_limits": {"T": 0, "P": 0, "U": 0},
                            "is_junior": false,
                            "daily_max": 12,
                            "pref_contig": true
                        });
                        break;
                    }
                }
            },
            remove: function(name) {
                let index = -1;
                for (let i = 0; i < this.tutors.length; i++) {
                    if (name === this.tutors[i].name) {
                        this.tutors.splice(index, 1);
                    }
                }
            },
            generateInfoCSV: function(tutors) {
                let result = "NAME,MIN_HRS,MAX_HRS,MIN_TUTE_HRS,MIN_PRAC_HRS,MIN_STUDIO_HRS,IS_JUNIOR,DAILY_MAX," +
                    "PREF_CONTIG\n";
                for (let i = 0; i < tutors.length; i++) {
                    let tutor = tutors[i];
                    result += [tutor.name, tutor.lower_hr_limit, tutor.upper_hr_limit, tutor.lower_type_limits.T,
                        tutor.lower_type_limits.P, tutor.lower_type_limits.U, tutor.is_junior, tutor.daily_max,
                        tutor.pref_contig].join(",") + "\n";
                }
                this.download("tutors.csv", result);
            },
            generateAllocCSV: function(tutors, sessions) {
                let result = "";
                for (let i = 0; i < tutors.length; i++) {
                    result += "," + tutors[i].name;
                }
                for (let i = 0; i < sessions.length; i++) {
                    result += sessions[i].id;
                    for (let j = 0; j < tutors.length; i++) {
                        if (tutors[j].availability.includes(sessions[i].id)) {
                            result += ",A";
                        } else {
                            result += ",U";
                        }
                    }
                }
                this.download("allocation.csv", result);
            },
            infoFileUploaded: function(fileInfo) {
                this.socket.emit("tutorfile", fileInfo);
            },
            availFileUploaded: function(fileInfo) {

            }
        }
    }
</script>

<style scoped>

</style>