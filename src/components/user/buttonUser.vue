<template>
  <router-link :to="{name: 'user'}">
    <img :src="buttonUserSRC" @click="turnToRed" alt="图片无法加载">
    <P :style="{color: fontColor}">账号</P>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonUserSRC: require('../../assets/userUnclick.png'),
        fontColor: '#C0C0C0'
      }
    },
    methods: {
      turnToRed() {
        this.buttonUserSRC = require('../../assets/userClick.png');;
        this.fontColor = 'red';
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>