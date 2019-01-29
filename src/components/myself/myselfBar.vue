<template>
  <div class="myselfBar">
    <!-- <div class="localMusic underline">
        <label>本地音乐</label>
    </div>
    <div class="localMusic underline">
      <label>最近播放</label>
    </div>
    <div class="localMusic underline">
      <label>我的电台</label>
    </div>
    <div class="localMusic underline">
      <label>我的收藏</label>
    </div>
    <div class="localMusic underline">
      <label>Sati空间</label>
    </div> -->
    <div v-for="(item, index) in myselfBar" :key="index" class="localMusic" >
      <!-- :style="{backgroundImage: 'url(item.bgSrc)'}" -->
      <label>{{ item.name }}</label>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myselfBar: [
          {
            id: 1,
            name: '本地音乐',
            bgSrc: '../../assets/music1.png'
          },
          {
            id: 2,
            name: '本地音乐',
            bgSrc: '../../assets/music1.png'
          }
        ],
        
      }
    },
    computed: {
      // backgroundSrc(item.bgSrc) {
      //   return require('this.myselfBar[1].bgSrc');
      // }
    }
  }
</script>

<style src="../../css/myself/myselfBar.css" scoped>

</style>