<template>
  <router-link :to="{name: 'video'}">
    <div class="video"></div>
    <p>视频</p>
  </router-link>
</template>

<script>
  export default {
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
  .video {
    background-image: url('../../assets/videoUnclick.png');
    width: 30px;
    height: 30px;
  }
  .router-link-active > .video {
    background-image: url('../../assets/videoClick.png');
  }
</style>