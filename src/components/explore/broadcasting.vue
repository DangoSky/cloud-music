<template>
  <div class="broadcasting">
    <carousel :carouselArr="carouselArr"></carousel>
    <explore-bar-broadcasting></explore-bar-broadcasting>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import carousel from './carousel.vue'
  import exploreBarBroadcasting from './exploreBarBroadcasting.vue'
  export default {
    components: {
      'carousel': carousel,
      'explore-bar-broadcasting': exploreBarBroadcasting
    },
    created() {
      api.getCarouselUrl((res) => {
        for(let i=0; i<res.length; i++) {
          this.carouselArr.push(res[i].imageUrl);
        }
      })
    },
    data() {
      return {
         carouselArr: []
      }
    }
  }
</script>

<style scoped>

</style>