<template>
    <div>
        <sui-tab>
            <sui-tab-pane title="Allocation">
                <h1>Allocation Generation</h1>
                <p>Tutors Recorded: {{tutors.length}}<br>Classes Recorded: {{sessions.length}}</p>
                <sui-button class="spring-green-button" v-on:click="allocate()">Generate Allocation</sui-button>
                <div v-if="success">
                    <Allocation v-bind:alloc="alloc" v-bind:sessions="sessions" v-bind:download="download"/>
                </div>
                <p>{{msg}}</p>
            </sui-tab-pane>
            <sui-tab-pane title="Tutors">
                <TutorList v-bind:tutors="tutors" v-bind:sessions="sessions"
                           v-bind:socket="socket" v-bind:download="download"></TutorList>
            </sui-tab-pane>
            <sui-tab-pane title="Classes">
                <ClassList v-bind:sessions="sessions"
                           v-bind:socket="socket" v-bind:download="download"></ClassList>
            </sui-tab-pane>
        </sui-tab>
    </div>

</template>

<script>
    import TutorList from '../../components/allocation/TutorList.vue'
    import ClassList from '../../components/allocation/ClassList.vue'
    import Allocation from "../../components/allocation/Allocation.vue";

    import io from 'socket.io-client';

    let host = process.env.VUE_APP_ALLOC_HOST ? process.env.VUE_APP_ALLOC_HOST : "localhost";
    let port = process.env.VUE_APP_ALLOC_PORT ? process.env.VUE_APP_ALLOC_PORT : "3051";
    let socket = io(host + ":" + port);

    export default {
        name: "Alloc",
        components: {
            Allocation,
            TutorList,
            ClassList
        },
        methods: {
            allocate: function() {
                this.socket.emit("allocate", {tutors: this.tutors, sessions: this.sessions});
            },
            download: function(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }
        },
        mounted() {
            this.socket.on("allocated", (msg) => {
                this.msg = msg.msg;
                if (!msg.error) {
                    this.alloc = msg.alloc;
                    this.success = true;
                } else {
                    this.success = false;
                }
            });
        },
        data() {
            return {
                socket: socket,
                // Note: using the wrong variable naming style so it's consistent with the python script
                tutors: [
                    {
                        "name": "Henry",
                        "lower_hr_limit": 1,
                        "upper_hr_limit": 3,
                        "lower_type_limits": {"T": 0, "P": 0, "U": 0},
                        "is_junior": false,
                        "daily_max": 4,
                        "pref_contig": false,
                        "availability": ["T01"]
                    },
                    {
                        "name": "Brae",
                        "lower_hr_limit": 1,
                        "upper_hr_limit": 3,
                        "lower_type_limits": {"T": 0, "P": 0, "U": 0},
                        "is_junior": false,
                        "daily_max": 10,
                        "pref_contig": false,
                        "availability": ["T01", "P01"]
                    },
                    {
                        "name": "Emily",
                        "lower_hr_limit": 1,
                        "upper_hr_limit": 3,
                        "lower_type_limits": {"T": 0, "P": 0, "U": 0},
                        "is_junior": false,
                        "daily_max": 6,
                        "pref_contig": false,
                        "availability": ["P01"]
                    }
                ],
                sessions: [
                    {
                        "id": "T01",
                        "day": "Mon",
                        "start_time": 9,
                        "duration": 1,
                        "lower_tutor_count": 2,
                        "upper_tutor_count": 2
                    },
                    {
                        "id": "P01",
                        "day": "Mon",
                        "start_time": 10,
                        "duration": 2,
                        "lower_tutor_count": 2,
                        "upper_tutor_count": 2
                    }
                ],
                alloc: {
                },
                success: false,
                msg: "Allocation not yet generated"
            };
        }
    }
</script>

<style scoped>
    .spring-green-button {
        width: 100%;
        margin-bottom: 10px;
    }

    p {
        padding: 10px;
    }
</style>
