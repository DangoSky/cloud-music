<template>
  <div class="songListBody">
    <!-- 弹出列表框时开启蒙版 -->
    <div :class="{mask: isShowManagement || isShowList}"></div>
    <div class="listData" v-show="list.searchKey === ''">
      <div class="picBox">
        <div class="playPic" :style="{backgroundImage: 'url('+ coverUrl +')'}" :class="{'loveListMask': list.listId.toString().includes('我喜欢的音乐')}">
          <img src="../../assets/love3.png" class="loveIcon" v-if="list.listId.toString().includes('我喜欢的音乐')">
        </div>
        <label class="playCount">{{ list.playCount }}</label>
        <img src="../../assets/detail.png" class="detail">
      </div>
      <div class="creator">
        <p class="listTitle">{{ list.listName }}</p>
        <img v-lazy="avatarUrl" class="creatorPic"> 
        <div class="nickNameBox">
          <label class="nickName">{{ nickname }}</label>
        </div>
      </div>
      <div class="bar">
        <label class="commentCount">{{ commentCount }}</label>
        <label class="shareCount">{{ shareCount }}</label>
        <label class="download">下载</label>
        <label class="selects">多选</label>
      </div>
    </div> 
    <div class="songs" >
      <div class="songsBar" v-show="list.searchKey === ''">
        <label class="playAll">播放全部</label>
        <label class="songCount">(共{{ trackCount }}首)</label>
        <label class="collect">收藏 ({{ subscribedCount }})</label>
      </div>
      <div v-for="(item, index) in searchArr" :key="item.id" class="song"  @click="getSong(item, index)">
        <img src="../../assets/playing.png" v-if="item.id === songId && playingListId.toString() === list.listId.toString()" class="playing">
        <label class="songNum" v-else>{{index + 1}}</label>
        <label class="songName">{{ item.name}}</label>
        <label class="writer"> {{ item.singer || getWriterAlbum(item.ar, item.al.name) }}</label>
        <span :class="{showMv: item.mv}"></span>
        <img src="../../assets/more2.png" class="more" @click.stop="showManagement(item.name)">
      </div>
    </div>
    <list-box 
      :manageList="manageList"
      v-if="isShowManagement"
      @hide="hideManagement"
      @clickItem="clickItem"
    >
      <template slot="header">
        <p style="font-size: 0.85rem; padding: 10px;">歌曲: {{clickingSong}}</p>
      </template>
    </list-box>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import listBox from './listBox.vue'
  import { mapMutations, mapState} from 'vuex'

  export default {
    // activated() {
    //   this.list.listName = this.$route.query.listName;
    //   this.list.listId = this.$route.query.listId;
    //   this.list.playCount = this.$route.query.playCount;
    //   this.list.picUrl = this.$route.query.picUrl;
    //   this.list.id = this.$route.query.id;
    // },
    created() {
      // 通过api获取的歌单
      if(!this.list.listId.toString().includes('cloudmusic_')) {
        api.getSongList(this.list.listId, (res) => {
          this.nickname = res.creator.nickname;         // 作者昵称
          this.avatarUrl = res.creator.avatarUrl;       // 作者头像
          this.songs = res.tracks;      
          this.commentCount =  res.commentCount;        // 评论次数
          this.shareCount = res.shareCount;             // 分享次数
          this.trackCount = res.trackCount;             // 歌曲总数
          this.subscribedCount = res.subscribedCount;   // 收藏次数
          this.coverUrl = this.list.picUrl;
        })
      }
      else {
        // 我喜欢的歌单以及其他歌单
        // 又没有登陆功能，就只有我一个用户嘛orz，等以后看看能不能增加个登陆管理
        this.nickname = '团子的天空幻想';
        this.avatarUrl = 'http://p2.music.126.net/e6G_JLkLGcIQLw9vsdgt0g==/109951163763088598.jpg?param=170y170';
        let localLoveSongs = (localStorage.getItem(this.list.listId)).match(/{[\s\S]*?}/g);
        this.songs = [];
        if(localLoveSongs) {
          for(let i=localLoveSongs.length-1; i>=0; i--) {
            let item = JSON.parse(localLoveSongs[i]);
            this.songs.push(item);
          }
        }
        this.commentCount =  27;
        this.shareCount = 54;
        this.trackCount = this.songs.length;
        this.subscribedCount = 43;
        // 如果取消对歌单内唯一一首歌的喜欢，后退到歌单页面的时候显示指定的图片，否则会报错
        if(!this.songs.length)  this.coverUrl = require('../../assets/cd.png');
        else {
          this.coverUrl = this.list.picUrl;
        }
      }
    },
    props: ['list'],
    components: {
      'list-box': listBox
    },
    data() {
      return {
        songs: [],       
        nickname: '',   
        avatarUrl: '',
        commentCount: '',
        shareCount: '',
        trackCount: '',
        subscribedCount: '',
        coverUrl: '',
        isShowManagement: false,
        isShowList: false,
        clickingSong: '',
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
          },
          {
            name: '查看视频',
            icon: require('../../assets/video3.png')
          },
          {
            name: '定时关闭',
            icon: require('../../assets/timer.png')
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
      // 格式化作者和专辑名
      getWriterAlbum(name, album) {
        let str = '';
        for(let i=0; i<name.length; i++) {
          str += name[i].name;
          if(i !== name.length - 1)  str += '/';  
        } 
        return  str + ' - ' + album;
      },
      // 点击播放后先获取歌曲id和index，再以此在播放页面获取其他信息
      getSong(item, index) {
        this.setSongId(item.id);
        this.setCurrentIndex(index);
        // 点击后使用该歌单，将歌曲id放入播放歌单列表中
        this.setPlayingList(this.songs);
        // 根据id判断是否使用自己的歌单，方便对歌单播放量进行统计
        this.setPlayingListId(this.list.listId);
        this.$router.push({
          name: 'musicPlay'
        });
      },
      showManagement(name) {
        console.log("show");
        this.isShowManagement = true;
        this.clickingSong = name;
      },
      hideManagement() {
        this.isShowManagement = false;
        this.isShowList = false;
        this.clickingSong = '';
      },
      // 点击管理列表选项
      clickItem(item) {
        if(item.name === '收藏到歌单') {
          this.isShowManagement = false;
          this.isShowList = true;
        }
      },
      ...mapMutations([
        'setSongId',
        'setCurrentIndex',
        'setPlayingList',
        'setPlayingListId'
      ])
    },
    computed: {
      searchArr() {
        if(this.list.searchKey === '') {
          return this.songs;
        }
        else {
          return this.songs.filter((val) => {
            return val.name.includes(this.list.searchKey) || this.getWriterAlbum(val.ar, val.al.name).includes(this.list.searchKey);
          })
        }
      },
      ...mapState([
        'songId',
        'playingListId'
      ])
    },
    watch: {
      // 若取消喜欢歌单里的第一首歌，及时更新歌单封面的图片
      trackCount: function() {
        if(this.playingListId.toString().includes('cloudmusic_')) {
          if(this.songs.length) {
            this.coverUrl = this.songs[0].picUrl;
          }
          else {
            this.coverUrl = require('../../assets/cd.png');
          }
        }
      }
    }
  }
</script>

<style scoped src="../../css/base/songListBody.css">

</style>