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
      <img :src="musicLogo" ref="musicDom">
    </div>
    <div class="musicBar">
      <img :src="loveSrc" @click="clickLove">
      <img src="../assets/download.png">
      <img src="../assets/soundEffect.png">
      <img src="../assets/comments.png">
      <img src="../assets/more.png">
    </div>
    <div class="musicFooter">
      <img :src="orderSrc" @click="changePlayOrder">
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
        isPlay: false,
        playOrder: 1,
        timer: null,
        deg: 0
      }
    },
    methods: {
      // 后退
      turnBack() {
        this.$router.go(-1);
      },
      // 你喜欢吗
      clickLove() {
        this.isLove = !this.isLove;
      },
      // 播放暂停
      playPause() {
        this.isPlay = !this.isPlay;
        // 实现歌曲封面旋转
        if(this.isPlay) {
          this.timer = setInterval(() => {
            this.deg += 0.15;
            if(this.deg >= 360)  this.deg = 0;
            this.$refs.musicDom.style.transform = 'rotate(' + this.deg + 'deg)';
          }, 10)
        }
        else {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      // 改变播放顺序
      changePlayOrder() {
        if(this.playOrder === 3)  this.playOrder = 1;
        else this.playOrder++;
      }
    },
    computed: {
      // 是否喜欢歌曲显示红心
      loveSrc() {
        if(this.isLove)  return require('../assets/love1.png');
        else return require('../assets/love.png');
      },
      // 播放暂停
      playSrc() {
        if(this.isPlay)  return require('../assets/pause.png');
        else return require('../assets/play.png');
      },
      // 播放顺序
      orderSrc() {
        if(this.playOrder === 1)  return require('../assets/playInOrder.png');
        else if(this.playOrder === 2)  return require('../assets/playRandom.png');
        else if(this.playOrder === 3)  return require('../assets/playCycle.png');
      } 
    }
  }
</script>

<style scoped src="../css/musicPlay.css">

</style>