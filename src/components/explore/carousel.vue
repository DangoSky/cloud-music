<template>
  <div class="carousel">
    <transition-group tag="ul" class="carousel-picture" name="carousel">
      <li v-for="(item, index) in carouselArr" :key="item" v-show="currentIndex === index"> 
        <img :src="item">
        <!-- v-show要放在img中，若放在li里不知道为什么页面会抖动(移动端才会)，但因为隐藏了img所以无法实现动画效果 -->
        <!-- v-show若要放在li里面的话，需要在加上overflow-x: hidden的样式不会抖动 -->
      </li>
    </transition-group>
    <div class="carousel-label">
      <span v-for="(list, index) in carouselArr.length" :key="list" :class="{activeCarousel: index === currentIndex}" @click="turnToCarousel(index)"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'carouselArr'
    ],
    // 使用props组件传参，从而将轮播图组件复用到 主播电台里
    data() {
      return {
        // carouselArr: [
          // 移动端加载不出url？？！
          // 'http://hbimg.b0.upaiyun.com/4280c67a64ec06aed7a7f7313f9d6fd8c1b2bec61ac52-Oo9dFa_fw658',
          // 'http://hbimg.b0.upaiyun.com/79dc821529db6fa5963c0149b42a62266040fddf155f3-WSDH8y_fw658',
          // 'http://hbimg.b0.upaiyun.com/72d0f8bb5c5858c31df05dd180e7f0a85a9fefd855584-7IqsX4_fw658',
          // 'http://hbimg.b0.upaiyun.com/a0279d50f651fa51cafb45e4b64982a073e8f4e9140c0-vqxy8O_fw658'
        // ],
        currentIndex: 0,
        timer: null
      }
    },
    created() {
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          this.autoPlay();
        }, 4000);
      })   
    },
    methods: {
      autoPlay() {
        if(this.currentIndex === this.carouselArr.length  - 1) {
          this.currentIndex = 0;
        }
        else {
          this.currentIndex++;
        }
      },
      turnToCarousel(index) {
        this.currentIndex = index;
      } 
    }
  }
</script>
 
<style src="../../css/explore/carousel.css" scoped>

</style>