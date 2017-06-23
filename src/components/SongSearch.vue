<template>
  <div class="app-SongSearch">
    <input class="app-Forms_Search"
          type="search"
          v-model="searchQuery"
          @keyup="searchSongs(searchQuery)"
          placeholder="Búsqueda">
    <div class="app-SongSearch_Results" v-if="listVisibility">
      <button type="button" name="button" @click="listVisibility = false;">Cerrar</button>
      <song-list @play-song="playSelected" :list-content="$store.state.searchResults"></song-list>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/common/SongList';
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
          id: song.id,
          ownerId: song.user_id,
          stream: `${song.stream_url}?client_id=${process.env.CLIENT_ID}`,
        }));
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
    playSelected(event) {
      const filteredSong = this.$store.state.searchResults.find(song => song.id === event);
      this.$store.state.selectedSong = filteredSong;
      this.$store.state.audio.addEventListener('loadeddata', this.playLoaded);
    },
    playLoaded() {
      this.$store.state.audio.play();
      this.$store.state.isPlaying = true;
      this.searchQuery = '';
    },
  },
  components: {
    SongList,
  },
};
</script>
<style lang="scss">
.app-SongSearch {
  width: 100%;
  max-width: 600px;
}

.app-SongSearch_Results {
  margin-top: .5em;
  max-height: 400px;
  overflow: auto;
  background: white;
  z-index: 100;
  border: 1px solid #ddd;
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
  margin-top: .5em;

  &:hover {
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .25);
  }
}
</style>
