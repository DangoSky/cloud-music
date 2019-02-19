<template>
  <div>
    <div class="musicLogo">
      <img :src="this.picUrl" ref="musicDom" @click="setShowLyric(!showLyric)">
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
  import { mapState, mapMutations } from 'vuex'

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
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    data() {
      return {
        commentsSum: '',
        timer: null,       
        deg: 0,             // 旋转角度 
        isLove: false,     // 是否喜欢歌曲
      }
    },
    methods: {
      // 你喜欢吗
      clickLove() {
        this.isLove = !this.isLove;
        // 将喜欢的歌曲信息格式化后存储到localStorage里。需要先取出localStorage里歌单，再把新喜欢的歌曲信息拼接到它后面后再存储
        if(this.isLove) {
          let loveObj = {};
          loveObj.songId = this.songId;
          loveObj.name = this.name;
          loveObj.singer = this.singer;
          loveObj.album = this.album;
          loveObj.mv = this.mv;
          let mylove = localStorage.getItem('cloudmusicLoveSongs');
          mylove += JSON.stringify(loveObj);
          localStorage.setItem('cloudmusicLoveSongs', mylove);
          // console.log(localStorage.getItem('cloudmusicLoveSongs'));
        }
        // 取消喜欢。先从localStorage里取出歌单后用正则匹配成数组的形式，再删除不喜欢的歌曲后重新字符串化再存储
        else {
          let myloveArr = (localStorage.getItem('cloudmusicLoveSongs')).match(/{[\s\S]*?}/g);
          let myloveStr = '';
          for(let i=0; i<myloveArr.length; i++) {
            let item = JSON.parse(myloveArr[i]);
            if(item.songId === this.songId)  continue;
            else {
              myloveStr += JSON.stringify(item); 
            }
          }
          localStorage.setItem('cloudmusicLoveSongs', myloveStr);
          console.log(localStorage.getItem('cloudmusicLoveSongs'));
        }
      },
      // 歌曲封面旋转
      rotateMusicLogo() {
        this.timer = setInterval(() => {
          this.deg += 0.15;
          if(this.deg >= 360)  this.deg = 0;
          this.$refs.musicDom.style.transform = `rotate(${this.deg}deg)`;
        }, 10)
      },
      ...mapMutations([
        'setShowLyric'
      ])
    },
    computed: {
      // 是否喜欢歌曲显示红心
      loveSrc() {
        if(this.isLove)  return require('../../assets/love1.png');
        else  return require('../../assets/love.png');
      },
      ...mapState([
        'songId',
        'singer',
        'album',
        'mv',
        'name',
        'picUrl',
        'isPlaying',
        'showLyric',
        'loading',
        'pastTime'
      ])
    },
    watch: {
      pastTime: function() {
        if(!this.loading && this.isPlaying) {
          // 反复按播放暂停前需要先清除定时器，否则会进行叠加
          clearInterval(this.timer);
          this.timer = null;
          this.rotateMusicLogo();
        }
        else {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      isPlaying: function(newVal) {
        if(!this.loading && newVal) {
          clearInterval(this.timer);
          this.timer = null;
          this.rotateMusicLogo();
        }
        else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }
    }
  }
</script>

<style scoped src="../../css/base/playerBody.css">

</style>