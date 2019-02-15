import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

 const store = new Vuex.Store({
  state: {
    name: '',
    singer: '',
    url: '123',
    picUrl: '',
    comments: 0,
    lyric: ''
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
    setComments(state, comments) {
      state.comments = comments;
    }, 
    setLyric(state, lyric) {
      state.lyric = lyric;
    },
  }
})
export default store