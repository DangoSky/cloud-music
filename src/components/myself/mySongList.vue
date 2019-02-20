<template>
  <div class="mySongList">
    <div class="listBar">
      <label :style="{background: 'url('+  showIcon +') no-repeat 10px center'}" class="listBarFont" @click="folding">我创建的歌单(1)</label>
      <img src="../../assets/more2.png" class="more">
    </div>
    <div class="loveSongList" v-show="show" @click="showDetail">
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
      let myloveArr = (localStorage.getItem('cloudmusicLoveSongs')).match(/{[\s\S]*?}/g);
      for(let i=0; i<myloveArr.length; i++) {
        let obj = JSON.parse(myloveArr[i]);
        this.loveSong.push(obj);
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
        console.log("turn");
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