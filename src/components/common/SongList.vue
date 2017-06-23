<template>
  <ul class="app-SongList">
    <li class="app-SongList_Item" v-for="(song, index) in listContent">
      <img :src="song.artwork ? song.artwork : 'http://www.langitmusik.co.id/images/now_playing.jpg'" alt="">
      <div class="app-SongList_ItemData">
        <p class="app-SongList_ItemTitle">{{song.title}}</p>
        <small class="app-SongSearch_ItemSubtitle"><router-link :to="{ name: 'user', params: {userId: $store.state.selectedSong.ownerId }}">{{song.artist}}</router-link></small>
      </div>
      <div class="app-SongList_Buttons">
        <button class="app-PlayerControls_Play" @click="playSelected(index)" style="margin-left: auto;"><i class="material-icons">play_arrow</i></button>
        <button class="app-PlayerControls_Play" @click="addToQueue(index)" style="margin-left: auto;"><i class="material-icons">playlist_add</i></button>
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
    playSelected(selectedIndexSong) {
      this.$store.state.selectedSong = this.$store.state.searchResults[selectedIndexSong];
      this.$store.state.audio.addEventListener('loadeddata', this.playLoaded);
    },
    playLoaded() {
      this.$store.state.audio.play();
      this.$store.state.isPlaying = true;
      this.searchQuery = '';
    },
    addToQueue(selectedIndexSong) {
      this.$store.state.myQueue.push(this.$store.state.searchResults[selectedIndexSong]);
    },
  },
};
</script>
<style lang="scss">
.app-SongList {
  padding: 0;
}

.app-SongList_Results {
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

.app-SongList_Buttons {
  display: flex;
  margin-left: auto;
}

.app-SongList_Item {
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

.app-SongList_ItemTitle {
  margin: 0;
}

.app-SongList_ItemSubtitle {
  color: #7e7e7e;
}
</style>
