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
    <div class="musicLogo" ></div>
    <div class="footer">
      <img src="">
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      turnBack() {
        this.$router.go(-1);

      }
    }
  }
</script>

<style scoped src="../css/musicPlay.css">

</style>