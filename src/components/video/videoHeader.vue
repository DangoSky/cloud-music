<template>
  <div class="header">
    <img class="audio" src="../../assets/video.png">    
    <input class="search" type="text" placeholder="向前有路，未来可期" >
    <router-link :to="{name: 'musicPlay'}">
      <img class="music" src="../../assets/music.png">
    </router-link>
  </div>   
</template>

<script>
  export default {
    
  }
</script>

<style scoped src="../../css/video/videoHeader.css">

</style>