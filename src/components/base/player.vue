<template>
  <div class="player" v-show="this.url">
    <audio :src="this.url" ref="player"></audio>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'

  export default {
    methods: {
      // 格式化歌曲时长
      computeTotalTime() {
        let ele = this.$refs.player;
        // 不知道为什么获取歌曲时长时会有一定时间的延迟
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
          if(!this.draging) {
            let past = parseInt(this.$refs.player.currentTime)
            this.setCurrentTime(past);
            this.setPastTime(past);
            this.setMovePercent(past / this.durationTime);
          }
        },1000)
      },
      ...mapMutations([
        'setSongId',
        'setUrl',
        'setName',
        'setSingers',
        'setAlbum',
        'setComments',
        'setPicUrl',
        'play',
        'pause',
        'setDurationTime',
        'setTotalTime',
        'setPastTime',
        'setCurrentTime',
        'setMovePercent',
        'setDraged',
        'setCurrentIndex',
        'setLyric',
        'setLyricArr',
        'setLoading',
        'setMv'
      ])
    },
    computed: {
      ...mapState([
        'songId',
        'url',
        'lyric',
        'isPlaying',
        'playingList',
        'pastTime',
        'movePercent',
        'durationTime',
        'currentIndex',
        'playOrder',
        'draged',
        'draging',
        'lyricArr'
      ])
    },
    watch: {
      isPlaying(newVal) {
        if(newVal) {
          setTimeout(() => {
            this.$refs.player.play();
          }, 0)
          this.changeCurrentTime();
        }
        else {
          this.$refs.player.pause();
        }
      },
      // 切歌的时候自动播放
      url(newVal) {
        if(newVal) {
          // this.$refs.player.autoplay = 'autoplay';
          setTimeout(() => {
            this.$refs.player.play();
          }, 0)
          this.play();
          this.computeTotalTime();
        }
      },
      // 监听进度条的拖动点击以此跳转歌曲
      draged(newVal) {
        this.$refs.player.currentTime = this.pastTime;
        this.setDraged(false);
      },    
      // 歌曲播放完后改变songId
      movePercent(newVal) {
        // 是否显示加载小圈
        if(newVal > 0 && this.isPlaying) {
          this.setLoading(false);
        }
        else if(newVal === 0 && this.isPlaying) {
          this.setLoading(true);
        }
        if(newVal >= 1) {
          // 循环播放或是歌单里只有一首歌曲
          if(this.playOrder === 3 || this.playingList.length === 1) {
            this.$refs.player.currentTime = 0;
            this.$refs.player.play();
          }
          else if(this.playOrder === 1) {
            if((this.currentIndex + 1) >= this.playingList.length)  this.setCurrentIndex(0)
            else  this.setCurrentIndex(this.currentIndex + 1);
            this.setSongId(this.playingList[this.currentIndex]);
          }
          else if(this.playOrder === 2) {
            let ran = parseInt(Math.random() * this.playingList.length);
            this.setCurrentIndex(ran);
            this.setSongId(this.playingList[ran]);
          }
        }
      },
      // 根据songId来更新播放详情页
      songId(newVal) {
        let id = this.songId;
        this.setUrl('');
        api.getSongUrl(id, (res) => {
          if(!res) {
            alert("该歌曲暂时无法播放QWQ");
          }
          else {
            this.setUrl(res);
          }
        })
        api.getSongDetail(id, (res) => {
          this.setName(res.name);
          this.setSingers(res.ar);
          this.setPicUrl(res.al.picUrl);
          this.setAlbum(res.al.name);
          this.setMv(res.mv);
        });
        api.getLyric(id, (res) => {
          this.setLyric(res);
          this.setLyricArr();
        });
        api.getComments(id, (res) => {
          this.setComments(res);
        });
      } 
    }
  }
</script>

<style scoped>

</style>