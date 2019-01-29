<template>
  <div class="myselfUser">
    <div class="myselfUserBox">
      <img src="../../assets/carousel1.jpg" class="myselfHeadPortrait">
      <label>{{ userName }}</label>
      <img src="../../assets/musicBag.png">
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