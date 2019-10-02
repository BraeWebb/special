<template>
    <div>
        <sui-tab>
            <sui-tab-pane title="Main">
                hi
            </sui-tab-pane>
            <sui-tab-pane title="Tutors">
                <TutorList v-bind:tutors="tutors"></TutorList>
            </sui-tab-pane>
            <sui-tab-pane title="Classes">
                <ClassList v-bind:sessions="sessions"></ClassList>
            </sui-tab-pane>
            <sui-tab-pane title="Allocation">
                no
            </sui-tab-pane>
        </sui-tab>
    </div>

</template>

<script>
    import TutorList from '../../components/allocation/TutorList.vue'
    import ClassList from '../../components/allocation/ClassList.vue'

    export default {
        name: "Alloc",
        components: {
            TutorList,
            ClassList
        },
        data () {
            return {
                tutors: [
                    {
                        "name": "HOB",
                        "availability": ["T01"],
                        "max_hrs": 10,
                        "junior": false,
                        "tpref": true,
                        "ppref": false
                    },
                    {
                        "name": "BW",
                        "availability": ["T01", "P01"],
                        "max_hrs": 20,
                        "junior": false,
                        "tpref": false,
                        "ppref": true
                    },
                    {
                        "name": "KT",
                        "availability": ["P01"],
                        "max_hrs": 5,
                        "junior": true,
                        "tpref": false,
                        "ppref": false
                    },
                    {
                        "name": "SS",
                        "availability": ["T01", "P01"],
                        "max_hrs": 20,
                        "junior": false,
                        "tpref": true,
                        "ppref": true
                    },
                ],
                sessions: [
                    {
                        "id": "T01",
                        "day": "Mon",
                        "startTime": 8,
                        "duration": 1,
                        "minTutors": 2,
                        "maxTutors": 2
                    },
                    {
                        "id": "P01",
                        "day": "Wed",
                        "startTime": 14,
                        "duration": 2,
                        "tutors": 2,
                        "minTutors": 2,
                        "maxTutors": 2
                    }
                ],
            };
        }
    }
</script>

<style scoped>

</style>