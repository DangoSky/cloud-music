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
    created() {
      // api.getCarouselUrl((res) => {
      //   for(let i=0; i<res.length; i++) {
      //     this.carouselArr.push(res[i].imageUrl);
      //   }
      // })
    },
    data() {
      return {
         carouselArr: [
          require('../../assets/carousel1.jpg'),
          require('../../assets/carousel2.png'),
          require('../../assets/carousel3.jpg'),
          require('../../assets/carousel4.jpg')
        ]
      }
    }
  }
</script>

<style scoped>

</style>