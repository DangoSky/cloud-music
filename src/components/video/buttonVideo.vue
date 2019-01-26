<template>
  <router-link :to="{name: 'explore'}">
    <img :src="buttonVideoSRC"  @click="turnToRed" alt="图片无法加载">
    <p :style="{color: fontColor}">视频</p>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonVideoSRC: require('../../assets/videoUnclick.png'),
        fontColor: '#C0C0C0'
      }
    },
    methods: {
      turnToRed() {
        this.buttonVideoSRC = require('../../assets/videoClick.png');;
        this.fontColor = 'red';
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>