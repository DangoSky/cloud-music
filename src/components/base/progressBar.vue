<template>
  <div class="progressBar" ref="progressBar" @click="clickBar">
    <div class="moveBar" ref="moveBar"></div>
    <!-- 使用一个div包装按钮，增大width和height从而更容易拖动按钮 -->
    <div
      class="moveBtn-wrapper"
      ref="moveBtn"
      @touchstart.prevent="touchStart"
      @touchmove.prevent="touchMove"
      @touchend="touchEnd"
    >
      <div class="moveBtn"></div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        touch: {}
      }
    },
    methods: {
      touchStart(e) {
        this.touch.initiated = true;  // 标记拖动开始
        this.touch.start = e.touches[0].pageX;  // 开始点击的位置
        this.touch.moveBarWidth = this.$refs.moveBar.clientWidth;  // 已开始的进度条长度
        this.setDraging(true);
      },
      touchMove(e) {
        if (!this.touch.initiated) return;
        let dis = e.touches[0].pageX - this.touch.start; // 拖动的距离
        let barWidth = this.touch.moveBarWidth + dis;   // 已开始的进度条长度 + 拖动的距离 = 现在进度条的长度
        barWidth = Math.min(this.$refs.progressBar.clientWidth,Math.max(0, barWidth));
        this.changeMoveBar(barWidth);
        this.computePercent();        // 拖动的时候改变显示的时间，拖动结束后再播放
      },
      touchEnd() {
        this.touch.initiated = false;
        this.setDraging(false);
        this.setDraged(true);
      },
      // 通过点击进度条进行修改
      clickBar(e) {
        let rect = this.$refs.progressBar.getBoundingClientRect(); // 返回目标元素的上下左右离视口左上角的距离以及自身的宽高所组成的对象。
        let barWidth = e.pageX - rect.left;
        this.changeMoveBar(barWidth);
        this.computePercent();
        this.setDraged(true);
      },
      // 修改进度条的长度
      changeMoveBar(barWidth) {
        this.$refs.moveBar.style.width = `${barWidth}px`;
        this.$refs.moveBtn.style.left = `${barWidth}px`;
      },
      // 计算完成的百分比并修改歌曲时间
      computePercent() {
        // 设置一个新的值去改变或设置一个bool标记touchmove
        let percent = this.$refs.moveBar.clientWidth / this.$refs.progressBar.clientWidth;
        this.setPastTime(parseInt(percent * this.durationTime));
        this.setCurrentTime(this.pastTime);
      },
      ...mapMutations([
        'setDraged',
        'setPastTime',
        'setCurrentTime',
        'setDraging'
      ])
    },
    computed: {
      ...mapState([
        'movePercent',
        'pastTime',
        'durationTime'
      ])
    },
    // 监听父组件传递过来的歌曲进行百分比
    watch: {
      movePercent: function(newVal) {
        if(!this.touch.initiated) {
          let barWidth = newVal * this.$refs.progressBar.clientWidth;
          this.changeMoveBar(barWidth);
        }
      }
    }
  };
</script>

<style scoped src="../../css/base/progressBar.css">
</style>