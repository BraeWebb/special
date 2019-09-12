<template>
    <div>
    <sui-table celled striped>
        <sui-table-header>
            <sui-table-row>
                <sui-table-headerCell>Tutor</sui-table-headerCell>
                <sui-table-headerCell>Max hours</sui-table-headerCell>
                <sui-table-headerCell>Junior?</sui-table-headerCell>
                <sui-table-headerCell>Class Prefs</sui-table-headerCell>
            </sui-table-row>
        </sui-table-header>

        <sui-table-body v-for="tutor in tutors">
            <sui-table-row>
                <sui-table-cell><sui-input v-bind:value=tutor.name /></sui-table-cell>
                <sui-table-cell><sui-input v-bind:value=tutor.max_hrs type="Number" /></sui-table-cell>
                <sui-table-cell><sui-input type="checkbox" :checked=tutor.junior /></sui-table-cell>
                <sui-table-cell><sui-input type="checkbox" :checked=tutor.tpref /> Tutorials<br>
                    <sui-input type="checkbox" :checked=tutor.ppref /> Practicals</sui-table-cell>
            </sui-table-row>
        </sui-table-body>
    </sui-table>

    <sui-button class="spring-green-button" fluid v-on:click="generateCSV(tutors)">Download CSV</sui-button>
        <br>
        <sui-button fluid>Upload CSV</sui-button>
    </div>
</template>

<script>
    export default {
        name: "TutorList",
        props: ["tutors"],
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