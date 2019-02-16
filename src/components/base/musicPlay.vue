<template>
  <div class="musicPlay">
    <audio :src="this.url" ref="player"></audio>
    <div class="header">
      <img src="../../assets/leftArrow.png" class="leftArrow" @click="turnBack">
      <img src="../../assets/share1.png" class="share">
      <div class="songs">
        <p class="songTitle">{{ this.name }}</p>
        <label class="singer">{{ this. singer }}</label>
      </div>
    </div>
    <div class="musicLogo">
      <img :src="this.picUrl" ref="musicDom">
    </div>
    <div class="musicBar">
      <img :src="loveSrc" @click="clickLove">
      <img src="../../assets/download.png">
      <img src="../../assets/soundEffect.png">
      <div class="commentsBox">
        <img src="../../assets/comments.png">
        <label class="commentsFont">{{ commentsSum }}</label>
      </div>
      <img src="../../assets/more.png">
    </div>
    <div class="progress">
      <label class="currentTime">{{ currentTime }}</label>
      <progress-bar :movePercent="movePercent" @changePercent="changePercent"></progress-bar>
      <label class="totalTime">{{ totalTime }}</label>
    </div>
    <div class="musicFooter">
      <img :src="orderSrc" @click="changePlayOrder">
      <img src="../../assets/previous.png">
      <img :src="playing" @click="playPause">
      <img src="../../assets/next.png">
      <img src="../../assets/recentMusic1.png">
    </div>
  </div>
</template>

<script>
  import progressBar from './progressBar.vue'
  import api from '../../api/index.js'
  import { mapState } from 'vuex'
  import { mapMutations} from 'vuex'

  export default {
    components: {
      'progress-bar': progressBar
    },
    data() {
      return {
        isLove: false,     // 是否喜欢歌曲
        playOrder: 1,    // 播放顺序
        timer: null,    // 旋转定时器
        deg: 0,        // 旋转角度 
        commentsSum: '',
        currentTime: '00:00',         // 歌曲播放进度
        pastTime: 0,                // 已经播放的时长 
        // allTime: 0,             // 歌曲总时间，数值形式 
        movePercent: 0,           // 歌曲进行百分比，传递给子组件控制进度条 
      }
    },
    mounted() {
      // 马上计算歌曲总长
      // this.allTime = parseInt(this.totalTime.slice(0, -3)) * 60 + parseInt(this.totalTime.slice(-2));
      api.getSongUrl(this.songId, (res) => {
        if(!res) {
          alert("该歌曲暂时无法播放QWQ");
        }
        else {
          this.setUrl(res);
          this.$refs.player.autoplay = 'autoplay';
          this.rotateMusicLogo();
        }
        return true;
      },
      this.computeTotalTime  
      );
      api.getComments(this.songId, (res) => {
        this.commentsSum = res;
        if(this.commentsSum > 1000000)  this.commentsSum = "100w+";
        else if(this.commentsSum > 100000)  this.commentsSum = "10w+";
        else if(this.commentsSum > 10000)  this.commentsSum = "1w+";
        else if(this.commentsSum > 999)  this.commentsSum = "999+";
        else this.commentsSum = this.commentsSum;
      });
      api.getLyric(this.songId, (res) => {
        this.setLyric(res);
        // console.log(this.lyric);
      });

    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      turnBack() {
        this.$router.go(-1);
      },
      // 播放暂停
      playPause() {
        if(this.isPlaying) this.pause();
        else  this.play();
      },
      // 你喜欢吗
      clickLove() {
        this.isLove = !this.isLove;
      },

      // 改变播放顺序
      changePlayOrder() {
        if(this.playOrder === 3)  this.playOrder = 1;
        else this.playOrder++;
      },
      // 歌曲封面旋转
      rotateMusicLogo() {
        this.timer = setInterval(() => {
          this.deg += 0.15;
          if(this.deg >= 360)  this.deg = 0;
          this.$refs.musicDom.style.transform = `rotate(${this.deg}deg)`;
          this.pastTime += 10;
          this.changeCurrentTime();
        }, 10)
      },
      // 格式化歌曲时长,设置定时器获取歌曲时长，获取到后关闭
      computeTotalTime() {
        let ele = this.$refs.player;
        let getDurantion = setInterval(() => {
          console.log("loading");
          if(ele.duration) {
            this.setDurationTime(ele.duration);
            let minutes = parseInt(parseInt(ele.duration) / 60);
            let seconds = parseInt(ele.duration) % 60;
            if(minutes < 10)  minutes = '0' + minutes;
            if(seconds < 10)  seconds =  '0' + seconds;
            this.setTotalTime(minutes + ':' + seconds);
            clearInterval(getDurantion);     
          }
        },10)
      },
      // 计算歌曲进行的当前时间
      changeCurrentTime() {
        let seconds = this.pastTime / 1000;
        let minutes = parseInt(seconds / 60);
        seconds = Math.floor(seconds % 60 );
        minutes = minutes < 10 ? '0' + minutes : ''+minutes;
        seconds = seconds < 10 ? '0' + seconds : ''+seconds;
        this.currentTime  =  `${minutes}:${seconds}`;
        // 通过百分比计算进度条长度
        this.movePercent = this.pastTime / 1000 / this.allTime * 100;    
      },
      // 子组件通过拖动点击进度条从而触发父组件修改时间，参数为子组件传递过来的参数(百分比)
      changePercent(percent) {
        this.pastTime = parseInt(percent / 100 * this.allTime * 1000);    // 统一以毫秒的形式
        this.changeCurrentTime();
      },
      ...mapMutations([
        'setPlaying',
        'setUrl',
        'setComments',
        'setLyric',
        'play',
        'pause',
        'setDurationTime',
        'setTotalTime'
      ])
    },
    computed: {
      // 是否喜欢歌曲显示红心
      loveSrc() {
        if(this.isLove)  return require('../../assets/love1.png');
        else  return require('../../assets/love.png');
      },
      // 播放顺序
      orderSrc() {
        if(this.playOrder === 1)       return require('../../assets/playInOrder.png');
        else if(this.playOrder === 2)  return require('../../assets/playRandom.png');
        else if(this.playOrder === 3)  return require('../../assets/playCycle.png');
      },
      // 播放暂停
      playing() {
        if(this.isPlaying) {
          return require('../../assets/pause.png');
        }
        else {
          return require('../../assets/play.png');
        }
      },
      ...mapState([
        'name',
        'singer',
        'picUrl',
        'url',
        'isPlaying',
        'songId',
        'comments',
        'lyric',
        'durationTime',
        'totalTime'
      ])
    },
    watch: {
      isPlaying: function(newVal) {
        // 反复按播放暂停前需要先清除定时器，否则会进行叠加
        clearInterval(this.timer);
        this.timer = null;
        if(newVal) 
        {
          this.$refs.player.play();
          this.rotateMusicLogo();
        }
        else {
          this.$refs.player.pause();
        } 
      }
      // 根据歌曲的进度控制是否播放
      // movePercent: function() {
      //   if(this.movePercent >= 100)  
      //   {
      //     this.isPlaying = false;
      //   }
      //   else {
      //     this.isPlaying = true;
      //   }
      // },


    }
  }
</script>

<style scoped src="../../css/base/musicPlay.css">

</style>