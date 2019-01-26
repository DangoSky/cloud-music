<template>
  <router-link :to="{name: 'friend'}">
    <img :src="buttonFriendSRC" @click="turnToRed" alt="图片无法加载">
    <p :style="{color: fontColor}">朋友</p>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonFriendSRC: require('../../assets/friendUnclick.png'),
        fontColor: '#C0C0C0'
      }
    },
    methods: {
      turnToRed() {
        this.buttonFriendSRC = require('../../assets/friendClick.png');;
        this.fontColor = 'red';
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>