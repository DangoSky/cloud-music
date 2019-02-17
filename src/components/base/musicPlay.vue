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
      <progress-bar @changePercent="changePercent"></progress-bar>
      <label class="totalTime">{{ totalTime }}</label>
    </div>
    <div class="musicFooter">
      <img :src="orderSrc" @click="this.setPlayOrder">
      <img src="../../assets/previous.png">
      <img :src="playing" @click="playPause">
      <img src="../../assets/next.png">
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
      this.setPastTime(0);
      api.getSongUrl(this.songId, (res) => {
        if(!res) {
          alert("该歌曲暂时无法播放QWQ");
        }
        else {
          this.setUrl(res);
        }
      });

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

      // 子组件通过拖动点击进度条从而触发父组件修改时间
      changePercent(percent) {
        this.setPastTime(parseInt(percent * this.durationTime));
        this.setCurrentTime(this.pastTime);
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
        'setPlaying',
        'setUrl',
        'setComments',
        'setLyric',
        'play',
        'pause',
        'setDurationTime',
        'setTotalTime',
        'setPlayOrder',
        'setPastTime',
        'setCurrentTime',
        'setMovePercent',
        'setShowPlayer'
      ])
    },
    computed: {
      componentId() {
        if(!this.showLyric)  {
          return 'player-body';
        }
      },

      // 播放顺序
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
        'picUrl',
        'url',
        'isPlaying',
        'songId',
        'comments',
        'lyric',
        'durationTime',
        'totalTime',
        'playOrder',
        'pastTime',
        'currentTime',
        'movePercent',
        'showPlayer'
      ])
    },
    watch: {
      // 根据歌曲的进度控制是否播放
      movePercent: function(newVal) {
        if(newVal > 100) {
          this.pause();
        }
      },
    }
  }
</script>

<style scoped src="../../css/base/musicPlay.css">

</style>