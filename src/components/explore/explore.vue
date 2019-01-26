<template>
  <div class="explor">
    <div class="exploreHeader">
      <!-- 通过给子组件传图片的src使得该组件可以在视频页面中复用 -->
      <explore-header :audioSRC="audioSRC"></explore-header>
      <div class="exploreHeaderBar">
        <label :class="[isClickRecommendation ? 'activeClass' : '']" @click="clickRecommendation">个性推荐</label>
        <label :class="[isClickRecommendation ? '' : 'activeClass']" @click="clickBroadcasting">主播电台</label>
      </div>
    </div>
    <div class="exploreBody">
      <component :is="componentId"></component>
    </div>
  </div>
  
</template>

<script>
  import header from './header.vue'
  import personalRecommendation from './personalRecommendation.vue'
  import broadcasting from './broadcasting.vue'
  export default {
    data() {
      return {
        audioSRC: require('../../assets/audio.png'),
        isClickRecommendation: true,
      }
    },
    components: {
      'explore-header': header,
      'personal-recommendation': personalRecommendation,
      'broadcasting': broadcasting
    },
    methods: {
      clickRecommendation() {
        this.isClickRecommendation = true;
      },
      clickBroadcasting() {
        this.isClickRecommendation = false;
      }
    },
    computed: {
      componentId() {
        if(this.isClickRecommendation)  return  'personal-recommendation'
        else return 'broadcasting'
      }
    }
  }
</script>

<style src="../../css/explore/explore.css" scoped>

</style>