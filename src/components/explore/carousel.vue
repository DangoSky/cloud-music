<template>
  <div class="carousel">
    <transition-group tag="ul" class="carousel-picture" name="carousel">
      <li v-for="(item, index) in carouselArr" :key="item" v-show="currentIndex === index" :class="{'noFirst': index !== 0}"> 
        <img v-lazy="item">
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
        currentIndex: 0,
        timer: null
      }
    },
    created() {
      this.$nextTick(() => {
        this.timer = setInterval(() => {
          this.autoPlay();
        }, 3000);   
      })   
    },
    beforeDestroy() {
      clearInterval(this.timer);
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