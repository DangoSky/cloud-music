<template>
  <div class="musicPlay">
    <p @click="turnBack">back</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
    <p>这是音乐播放界面</p>
  
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

<style>
.musicPlay {
  width: 100%;
  height: 100%;
  background-color: red;
  position: relative;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>