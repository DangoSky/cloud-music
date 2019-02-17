<template>
  <div class="player" v-show="this.url">
    <audio :src="this.url" ref="player"></audio>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {

      }
    },
    methods: {
      // 格式化歌曲时长
      computeTotalTime() {
        let ele = this.$refs.player;
        let timer = setInterval(() => {
          if(ele.duration) {
            this.setDurationTime(parseInt(ele.duration));
            this.setTotalTime();
            clearInterval(timer);
            timer = null;
          }
        },10)
      },
      // 实时显示歌曲正进行的时间
      changeCurrentTime() {
        setInterval(() => {
          let past = parseInt(this.$refs.player.currentTime)
          this.setCurrentTime(past);
          this.setPastTime(past);
          this.setMovePercent(past / this.durationTime);
        },1000)
      },

      ...mapMutations([
        'setDurationTime',
        'setTotalTime',
        'play',
        'setCurrentTime',
        'setPastTime',
        'setMovePercent',
        'setDraged',
      ])
    },
    computed: {
      ...mapState([
        'url',
        'isPlaying',
        'pastTime',
        'movePercent',
        'durationTime',
        'draged',
      ])
    },
    watch: {
      isPlaying: function(newVal, old) {
        if(newVal)  {
          this.$refs.player.play();
          this.changeCurrentTime();
        }
        else {
          this.$refs.player.pause();
        }
      },
      // 切歌的时候自动播放
      url: function(newVal) {
        if(newVal) {
          this.$refs.player.autoplay = 'autoplay';
          this.play();
          this.computeTotalTime();
        }
      },
      // 监听进度条的拖动点击以此跳转歌曲
      draged: function() {
        this.$refs.player.currentTime = this.pastTime;
        this.setDraged(false);
      }
    }
  }
</script>

<style scoped>

</style>