<template>
  <div class="mySongList">
    <div class="listBar">
      <label :style="{background: 'url('+ showIcon +') no-repeat 10px center'}" class="listBarFont" @click="folding">我创建的歌单({{ myList.length }})</label>
      <img src="../../assets/new.png" class="newList" @click="showModel">
    </div>
    <div v-for="(item, index) in myList" :key="index" 
      class="myList" v-show="show" 
      @click="showDetail(item)"
      @touchstart="touchstart"
      @touchmove="touchmove" 
      data-type="0"
      ref="list"
       :style="deleteSlider"
    >
      <div class="myListPicBox" :style="{backgroundImage: 'url('+ item.coverPic +')'}" :class="{'loveListMask': item.name === '我喜欢的音乐'}">
        <img src="../../assets/love2.png" class="myListPic" v-if="item.name === '我喜欢的音乐'">
      </div>
      <label class="myListTitle">{{item.name}}</label>
      <label class="myListCount">{{item.num}}首</label>
      <div class="delete">删除</div>
    </div>
    <!-- 弹出模态框后，使用一个蒙版来是使得页面其他部分不能点击 -->
    <div class="mask" v-if="isShowModel"></div>
    <div class="modalFrame" v-if="isShowModel">
      <p class="headerTitle">新建歌单</p>
      <div class="content">
        <p>歌单标题:</p>
        <input type="text" class="inputBox" v-model="listName">
      </div>
      <div class="btn" style="border-right: 1px solid white" @click="hideModel">
        <label>取消</label>
      </div>
      <div class="btn" @click="newList">
        <label>完成</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.showMyList();
    },
    data() {
      return {
        show: true,
        myList: [],
        isShowModel: false,
        listName: '',     // 新建歌单名
        startX: 0,   // 拖动显示删除按钮
      deleteSlider: ''
      }
    },
    methods: {
      folding() {
        this.show = !this.show;
      },
      showDetail(item) {
        this.$router.push({
          name: 'myself_songList',
          query: {
            listName: item.name,
            playCount: item.playCount,
            picUrl: item.coverPic,
            listId: item.id,
            ownSongList: true
          }
        })
      },
      showModel() {
        this.isShowModel =  true;
      },
      hideModel() {
        this.isShowModel = false;
      },
      newList() {
        if(this.listName !== '')  {
          let existedList = localStorage.getItem('cloudmusicSongList').match(/{[\s\S]*?}/g);
          for(let i=0; i<existedList.length; i++) {
            if(this.listName === JSON.parse(existedList[i]).name) {
              alert("该歌单已经存在，请重新输入歌单名");
              this.listName = '';
              return;
            }
          }
          let songList = localStorage.getItem('cloudmusicSongList') ? localStorage.getItem('cloudmusicSongList') : '';
          let createdList = {};
          createdList.name = this.listName;
          createdList.id = 'cloudmusic_' + this.listName;
          createdList.playcount = 0;
          localStorage.setItem('cloudmusicSongList', songList + JSON.stringify(createdList));
          localStorage.setItem(createdList.id, '');
        }
        this.isShowModel = false;
        this.showMyList();
      },
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
            // 针对新建的歌单里没有歌曲
            if(localStorage.getItem(JSON.parse(listArr[i]).id).match(/{[\s\S]*?}/g)) {
              let list = localStorage.getItem(JSON.parse(listArr[i]).id).match(/{[\s\S]*?}/g);
              obj.num = list.length;
              obj.coverPic = JSON.parse(list[list.length-1]).picUrl;
            }
            else {
              obj.num = 0;
              obj.coverPic = require('../../assets/cd.png');
            }
            this.myList.push(obj);
          }
        }
      },
      touchstart(e) {
        this.startX = e.touches[0].pageX;
      },
      touchmove(e) {
        let ele = e.currentTarget;
        let dis = this.startX - e.changedTouches[0].pageX;
        console.log(dis + " " +  ele.dataset.type);
        if(dis > 30 && ele.dataset.type === '0') {
          this.restSlide();
          ele.dataset.type = 1;
          // if()  dis = 60
          this.deleteSlider = "transform:translateX(-60px)";
        }
        else if(dis < -30 && ele.dataset.type === '1') {
          this.restSlide();
          ele.dataset.type = 0;
          this.deleteSlider = "transform:translateX(0px)";
        }
      },
      restSlide() {
        let list = this.$refs.list;
        for(let i=0; i<list.length; i++) {
          list[i].dataset.type = 0;
        }
      },
      deletelist(item) {
        
      }
    },
    computed: {
      showIcon() {
        if(this.show) {
          return require('../../assets/bottomArrow.png');
        }
        else {
          return require('../../assets/rightArrow3.png')
        }
      },
      ownListPlayCount() {
        let songList = localStorage.getItem('cloudmusicSongList') ? localStorage.getItem('cloudmusicSongList') : '';
        for(let i=0; i<songList.length; i++) {
            let list = JSON.parse(songList[i]);
            if(list.name === this.playingListId) {
              list.playCount === 0 ? 1 : list.playCount++ ;
            }
            str += JSON.stringify(list);
          }
        localStorage.setItem('cloudmusicSongLiPlayCount')
      }
    }
  }
</script>

<style scoped src="../../css/myself/mySongList.css">

</style>