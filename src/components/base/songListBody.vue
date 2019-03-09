<template>
  <div class="songListBody">
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
      <div v-for="(item, index) in searchArr" :key="item.id" class="song"  
        @click="getSong(item, index)"
        @touchstart="touchstart"
        @touchmove="touchmove" 
        :data-type="current == index ? 1 : 0"
        :data-index="index"
        :class="{animation: showSlow}"
      >
        <img src="../../assets/playing.png" v-if="item.id === songId && playingListId.toString() === list.listId.toString()" class="playing">
        <label class="songNum" v-else>{{index + 1}}</label>
        <label class="songName">{{ item.name}}</label>
        <label class="writer"> {{ item.singer || getWriterAlbum(item.ar, item.al.name) }}</label>
        <span :class="{showMv: item.mv}"></span>
        <img src="../../assets/more2.png" class="more" @click.stop="">
        <label class="delete"  @click.stop="deleteSong(item)">删除</label>
      </div>
    </div>
    <!-- 弹出模态框或显示删除歌单时，使用一个蒙版来是使得页面其他部分不能点击 -->
    <div class="mask" v-if="current !== -1" @click.stop="clickMask"></div>
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
        this.commentCount =  27;
        this.shareCount = 54;
        this.trackCount = this.songs.length;
        this.subscribedCount = 43;
        this.showList();
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
        startX: 0,
        current: -1,
        showSlow: true      // 是否开启动画显示删除键
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
      // 从localStorage里获取歌单里的歌曲信息并渲染
      showList() {
        let localLoveSongs = (localStorage.getItem(this.list.listId)).match(/{[\s\S]*?}/g);
        this.songs = [];
        if(localLoveSongs) {
          for(let i=localLoveSongs.length-1; i>=0; i--) {
            let item = JSON.parse(localLoveSongs[i]);
            this.songs.push(item);
          }
        }
      },
       touchstart(e) {
        this.startX = e.touches[0].pageX;
      },
      touchmove(e) {
        // 不是自己创建的歌单不能进行删除操作
        if(!this.list.listId.toString().includes("cloudmusic_")) {
          return ;
        }
        let dis = this.startX - e.changedTouches[0].pageX;
        if(dis > 30) {
          // 使用data-index来标记显示删除按钮的是哪一个元素，从而使得只有一个元素可以显示删除
          this.current = e.currentTarget.dataset.index;
        }
        else if(dis < -30) {
          this.current = -1;
        }
      },
      clickMask() {
        // 显示删除键时，点击蒙版则隐藏删除键
        if(this.current !== -1) {
          this.current = -1;
        }
      },
      deleteSong(item) {
        let list = localStorage.getItem(this.list.listId).match(/{[\s\S]*?}/g);
        let str = '';
        for(let i=0; i<list.length; i++) {
          if(JSON.parse(list[i]).id === item.id) {
            continue;
          }
          str += list[i];
        }
        localStorage.setItem(this.list.listId, str);
        // 删除成功后马上隐藏删除键
        this.showSlow = false;
        this.current = -1;
        this.showList();
        // 之后又开启显示动画
        setTimeout(() => {
          this.showSlow = true;
        }, 500) 
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