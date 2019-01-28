<template>
  <div class="broadcasting">
    <carousel :carouselArr="carouselArr"></carousel>
    <explore-bar-broadcasting></explore-bar-broadcasting>
  </div>
</template>

<script>
  import carousel from './carousel.vue'
  import exploreBarBroadcasting from './exploreBarBroadcasting.vue'
  export default {
    components: {
      'carousel': carousel,
      'explore-bar-broadcasting': exploreBarBroadcasting
    },
    data() {
      return {
         carouselArr: [
          require('../../assets/carousel5.jpg'),
          require('../../assets/carousel6.jpg'),
          require('../../assets/carousel7.png'),
          require('../../assets/carousel8.jpg')
        ]
      }
    }
  }
</script>

<style scoped>

</style>