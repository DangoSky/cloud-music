<template>
  <div class="musicPlay">
    <div class="header">
      <img src="../assets/leftArrow.png" class="leftArrow" @click="turnBack">
      <img src="../assets/share1.png" class="share">
      <div class="songs">
        <p class="songTitle">我的一个道姑朋友</p>
        <label class="singer">以冬</label>
      </div>
    </div>
    <div class="musicLogo">
      <img :src="musicLogo">
    </div>
    <div class="musicBar">
      <img :src="loveSrc" @click="clickLove">
      <img src="../assets/download.png">
      <img src="../assets/soundEffect.png">
      <img src="../assets/comments.png">
      <img src="../assets/more.png">
    </div>
    <div class="musicFooter">
      <img src="../assets/playInOrder.png">
      <img src="../assets/previous.png">
      <img :src="playSrc" @click="playPause">
      <img src="../assets/next.png">
      <img src="../assets/recentMusic1.png">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        musicLogo: 'http://p2.music.126.net/e6G_JLkLGcIQLw9vsdgt0g==/109951163763088598.jpg?param=170y170',
        isLove: false,
        isPlay: false
      }
    },
    methods: {
      turnBack() {
        this.$router.go(-1);
      },
      clickLove() {
        this.isLove = !this.isLove;
      },
      playPause() {
        this.isPlay = !this.isPlay;
      }
    },
    computed: {
      loveSrc() {
        if(this.isLove)  return require('../assets/love1.png');
        else return require('../assets/love.png');
      },
      playSrc() {
        if(this.isPlay)  return require('../assets/play.png');
        else return require('../assets/pause.png');
      } 
    }
  }
</script>

<style scoped src="../css/musicPlay.css">

</style>