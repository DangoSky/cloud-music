<template>
  <router-link :to="{name: 'explore'}">
    <img :src="buttonVideoSRC"  @click="turnToRed" alt="图片无法加载">
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonVideoSRC: require('../../assets/videoUnclick.png')
      }
    },
    methods: {
      turnToRed() {
        this.buttonVideoSRC = require('../../assets/videoClick.png');
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>