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
            </sui-table-row>
        </sui-table-header>

        <sui-table-body v-for="tutor in tutors" v-bind:key="tutor.name">
            <TutorItem v-bind:name="tutor.name" v-bind:minHrs="tutor.lower_hr_limit"
                       v-bind:maxHrs="tutor.upper_hr_limit" v-bind:minTuteHrs="tutor.lower_type_limits.T"
                       v-bind:minPracHrs="tutor.lower_type_limits.P" v-bind:minStudioHrs="tutor.lower_type_limits.U"
                       v-bind:isJunior="tutor.is_junior" v-bind:dailyMax="tutor.daily_max"
                       v-bind:prefContig="tutor.pref_contig" />
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