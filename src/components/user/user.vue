<template>
  <div class="user">
    <user-header></user-header>
    <user-body></user-body>
    <user-bar></user-bar>
    <fixed-footer></fixed-footer>
  </div>
</template>

<script>
  import userHeader from './userHeader.vue'
  import userBody from './userBody.vue'
  import userBar from './userBar.vue'
  import footer from '../base/footer.vue'

  export default {
    components: {
      'user-header': userHeader,
      'user-body': userBody,
      'user-bar': userBar,
      'fixed-footer': footer
    }

  }
</script>

<style scoped>

</style>