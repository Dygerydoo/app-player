<template>
  <div class="app-SongSearch">
    <input class="app-Forms_Search"
          type="search"
          v-model="searchQuery"
          @keyup="searchSongs(searchQuery)"
          placeholder="Búsqueda">
    <ul v-if="listVisibility"
        class="app-SongSearch_ListResults">
      <li class="app-SongSearch_Item" v-for="(song, index) in $store.state.searchResults">
        <img :src="song.artwork ? song.artwork : 'http://www.langitmusik.co.id/images/now_playing.jpg'" alt="">
        <div class="app-SongSearch_ItemData">
          <p class="app-SongSearch_ItemTitle">{{song.title}}</p>
          <small class="app-SongSearch_ItemSubtitle"><router-link :to="{ name: 'user', params: {userId: $store.state.selectedSong.ownerId }}">{{song.artist}}</router-link></small>
        </div>
        <button class="app-PlayerControls_Play" @click="playSelected(index)" style="margin-left: auto;"><i class="material-icons">play_arrow</i></button>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from '@/api';

export default {
  name: 'song-search',
  data: function data() {
    return {
      searchQuery: '',
      listVisibility: false,
    };
  },
  methods: {
    searchSongs(value) {
      this.listVisibility = true;
      search(value).then((response) => {
        this.$store.state.searchResults = response.data.map(song => ({
          title: song.title,
          artwork: song.artwork_url,
          artist: song.user.username,
          ownerId: song.user_id,
          stream: `${song.stream_url}?client_id=${process.env.CLIENT_ID}`,
        }));
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    playSelected(selectedIndexSong) {
      this.$store.state.selectedSong = this.$store.state.searchResults[selectedIndexSong];
      this.$store.state.audio.addEventListener('loadeddata', this.playLoaded);
    },
    playLoaded() {
      this.$store.state.audio.play();
      this.$store.state.isPlaying = true;
      this.listVisibility = false;
      this.searchQuery = '';
    },
  },
};
</script>
<style lang="scss">
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
</style>
