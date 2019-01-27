<template>
  <div class="video">
    <video-header :audioSRC="videoSRC"></video-header>
  </div>
</template>

<script>
  import header from '../explore/header.vue'
  export default {
    components: {
      'video-header': header
    },
    data() {
      return {
        videoSRC: require('../../assets/video.png')
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  body {
    background-color: blue;
  }
</style>