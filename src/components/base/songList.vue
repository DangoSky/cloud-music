<template>
  <div class="songList">
    <div class="headerBar">
      <!-- <div class="headerBarBg" :style="{background: 'url(' + listData.picUrl + ') center top fixed'}"></div> -->
      <img src="../../assets/leftArrow.png" class="back" @click="back">
      <router-link :to="{name: 'musicPlay'}">
        <img src="../../assets/music.png" class="musicIcon">
      </router-link>
      <img src="../../assets/more1.png" class="more">
      <label class="songFont">歌单</label>
    </div>
    <div class="emptyClass"></div>
    <div class="header">
      <!-- 制作毛玻璃背景图效果,因为bg是动态的url，所以只能再用一个空div -->
      <div class="blurBg" :style="{background: 'url(' + picUrl + ') center center '}"></div>  
      <div class="searchBox">
        <input type="text" class="search" placeholder="搜索歌单内歌曲">
      </div>
      <song-list-body :list="{listId: listId, playCount: playCount}"></song-list-body>
    </div>
  </div>
</template>

<script>
  import songListBody from './songListBody.vue'
  export default {
    components: {
      'song-list-body': songListBody
    },
    data() {
      return {
        isSearching: false,
        listId: this.$route.query.listId,
        playCount: this.$route.query.playCount,
        picUrl: this.$route.query.picUrl
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped src="../../css/base/songList.css">

</style>