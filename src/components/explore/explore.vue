<template>
  <div class="exploreHeader">
    <!-- 通过给子组件传图片的src使得该组件可以在视频页面中复用 -->
    <explore-header :audioSRC="audioSRC"></explore-header>
    <div class="exploreHeaderBar">
      <label>个性推荐</label>
      <label>主播电台</label>
    </div>
  </div>
</template>

<script>
  import header from './header.vue'
  export default {
    data() {
      return {
        audioSRC: require('../../assets/audio.png')
      }
    },
    components: {
      'explore-header': header
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style src="../../css/explore/explore.css" scoped>

</style>