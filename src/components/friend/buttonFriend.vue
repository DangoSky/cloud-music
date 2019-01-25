<template>
  <router-link :to="{name: 'friend'}">
    <img :src="buttonFriendSRC" @click="turnToRed" alt="图片无法加载">
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        buttonFriendSRC: require('../../assets/friendUnclick.png')
      }
    },
    methods: {
      turnToRed() {
        this.buttonFriendSRC = require('../../assets/friendClick.png');
      }
    },
    computed: {
    
    }
  }
</script>

<style lang='scss' scoped>

</style>