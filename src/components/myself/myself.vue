<template>
  <div class="myself">
    <myself-header></myself-header>
    <myself-user></myself-user>
    <myself-bar></myself-bar>
    <my-song-list></my-song-list>
  </div>
</template>

<script>
  import myselfHeader from './myselfHeader.vue'
  import myselfBar from './myselfBar.vue'
  import myselfUser from './myselfUser.vue'
  import mySongList from './mySongList.vue'

  export default {
    components: {
      'myself-header': myselfHeader,
      'myself-bar': myselfBar,
      'myself-user': myselfUser,
      'my-song-list': mySongList
    },
    data() {
      return {
    
      }
    },
    methods: {
    
    },
    computed: {
    
    }
  }
</script>

<style scoped>
</style>