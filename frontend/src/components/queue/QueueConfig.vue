<template>
    <sui-grid v-if="!loading" divided="vertically">
        <sui-grid-row>
            <sui-grid-column>
                <div class="ui form">
                    <h3>General Settings</h3>
                    <div class="field">
                        <label>Title</label>
                        <input type="text" autocomplete="off" v-model="queue.title">
                    </div>
                    <div class="field">
                        <label>Description</label>
                        <textarea rows="4" v-model="queue.description"></textarea>
                    </div>
                </div>
            </sui-grid-column>
        </sui-grid-row>
        <sui-grid-row :columns="3">
            <sui-grid-column>
                <h3>Wait time sensitivity</h3>

                <circle-slider v-model="queue.config.waitTime"
                               :min="0"
                               :max="5"></circle-slider>

                <div>{{ waitTimeSens }}</div>
            </sui-grid-column>
            <sui-grid-column>
                <h3>Question Num sensitivity</h3>

                <circle-slider v-model="queue.config.questionsAsked"
                               :min="0"
                               :max="5">{{queue.config.questionsAsked}}</circle-slider>

                <div>{{ questionNumSens }}</div>
            </sui-grid-column>
            <sui-grid-column>
                <h3>Signon sensitivity</h3>

                <circle-slider v-model="queue.config.signedOn"
                               :min="0"
                               :max="5"></circle-slider>

                <div>{{ signonSens }}</div>
            </sui-grid-column>
        </sui-grid-row>
        <sui-grid-row>
            <sui-grid-column>
                <h3>Administrators</h3>
                <div class="ui middle aligned divided list">
                    <div class="item" v-for="user in queue.admins" v-bind:key="user.id">
                        <div class="right floated content">
                            <button class="ui warning button" @click="removeAdmin(user.id)">Remove</button>
                        </div>
                        <div class="content">
                            {{user.name}} ({{user.id}})
                        </div>
                    </div>
                </div>
                <div class="ui form">
                    <div class="field">
                        <input type="text" autocomplete="off" v-model="newAdmin">
                        <button class="fluid ui button" @click="addAdmin">Add Admin</button>
                    </div>
                </div>
            </sui-grid-column>
        </sui-grid-row>
        <sui-grid-row>
            <button class="fluid ui button primary" @click="submit">Submit</button>
        </sui-grid-row>
    </sui-grid>
</template>

<script>
  import { GET_QUEUE_CONFIG, ADD_ADMIN, REMOVE_ADMIN, UPDATE_QUEUE_CONFIG } from '../../queries/queues';

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let queueId = pathParts[pathParts.length - 1];

  export default {
    name: "QueueCustomization",
    props: ["dualQueues", "piazzaWarning", "waitTimeSens", "questionNumSens", "signonSens"],
    methods: {
      getPriority: function (waitTime, questionNum, signon) {
        return waitTime * (this.waitTimeSens/5) + questionNum * 60 * (this.questionNumSens/5) +
          (signon ? 0 : 1) * 120 * (this.signonSens/5);
      },
      fileUploaded: function (fileInfo) {

      },
      addAdmin() {
        this.$apollo.mutate({
          mutation: ADD_ADMIN,
          variables: {
            user: this.newAdmin,
            queue: this.queue.id,
          },
        }).then(data => {
          this.$apollo.queries.queue.refetch();
        });
      },
      removeAdmin(user) {
        this.$apollo.mutate({
          mutation: REMOVE_ADMIN,
          variables: {
            user: user,
            queue: this.queue.id,
          },
        }).then(data => {
          this.$apollo.queries.queue.refetch();
        });
      },
      submit() {
        this.$apollo.mutate({
          mutation: UPDATE_QUEUE_CONFIG,
          variables: {
            id: this.queue.id,
            title: this.queue.title,
            description: this.queue.description,
            signedOn: this.queue.config.signedOn,
            questionsAsked: this.queue.config.questionsAsked,
            waitTime: this.queue.config.waitTime,
          },
        }).then(data => {
          this.$apollo.queries.queue.refetch();
        });
      }
    },
    data() {
      return {
        loading: 0,
        newAdmin: ""
      }
    },
    apollo: {
      queue: {
        query: GET_QUEUE_CONFIG,
        variables: {
          id: queueId
        }
      }
    }
  }
</script>

<style scoped>

</style>
