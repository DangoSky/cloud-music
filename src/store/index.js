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
    movePercent: 0,        // 歌曲进行百分比
    draged: false,        // 记录是否拖动点击以此跳转歌曲
    draging: false,       // 为true时进度条正在拖动，不显示当前进行的时间
    showLyric: false,
    lyricArr: [],       // 时间点为键，歌词为值
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    }, 
    setSingers(state, singers) {
      let str = '';
      for(let i=0; i<singers.length; i++) {
        str += singers[i].name;
        if(i !== singers.length - 1)  str += '/';  
      } 
      state.singer = str;
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
    setPlayingList(state, songlist) {
      state.playingList = [];
      for(let i=0; i<songlist.length; i++) {
        state.playingList.push(songlist[i].id);
      }
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
    },
    setShowPlayer(state, bool) {
      state.showPlayer = bool;
    },
    setDraged(state, bool) {
      state.draged = bool;
    },
    setDraging(state, bool) {
      state.draging = bool;
    },
    setShowLyric(state, bool) {
      state.showLyric = bool;
    },
    setLyricArr(state) {
      // 先把每一句歌词及其对应的时间通过\n分割成数组
      let lyrics = state.lyric.split('\n');
      state.lyricArr = [];
      for(let i=0; i<lyrics.length; i++) {
        let reg = /\[[\s\S]*\]/g;
        let txt = lyrics[i].replace(reg, '');      // 歌词部分
        let key = lyrics[i].match(reg);            // 时间点部分，但是一个数组
        if(!key)  continue   // lyrics最后还有一个\n，执行下去会出错
        for(let j=0; j<key.length; j++) {
          let obj = {};
          let minutes = Number(String(key[j].match(/\[[\s\S]*:/)).slice(1, -1));
          let seconds = Number(String(key[j].match(/:[\s\S]*\]/)).slice(1, -1));
          obj.time = Math.round(minutes * 60 + seconds);
          obj.text = txt;
          state.lyricArr.push(obj);
        }
      }
    }
  }
})
export default store