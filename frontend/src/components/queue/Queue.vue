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

        <sui-button positive attached="bottom" class="spring-green-button">
          <sui-icon name="add" /> Join
        </sui-button>
        <sui-button attached="bottom" color="red">
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
                      v-for="waiter in waiting"
                      v-bind:key="waiter.id"
                      v-bind:user="waiter"

                      v-bind:config="config"
                      v-bind:socket="socket"
              />
            </sui-table-body>
          </sui-table>
        </sui-card-content>
      </sui-card>
    </sui-card-group>
  </div>
</template>


<script>
  import { GET_QUEUE } from "../../queries/queues";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});
  let queueId = pathParts[pathParts.length - 1];

  export default {
    name: 'Queue',
    data() {
      return {
        loading: 0
      }
    },
    apollo: {
      page: {
        query: GET_QUEUE,
        variables: {
          id: queueId
        }
      }
    }
  }
</script>
