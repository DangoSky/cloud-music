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
        this.$emit('changeTime');
      },
      // 通过点击进度条进行修改
      clickBar(e) {
        let rect = this.$refs.progressBar.getBoundingClientRect(); // 返回目标元素的上下左右离视口左上角的距离以及自身的宽高所组成的对象。
        let barWidth = e.pageX - rect.left;
        this.changeMoveBar(barWidth);
        this.computePercent();
        this.$emit('changeTime');
      },
      // 修改进度条的长度
      changeMoveBar(barWidth) {
        this.$refs.moveBar.style.width = `${barWidth}px`;
        this.$refs.moveBtn.style.left = `${barWidth}px`;
      },
      // 计算完成的百分比并触发父组件函数，修改歌曲时间
      computePercent() {
        let percent = this.$refs.moveBar.clientWidth / this.$refs.progressBar.clientWidth * 100;
        this.$emit('changePercent', percent);
      }
    },
    // 监听父组件传递过来的歌曲进行百分比
    watch: {
      movePercent: function(newVal, lastVal) {
        let barWidth = newVal / 100 * this.$refs.progressBar.clientWidth;
        this.changeMoveBar(barWidth);
      }
    }
  };
</script>

<style scoped src="../../css/base/progressBar.css">
</style>