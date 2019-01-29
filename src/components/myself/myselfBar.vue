<template>
  <div class="myselfBar">
    <div 
      v-for="(item, index) in myselfBarArr" 
      :key="index" class="localMusic" 
      :style="{background: 'url(' + item.bgSrc + ') no-repeat 10px 10px'}"
    >
      <!-- 动态背景图片的url要加引号变成字符串的形式，且都要require -->
      <label>{{ item.name }}</label>
      <img src="../../assets/rightArrow.png" class="rightArrow">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myselfBarArr: [
          {
            name: '本地音乐',
            bgSrc: require('../../assets/music1.png')
          },
          {
            name: '最近播放',
            bgSrc: require('../../assets/recentMusic.png')
          },
          {
            name: '我的电台',
            bgSrc: require('../../assets/myBroadcasting.png')
          },
          {
            name: '我的收藏',
            bgSrc: require('../../assets/myCollection.png')
          },
          {
            name: 'Sati空间',
            bgSrc: require('../../assets/sati.png')
          }
        ]
      }
    }
  }
</script>

<style src="../../css/myself/myselfBar.css" scoped>

</style>