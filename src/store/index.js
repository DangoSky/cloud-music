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
    playingList: [],
    currentIndex: 0,
    songId: '',
    durationTime: 0,
    totalTime: ''
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
    setTotalTime(state, str) {
      state.totalTime = str;
    }
  }
})
export default store