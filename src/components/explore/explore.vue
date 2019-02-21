<template>
  <div class="explor">
    <div class="exploreHeader">
      <!-- 通过给子组件传图片的src使得该组件可以在视频页面中复用 -->
      <explore-header></explore-header>
      <div class="exploreHeaderBar" v-show="!isSearch">
        <label :class="[isClickRecommendation ? 'activeClass' : '']" @click="clickRecommendation">个性推荐</label>
        <label :class="[isClickRecommendation ? '' : 'activeClass']" @click="clickBroadcasting">主播电台</label>
      </div>
    </div>
    <!-- 使用一个空的div占据fixed定位的位置  -->
    <div class="emptyClass"></div>  
    <component :is="componentId"  v-show="!isSearch"></component>
    <fixed-footer></fixed-footer>
  </div>
  
</template>

<script>
  import header from './header.vue'
  import personalRecommendation from './personalRecommendation.vue'
  import broadcasting from './broadcasting.vue'
  import footer from '../base/footer.vue'
  
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        isClickRecommendation: true
      }
    },
    components: {
      'explore-header': header,
      'personal-recommendation': personalRecommendation,
      'broadcasting': broadcasting,
      'fixed-footer': footer
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
      },
      ...mapState([
        'isSearch'
      ])
    }
  }
</script>

<style src="../../css/explore/explore.css" scoped>

</style>