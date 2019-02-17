<template>
  <div>
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
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'

  export default {
    mounted () {
      api.getComments(this.songId, (res) => {
        this.commentsSum = res;
        if(this.commentsSum > 1000000)  this.commentsSum = "100w+";
        else if(this.commentsSum > 100000)  this.commentsSum = "10w+";
        else if(this.commentsSum > 10000)  this.commentsSum = "1w+";
        else if(this.commentsSum > 999)  this.commentsSum = "999+";
        else this.commentsSum = this.commentsSum;
      });
      this.rotateMusicLogo();
      console.log(this.picUrl);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    data() {
      return {
        commentsSum: '',
        timer: null,       
        deg: 0,        // 旋转角度 
        isLove: false,     // 是否喜欢歌曲
      }
    },
    methods: {
      // 你喜欢吗
      clickLove() {
        this.isLove = !this.isLove;
      },
      // 歌曲封面旋转
      rotateMusicLogo() {
        this.timer = setInterval(() => {
          this.deg += 0.15;
          if(this.deg >= 360)  this.deg = 0;
          this.$refs.musicDom.style.transform = `rotate(${this.deg}deg)`;
          this.setPastTime(this.pastTime + 10);
          // 每隔一秒再改变显示的时长
          // if(this.pastTime % 1000 === 0) {
          //   this.changeCurrentTime();
          // }
        }, 10)
      },
      ...mapMutations([
        'setPastTime'
      ])
    },
    computed: {
      // 是否喜欢歌曲显示红心
      loveSrc() {
        if(this.isLove)  return require('../../assets/love1.png');
        else  return require('../../assets/love.png');
      },
      ...mapState([
        'picUrl',
        'songId',
        'pastTime'
      ])
    }
  }
</script>

<style scoped src="../../css/base/playerBody.css">

</style>