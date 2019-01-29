<template>
  <div class="video">
    <video-header :audioSRC="videoSRC"></video-header>
    <video-bar></video-bar>
  </div>
</template>

<script>
  import header from '../explore/header.vue'
  import videoBar from './videoBar.vue'
  export default {
    components: {
      'video-header': header,
      'video-bar': videoBar
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