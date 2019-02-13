<template>
  <div class="songListBody">
    <div class="listData">
      <div class="picBox">
        <img :src="songList.coverImgUrl" alt="正在加载中..." class="playPic">
        <label class="playCount">{{ list.playCount }}</label>
        <img src="../../assets/detail.png" class="detail">
      </div>
      <div class="creator">
        <p class="listTitle">{{ songList.name }}</p>
        <img :src="songList.creator.avatarUrl" class="creatorPic"> 
        <label class="nickName">{{ songList.creator.nickname}}</label>
      </div>
      <div class="bar">
        <label class="commentCount">{{ songList.commentCount}}</label>
        <label class="shareCount">{{ songList.shareCount}}</label>
        <label class="download">下载</label>
        <label class="selects">多选</label>
      </div>
    </div> 
  </div>
</template>

<script>
  import api from '../../api/index.js'
  export default {
    created() {
      api.getSongList(this.list.listId, (res) => this.songList = res);
    },
    props: ['list'],
    data() {
      return {
        songList: {}
      }
    },
    methods: {
 
    }
  }
</script>

<style scoped src="../../css/base/songListBody.css">

</style>