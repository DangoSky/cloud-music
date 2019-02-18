<template>
  <div class="lyric" @click="setShowLyric(!showLyric)">
    <p>{{ lyric }}</p>
  </div>
</template>

<script>
  import api from '../../api/index.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    methods: {
      ...mapMutations([
        'setShowLyric'
      ])
    },
    computed: {
      ...mapState([
        'showLyric',
        'lyric'
      ])
    }
  }
</script>

<style scoped src="../../css/base/lyric.css">

</style>