<template>
  <router-link :to="{name: 'explore'}">
    <img :src="buttonExploreSRC" @click="turnToRed" alt="图片无法加载">
    <p :style="{color: fontColor}">发现</p>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        // vue中对于动态图片路径，需要使用b-bind绑定变量src，并且使用import或require导入图片路径，否则加载不了图片
        buttonExploreSRC: require('../../assets/exploreUnclick.png'),
        fontColor: '#C0C0C0'
      }
    },
    methods: {
      turnToRed() {
        this.buttonExploreSRC = require('../../assets/exploreClick.png');
        this.fontColor = 'red';
      }
    },
    computed: {
    
    }
  }
</script>

<style>

  a > p {
    /* color: red; */
    /* color: #C0C0C0; */
    font-size: 60%;
    text-align: center;
  }
</style>