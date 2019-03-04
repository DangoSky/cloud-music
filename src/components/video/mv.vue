<template>
  <div class="box">
    <div v-for="(item, index) in mvDetail" :key="index" class="mvBox">
      <video width="100%" :src="item.brs[240]" class="mv" :poster="item.cover" @click="playVideo"></video>
      <div class="detail">
        <label class="name">{{item.name}} —{{item.artistName}}</label>
        <label class="publishTime">{{item.publishTime}}</label>

      
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/index.js'
import { mapState } from 'vuex';
  export default {
    mounted() {
      api.getMvId((res) => {
        this.mvId = res.slice();
        for(let i=0; i<this.mvId.length; i++) {
          api.getMvDetail(this.mvId[i].id, (res) => {
            let obj = {};
            obj.name = res.name;
            obj.brs = res.brs;
            obj.publishTime = res.publishTime;
            obj.artistName = res.artistName;
            obj.cover = res.cover;
            this.mvDetail.push(obj);
          })
        }
      })
    },
    data() {
      return {
        mvId: [],
        mvDetail: [],
        timer: null,
        lastVideo: null
      }
    },
    methods: {
      playVideo(e) {
        if(this.lastVideo && this.lastVideo !== e.target) {
          this.lastVideo.load();
          clearInterval(this.timer);
          this.timer = null;
        }
        this.lastVideo = e.target;
        e.target.play();
        // e.target.controls = "controls";
        this.timer = setInterval(() => {
          if(-(e.target.getBoundingClientRect().top - 83) >= e.target.getBoundingClientRect().height) {
            e.target.load();
            clearInterval(this.timer);
            this.timer = null;
          }
        },100)
      }
    }
  }
</script>

<style scoped src="../../css/video/mv.css">

</style>