import axios from 'axios';
// const baseUrl = 'http://dangosky.com:3000';
export default {
  // 获取推荐歌单的id
  getRecomendationSongListId(callback) {
    axios.get('http://dangosky.com:3000/personalized')
      .then(function(response)  {
        callback(response.data.result) ;      // 异步的return是返回给下一个then，需要用回调
      })
      .catch(function(error) {
        alert(error);
      })
  },
  // 根据id获取歌单的详细信息
  getSongList(id, callback) {
    axios.get(`http://dangosky.com:3000/playlist/detail?id=${id}`)
      .then(function(response) {
        // console.log(response.data.playlist.name);
        callback(response.data.playlist.creator);
      })
      .catch(function(error) {
        alert(error);
      }) 
  }
}
  // axios.get('/user', {
  //   params: {
  //     ID: 12345
  //   }
  // })
  // .then(function(response) {
  //   alert(response);
  // })
  // .catch(function(error) {
  //   alert(error);
  // });