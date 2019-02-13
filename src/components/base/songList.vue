<template>
  <div class="songList">
    <div class="header">
      <img src="../../assets/leftArrow.png" class="back" @click="back">
      <router-link :to="{name: 'musicPlay'}">
        <img src="../../assets/music.png" class="musicIcon">
      </router-link>
      <img src="../../assets/more1.png" class="more">
      <label class="songFont">歌单</label>
    </div>
    compoennt
    <p>fjeog</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped src="../../css/base/songList.css">

</style>