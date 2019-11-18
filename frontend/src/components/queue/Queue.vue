<template>
  <div v-if="!loading" class="ui fluid container card-group">
    <h1>{{page.title}}</h1>
    <sui-card-group :items-per-row="2" v-bind:style="'width:100%'">
      <sui-card
              v-for="config in page.queues"
              v-bind:key="config.id"
              v-bind:style="'width:' + config.width + '; height:' + config.height"
              class="ui container center aligned">
        <sui-card-content>
          <sui-card-header>
            <h1>{{config.title}}</h1>
            {{config.description}}
          </sui-card-header>
        </sui-card-content>

        <sui-button positive attached="bottom" class="spring-green-button" @click="joinQueue(config.id)">
          <sui-icon name="add" /> Join
        </sui-button>
        <sui-button attached="bottom" color="red" @click="leaveQueue(config.id)">
          <sui-icon name="minus" /> Leave
        </sui-button>

        <sui-card-content>
          <sui-table basic="very" celled>
            <sui-table-header>
              <tr>
                <th>Name</th>
                <th>Questions asked</th>
                <th>Wait time</th>
                <th>Signed on</th>
                <th></th>
              </tr>
            </sui-table-header>
            <sui-table-body>
              <QueueItem
                      v-for="waiter in config.waiting"
                      v-bind:key="waiter.id"
                      v-bind:user="waiter"

                      v-bind:config="config"
              />
            </sui-table-body>
          </sui-table>
        </sui-card-content>
      </sui-card>
    </sui-card-group>
  </div>
</template>


<script>
  import { GET_QUEUE, GET_QUEUE_SUBSCRIPTION, JOIN_QUEUE, LEAVE_QUEUE } from "../../queries/queues";
  import QueueItem from "./QueueItem";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let queueId = pathParts[pathParts.length - 1];

  export default {
    name: 'Queue',
    components: {QueueItem},
    data() {
      return {
        loading: 0
      }
    },
    methods: {
      joinQueue(queue) {
        this.$apollo.mutate({
          mutation: JOIN_QUEUE,
          variables: {
            id: queue
          }
        })
      },
      leaveQueue(queue) {
        this.$apollo.mutate({
          mutation: LEAVE_QUEUE,
          variables: {
            id: queue
          }
        })
      }
    },
    apollo: {
      page: {
        query: GET_QUEUE,
        variables: {
          id: queueId
        },
        subscribeToMore: {
          document: GET_QUEUE_SUBSCRIPTION,
          variables: {
            id: queueId
          },
          updateQuery: (previous, { subscriptionData }) => {
            return {
              ...previous,
              page: subscriptionData.data.page
            };
          }
        }
      }
    }
  }
</script>
