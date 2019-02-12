<template>
  <div class="recomendationSongList">
    <p class="recomendationFont">推荐歌单</p>
    <div v-for="item in songList" :key="item.id">
      
    </div>
    <!-- <p v-for="item in songList" :key="item.id">{{ item.id }}</p> -->
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