<template>
  <div class="lyric" @click="setShowLyric(!showLyric)">
    <div class="lyricBox" style="transition: all 0.5s" :style="{'transform': `translateY(${offsetLen}px)`}">
      <p v-if="noLyric" style="color: white">暂无歌词</p>
      <p v-for="(item, index) in lyricArr" :key="index" :class="{'curLyric': index === currentLyric}" v-else ref="lyric">
        {{item.text}}
      </p>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    // 防止重新打开歌词页面时noLyric被重置
    created() {
      if(this.lyric === '暂无歌词') {
        this.noLyric = true;
      }
      else {
        this.noLyric = false;
      }
    },
    data() {
      return {
        currentLyric: 0,
        offsetLen: 0,
        noLyric: false
      }
    },
    methods: {
      computedOffset() {
        if(this.lyric !== '暂无歌词') {
          for(let i=0; i<this.lyricArr.length; i++) {
            if(this.pastTime >= this.lyricArr[i].time) {
              // 如果满足上面一个if条件，并且i是最后一个，则直接显示，否则通过拖动点击到最后会报错
              if((i !== this.lyricArr.length - 1 && this.pastTime <= this.lyricArr[i+1].time) || i === this.lyricArr.length - 1) {
                // 对于是空行的歌词让它显示为上一句歌词
                if(!this.lyricArr[i].text)  {
                  this.currentLyric = i - 1;
                  continue;
                }
                this.currentLyric = i;
              }
              // 根据前面每一行歌词的高度来计算平移的距离，因为有的歌词会有多行
              let tem = 0;
              for(let j=0; j<this.currentLyric; j++) {
                tem += this.$refs.lyric[j].clientHeight;
              }
              this.offsetLen = -tem;
            }
          }
        }
      },
      ...mapMutations([
        'setShowLyric',
        'setLyricArr',
      ]),
    },
    computed: {
      ...mapState([
        'showLyric',
        'lyricArr',
        'pastTime',
        'lyric'
      ])
    },
    watch: {
      pastTime: function() {
        this.computedOffset();
      },
      lyric: function() {
        if(this.lyric === '暂无歌词') {
          this.noLyric = true;
        }
        else {
          this.noLyric = false;
        }
      }
    }
  }
</script>

<style scoped src="../../css/base/lyric.css">

</style>