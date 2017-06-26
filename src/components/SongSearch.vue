<template>
  <div class="app-SongSearch" v-on-clickaway="hideResultList">
    <input class="app-Forms_Search"
          type="search"
          v-model="searchQuery"
          @keyup="searchSongs(searchQuery)"
          placeholder="Búsqueda">
    <div class="app-SongSearch_Results" v-if="listVisibility">
      <song-list @play-song="playSelected"
                 @queue-song="queueSelected"
                 :addable="true"
                 :list-content="$store.state.searchResults"></song-list>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/common/SongList';
import { mixin as clickaway } from 'vue-clickaway';
import { search } from '@/api';

export default {
  name: 'song-search',
  mixins: [clickaway],
  data() {
    return {
      searchQuery: '',
      listVisibility: false,
      errors: [],
    };
  },
  methods: {
    hideResultList() {
      this.listVisibility = false;
    },
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
    playSelected(songId, index) {
      this.$store.dispatch('playSong', { listToFilter: 'searchResults', songId, index });
    },
    queueSelected(songId) {
      this.$store.dispatch('queueSong', { listToFilter: 'searchResults', songId });
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

  @include mq(mobile) {
    max-width: 250px;
  }
}

.app-SongSearch_Results {
  overflow: auto;
  position: relative;
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
