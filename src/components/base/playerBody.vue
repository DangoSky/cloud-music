<template>
  <div>
    <div class="musicLogo">
      <img :src="this.picUrl" ref="musicDom" @click="setShowLyric(!showLyric)" v-show="this.picUrl">
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
  import { mapState, mapMutations } from 'vuex'

  export default {
    created() {
      // 判断是否喜欢该歌曲
      this.judgeLove();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    data() {
      return {
        timer: null,     
        isLove: false,  
        deg: 0             // 旋转角度 
      }
    },
    methods: {
      // 你喜欢吗
      clickLove() {
        this.isLove = !this.isLove;
        // 将喜欢的歌曲信息格式化后存储到localStorage里。需要先取出localStorage里歌单，再把新喜欢的歌曲信息拼接到它后面后再存储
        if(this.isLove) {
          let loveObj = {};
          loveObj.id = this.songId;
          loveObj.name = this.name;
          loveObj.singer = this.singer;
          loveObj.album = this.album;
          loveObj.mv = this.mv;
          loveObj.picUrl = this.picUrl;
          let mylove = localStorage.getItem('cloudmusicLoveSongs');
          if(!mylove)  mylove = '';
          mylove += JSON.stringify(loveObj);
          localStorage.setItem('cloudmusicLoveSongs', mylove);
        }
        // 取消喜欢。先从localStorage里取出歌单后用正则匹配成数组的形式，再删除不喜欢的歌曲后重新字符串化再存储
        else {
          let myloveArr = (localStorage.getItem('cloudmusicLoveSongs')).match(/{[\s\S]*?}/g);
          let myloveStr = '';
          for(let i=0; i<myloveArr.length; i++) {
            let item = JSON.parse(myloveArr[i]);
            if(item.id === this.songId)  continue;
            else {
              myloveStr += JSON.stringify(item); 
            }
          }
          localStorage.setItem('cloudmusicLoveSongs', myloveStr);
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
      judgeLove() {
        if(localStorage.getItem('cloudmusicLoveSongs')) {
          let localLoveSongs = (localStorage.getItem('cloudmusicLoveSongs')).match(/{[\s\S]*?}/g);
          for(let i=0; i<localLoveSongs.length; i++) {
            let item = JSON.parse(localLoveSongs[i]);
            if(item.id === this.songId)  {
              this.isLove = true;
              return; 
            }
          }
          this.isLove = false;
        } 
      },
      ...mapMutations([
        'setShowLyric',
      ])
    },
    computed: {
      // 是否喜欢歌曲显示红心
      loveSrc() {
        if(this.isLove)  return require('../../assets/love1.png');
        else  return require('../../assets/love.png');
      },
      ...mapState([
        'url',
        'songId',
        'singer',
        'album',
        'commentsSum',
        'mv',
        'name',
        'picUrl',
        'isPlaying',
        'showLyric',
        'loading',
        'pastTime',
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
      },
      url: function(newVal) {
        // 如果不指定使新值还是旧值的话，会执行两次watch！！
        if(newVal) {
          this.judgeLove();
          if(this.isLove)  {
            let tem = parseInt(localStorage.getItem('cloudmusicLoveSongsPlayCount'));
            if(!tem)  tem = 1;
            else  tem++;
            localStorage.setItem('cloudmusicLoveSongsPlayCount', String(tem));
          }
        }
      }
    }
  }
</script>

<style scoped src="../../css/base/playerBody.css">

</style>