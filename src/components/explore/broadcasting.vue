<template>
  <div class="broadcasting">
    <carousel :carouselArr="carouselArr"></carousel>
  </div>
</template>

<script>
  import carousel from './carousel.vue'
  export default {
    components: {
      'carousel': carousel
    },
    data() {
      return {
         carouselArr: [
          require('../../assets/carousel1.jpg'),
          require('../../assets/carousel2.jpg'),
          require('../../assets/carousel3.png'),
          require('../../assets/carousel4.jpg')
        ]
      }
    }
  }
</script>

<style scoped>

</style>