<template>
    <div class="exploreBar">
      <div class="exploreBarIcon personalFM">
        <label class="exploreBarFont">私人FM</label>
      </div>
      <div class="exploreBarIcon dayRecommendation">
        <label class="exploreBarFont">每日推荐</label>
        <label class="ExploreFontToday">{{ today }}</label>
      </div>
      <div class="exploreBarIcon songList">
        <label class="exploreBarFont">歌单</label>
      </div>
      <div class="exploreBarIcon rankingList">
        <label class="exploreBarFont">排行榜</label>
      </div>
      
    </div>
</template>

<script>
  export default {
    computed: {
      today() {
          let date = new Date();
          let day = date.getDate();
          if(day < 10) return '0' + day; 
          return day;
      }
    }
  }
</script>

<style src="../../css/explore/exploreBar.css" scoped>

</style>