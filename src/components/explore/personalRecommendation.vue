<template>
  <div>
    <carousel :carouselArr="carouselArr"></carousel>
    <explore-bar></explore-bar>
  </div>
</template>

<script>
  import carousel from './carousel.vue'
  import exploreBar from './exploreBar.vue'
  export default {
    data() {
      return {
        // 使用props组件传参，从而将轮播图组件复用到 主播电台里
        carouselArr: [
          require('../../assets/carousel1.jpg'),
          require('../../assets/carousel2.jpg'),
          require('../../assets/carousel3.png'),
          require('../../assets/carousel4.jpg')
        ]
      }
    },
    components: {
      'carousel': carousel,
      'explore-bar': exploreBar
    }
  }
</script>

<style scoped>

</style>