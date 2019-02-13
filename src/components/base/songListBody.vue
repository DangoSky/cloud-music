<template>
  <div class="songListBody">
    <!-- <div class="listData">
      <div class="picBox">
        <img :src="listData.picUrl" alt="无法加载图片" class="playPic">
        <label class="playCount">{{ listData.playCount }}</label>
        <img src="../../assets/detail.png" class="detail">
      </div>
      <div class="creater">
      </div> 
    </div>-->
    {{songList}}
  </div>
</template>

<script>
  import api from '../../api/index.js'
  export default {
    created() {
      api.getSongList(this.listId, (res) => this.songList = res);
      // api.getRecomendationSongListId((res) => this.songList = res);
      // console.log(this.songList);
    },
    props: ['listId'],
    data() {
      return {
        songList: {}
      }
    },
  }
</script>

<style scoped src="../../css/base/songListBody.css">

</style>