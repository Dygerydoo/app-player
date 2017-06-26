<template>
  <main id="app">
    <header class="app-Header">
      <a class="app-Header_Logo" href="/">
        <img src="./assets/logo.jpg">
      </a>
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
    max-height: 30px;
  }
}
</style>
