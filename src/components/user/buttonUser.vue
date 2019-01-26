<template>
  <router-link :to="{name: 'user'}">
    <div class="user"></div>
    <P>账号</P>
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
  .user {
    background-image: url('../../assets/userUnclick.png');
    width: 30px;
    height: 30px;
  }
  .router-link-active > .user {
    background-image: url('../../assets/userClick.png');
  }
</style>