<template>
  <router-link :to="{name: 'user'}">
    <img :src="buttonUserSRC" @click="turnToRed" alt="图片无法加载">
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonUserSRC: require('../../assets/userUnclick.png')
      }
    },
    methods: {
      turnToRed() {
        this.buttonUserSRC = require('../../assets/userClick.png');
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>