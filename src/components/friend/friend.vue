<template>
  <div class="friend">
    <friend-header></friend-header>
    <fixed-footer></fixed-footer>
  </div>  
</template>

<script>
  import footer from '../base/footer.vue'
  import friendHeader from './friendHeader.vue'

  export default {
    components: {
      'fixed-footer': footer,
      'friend-header': friendHeader
    }
  }
</script>

<style scoped>

</style>