<template>
  <div class="header">
    <img class="audio" :src="audioSRC">    
    <input class="search" type="text" placeholder="但愿日子清净，抬头遇见的都是柔情">
    <router-link :to="{name: 'musicPlay'}">
      <img class="music" src="../../assets/music.png" @click="setShowPlayer(true)">
    </router-link>
  </div>
</template> 

<script>
  import api from '../../api/index.js'
  import { mapMutations } from 'vuex';
  export default {
    // 父组件给子组件传右上方音频icon的src
    props: ['audioSRC'],
    methods: {
      ...mapMutations([
        'setShowPlayer'
      ])
    }
  }
</script>

<style src="../../css/explore/header.css" scoped>
  /* 通过@import或import引入的css文件,scoped不起作用 */
  /* @import '../../css/explore/header.css' */
</style>