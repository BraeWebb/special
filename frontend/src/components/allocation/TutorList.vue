<template>
    <div>
    <sui-table celled striped>
        <sui-table-header>
            <sui-table-row>
                <sui-table-headerCell>Tutor</sui-table-headerCell>
                <sui-table-headerCell>Weely Hours</sui-table-headerCell>
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

        <div class="ui buttons">
            <sui-button class="spring-green-button" v-on:click="add(name)">Download Info CSV</sui-button>
            <sui-button v-on:click="remove(name)">Upload Info CSV</sui-button>
        </div><br>
        <div class="ui buttons">
            <sui-button class="spring-green-button" v-on:click="add(name)">Download Availability CSV</sui-button>
            <sui-button v-on:click="remove(name)">Upload Availability CSV</sui-button>
        </div>
    </div>
</template>

<script>
    import TutorItem from './TutorItem.vue'

    export default {
        name: "TutorList",
        props: ["tutors", "sessions"],
        components: {
            TutorItem
        },
        methods: {
            add: function(name) {
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
            generateCSV: function(tutors) {
                let result = "NAME,LOWER_HR_LIMIT,UPPER_HR_LIMIT,LOWER_,PRAC_PREF\n";
                for (let i = 0; i < tutors.length; i++) {
                    let tutor = tutors[i];
                    result += tutor.name + "," + tutor.max_hrs + "," + tutor.junior + "," + tutor.tpref + "," + tutor.ppref + "\n";
                }
                download("tutors.csv", result);
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
    .ui.buttons {
        width: 70%;
        padding-bottom: 10px;
    }
</style>