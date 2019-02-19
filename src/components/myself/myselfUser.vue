<template>
  <div class="myselfUser">
    <div class="myselfUserBox">
      <img src="http://p2.music.126.net/e6G_JLkLGcIQLw9vsdgt0g==/109951163763088598.jpg?param=170y170" class="myselfHeadPortrait">
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
        return '团子的天空幻想'
      }
    }
  }
</script>

<style src="../../css/myself/myselfUser.css" scoped>

</style>