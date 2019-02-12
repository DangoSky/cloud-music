<template>
  <div class="recomendationSongList">
    <p class="recomendationFont">推荐歌单</p>
    <div class="box">
      <div  class="songListBox" v-for="item in songList" :key="item.id">
        <img :src="item.picUrl" alt="无法加载图片" class="songLogo">
        <label class="songName">{{ item.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
  export default {
    created() { 
      // 需要使用箭头函数，使得this指向vue实例
      api.getRecomendationSongList((res) => this.songList = res);  
    },
    data() {
      return {
        songList: []
      }
    }
  }
</script>

<style scoped src="../../css/explore/recomendationSongList.css">

</style>