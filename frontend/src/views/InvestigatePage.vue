<template>
    <div id="investigate">
        <div class="ui menu">
            <sui-dropdown item icon="book" simple>
                Reports
                <sui-dropdown-menu>
                    <a class="ui item" href="/integrity/">List</a>
                    <a class="ui item" href="/integrity/new">New</a>
                </sui-dropdown-menu>
            </sui-dropdown>

            <div v-if="!loading" class="ui secondary menu right">
                <sui-dropdown item icon="user" simple>
                    {{me.name}}
                    <sui-dropdown-menu>
                        <a class="ui item" href="/profile">Profile</a>
                        <a class="ui item" href="/logout">Logout</a>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>
        </div>

        <ReportList v-if="display === 'list'"></ReportList>
        <NewReportPage v-else-if="display === 'new'"></NewReportPage>
        <Report v-else-if="display === 'report'"></Report>
        <Case v-else-if="display === 'case'"></Case>
    </div>
</template>

<script>
  import ReportList from '../components/investigate/ReportList';
  import Report from '../components/investigate/Report';
  import Case from '../components/investigate/Case';
  import NewReportPage from "./NewReportPage";

  import { ME } from '../queries/users';

  let display = "list";

  let pathParts = window.location.pathname.split("/").filter((el) => {return el.length !== 0});

  if (pathParts[pathParts.length - 1] === "new") {
    display = "new";
  }
  if (pathParts[pathParts.length - 2] === "report") {
    display = "report";
  }
  if (pathParts[pathParts.length - 2] === "case") {
    display = "case";
  }

  export default {
    name: 'InvestigatePage',
    components: {
      NewReportPage,
      ReportList,
      Report,
      Case
    },
    data() {
      return {
        display: display,
        loading: 0
      }
    },
    apollo: {
      me: ME
    }
  }
</script>

<style>
    #investigate {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
