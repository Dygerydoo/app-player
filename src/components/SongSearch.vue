<template>
  <div class="app-SongSearch">
    <input class="app-Forms_Search"
          type="search"
          v-model="searchQuery"
          @keyup="searchSongs(searchQuery)"
          placeholder="Búsqueda">
    <div class="app-SongSearch_Results" v-if="listVisibility">
      <button type="button" @click="listVisibility = false;">Cerrar</button>
      <song-list @play-song="playSelected"
                 @queue-song="queueSelected"
                 :list-content="$store.state.searchResults"></song-list>
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
      this.$store.state.audio.addEventListener('loadeddata', () => {
        this.$store.state.audio.play();
        this.$store.state.isPlaying = true;
        this.searchQuery = '';
      });
    },
    queueSelected(songId) {
      const AlreadyQueued = this.$store.state.myQueue.some(song => song.id === songId);
      const filteredSong = this.$store.state.searchResults.find(song => song.id === songId);
      if (!AlreadyQueued) {
        this.$store.state.myQueue.push(filteredSong);
        localStorage.setItem('queue', JSON.stringify(this.$store.state.myQueue));
      } else {
        alert('Ya ha sido añadida');
      }
    },
  },
  components: {
    SongList,
  },
};
</script>
<style lang="scss">
@import '~@/assets/stylesheets/foundation/config';
@import '~@/assets/stylesheets/foundation/helpers';

.app-SongSearch {
  width: 100%;
  max-width: 600px;
}

.app-SongSearch_Results {
  overflow: auto;
  z-index: 100;
  max-height: 400px;
  border: $border-default;
  margin-top: .5em;
  background: $white;
}

.app-Forms_Search {
  align-self: center;
  width: 100%;
  height: 45px;
  padding: 1em;
  border: 0;
  border-radius: 2px;
  margin-top: .5em;
  background: $grey-lightest;
  font-size: $font-size-m;
  -webkit-appearance: none;

  &:hover {
    box-shadow: $box-shadow-default;
  }
}
</style>
