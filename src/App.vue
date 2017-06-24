<template>
  <main id="app">
    <header class="app-Header">
      <a class="app-Header_Logo" href="/"><img src="./assets/logo.png"></a>
      <song-search></song-search>
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
@import '~@/assets/stylesheets/foundation/config';
@import '~@/assets/stylesheets/foundation/helpers';

body {
  background: $grey-lightest;
}

#app {
  margin-bottom: 120px;
  font-family: $font-family-primary;
}

[v-cloak] {
  display: none;
}

.app-Header {
  display: flex;
  height: 60px;
  background: $white;
  box-shadow: $box-shadow-default;
}

.app-Header_Logo {
  align-self: center;
  margin: 0 1em;

  img {
    max-height: 45px;
  }
}

.app-Buttons_Primary-rounded {
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
  border-radius: 100%;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1), 0 1px 5px 0 rgba(0,0,0,.07), 0 3px 1px -2px rgba(0,0,0,.09);
  transition: .2s ease-out;
  font-size: .938em;
  height: 50px;
  width: 50px;
  -webkit-font-smoothing: antialiased;
  padding: 0 .8rem;
  background-color: #ef6c00;
  color: white;
  outline: 0;

  &:hover {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3), 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 0px 6px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>
