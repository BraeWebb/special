<template>
    <div v-if="steps.started">
        <div class="ui ordered vertical steps">
            <div class="step" v-bind:class="{completed: steps.accepted}">
                <div class="content">
                    <div class="title">Job Started</div>
                    <div class="description">Job accepted by processor</div>
                </div>
            </div>
            <div class="step" v-bind:class="{completed: steps.extracted}">
                <div class="content">
                    <div class="title">Submissions Extracted</div>
                    <div class="description">Uploaded zip has been extracted</div>
                </div>
            </div>
            <div class="step" v-bind:class="{completed: steps.sent}">
                <div class="content">
                    <div class="title">Submissions Sent</div>
                    <div class="description">Submissions sent to MoSS</div>
                </div>
            </div>
            <div class="step" v-bind:class="{completed: steps.generated}">
                <div class="content">
                    <div class="title">Report Generated</div>
                    <div class="description">Report URL Generated</div>
                </div>
            </div>
            <div class="step" v-bind:class="{completed: steps.parsed}">
                <div class="content">
                    <div class="title">Report Indexed</div>
                    <div class="description">Report URL Parsed</div>
                </div>
            </div>
            <div class="step" v-bind:class="{completed: steps.images}">
                <div class="content">
                    <div class="title">Images Generated</div>
                    <div class="description">All Images Generated</div>
                </div>
            </div>
            <div class="step" v-bind:class="{completed: steps.fin}">
                <div class="content">
                    <div class="title">Cases Parsed</div>
                    <div class="description">All Cases Parsed</div>
                </div>
            </div>
        </div>
        <br/>

        <div v-if="result !== null" class="ui steps">
            <div class="step">
                <div class="content">
                    <div class="title">Result</div>
                    <div class="description"><a :href="result" target="_blank">{{result}}</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      props: ["steps", "result", "report"]
    }
</script>
