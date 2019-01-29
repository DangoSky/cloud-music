<template>
  <div class="videoBar">  
    <transition-group name="activeLabel">
      <label 
        v-for="(item, index) in labelFont" 
        :key="item" 
        :class="{activeClass: index === isClick}" 
        @click="clickLabel(index)"
      >
        {{ item }}
      </label>
    </transition-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelFont: [
          '推荐',
          'LOOK直播',
          '广场',
          '现场',
          '翻唱',
          '听BGM',
          'MV',
          '舞蹈',
          'ACG音乐',
          '演奏'
        ],
        isClick: 0
      }
    },
    methods: {
      clickLabel(index) {
        this.isClick = index;
      }
    }
  }
</script>

<style src="../../css/video/videoBar.css" scoped>

</style>