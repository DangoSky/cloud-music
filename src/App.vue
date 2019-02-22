<template>
  <div class="box">
    <player></player>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>

  import player from './components/base/player.vue'
  import './css//base/appvue.css'

  export default {
    name: 'app',
    components: {
      player
    }
  }
</script>

<style>

</style>
