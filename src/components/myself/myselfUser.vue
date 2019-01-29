<template>
  <div class="myselfUser">
    <div class="myselfUserBox">
      <img src="../../assets/carousel1.jpg" class="myselfHeadPortrait">
      <label class="userName">{{ userName }}</label>
      <img src="../../assets/musicBag.png" class="musicBag">
      <label class="myselfVip">会员中心</label>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      userName() {
        return '还是要温柔'
      }
    }
  }
</script>

<style src="../../css/myself/myselfUser.css" scoped>

</style>