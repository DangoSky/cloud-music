<template>
  <router-link :to="{name: 'explore'}">
    <img :src="buttonExploreSRC"  @click="turnToRed" alt="图片无法加载">
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        // vue中对于动态图片路径，需要使用b-bind绑定变量src，并且使用import或require导入图片路径，否则加载不了图片
        buttonExploreSRC: require('../../assets/exploreUnclick.png')
      }
    },
    methods: {
      turnToRed() {
        this.buttonExploreSRC = require('../../assets/exploreClick.png');
      }
    },
    computed: {
    
    }
  }
</script>

<style>

</style>