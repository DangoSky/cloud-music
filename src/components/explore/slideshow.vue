<template>
  <div class="carousel">
    <transition-group tag="ul" class="carousel-picture">
      <li v-for="item in carouselArr" :key="item"> 
        <img :src="item">
      </li>
    </transition-group>
    <div class="carousel-label">
      <span v-for="list in carouselArr.length" :key="list"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        carouselArr: [
          'http://hbimg.b0.upaiyun.com/4280c67a64ec06aed7a7f7313f9d6fd8c1b2bec61ac52-Oo9dFa_fw658',
          'http://hbimg.b0.upaiyun.com/79dc821529db6fa5963c0149b42a62266040fddf155f3-WSDH8y_fw658',
          'http://hbimg.b0.upaiyun.com/72d0f8bb5c5858c31df05dd180e7f0a85a9fefd855584-7IqsX4_fw658',
          'http://hbimg.b0.upaiyun.com/a0279d50f651fa51cafb45e4b64982a073e8f4e9140c0-vqxy8O_fw658'
        ]
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>
 
<style src="../../css/explore/slideshow.css" scoped>

</style>