<template>
    <div>
        <sui-tab>
            <sui-tab-pane title="Allocation">
                No
            </sui-tab-pane>
            <sui-tab-pane title="Tutors">
                <TutorList v-bind:tutors="tutors" v-bind:sessions="sessions"></TutorList>
            </sui-tab-pane>
            <sui-tab-pane title="Classes">
                <ClassList v-bind:sessions="sessions"></ClassList>
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
        data() {
            return {
                // Note: using the wrong variable naming style so it's consistent with the python script
                tutors: [
                    {
                        "name": "Henry",
                        "lower_hr_limit": 4,
                        "upper_hr_limit": 6,
                        "lower_type_limits": {"T": 2, "P": 2, "U": 0},
                        "is_junior": false,
                        "daily_max": 4,
                        "pref_contig": false,
                        "availability": ["T01", "P01"]
                    },
                    {
                        "name": "Brae",
                        "lower_hr_limit": 4,
                        "upper_hr_limit": 10,
                        "lower_type_limits": {"T": 0, "P": 4, "U": 0},
                        "is_junior": false,
                        "daily_max": 10,
                        "pref_contig": true,
                        "availability": ["T01"]
                    },
                    {
                        "name": "Emily",
                        "lower_hr_limit": 4,
                        "upper_hr_limit": 8,
                        "lower_type_limits": {"T": 1, "P": 1, "U": 0},
                        "is_junior": true,
                        "daily_max": 6,
                        "pref_contig": true,
                        "availability": []
                    },
                    {
                        "name": "Peter",
                        "lower_hr_limit": 2,
                        "upper_hr_limit": 6,
                        "lower_type_limits": {"T": 0, "P": 0, "U": 0},
                        "is_junior": false,
                        "daily_max": 4,
                        "pref_contig": false,
                        "availability": ["P01"]
                    },
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
                ]
            };
        }
    }
</script>

<style scoped>

</style>
