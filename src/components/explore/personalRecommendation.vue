<template>
  <div>
    <carousel :carouselArr="carouselArr"></carousel>
    <explore-bar></explore-bar>
  </div>
</template>

<script>
  import carousel from './carousel.vue'
  import exploreBar from './exploreBar.vue'
  import api from '../../api/index.js'

  export default {
    created() {
      api.getCarouselUrl((res) => {
        for(let i=0; i<res.length; i++) {
          this.carouselArr.push(res[i].imageUrl);
        }
      })
    },
    data() {
      return {
        // 使用props组件传参，从而将轮播图组件复用到 主播电台里
        carouselArr: []
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