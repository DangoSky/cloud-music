<template>
  <div class="footer" >
    <router-link :to="{name: 'explore'}">
      <div class="explore"></div>
      <p>发现</p>
    </router-link>
    <router-link :to="{name: 'video'}">
      <div class="video"></div>
      <p>视频</p>
    </router-link>
    <router-link :to="{name: 'myself'}">
      <div class="myself"></div>
      <p>我的</p>
    </router-link>
    <router-link :to="{name: 'friend'}">
      <div class="friend"></div>
      <p>朋友</p>
    </router-link>
    <router-link :to="{name: 'user'}">
      <div class="user"></div>
      <P>账号</P>
    </router-link>
  </div>
</template>

<script>

  export default {

  }
</script>

<style scoped src="../../css/base/footer.css">

</style>