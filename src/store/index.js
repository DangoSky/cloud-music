import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

 const store = new Vuex.Store({
  state: {
    name: '',
    singer: '',
    url: '',
    picUrl: '',
    lyric: '',
    isPlaying: false,
    playingList: [],      // 当前使用的歌单
    currentIndex: 0,
    songId: '',
    playOrder: 1,          // 播放顺序
    durationTime: 0,      // 歌曲时长/秒
    totalTime: '',        // 歌曲显示时长(字符串)
    pastTime: 0,          // 已进行时间
    currentTime: '00:00',      // 歌曲显示时间(字符串)
    movePercent: 0        // 歌曲进行百分比
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    }, 
    setSinger(state, singer) {
      state.singer = singer;
    }, 
    setUrl(state, url) {
      state.url = url;
    },
    setPicUrl(state, picUrl) {
      state.picUrl = picUrl;
    },
    setLyric(state, lyric) {
      state.lyric = lyric;
    },
    setSongList(state, id) {
      state.playingList.push(id);
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    setSongId(state, id) {
      state.songId = id;
    },
    play(state) {
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
    setDurationTime(state, time) {
      state.durationTime = time;
    },
    setTotalTime(state) {
      let dura = parseInt(state.durationTime);
      let minutes = parseInt(dura / 60);
      let seconds = dura % 60;
      minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      seconds = seconds < 10 ? '0' + seconds : '' + seconds;
      state.totalTime = `${minutes}:${seconds}`;
    },
    setPlayOrder(state) {
      if(state.playOrder === 3) {
        state.playOrder = 1;
      }
      else {
        state.playOrder++;
      }
    },
    setPastTime(state, num) {
      state.pastTime = num;
    },
    setCurrentTime(state, currentTime) {
      let seconds = currentTime % 60;
      let minutes = parseInt(currentTime / 60);
      minutes = minutes < 10 ? '0' + minutes : '' + minutes;
      seconds = seconds < 10 ? '0' + seconds : '' + seconds;
      state.currentTime = `${minutes}:${seconds}`;
    },
    setMovePercent(state, num) {
      state.movePercent = num;
    }
  }
})
export default store