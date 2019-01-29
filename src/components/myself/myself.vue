<template>
  <div class="myself">
    <myself-header></myself-header>
    <myself-user></myself-user>
    <myself-bar></myself-bar>
  </div>
</template>

<script>
  import myselfHeader from './myselfHeader.vue'
  import myselfBar from './myselfBar.vue'
  import myselfUser from './myselfUser.vue'
  export default {
    components: {
      'myself-header': myselfHeader,
      'myself-bar': myselfBar,
      'myself-user': myselfUser
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
</style>