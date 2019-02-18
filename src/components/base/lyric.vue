<template>
  <div class="lyric" @click="setShowLyric(!showLyric)">
    <div class="lyricBox" tyle="transition: all 2s ease" :style="{'transform': `translateY(${offsetLen}px)`}">
      <p v-for="(item, index) in lyricArr" :key="index" :class="{'curLyric': index === currentLyric}">
        {{item.text}}
      </p>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        currentLyric: 0
      }
    },
    methods: {
      ...mapMutations([
        'setShowLyric',
        'setLyricArr'
      ])
    },
    computed: {
      offsetLen() {
        for(let i=0; i<this.lyricArr.length; i++) {
          if(this.pastTime == this.lyricArr[i].time) {
            this.currentLyric = i;
            return  i * (-33);
          }
        }
      },
      // currentLyric() {
      //   for(let i=0; i<this.lyricArr.length; i++) {
      //     if(this.lyricArr[i].time <= this.pastTime && this.lyricArr[i+1].time >= this.pastTime ) {
      //       console.log(i);
      //       return i;
      //     }
      //   }
      // },
      ...mapState([
        'showLyric',
        'lyricArr',
        'pastTime',
        'lyricArr'
      ])
    }
  }
</script>

<style scoped src="../../css/base/lyric.css">

</style>