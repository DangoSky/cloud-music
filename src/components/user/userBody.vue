<template>
  <div class="userBody">
    <div class="userBodyHead">
      <img src="http://p2.music.126.net/e6G_JLkLGcIQLw9vsdgt0g==/109951163763088598.jpg?param=170y170" class="userBodyPortrait">
      <label class="userBodyUserName" :class="{musicBagClass: isVip}">{{ userName }}</label>
      <label class="userBodyUserLevel">Lv.{{ level }}</label>
      <label class="userBodySignIn">签到</label>
    </div>
    <div class="userBodyBar" v-for="item in userBodyBarArr" :key="item.name">
      <p class="barTitle">{{ item.name }}</p>
      <p class="barNum">{{ item.num }}</p>
    </div>
    <div class="material">
      <label class="materialFont">我的资料</label>
    </div> 
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '团子的天空幻想',
        level: '8',
        isVip: true,
        userBodyBarArr: [
          {
            name: '动态',
            num: 33
          },
          {
            name: '关注',
            num: 1
          },
          {
            name: '粉丝',
            num: 3
          },
        ]
      }
    }
  }
</script>

<style src="../../css/user/userBody.css" scoped>

</style>