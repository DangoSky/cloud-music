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
      <img src="../../assets/more.png" @click.stop="showManagement">
    </div>
    <transition tag="div" name="fade">
      <list-box 
        :manageList="manageList" 
        @hide="hideManagement"
        @clickItem="clickItem"
        v-if="isShowManagement"
      >
        <template slot="header">
          <p style="font-size: 0.85rem; padding: 10px;">歌曲: {{name}}</p>
        </template>
      </list-box>
    </transition>
    <transition tag="div" name="fade">
      <my-list v-if="isShowList"
        @hide="hideManagement"      
      >
      </my-list>
    </transition>
    <transition tag="div" name="collect">
      <div class="collectSuccessful" v-if="showCollect">
        <p>已收藏到歌单</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import listBox from './listBox.vue'
  import myList from './myList.vue'

  export default {
    created() {
      // 判断是否喜欢该歌曲
      this.judgeLove();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    components: {
      'list-box': listBox,
      'my-list': myList
    },
    data() {
      return {
        timer: null,     
        isLove: false,  
        deg: 0,   // 旋转角度 
        isShowManagement: false,
        isShowList: false,
        showCollect: false,
        manageList: [
          {
            name: '收藏到歌单',
            icon: require('../../assets/add.png')
          },
          {
            name: '相似推荐',
            icon: require('../../assets/similar.png')
          },
          {
            name: '歌手',
            icon: require('../../assets/singer.png')
          },
          {
            name: '专辑',
            icon: require('../../assets/album.png')
          },
          {
            name: '来源:歌单',
            icon: require('../../assets/link.png')
          },
          {
            name: '查看视频',
            icon: require('../../assets/video3.png')
          },
          {
            name: '定时关闭',
            icon: require('../../assets/timer.png')
          }
        ]
      }
    },
    methods: {
      // 你喜欢吗
      clickLove() {
        this.isLove = !this.isLove;
        let loveSong = this.songDetail();
        if(JSON.stringify(loveSong) === '{}')  return;
        if(this.isLove) {          
          // 如果还没有创建我喜欢的歌单，则新建localstorage记录
          let songList = localStorage.getItem('cloudmusicSongList') ? localStorage.getItem('cloudmusicSongList') : '';
          if(!songList.includes('cloudmusic_我喜欢的音乐') ) {
            let loveList = {};
            loveList.name = '我喜欢的音乐';
            loveList.id = 'cloudmusic_我喜欢的音乐';
            loveList.playCount = 0;
            localStorage.setItem('cloudmusic_我喜欢的音乐', JSON.stringify(loveSong));
            localStorage.setItem('cloudmusicSongList', songList + JSON.stringify(loveList));
          }
          else {
            localStorage.setItem('cloudmusic_我喜欢的音乐', localStorage.getItem('cloudmusic_我喜欢的音乐') + JSON.stringify(loveSong));
          }
        }
        // 取消喜欢。先从localStorage里取出歌单后用正则匹配成数组的形式，再删除不喜欢的歌曲后重新字符串化再存储
        else {
          let myloveArr = (localStorage.getItem('cloudmusic_我喜欢的音乐')).match(/{[\s\S]*?}/g);
          let myloveStr = '';
          for(let i=0; i<myloveArr.length; i++) {
            let item = JSON.parse(myloveArr[i]);
            if(item.id === this.songId)  continue;
            else {
              myloveStr += JSON.stringify(item); 
            }
          }
          localStorage.setItem('cloudmusic_我喜欢的音乐', myloveStr);
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
        if(localStorage.getItem('cloudmusic_我喜欢的音乐')) {
          let localLoveSongs = (localStorage.getItem('cloudmusic_我喜欢的音乐')).match(/{[\s\S]*?}/g);
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
      showManagement() {
        this.isShowManagement = true;
      },
      hideManagement(str) {
        this.isShowManagement = false;
        this.isShowList = false;
        if(str === 'showCollect') { 
          this.showCollect = true;
          setTimeout(() => {
            this.showCollect = false;            
          },1000)
        }
      },
      // 点击管理列表选项
      clickItem(item) {
        if(item.name === '收藏到歌单') {
          this.isShowManagement = false;
          this.isShowList = true;
        }
      },
      // 封装当前播放的歌曲的信息，便于收藏到各个歌单
      songDetail() {
        let obj = {};
        obj.id = this.songId;
        obj.name = this.name;
        obj.singer = this.singer;
        obj.album = this.album;
        obj.mv = this.mv;
        obj.picUrl = this.picUrl;
        return obj;
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
        'playingListId'
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
          // 歌曲改变判断该歌曲是否喜欢
          this.judgeLove();
        }
      }
    }
  }
</script>

<style scoped src="../../css/base/playerBody.css">

</style>