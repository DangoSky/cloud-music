<template>
  <div class="headerBox">
    <div class="header">
      <img class="audio" src="../../assets/video.png">    
      <input class="search" type="text" placeholder="向前有路，未来可期" >
      <router-link :to="{name: 'musicPlay'}">
        <img class="music" src="../../assets/music.png">
      </router-link>
      <div class="barBox">
        <div class="videoBar" ref="barBox">  
          <label 
            v-for="(item, index) in labelFont" 
            :key="item" 
            class="barFont"
            :class="{activeClass: index === isClick}" 
            @click="clickLabel(item, index)" 
            ref="bar"
          >
            {{ item }}
          </label>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelFont: [
          'MV',
          '推荐',
          'LOOK直播',
          '广场',
          '现场',
          '翻唱',
          '听BGM',
          '舞蹈',
          'ACG音乐',
          '演奏'
        ],
        isClick: 0,
        // offsetLen: 0
      }
    },
    methods: {
      clickLabel(item, index) {
        this.isClick = index;
        this.$emit('changeShow', item);
      }
    }
  }
</script>

<style scoped src="../../css/video/videoHeader.css">

</style>