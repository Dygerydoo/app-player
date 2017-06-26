<template>
  <div class="app-Queue">
    <h1>Tu cola de reproducción</h1>
    <template v-if="!queueIsEmpty">
      <button type="button" class="app-Button_Primary" @click="emptyQueue">Borrar cola</button>
      <song-list :list-content="$store.state.myQueue"
                 @play-song="playSelected"></song-list>
    </template>
    <div class="app-Queue_Empty" v-else>
      <h3>Todavía no has añadido nada a tu cola de reproducción</h3>
      <p>Puedes añadir canciones usando el buscador en la parte superior</p>
    </div>
  </div>
</template>
<script>
import SongList from '@/components/common/SongList';

export default {
  name: 'app-queue',
  methods: {
    playSelected(songId, index) {
      this.$store.state.mainQueue = this.$store.state.myQueue;
      this.$store.state.currentIndexSongQueue = index;
      this.$store.dispatch('playSong', { listToFilter: 'myQueue', autoPlay: true, songId, index });
    },
    emptyQueue() {
      localStorage.removeItem(process.env.QUEUE_KEY);
      this.$store.state.myQueue = [];
    },
    filterSongById(songId) {
      return this.$store.state.myQueue.find(song => song.id === songId);
    },
  },
  computed: {
    queueIsEmpty() {
      if (this.$store.state.myQueue.length === 0) { return true; }
      return false;
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

.app-Queue {
  width: 90%;
  margin: 0 auto;
}

.app-Queue_Empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  background: $white;
}
</style>
