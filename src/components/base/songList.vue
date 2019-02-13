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
      <!-- <div class="blurBg" :style="{background: 'url(' + listData.picUrl + ') center center fixed'}"></div>   -->
      <div class="searchBox">
        <input type="text" class="search" placeholder="搜索歌单内歌曲">
      </div>
    </div>
    <component :is="componentId" :listId="listId"></component>
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
        listId: this.$route.query.listId
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    },
    computed: {
      componentId() {
        if(!this.isSearching)  return 'song-list-body';
      }
    }
  }
</script>

<style scoped src="../../css/base/songList.css">

</style>