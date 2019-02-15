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
    songId: ''
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
    // setComments(state, comments) {
    //   state.comments = comments;
    // }, 
    setLyric(state, lyric) {
      state.lyric = lyric;
    },
    setPlaying(state, status) {
      state.isPlaying = status;
    },
    setSongList(state, id) {
      state.playingList.push(id);
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    setSongId(state, id) {
      state.songId = id;
    }
  }
})
export default store