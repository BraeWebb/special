<template>
    <div>
        <div>
            
        </div>
    </div>
</template>

<script>
  import { ALL_REPORTS } from "../../queries/reports";

  export default {
    name: 'Profile',
    apollo: {
      reports: ALL_REPORTS
    }
  }
</script>
