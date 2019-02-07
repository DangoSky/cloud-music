<template>
  <div>
    <div class="userHeader">
      <label class="userTitle">账号</label>
      <router-link :to="{name: 'musicPlay'}">
        <img class="userMusic" src="../../assets/music.png">
      </router-link>
    </div>
    <div class="userEmptyClass"></div>
  </div>

</template>

<script>
  export default {
    
  }
</script>

<style src="../../css/user/userHeader.css" scoped>

</style>