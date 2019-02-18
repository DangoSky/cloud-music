<template>
  <div class="musicPlay">
    <div class="header">
      <img src="../../assets/leftArrow.png" class="leftArrow" @click="turnBack">
      <img src="../../assets/share1.png" class="share">
      <div class="songs" ref="songBox">
        <label class="songTitle" ref="songTitle">{{ name }}</label>
        <label class="singer">{{ singer }}</label>
      </div>
    </div>
    <component :is="componentId"></component>
    <div class="progress">
      <label class="currentTime">{{ currentTime }}</label>
      <progress-bar></progress-bar>
      <label class="totalTime">{{ totalTime }}</label>
    </div>
    <div class="musicFooter">
      <img :src="orderSrc" @click="this.setPlayOrder">
      <img src="../../assets/previous.png" @click="previous">
      <img :src="playing" @click="playPause">
      <img src="../../assets/next.png" @click="next">
      <img src="../../assets/recentMusic1.png">
    </div>
  </div>
</template>

<script>
  import progressBar from './progressBar.vue'
  import playerBody from './playerBody.vue'
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      'progress-bar': progressBar,
      'player-body': playerBody
    },
    data() {
      return {
        marqueeTimer: null,
        showLyric: false,
      }
    },
    mounted() {
      this.marquee();
      api.getLyric(this.songId, (res) => {
        this.setLyric(res);
        // console.log(this.lyric);
      });
    },
    beforeDestroy() {
      clearInterval(this.marqueeTimer);
    },
    methods: {
      turnBack() {
        this.$router.go(-1);
      },
      // 点击播放暂停
      playPause() {
        if(this.isPlaying) this.pause();
        else  this.play();
      },
      previous() {
        if(this.playOrder === 2) {
          let ran = parseInt(Math.random() * this.playingList.length);
          this.setCurrentIndex(ran);
          this.setSongId(this.playingList[ran]);
        }
        else {
          if(this.currentIndex === 0) {
            this.setCurrentIndex(this.playingList.length - 1);
            this.setSongId(this.playingList[this.currentIndex]);
          }
          else {
            this.setCurrentIndex(this.currentIndex - 1);
            this.setSongId(this.playingList[this.currentIndex]);            
          }
        }
      },
      next() {
        if(this.playOrder === 2) {
          let ran = parseInt(Math.random() * this.playingList.length);
          this.setCurrentIndex(ran);
          this.setSongId(this.playingList[ran]);
        }
        else {
          let index = this.currentIndex;
          if(index === this.playingList.length - 1) {
            this.setCurrentIndex(0);
            this.setSongId(this.playingList[0]);
          }
          else {
            this.setCurrentIndex(index + 1);
            this.setSongId(this.playingList[this.currentIndex]);             
          }
        }
      },
      // 手动实现跑马灯效果
      marquee() {
        let ele = this.$refs.songTitle;
        let box = this.$refs.songBox;
        let dis = 0;
        let lefting = ele.offsetWidth;
        if(ele.offsetWidth < box.offsetWidth) {
          ele.style.right = 0;
        }
        else {
          setTimeout(() => {
            this.marqueeTimer = setInterval(() => {
              dis -= 1;
              ele.style.left = `${dis}px`;
              if(parseInt(ele.style.left) * (-1) >= lefting) {
                ele.style.left = `${box.offsetWidth}px`;
                dis = box.offsetWidth;
              }
            }, 100);
          }, 2000);      
        }
      },
      ...mapMutations([
        'setLyric',
        'pause',
        'play',
        'setPlayOrder',
        'setPastTime',
        'setCurrentTime',
        'setCurrentIndex',
        'setSongId'
      ])
    },
    computed: {
      componentId() {
        if(!this.showLyric)  {
          return 'player-body';
        }
      },
      // 播放顺序icon
      orderSrc() {
        if(this.playOrder === 1)       return require('../../assets/playInOrder.png');
        else if(this.playOrder === 2)  return require('../../assets/playRandom.png');
        else if(this.playOrder === 3)  return require('../../assets/playCycle.png');
      },
      // 播放暂停icon
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
        'currentIndex',
        'picUrl',
        'isPlaying',
        'songId',
        'lyric',
        'durationTime',
        'totalTime',
        'pastTime',
        'currentTime',
        'playingList',
        'playOrder'
      ])
    }
  }
</script>

<style scoped src="../../css/base/musicPlay.css">

</style>