<template>
  <div class="footer">
    <router-view></router-view>
     <button-explore></button-explore>
     <button-video></button-video>
     <button-myself></button-myself>
     <button-friend></button-friend>
     <button-user></button-user>
  </div>
  
</template>

<script>
import buttonExplore from './components/explore/buttonExplore'
import buttonVideo from './components/video/buttonVideo'
import buttonMyself from './components/myself/buttonMyself'
import buttonFriend from './components/friend/buttonFriend'
import buttonUser from './components/user/buttonUser'

export default {
  name: 'app',
  components: {
    'button-explore': buttonExplore,
    'button-video': buttonVideo,
    'button-myself': buttonMyself,
    'button-friend': buttonFriend,
    'button-user': buttonUser
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
    width: 100%;
    height: 100%;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    background-color: rgba(215, 227, 239, 0.6);
  }
</style>
