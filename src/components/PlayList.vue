<template>
  <div class="app-Queue">
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
      console.log(event);
      const filteredSong = this.$store.state.searchResults.find(song => song.id === event);
      this.$store.state.selectedSong = filteredSong;
      this.$store.state.audio.addEventListener('loadeddata', () => {
        this.$store.state.audio.play();
        this.$store.state.isPlaying = true;
        this.searchQuery = '';
      });
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
