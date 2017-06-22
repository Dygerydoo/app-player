<template>
  <main id="app">
    <header class="app-Header">
      <img class="app-Header_Logo" src="./assets/logo.png">
      <song-search></song-search>
      <nav class="app-Navigation">
        <router-link :to="{ name: 'routeName', params: { property: value}}"><i class="material-icons">view_list</i></router-link>
      </nav>
    </header>
    <router-view></router-view>
    <player-bar :song-data="$store.state.selectedSong"></player-bar>
  </main>
</template>

<script>
import PlayerBar from '@/components/player/PlayerBar';
import SongSearch from '@/components/SongSearch';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  components: {
    PlayerBar,
    SongSearch,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}

.app-Header {
  display: flex;
  height: 60px;
  background: white;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .15);
}

.app-Header_Logo {
  align-self: center;
  max-height: 45px;
  margin: 0 1em;

  opacity: 0;
}

.app-Navigation {
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: 1em;
}

.app-Button-flat,
button {
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-block;
  border: 1px solid transparent;
  /*border-radius: 2px;*/
  /*font-family: Roboto,Helvetica,Arial,sans-serif;
  font-weight: 700;*/
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  /*box-shadow: 0 1px 2px 0 rgba(0,0,0,.1), 0 1px 5px 0 rgba(0,0,0,.07), 0 3px 1px -2px rgba(0,0,0,.09);*/
  transition: .2s ease-out;
  font-size: .938em;
  height: 36px;
  /*line-height: 35px;*/
  -webkit-font-smoothing: antialiased;
  padding: 0 .8rem;
  /*background-color: #ef6c00;*/
  /*color: #fff;*/
}
</style>
