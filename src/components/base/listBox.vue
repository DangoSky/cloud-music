<template>
<div class="external" @click="$emit('hide')">
    <!-- 方法一：显示上滑列表框时用一个蒙版覆盖视图其余部分，点击时隐藏列表框 -->
    <!-- 方法二：用一个外层div覆盖全部视图，点击时隐藏列表框，至于列表框的点击则阻止冒泡 -->
  <div class="box">
    <p class="headerTitle">歌曲: {{name}}</p>
    <div class="manage" ref="manage">
      <p v-for="(item, index) in manageList" :key="index" 
        class="manageItem"
        :class="{underline: index !== 0}"
        :style="{background: 'url('+ item.icon +') no-repeat 10px  center'}"
        @click.stop="$emit('clickItem', item)"
      >
        {{showManageItem(item, manageParms)}}
      </p>
    </div>
  </div>

</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    mounted() {
      // console.log(this.$refs.manage);
      this.$refs.manage.addEventListener('scroll', function(e) {
        // console.log(e);
        // e.preventDefault();
      })
    },
    // 子组件的显示与否交由父组件控制，点击列表选项后触发父组件方法在父组件中进行修改
    props: ['manageList'],
    methods: {
      // 根据不同列表返回不同的字段
      showManageItem(item, manageParms) {
        if(item.name.includes('歌手')) {
          return `歌手: ${manageParms.singer}`
        }
        else if(item.name.includes('专辑')) {
          return `专辑: ${manageParms.album}`
        }
        else if(item.name.includes('来源:歌单')) {
          return `来源:歌单: ${manageParms.playingListId.toString().slice(11)}`
        }
        return item.name;
      }
    },
    computed: {
      manageParms() {
        return {
          singer: this.singer,
          album: this.album,
          playingListId: this.playingListId
        }
      },
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
    position: fixed;
    top: 0;
    z-index: 99999;
  }
  .headerTitle {
    font-size: 0.85rem; 
    padding: 10px;
    position: relative;
    left: 0;
    top: 0;
    border-bottom: 1px solid rgba(211, 211, 211, 0.6);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .box {
    width: 100%;
    height: auto;
    max-height: 45%;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    z-index: 9999;
  }
  .manage {
    z-index: 9999;
    overflow-y: scroll;
  }
  .manageItem {
    flex: 1;
    line-height: 40px;
    padding-left: 40px;
    box-sizing: border-box;
    font-size: 0.9rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .underline {
    border-top: 1px solid rgba(211, 211, 211, 0.6);
  }
</style>