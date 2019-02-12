import axios from 'axios';
// const baseUrl = 'http://dangosky.com:3000';
export default {
  getRecomendationSongList(callback) {
    axios.get('http://dangosky.com:3000/personalized')
    .then(function(response)  {
      callback(response.data.result) ;      // 异步的return是返回给下一个then，需要用回调
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