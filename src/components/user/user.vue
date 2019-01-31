<template>
  <div class="user">
    <user-header></user-header>
    <user-body></user-body>
  </div>
</template>

<script>
  import userHeader from './userHeader.vue'
  import userBody from './userBody.vue'
  export default {
    components: {
      'user-header': userHeader,
      'user-body': userBody
    },
    data() {
      return {
    
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  .user {
    background:	#F5F5F5;
  }
</style>