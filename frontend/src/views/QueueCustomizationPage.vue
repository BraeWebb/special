<template>
    <sui-grid divided="vertically">
        <sui-grid-row>
            <sui-grid-column>
                <h3>General Settings</h3>
                <sui-checkbox label="Dual queues" toggle v-model="dualQueues"/>
                <sui-checkbox label="Piazza warning" toggle v-model="piazzaWarning"/>
            </sui-grid-column>
        </sui-grid-row>
        <sui-grid-row :columns="3">
            <sui-grid-column>
                <h3>Wait time sensitivity</h3>

                <circle-slider v-model="waitTimeSens"
                               :min="0"
                               :max="5"></circle-slider>

                <div>{{ waitTimeSens }}</div>
            </sui-grid-column>
            <sui-grid-column>
                <h3>Question Num sensitivity</h3>

                <circle-slider v-model="questionNumSens"
                               :min="0"
                               :max="5"></circle-slider>

                <div>{{ questionNumSens }}</div>
            </sui-grid-column>
            <sui-grid-column>
                <h3>Signon sensitivity</h3>

                <circle-slider v-model="signonSens"
                               :min="0"
                               :max="5"></circle-slider>

                <div>{{ signonSens }}</div>
            </sui-grid-column>
        </sui-grid-row>
        <sui-grid-row columns="1">
            <sui-grid-column>
                <h3>Signon Data</h3>
                <UploadBox :socket="socket" :logs.sync="logs"
                           :text="'Upload signon data'" @uploaded="fileUploaded"></UploadBox>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>

<script>
    import VueCircleSlider from 'vue-circle-slider'
    import UploadBox from '../components/UploadBox.vue'

    export default {
        name: "QueueCustomization",
        components: {VueCircleSlider, UploadBox},
        props: ["dualQueues", "piazzaWarning", "waitTimeSens", "questionNumSens", "signonSens"],
        methods: {
            getPriority: function (waitTime, questionNum, signon) {
                return waitTime * (this.waitTimeSens/5) + questionNum * 60 * (this.questionNumSens/5) +
                    (signon ? 0 : 1) * 120 * (this.signonSens/5);
            },
            fileUploaded: function (fileInfo) {

            }
        }
    }
</script>

<style scoped>

</style>