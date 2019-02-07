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
    <div class="progressBar">
      <label class="currentTime">{{ currentTime }}</label>
      <div class="bar">
        <span class="moveBar" ref="moveBar"></span>
      </div>
      <label class="totalTime">{{ totalTime }}</label>
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
        isLove: false,     // 是否喜欢歌曲
        isPlay: false,    // 播放暂停
        playOrder: 1,    // 播放顺序
        timer: null,    // 旋转定时器
        deg: 0,        // 旋转角度 
        currentTime: '00:00',     // 歌曲播放进度
        totalTime: '00:43',      // 歌曲总长，字符串形式
        pastTime: 0,            // 已经播放的时长 
        allTime: 0             // 歌曲总时间，数值形式 
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
        this.rotateMusicLogo();        
      },
      // 改变播放顺序
      changePlayOrder() {
        if(this.playOrder === 3)  this.playOrder = 1;
        else this.playOrder++;
      },
      // 歌曲封面旋转
      rotateMusicLogo() {
        if(this.isPlay === true) {
          this.timer = setInterval(() => {
            this.deg += 0.15;
            if(this.deg >= 360)  this.deg = 0;
            this.$refs.musicDom.style.transform = 'rotate(' + this.deg + 'deg)';
            this.pastTime += 10;
            this.changeCurrentTIme();
            this.move();
          }, 10)
        }
        else {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      // 歌曲进行时计时
      changeCurrentTIme() {
        let seconds = this.pastTime / 1000;
        let minutes = parseInt(seconds / 60);
        seconds = Math.floor(seconds % 60 );
        minutes = minutes < 10 ? '0' + minutes : ''+minutes;
        seconds = seconds < 10 ? '0' + seconds : ''+seconds;
        this.currentTime  =  `${minutes}:${seconds}`;
      },
      // 进度条走动
      move() {
        // 通过百分比计算进度条长度
        this.allTime = parseInt(this.totalTime.slice(0, -3)) * 60 + parseInt(this.totalTime.slice(-2));
        let len = this.pastTime / 1000 / this.allTime * 100;
        this.$refs.moveBar.style.width = len + '%';
        console.log(len + '%');
        if(len >= 100)  
        {
          this.isPlay = false;
          clearInterval(this.timer);
          this.timer = null;
        }
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