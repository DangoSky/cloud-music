<template>
  <router-link :to="{name: 'myself'}">
    <img :src="buttonMyselfSRC" @click="turnToRed" alt="图片无法加载">
    <p :style="{color: fontColor}">我的</p>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonMyselfSRC: require('../../assets/myselfUnclick.png'),
        fontColor: '#C0C0C0'
      }
    },
    methods: {
      turnToRed() {
        this.buttonMyselfSRC = require('../../assets/myselfClick.png');;
        this.fontColor = 'red';
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>