<template>
  <div>
    <carousel></carousel>
    <explore-bar></explore-bar>
  </div>
</template>

<script>
  import carousel from './carousel.vue'
  import exploreBar from './exploreBar.vue'
  export default {
    data() {
      return {
    
      }
    },
    components: {
      'carousel': carousel,
      'explore-bar': exploreBar
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>

</style>