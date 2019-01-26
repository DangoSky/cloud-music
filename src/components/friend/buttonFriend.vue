<template>
  <router-link :to="{name: 'friend'}">
    <div class="friend"></div>
    <p>朋友</p>
  </router-link>
</template>

<script>
  export default {
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
  .friend {
    background-image: url('../../assets/friendUnclick.png');
    width: 30px;
    height: 30px;
  }
  .router-link-active > .friend {
    background-image: url('../../assets/friendClick.png');
  }
</style>