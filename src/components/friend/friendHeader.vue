<template>
  <div class="friendHeader">
    <img src="../../assets/addFriend.png" class="addFriend">
    <div class="friendHeaderFont">
      <label class="dynamic" @click="clickDynamic" :class="{active: isClickDynamic}">动态</label>
      <label class="nearBy" @click="clickNearby" :class="{active: !isClickDynamic}">附件</label>
    </div>
    <router-link :to="{name: 'musicPlay'}">
      <img class="friendMusic" src="../../assets/music.png">
    </router-link>
    <div class="friendHeaderBar">
      <label class="writeDynamic">写动态</label>
      <label class="publishVideo">发布视频</label>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isClickDynamic: true
      }
    },
    methods: {
      clickDynamic() {
        this.isClickDynamic = true;
      },
      clickNearby() {
        this.isClickDynamic = false;
      }
    }
  }
</script>

<style src="../../css/friend/friendHeader.css" scoped>

</style>