<template>
  <div class="songListBody">
    <div class="listData" v-show="list.searchKey === ''">
      <div class="picBox">
        <img v-lazy="songList.coverImgUrl" alt="正在加载中..." class="playPic">
        <label class="playCount">{{ list.playCount }}</label>
        <img src="../../assets/detail.png" class="detail">
      </div>
      <div class="creator">
        <p class="listTitle">{{ songList.name }}</p>
        <img v-lazy="creator.avatarUrl" class="creatorPic"> 
        <div class="nickNameBox">
          <label class="nickName">{{ creator.nickname}}</label>
        </div>
      </div>
      <div class="bar">
        <label class="commentCount">{{ songList.commentCount}}</label>
        <label class="shareCount">{{ songList.shareCount}}</label>
        <label class="download">下载</label>
        <label class="selects">多选</label>
      </div>
    </div> 
    <div class="songs" >
      <div class="songsBar" v-show="list.searchKey === ''">
        <label class="playAll">播放全部</label>
        <label class="songCount">(共{{ songList.trackCount }}首)</label>
        <label class="collect">收藏 ({{ songList.subscribedCount }})</label>
      </div>
      <div v-for="(item, index) in searchArr" :key="item.id" class="song"  @click="getSong(item, index)">
        <label class="songNum">{{index + 1}}</label>
        <label class="songName">{{ item.name}}</label>
        <label class="writer"> {{ getWriterAlbum(item.ar, item.al.name) }}</label>
        <span :class="{showMv: item.mv}"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState } from 'vuex'
  import { mapMutations} from 'vuex'

  export default {
    created() {
      api.getSongList(this.list.listId, (res) => {
        this.songList = res;
        this.creator = res.creator;
        this.songs = res.tracks;
      });
    },
    props: ['list'],
    data() {
      return {
        songList: {},   // 歌单全部信息
        creator: [],      // 不知道为什么直接获取songList.creator可以取到信息但一直报错
        songs: []       //  由每首的歌曲信息组成的歌单数组
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
      getSong(item, index) {
        // 将歌名等先传递个state，url等跳转页面后再获取
        this.setSongId(item.id);
        this.setCurrentIndex(index);
        // 点击后使用该歌单，将歌曲id放入播放歌单列表中
        this.setSongList(this.songs);

        this.setName(item.name);
        this.setSingers(item.ar);
        this.setPicUrl(item.al.picUrl);
        this.$router.push({
          name: 'musicPlay'
        });
      },
      ...mapMutations([
        'setName',
        'setSingers',
        'setPicUrl',
        'setSongList',
        'setSongId',
        'setCurrentIndex',
        'play'
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
        'name',
        'singer',
        'picUrl',
        'playingList',
        'currentIndex',
        'songId',
        'isPlaying'
      ])
    }
  }
</script>

<style scoped src="../../css/base/songListBody.css">

</style>