<template>
  <div class="musicPlay">
    <div class="header">
      <img src="../assets/leftArrow.png" class="leftArrow" @click="turnBack">
      <img src="../assets/share1.png" class="share">
      <div class="songs">
        <p class="songTitle">我的一个道姑朋友</p>
        <label class="singer">以冬</label>
      </div>
    </div>
    <div class="musicLogo">
      <img :src="musicLogo">
    </div>
    <div class="musicBar">
      <img src="../assets/love.png">
      <img src="../assets/download.png" alt="">
      <img src="../assets/soundEffect.png" alt="">
      <img src="../assets/comments.png" alt="">
    </div>
    <!-- <div class="footer">
      <img src="../assets/playInOrder.png">
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        musicLogo: 'http://p2.music.126.net/e6G_JLkLGcIQLw9vsdgt0g==/109951163763088598.jpg?param=170y170'
      }
    },
    methods: {
      turnBack() {
        this.$router.go(-1);

      }
    }
  }
</script>

<style scoped src="../css/musicPlay.css">

</style>