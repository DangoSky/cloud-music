<template>
  <router-link :to="{name: 'myself'}">
    <div class="myself"></div>
    <p>我的</p>
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
  .myself {
    background-image: url('../../assets/myselfUnclick.png');
    width: 30px;
    height: 30px;
  }
  .router-link-active > .myself {
    background-image: url('../../assets/myselfClick.png');
  }
</style>