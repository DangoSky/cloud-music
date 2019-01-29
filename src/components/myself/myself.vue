<template>
  <div class="myself">
    <myself-header></myself-header>
    <myself-bar></myself-bar>
  </div>
</template>

<script>
  import myselfHeader from './myselfHeader.vue'
  import myselfBar from './myselfBar.vue'
  export default {
    components: {
      'myself-header': myselfHeader,
      'myself-bar': myselfBar
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