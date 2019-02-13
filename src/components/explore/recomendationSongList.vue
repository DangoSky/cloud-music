<template>
  <div class="recomendationSongList">
    <p class="recomendationFont">推荐歌单</p>
    <div class="box">
      <div class="songListBox" v-for="item in songListId" :key="item.id"  @click="turnToRouter(item)">
        <img :src="item.picUrl" alt="无法加载图片" class="songLogo">
        <label class="playCount">{{ playCount(item.playCount) }}</label>
        <label class="songName">{{ item.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'
  export default {
    created() { 
      // 需要使用箭头函数，使得this指向vue实例
      api.getRecomendationSongListId((res) => this.songListId = res);  

    },
    data() {
      return {
        songListId: []
      }
    },
    methods: {
      // 修正歌单播放数量的格式
      playCount(count) {
        if(count < 100000)  return parseInt(count);
        else if(count > 100000000) {
          count = parseInt(count / 100000000);
          return `${count}亿`;
        }
        else if(count >= 100000)  {
          count = parseInt(count / 10000);
          return `${count}万`;
        }
      },
      // 路由传参，将歌单信息传递给组件
      turnToRouter(item) {
        this.$router.push({
          name: 'songList',
          query: {
            listId: item.id,
            playCount: this.playCount(item.playCount),
            picUrl: item.picUrl
          }
        })
      }
    }
  }
</script>

<style scoped src="../../css/explore/recomendationSongList.css">

</style>