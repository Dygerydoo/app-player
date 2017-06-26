<template>
  <div class="app-PlayerControls">
    <button class="app-Buttons_Primary-flatRounded"
            @click="prevTrack">
      <i class="material-icons">skip_previous</i></button>
    <button v-if="$store.state.isPlaying"
            class="app-Buttons_Primary-rounded"
            @click="pauseMedia()">
            <i class="material-icons">pause</i></button>
    <button v-else
            class="app-Buttons_Primary-rounded"
            @click="playMedia()">
            <i class="material-icons">play_arrow</i></button>
    <button class="app-Buttons_Primary-flatRounded"
            @click="nextTrack">
            <i class="material-icons">skip_next</i></button>
  </div>
</template>

<script>
export default {
  name: 'player-controls',
  methods: {
    playMedia() {
      this.$store.state.isPaused = false;
      this.$store.state.audio.play();
      this.$store.state.isPlaying = true;
    },
    pauseMedia() {
      this.$store.commit('PAUSE_SONG');
    },
    nextTrack() {
      this.$store.commit('NEXT_SONG');
    },
    prevTrack() {
      this.$store.commit('PREV_SONG');
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/stylesheets/foundation/config';
@import '~@/assets/stylesheets/foundation/helpers';
@import '~@/assets/stylesheets/components/buttons';

.app-PlayerControls {
  display: flex;
  flex: 1;
  align-items: center;
}
</style>
