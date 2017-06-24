<template>
  <ul class="app-SongList">
    <li class="app-SongList_Item" v-for="(song, index) in listContent">
      <album-artwork :src="song.artwork" alt="'song.title'" :size="45"></album-artwork>
      <div class="app-SongList_ItemData">
        <p class="app-SongList_ItemTitle">{{song.title}}</p>
        <small class="app-SongSearch_ItemSubtitle">
          <router-link :to="{ name: 'user', params: {userId: song.ownerId }}">{{song.artist}}</router-link>
        </small>
      </div>
      <div class="app-SongList_Buttons">
        <button class="app-Buttons_Primary-flatRounded" @click="play(song.id, index)">
          <i class="material-icons">play_arrow</i></button>
        <button v-if="addable" class="app-Buttons_Primary-flatRounded" @click="queue(song.id, index)">
          <i class="material-icons">playlist_add</i>
        </button>
      </div>
    </li>
  </ul>
</template>
<script>
import AlbumArtwork from '@/components/common/AlbumArtwork';

export default {
  name: 'song-list',
  props: ['listContent', 'addable'],
  methods: {
    play(songId, index) {
      this.$emit('play-song', songId, index);
    },
    queue(songId, index) {
      this.$emit('queue-song', songId, index);
    },
  },
  components: {
    AlbumArtwork,
  },
};
</script>
<style lang="scss">
@import '~@/assets/stylesheets/foundation/config';
@import '~@/assets/stylesheets/foundation/helpers';

.app-SongList {
  padding: 0;
  background: $white;
  box-shadow: $box-shadow-default;
}

.app-SongList_Results {
  list-style: none;
  overflow: auto;
  max-width: 600px;
  max-height: 300px;
  padding: 0;
  margin: 0;
  background: $white;
}

.app-SongList_Buttons {
  display: none;
  margin-left: auto;

  [class^='app-PlayerControls']:not(:last-child) {
    margin-right: .5em;
  }
}

.app-SongList_Item {
  display: flex;
  align-items: center;
  padding: .5em;
  border-bottom: $border-default;

  img {
    width: 45px;
    height: 45px;
    margin-right: 1em;
  }

  &:hover {
    .app-SongList_Buttons {
      display: flex;
    }
  }
}

.app-SongList_ItemTitle {
  @include ellipsis;
  width: 350px;
  margin: 0;
}

.app-SongList_ItemSubtitle {
  color: $grey-medium;
}
</style>
