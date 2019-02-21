<template>
  <div class="video">
    <video-header></video-header>
    <video-bar></video-bar>
    <fixed-footer></fixed-footer>
  </div>
</template>

<script>
  import videoHeader from './videoHeader.vue'
  import videoBar from './videoBar.vue'
  import footer from '../base/footer.vue'

  export default {
    components: {
      'video-header': videoHeader,
      'video-bar': videoBar,
      'fixed-footer': footer
    }
  }
</script>

<style scoped>

</style>