<template>
  <div class="mySongList">
    <div class="listBar">
      <label :style="{background: 'url('+ showIcon +') no-repeat 10px center'}" class="listBarFont" @click="folding">我创建的歌单({{ loveSong.length }})</label>
      <img src="../../assets/more2.png" class="more">
    </div>
    <div class="loveSongList" v-show="show" @click="showDetail" v-if="loveSong.length !== 0">
      <div class="loveSongPicBox" :style="{backgroundImage: 'url('+ loveSong[loveSong.length-1].picUrl +')'}">
        <img src="../../assets/love2.png" class="loveSongPic">
      </div>
      <label class="loveListTitle">我喜欢的音乐</label>
      <label class="loveListCount">{{ loveSong.length }}首</label>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      if(localStorage.getItem('cloudmusicLoveSongs')) {
        let myloveArr = (localStorage.getItem('cloudmusicLoveSongs')).match(/{[\s\S]*?}/g);
        for(let i=0; i<myloveArr.length; i++) {
          let obj = JSON.parse(myloveArr[i]);
          this.loveSong.push(obj);
        }
      }
    },
    data() {
      return {
        show: true,
        loveSong: []
      }
    },
    methods: {
      folding() {
        this.show = !this.show;
      },
      showDetail() {
        this.$router.push({
          name: 'songList',
          query: {
            listName: '我喜欢的音乐',
            playCount: localStorage.getItem('cloudmusicLoveSongsPlayCount'),
            picUrl: this.loveSong[this.loveSong.length-1].picUrl,
            listId: 'cloudmusicLoveSongs',
            ownSongList: true
          }
        })
      }
    },
    computed: {
      showIcon() {
        if(this.show) {
          return require('../../assets/bottomArrow.png');
        }
        else {
          return require('../../assets/rightArrow3.png')
        }
      }
    }
  }
</script>

<style scoped src="../../css/myself/mySongList.css">

</style>