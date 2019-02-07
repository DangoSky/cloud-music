<template>
  <div class="myselfHeaderBox">
    <div class="myselfHeader">
      <img src="../../assets/cloud.png" class="cloudIcon">
      <label class="myselfHeaderFont">我的音乐</label>
      <router-link :to="{name: 'musicPlay'}">
        <img class="musicIcon" src="../../assets/music.png">
      </router-link>
    </div>
     <!-- 因为fiex固定定位脱离文档流，所以设置一个空的div补回脱离了的50px，否则后面的元素都得top:50px  -->
    <div class="emptyDiv"></div>
  </div>
  
</template>

<script>
  export default {
    
  }
</script>

<style src="../../css/myself/myselfHeader.css" scoped>

</style>