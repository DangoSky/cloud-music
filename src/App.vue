<template>
  <div class="box">
    <player></player>
    <router-view></router-view>
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
