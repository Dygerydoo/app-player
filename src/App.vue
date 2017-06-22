<template>
  <main id="app">
    <header class="app-Header">
      <img class="app-Header_Logo" src="./assets/logo.png">
      <div class="app-SongSearch">
        <input class="app-Forms_Search"
              type="search"
              v-model="searchQuery"
              @keyup="searchSongs(searchQuery)"
              placeholder="Búsqueda">
        <ul v-if="listVisibility"
            class="app-SongSearch_ListResults">
          <li class="app-SongSearch_Item" v-for="(song, index) in searchResults">
            <img :src="song.artwork ? song.artwork : 'http://www.langitmusik.co.id/images/now_playing.jpg'" alt="">
            <div class="app-SongSearch_ItemData">
              <p class="app-SongSearch_ItemTitle">{{song.title}}</p>
              <small class="app-SongSearch_ItemSubtitle">{{song.artist}}</small>
            </div>
            <button class="app-PlayerControls_Play" @click="playSelected(index)" style="margin-left: auto;"><i class="material-icons">play_arrow</i></button>
          </li>
        </ul>
      </div>
    </header>
    <router-view></router-view>
    <player-bar :song-data="selectedSong"></player-bar>
  </main>
</template>

<script>
import PlayerBar from './components/PlayerBar';
import { search } from './api';

export default {
  name: 'app',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      selectedSong: {},
      listVisibility: false,
      errors: [],
    };
  },
  methods: {
    playSelected(selectedIndexSong) {
      this.selectedSong = this.searchResults[selectedIndexSong];
      this.$store.state.audio.addEventListener('loadeddata', this.playLoaded);
    },
    playLoaded() {
      this.$store.state.audio.play();
      this.$store.state.isPlaying = true;
      this.listVisibility = false;
      this.searchQuery = '';
    },
    searchSongs(value) {
      this.listVisibility = true;
      search(value).then((response) => {
        this.searchResults = response.data.map(song => ({
          title: song.title,
          artwork: song.artwork_url,
          artist: song.user.username,
          stream: `${song.stream_url}?client_id=${process.env.CLIENT_ID}`,
        }));
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
  },
  computed: {

  },
  components: {
    PlayerBar,
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

.app-SongSearch {
  margin-top: .5em;
  width: 100%;
  max-width: 600px;
}

.app-SongSearch_ListResults {
  max-width: 600px;
  margin: 0;
  padding: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .35);
  list-style: none;
  max-height: 300px;
  overflow: auto;
}

.app-SongSearch_Item {
  display: flex;
  align-items: center;
  padding: .5em;
  border-bottom: 1px solid #ddd;

  img {
    width: 45px;
    height: 45px;
    margin-right: 1em;
  }

  button {
    display: none;
  }

  &:hover {

    button {
      display: block;
    }
  }
}

.app-SongSearch_ItemTitle {
  margin: 0;
}

.app-SongSearch_ItemSubtitle {
  color: #7e7e7e;
}

.app-Forms_Search {
  background: #f4f4f4;
  -webkit-appearance: none;
  border: 0;
  border-radius: 2px;
  height: 45px;
  align-self: center;
  padding: 1em;
  font-size: 1em;
  width: 100%;

  &:hover {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .25);
  }
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
