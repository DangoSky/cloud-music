<template>
  <div class="user">
    <user-header></user-header>
    <user-body></user-body>
    <user-bar></user-bar>
  </div>
</template>

<script>
  import userHeader from './userHeader.vue'
  import userBody from './userBody.vue'
  import userBar from './userBar.vue'
  export default {
    components: {
      'user-header': userHeader,
      'user-body': userBody,
      'user-bar': userBar
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
    width: 100%;
    height: 100%;
  }
</style>