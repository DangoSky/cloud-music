<template>
  <div class="userBar">
    <div 
      v-for="item in userBar" 
      class="userBarItem" 
      :class="[item.haveGap ? 'gapClass' : 'underline']"
      :key="item.name" 
      :style="{background: 'url(' + item.bgSrc + ') no-repeat 10px 10px white'}"
    >
      <label style="cursor: pointer;" :class="{newClass: item.haveNew}">{{ item.name }}</label>
      <img src="../../assets/rightArrow.png" class="rightArrow">
    </div>
    <p class="userFooter">退出登陆</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userBar: [
          {
            name: '我的消息',
            bgSrc: require('../../assets/message.png'),
            haveGap: true,
            haveNew: true
          },
          {
            name: '我的会员',
            bgSrc: require('../../assets/vip.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '云村有票',
            bgSrc: require('../../assets/ticket.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '商城',
            bgSrc: require('../../assets/shop.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '精品游戏推荐',
            bgSrc: require('../../assets/game.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '在线听歌免流量',
            bgSrc: require('../../assets/flow.png'),
            haveGap: true,
            haveNew: false
          },
          {
            name: '设置',
            bgSrc: require('../../assets/setting.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '扫一扫',
            bgSrc: require('../../assets/richScan.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '个性换肤',
            bgSrc: require('../../assets/skin.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '夜间模式',
            bgSrc: require('../../assets/night.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '定时关闭',
            bgSrc: require('../../assets/timingClose.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '音乐闹钟',
            bgSrc: require('../../assets/clock.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '驾驶模式',
            bgSrc: require('../../assets/drive.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '古典专区',
            bgSrc: require('../../assets/piano.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '亲子频道',
            bgSrc: require('../../assets/family.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '小冰电台',
            bgSrc: require('../../assets/xiaobing1.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '优惠券',
            bgSrc: require('../../assets/discount.png'),
            haveGap: true,
            haveNew: true
          },
          {
            name: '加入网易云音乐人',
            bgSrc: require('../../assets/music2.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '分享网易云音乐',
            bgSrc: require('../../assets/share.png'),
            haveGap: false,
            haveNew: false
          },
          {
            name: '关于',
            bgSrc: require('../../assets/about.png'),
            haveGap: true,
            haveNew: false
          }
        ]
      }
    }
  }
</script>

<style src="../../css/user/userBar.css" scoped>

</style>