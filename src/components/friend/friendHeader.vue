<template>
  <div class="friendHeader">
    <img src="../../assets/addFriend.png" class="addFriend">
    <div class="friendHeaderFont">
      <!-- 三元运算符里的类名需要加引号 -->
      <label class="dynamic" @click="clickDynamic" :class="{dynamicActive: isClickDynamic}">动态</label>
      <label class="nearBy" @click="clickNearby" :class="{nearByActive: isClicknearBy}">附近</label>
    </div>
    <img src="../../assets/music.png" class="friendMusic">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isClickDynamic: true,
        isClicknearBy: false
      }
    },
    methods: {
      clickDynamic() {
        this.isClickDynamic = true;
        this.isClicknearBy = false;
      },
      clickNearby() {
        this.isClickDynamic = false;
        this.isClicknearBy = true;
      }
    }
  }
</script>

<style src="../../css/friend/friendHeader.css" scoped>

</style>