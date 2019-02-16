<template>
  <div>
    <carousel :carouselArr="carouselArr"></carousel>
    <explore-bar></explore-bar>
    <recomendation-song-list></recomendation-song-list>
  </div>
</template>

<script>
  import carousel from './carousel.vue'
  import exploreBar from './exploreBar.vue'
  import api from '../../api/index.js'
  import recomendationSongList from './recomendationSongList.vue'

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
      'explore-bar': exploreBar,
      'recomendation-song-list': recomendationSongList
    }
  }
</script>

<style scoped>

</style>