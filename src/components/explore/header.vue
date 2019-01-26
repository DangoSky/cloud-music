<template>
  <div class="header">
    <img class="audio" :src="audioSRC">    
    <input class="search" type="text" placeholder="是团子的天空幻想">
    <img  class="music" src="../../assets/music.png">
  </div>
</template> 

<script>
  export default {
    props: ['audioSRC'],
  }
</script>

<style src="../../css/explore/header.css" scoped>
  /* 通过@import或import引入的css文件,scoped不起作用 */
  /* @import '../../css/explore/header.css' */
</style>