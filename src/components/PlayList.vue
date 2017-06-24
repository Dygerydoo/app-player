<template>
  <div class="app-Queue">
    <h1>Tu cola de reproducción</h1>
    <button type="button" class="app-Button_Primary"@click="emptyQueue">Borrar cola</button>
    <song-list :list-content="$store.state.myQueue"
               @play-song="playSelected"></song-list>
  </div>
</template>
<script>
import SongList from '@/components/common/SongList';

export default {
  name: 'app-queue',
  methods: {
    playSelected(event) {
      const filteredSong = this.$store.state.myQueue.find(song => song.id === event);
      this.$store.state.selectedSong = filteredSong;
      this.$store.state.audio.addEventListener('loadeddata', () => {
        this.$store.state.audio.play();
        this.$store.state.isPlaying = true;
        this.searchQuery = '';
      });
    },
    emptyQueue() {
      localStorage.removeItem('queue');
      this.$store.state.myQueue = [];
    },
  },
  components: {
    SongList,
  },
};
</script>

<style lang="scss">
.app-Queue {
  width: 90%;
  margin: 0 auto;
}
</style>
