<template>
  <div class="lyric" @click="setShowLyric(!showLyric)">
    <div class="lyricBox" style="transition: all 0.5s" :style="{'transform': `translateY(${offsetLen}px)`}"
    
    >
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
    created() {
      this.computedOffset();
    },
    data() {
      return {
        currentLyric: 0,
        offsetLen: 0
      }
    },
    methods: {
      computedOffset() {
        for(let i=0; i<this.lyricArr.length; i++) {
          if(this.pastTime >= this.lyricArr[i].time && this.pastTime <= this.lyricArr[i+1].time) {
            if(!this.lyricArr[i].text) {
              continue;
            }
            this.currentLyric = i;
            this.offsetLen =  i * (-32);
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
        'lyricArr',
        'lyric',
        'draged',
        'draging'
      ])
    },
    watch: {
      pastTime: function() {
        this.computedOffset();
      },
    }
  }
</script>

<style scoped src="../../css/base/lyric.css">

</style>