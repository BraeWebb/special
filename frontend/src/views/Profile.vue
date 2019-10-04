<template>
    <div id="profile">
        <div class="ui fluid attached container segment">
            <div class="ui left aligned grid">
                <div class="ui four wide column">
                    <img class="ui medium rounded image" src="https://semantic-ui.com/images/avatar2/large/matthew.png">
                </div>
                <div class="ui form twelve wide column">
                    <div class="ui ">
                        <div class="ui disabled fluid field">
                            <label>Full Name</label>
                            <input type="text" placeholder="Brae Webb" value="Brae Webb">
                        </div>
                        <div class="ui fluid field">
                            <label>Prefix</label>
                            <input type="text" placeholder="Displayed before your name, preferably an emoji 🐨">
                        </div>
                        <div class="ui fluid field">
                            <label>Preferred Name</label>
                            <input type="text" placeholder="Enter your preferred name...">
                        </div>
                        <div class="ui fluid button primary">
                            Submit
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'Profile',
  }
</script>

<style scoped>
</style>
