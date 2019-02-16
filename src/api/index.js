import axios from 'axios';
// const publicUrl = 'http://dangosky.com:3000';
export default {
  // 获取轮播图
  getCarouselUrl(callback) {
    axios.get('http://dangosky.com:3000/banner')
      .then(function(response) {
        callback(response.data.banners);
      })
      .catch(function(error) {
        console.log(error);
      })
    },
  // 获取推荐歌单的id
  getRecomendationSongListId(callback) {
    axios.get('http://dangosky.com:3000/personalized')
      .then(function(response)  {
        callback(response.data.result);      // 异步的return是返回给下一个then，需要用回调
      })
      .catch(function(error) {
        console.log(error);
      })
  },
  // 根据id获取歌单的详细信息
  getSongList(id, callback) {
    axios.get(`http://dangosky.com:3000/playlist/detail?id=${id}`)
      .then(function(response) {
        callback(response.data.playlist);
      })
      .catch(function(error) {
        console.log(error);
      }) 
  },
  // 获取歌曲url
  getSongUrl(id, callback, callback1) {
    axios.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}`)
      .then(function(response) {
        callback(response.data.data[0].url);
      })
      .then(function() {
        callback1();
      })
      .catch(function(error) {
        console.log(error);
      }) 
  },
  // 获取歌曲评论数
  getComments(id, callback) {
    axios.get(`https://api.imjad.cn/cloudmusic/?type=comments&id=${id}`)
      .then(function(response) {
        callback(response.data.total);
      })
      .catch(function(error) {
        console.log(error);
      }) 
  },
  // 获取歌词
  getLyric(id, callback) {
    axios.get(`https://api.imjad.cn/cloudmusic/?type=lyric&id=${id}`)
      .then(function(response) {
        if(response.data.lrc) {
          callback(response.data.lrc.lyric);
        }
        else {
          callback("暂无歌词");
        }
      })
      .catch(function(error) {
        console.log(error);
      }) 
  }
}