<template>
  <router-link :to="{name: 'explore'}">
    <div class="explore"></div>
    <p>发现</p>
  </router-link>
</template>

<script>
  export default {
    data() {
      return {
        // icon不用img了,改用background-image
        // vue中对于动态图片路径，需要使用b-bind绑定变量src，并且使用import或require导入图片路径，否则加载不了图片
        // buttonExploreSRC: require('../../assets/exploreUnclick.png'),
      }
    },
    methods: {
     
    },
    computed: {
    
    }
  }
</script>

<style scoped>
  /* 将icon设为背景图片,在路由激活时改变url.若将icon设为img的话,难以在点击时更改五个组件的src */
  .explore {
    background-image: url('../../assets/exploreUnclick.png');
    width: 30px;
    height: 30px;
  }
  .router-link-active > .explore {
    background-image: url('../../assets/exploreClick.png');
  }
</style>