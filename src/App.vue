<template>
  <div>
     <router-link :to="{name: 'explore'}">发现</router-link>
     <router-link :to="{name: 'video'}">视频</router-link>
     <router-link :to="{name: 'myself'}">我的</router-link>
     <router-link :to="{name: 'friend'}">朋友</router-link>
     <router-link :to="{name: 'user'}">账号</router-link>
    <router-view></router-view>
  </div>
 
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>

</style>
