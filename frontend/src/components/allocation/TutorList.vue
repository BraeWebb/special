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
                <sui-table-headerCell>Actions</sui-table-headerCell>
            </sui-table-row>
        </sui-table-header>

        <sui-table-body v-for="tutor in tutors" v-bind:key="tutor.name">
            <TutorItem v-bind:name="tutor.name" v-bind:minHrs="tutor.lower_hr_limit"
                       v-bind:maxHrs="tutor.upper_hr_limit" v-bind:minTuteHrs="tutor.lower_type_limits.T"
                       v-bind:minPracHrs="tutor.lower_type_limits.P" v-bind:minStudioHrs="tutor.lower_type_limits.U"
                       v-bind:isJunior="tutor.is_junior" v-bind:dailyMax="tutor.daily_max"
                       v-bind:prefContig="tutor.pref_contig" v-bind:add="add" v-bind:remove="remove" />
        </sui-table-body>
    </sui-table>

    <sui-button class="spring-green-button" fluid v-on:click="generateCSV(tutors)">Download CSV</sui-button>
        <br>
        <sui-button fluid v-on:click="this.console.log(tutors)">Upload CSV</sui-button>
    </div>
</template>

<script>
    import TutorItem from './TutorItem.vue'

    export default {
        name: "TutorList",
        props: ["tutors"],
        components: {
            TutorItem
        },
        methods: {
            add: function(name) {
                for (let i = 0; i < this.tutors.length; i++) {
                    if (name === this.tutors[i].name) {
                        this.tutors.splice(i + 1, 0, {
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
                let result = "NAME,MAX_HRS,JUNIOR,TUTE_PREF,PRAC_PREF\n";
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

</style>