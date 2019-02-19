<template>
  <div class="songListBody">
    <div class="listData" v-show="list.searchKey === ''">
      <div class="picBox">
        <img v-lazy="list.picUrl" alt="正在加载中..." class="playPic">
        <label class="playCount">{{ list.playCount }}</label>
        <img src="../../assets/detail.png" class="detail">
      </div>
      <div class="creator">
        <p class="listTitle">{{ list.listName }}</p>
        <img v-lazy="avatarUrl" class="creatorPic"> 
        <div class="nickNameBox">
          <label class="nickName">{{ nickname}}</label>
        </div>
      </div>
      <div class="bar">
        <label class="commentCount">{{ list.commentCount || songList.commentCount}}</label>
        <label class="shareCount">{{ list.shareCount || songList.shareCount}}</label>
        <label class="download">下载</label>
        <label class="selects">多选</label>
      </div>
    </div> 
    <div class="songs" >
      <div class="songsBar" v-show="list.searchKey === ''">
        <label class="playAll">播放全部</label>
        <label class="songCount">(共{{ list.trackCount || songList.trackCount }}首)</label>
        <label class="collect">收藏 ({{ list.subscribedCount || songList.subscribedCount }})</label>
      </div>
      <div v-for="(item, index) in searchArr" :key="item.id" class="song"  @click="getSong(item, index)">
        <img src="../../assets/playing.png" v-if="item.id === songId" class="playing">
        <label class="songNum" v-else>{{index + 1}}</label>
        <label class="songName">{{ item.name}}</label>
        <label class="writer"> {{ getWriterAlbum(item.ar, item.al.name) }}</label>
        <span :class="{showMv: item.mv}"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapMutations, mapState} from 'vuex'

  export default {
    created() {
      // 通过api获取的歌单
      if(this.list.listId) {
        api.getSongList(this.list.listId, (res) => {
          this.songList = res;
          this.nickname = res.creator.nickname;
          this.avatarUrl = res.creator.avatarUrl;
          this.songs = res.tracks;
        });
      }
      else {
        // 我喜欢的歌单以及其他歌单
        // 又没有登陆功能，就只有我一个用户嘛orz，等以后看看能不能增加个登陆管理
        this.nickname = '团子的天空幻想';
        this.avatarUrl = 'http://p2.music.126.net/e6G_JLkLGcIQLw9vsdgt0g==/109951163763088598.jpg?param=170y170';
        this.songs = list.songs;
      }
    },
    props: ['list'],
    data() {
      return {
        songList: {},    // 歌单全部信息
        songs: [],       //  由每首的歌曲信息组成的歌单数组
        nickname: '',   
        avatarUrl: '',

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
        this.$router.push({
          name: 'musicPlay'
        });
      },
      ...mapMutations([
        'setSongId',
        'setCurrentIndex',
        'setPlayingList',
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
        'songId'
      ])
    }
  }
</script>

<style scoped src="../../css/base/songListBody.css">

</style>