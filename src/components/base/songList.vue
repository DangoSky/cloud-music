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
      <song-list-body :list="{listName: listName, listId: listId, playCount: playCount, picUrl: picUrl, searchKey: searchKey}"></song-list-body>
    </div>
    <fixed-footer></fixed-footer>
  </div>
</template>
      
<script>
  import songListBody from './songListBody.vue'
  import footer from '../base/footer.vue'
  export default {
    // activated() {
    //   this.listName = this.$route.query.listName;
    //   this.listId = this.$route.query.listId;
    //   this.playCount = this.$route.query.playCount;
    //   this.picUrl = this.$route.query.picUrl;
    // },
    components: {
      'song-list-body': songListBody,
      'fixed-footer': footer
    },
    data() {
      return {
        searchKey: '',
        listName: this.$route.query.listName,
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