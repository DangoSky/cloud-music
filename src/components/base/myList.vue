<template>
  <div class="external" @click="$emit('hide')">
    <div class="box">
      <p class="headerTitle">收藏到歌单</p>
      <div v-for="(item, index) in myList" :key="index" class="myList" @click.stop="collectToList(item)">
        <div class="myListPicBox" :style="{backgroundImage: 'url('+ item.coverPic +')'}" :class="{'loveListMask': item.name === '我喜欢的音乐'}">
          <img src="../../assets/love2.png" class="myListPic" v-if="item.name === '我喜欢的音乐'">
        </div>
        <label class="myListTitle">{{item.name}}</label>
        <label class="myListCount">{{item.num}}首</label>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    created() {
      this.showMyList();
    },
    data() {
      return {
        myList: []
      }
    },
    methods: {
      // 把所有歌单放进myList数组并显示歌单
      showMyList() {
        if(localStorage.getItem('cloudmusicSongList')) {
          // 需要先清楚原先的歌单数组，否则新建新数组后页面显示的歌单会重复
          this.myList = [];
          let listArr = localStorage.getItem('cloudmusicSongList').match(/{[\s\S]*?}/g);
          for(let i=0; i<listArr.length; i++) {
            let obj = {};
            obj.name = JSON.parse(listArr[i]).name;
            obj.id = JSON.parse(listArr[i]).id;
            if(localStorage.getItem(JSON.parse(listArr[i]).id).match(/{[\s\S]*?}/g)) {
              let list = localStorage.getItem(JSON.parse(listArr[i]).id).match(/{[\s\S]*?}/g);
              obj.num = list.length;
              obj.coverPic = JSON.parse(list[list.length-1]).picUrl;
            }
            // 针对新建的歌单里没有歌曲
            else {
              obj.num = 0;
              obj.coverPic = require('../../assets/cd.png');
            }
            this.myList.push(obj);
          }
        }
      },
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
      // 将歌曲添加到歌单
      collectToList(item) {
        if(!this.songId)  return;
        let collectSong = this.songDetail();
        let list = localStorage.getItem(item.id).match(/{[\s\S]*?}/g);
        if(list) {
          for(let i=0; i<list.length; i++) {
            if(collectSong.id === JSON.parse(list[i]).id) {
              alert("该歌曲已存在");
              this.$emit('hide');
              return;
            }
          }
        }
        localStorage.setItem(item.id, localStorage.getItem(item.id) + JSON.stringify(collectSong));
        this.$emit('hide');
      }
    },
    computed: {
      ...mapState([
        'songId',
        'name',
        'singer',
        'album',
        'mv',
        'picUrl'
      ])
    }
  }
</script>

<style scoped>
  .external {
    width:100%;
    height: 100vh;
    position: absolute;
    top: 0;
    overflow-y: scroll;
    z-index: 99;
  }
  .box {
    width: 100%;
    height: auto;
    max-height: 45%;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
    z-index: 999;
  }
  .headerTitle {
    font-size: 0.8rem;
    padding: 10px;
    background-color: #eeee;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .myList {
    width: 100%;
    height: 50px;
    position: relative;
    padding-bottom: 5px;
    background: white;
  }
  .myListPicBox {
    width: 50px;
    height: 50px;
    background-size: cover;
    position: relative;
    display: inline-block;
    border-radius: 5px;
    margin: 0 0 0 4px;
  }
  /* 只有我喜欢的音乐需要蒙版 */
  .loveListMask::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .myListPic {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .myListTitle {
    width: calc(100% - 70px);
    position: absolute;
    left: 60px;
    top: 10px;
    font-size: 0.85rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .myListCount {
    position: absolute;
    left: 60px;
    bottom: 10px;
    font-size: 0.7rem;
  }
  /* 下划线 */
  .myList::before {
    content: "";
    width: calc(100% - 60px);
    position: absolute;
    left: 60px;
    top: 100%;
    margin-top: -1px;
    border-bottom: 1px solid rgba(211, 211, 211, 0.6);
  }
</style>