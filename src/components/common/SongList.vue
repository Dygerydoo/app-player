<template>
  <ul class="app-SongList">
    <li class="app-SongList_Item" v-for="song in listContent">
      <img :src="song.artwork ? song.artwork : 'http://www.langitmusik.co.id/images/now_playing.jpg'" alt="">
      <div class="app-SongList_ItemData">
        <p class="app-SongList_ItemTitle">{{song.title}}</p>
        <small class="app-SongSearch_ItemSubtitle">
          <router-link :to="{ name: 'user', params: {userId: song.ownerId }}">{{song.artist}}</router-link>
        </small>
      </div>
      <div class="app-SongList_Buttons">
        <button class="app-PlayerControls_Play" @click="play(song.id)" style="margin-left: auto;">
          <i class="material-icons">play_arrow</i></button>
        <button class="app-PlayerControls_Play" @click="queue(song.id)" style="margin-left: auto;">
          <i class="material-icons">playlist_add</i>
        </button>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'song-list',
  props: ['list-content'],
  data() {
    return {

    };
  },
  methods: {
    play(songId) {
      this.$emit('play-song', songId);
    },
    queue(songId) {
      this.$emit('queue-song', songId);
    },
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
  display: flex;
  margin-left: auto;
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

  button {
    display: none;
  }

  &:hover {
    button {
      display: block;
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
