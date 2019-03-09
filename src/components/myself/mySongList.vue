<template>
  <div class="mySongList">
    <div class="listBar">
      <label :style="{background: 'url('+ showIcon +') no-repeat 10px center'}" class="listBarFont" @click="folding">我创建的歌单({{ myList.length }})</label>
      <img src="../../assets/new.png" class="newList" @click="showModel">
    </div>
    <div v-show="show" >
      <div v-for="(item, index) in myList" :key="index" 
        class="myList"
        :class="{animation: showSlow}"        
        @click="showDetail(item)"
        @touchstart="touchstart"
        @touchmove="touchmove" 
        :data-type="current == index ? 1 : 0"
        :data-index="index"
      >
        <div class="myListPicBox" :style="{backgroundImage: 'url('+ item.coverPic +')'}" :class="{'loveListMask': item.name === '我喜欢的音乐'}">
          <img src="../../assets/love2.png" class="myListPic" v-if="item.name === '我喜欢的音乐'">
        </div>
        <label class="myListTitle">{{item.name}}</label>
        <label class="myListCount">{{item.num}}首</label>
        <label class="delete" @click.stop="deleteList(item)">删除</label>
      </div>
    </div>
    <!-- 弹出模态框或显示删除歌单时，使用一个蒙版来是使得页面其他部分不能点击 -->
    <div class="mask" v-if="isShowModel || current !== -1" @click.stop="clickMask"></div>
    <div class="modalFrame" v-if="isShowModel">
      <p class="headerTitle">新建歌单</p>
      <div class="content">
        <p>歌单标题:</p>
        <input type="text" class="inputBox" v-model="listName" autofocus="autofocus">
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
        listName: '',        // 新建歌单名
        startX: 0,          // 拖动显示删除按钮
        current: -1,       // 哪个歌单显示删除按钮
        showSlow: true   // 是否开启动画显示删除键
      }
    },
    methods: {
      folding() {
        this.show = !this.show;
        this.current = -1;
      },
      showDetail(item) {
        this.$router.push({
          name: 'myself_songList',
          query: {
            listName: item.name,
            playCount: item.playCount,
            picUrl: item.coverPic,
            listId: item.id
          }
        })
      },
      // 弹出新建歌单的模态框
      showModel() {
        this.isShowModel =  true;
        this.listName = '';
        this.current = -1;
      },
      hideModel() {
        this.isShowModel = false;
      },
      newList() {
        if(this.listName === '') {
          alert("歌单名不能为空");
          return ;
        }
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
        createdList.playCount = 0;
        localStorage.setItem('cloudmusicSongList', songList + JSON.stringify(createdList));
        localStorage.setItem(createdList.id, '');
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
            obj.playCount = JSON.parse(listArr[i]).playCount;
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
      touchstart(e) {
        this.startX = e.touches[0].pageX;
      },
      touchmove(e) {
        if(e.currentTarget.innerText.includes('我喜欢的音乐')) {
          return;
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
      clickMask(e) {
        // 显示删除键时，点击蒙版则隐藏删除键
        if(this.current !== -1) {
          this.current = -1;
        }
      },
      deleteList(item) {
        if(confirm('是否确认删除歌单: ' + item.name)) {
          let list = localStorage.getItem('cloudmusicSongList').match(/{[\s\S]*?}/g);
          let str = '';
          for(let i=0; i<list.length; i++) {
            if(JSON.parse(list[i]).name === item.name) {
              localStorage.removeItem(item.id);
              continue;
            }
            str += list[i];
          }
          localStorage.setItem('cloudmusicSongList', str); 
        }
        this.showSlow = false;
        this.current = -1;
        this.showMyList();
        setTimeout(() => {
          this.showSlow = true;
        }, 500) 
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
      }
    }
  }
</script>

<style scoped src="../../css/myself/mySongList.css">

</style>