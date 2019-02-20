<template>
  <div class="songList">
    <div class="headerBar">
      <img src="../../assets/leftArrow.png" class="back" @click="back">
      <router-link :to="{name: 'musicPlay'}">
        <img src="../../assets/music.png" class="musicIcon">
      </router-link>
      <img src="../../assets/more1.png" class="more">
      <label class="songFont">{{listName}}</label>
    </div>
    <div class="emptyClass"></div>
    <div class="header" >
      <!-- 制作毛玻璃背景图效果,因为bg是动态的url，所以只能再用一个空div -->
      <div class="blurBg" :style="{background: 'url(' + picUrl + ') center center'}"  v-show="searchKey === ''"></div>  
      <div class="searchBox">
        <input type="text" class="search" placeholder="搜索歌单内的歌曲" v-model="searchKey">
      </div>
      <song-list-body :list="{listName: listName, listId: listId, playCount: playCount, picUrl: picUrl, searchKey: searchKey, ownSongList: ownSongList}"></song-list-body>
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
        searchKey: '',
        listName: this.$route.query.listName,
        listId: this.$route.query.listId,
        playCount: this.$route.query.playCount,
        picUrl: this.$route.query.picUrl,
        ownSongList: this.$route.query.ownSongList,
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