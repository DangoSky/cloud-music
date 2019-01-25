<template>
  <router-link :to="{name: 'myself'}">
    <img :src="buttonMyselfSRC" @click="turnToRed" alt="图片无法加载">
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonMyselfSRC: require('../../assets/myselfUnclick.png')
      }
    },
    methods: {
      turnToRed() {
        this.buttonMyselfSRC = require('../../assets/myselfClick.png');
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>