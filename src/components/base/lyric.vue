<template>
  <div class="lyric" @click="setShowLyric(!showLyric)">
    <div class="lyricBox" style="transition: all 0.5s" :style="{'transform': `translateY(${offsetLen}px)`}">
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
        currentLyric: 0,
      }
    },
    methods: {
      ...mapMutations([
        'setShowLyric',
        'setLyricArr',
      ])
    },
    computed: {
      offsetLen() {
        for(let i=0; i<this.lyricArr.length; i++) {
            if(this.pastTime === this.lyricArr[i].time) {
              console.log(this.lyricArr[i].time);
              // console.log([this.lyricArr[i]]);
              if(!this.lyricArr[i].text) {
                continue;
              }
            this.currentLyric = i;
            return  i * (-32);
            }
        }
      },
      ...mapState([
        'showLyric',
        'lyricArr',
        'pastTime',
        'lyricArr',
        'lyric'
      ])
    },
    // watch: {
    //   pastTime: function() {
    //     this.lyric = this.lyricArr.slice();
    //   }
    // }
  }
</script>

<style scoped src="../../css/base/lyric.css">

</style>