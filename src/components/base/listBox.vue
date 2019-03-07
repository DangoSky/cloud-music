<template>
<div class="external" @click="$emit('hide')">
    <!-- 方法一：显示上滑列表框时用一个蒙版覆盖视图其余部分，点击时隐藏列表框 -->
    <!-- 方法二：用一个外层div覆盖全部视图，点击时隐藏列表框，至于列表框的点击则阻止冒泡 -->
  <div class="box">
    <div class="manage">
      <slot name="header">导航名称</slot>
      <p v-for="(item, index) in manageList" :key="index" 
        class="manageItem"
        :style="{background: 'url('+ item.icon +') no-repeat 10px  center'}"
        @click.stop="$emit('clickItem', item)"
      >
        {{showManageItem(item)}}
      </p>
    </div>
  </div>

</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    // 子组件的显示与否交由父组件控制，点击列表选项后触发父组件方法在父组件中进行修改
    props: ['manageList'],
    methods: {
      // 根据不同列表返回不同的字段
      showManageItem(item) {
        if(item.name.includes('歌手')) {
          return `歌手: ${this.singer}`
        }
        else if(item.name.includes('专辑')) {
          return `专辑: ${this.album}`
        }
        else if(item.name.includes('来源:歌单')) {
          return `来源:歌单: ${this.playingListId.slice(11)}`
        }
        return item.name;
      }
    },
    computed: {
      ...mapState([
        'name',
        'singer',
        'album',
        'playingListId'
      ])
    }
  }
</script>

<style scoped>
  .external {
    width:100%;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 99;
  }
  .box {
    width: 100%;
    height: auto;
    max-height: 45%;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .manage {
    width: 100%;
    overflow-y: scroll;
    position: relative;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .manageItem {
    padding-left: 40px;
    line-height: 40px;
    box-sizing: border-box;
    font-size: 0.9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-top: 1px solid rgba(211, 211, 211, 0.6);
  }
</style>