<template>
  <div class="video">
    <video-header @changeShow="changeShow"></video-header>
    <!-- <mv v-if="showMv"></mv> -->
    <component :is="componentId"></component>
    <fixed-footer></fixed-footer>
  </div>
</template>

<script>
  import videoHeader from './videoHeader.vue'
  import footer from '../base/footer.vue'
  import mv from './mv.vue'

  export default {
    components: {
      'video-header': videoHeader,
      'fixed-footer': footer,
      'MV': mv
    },
    data() {
      return {
        showMv: true,
        componentId: 'MV'
      }
    },
    methods: {
      changeShow(name) {
        if(name === 'MV') {
          this.componentId = name;
        }
        else {
          this.componentId = '';
        }
      }
    }
  }
</script>

<style scoped>

</style>