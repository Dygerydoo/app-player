<template>
  <div class="app-PlayerControls">
    <button class="app-PlayerControls_Reverse"><i class="material-icons">skip_previous</i></button>
    <button v-if="$store.state.isPlaying"class="app-PlayerControls_Play" @click="pauseMedia()"><i class="material-icons">pause</i></button>
    <button v-else class="app-PlayerControls_Play" @click="playMedia()"><i class="material-icons">play_arrow</i></button>
    <button class="app-PlayerControls_Forward"><i class="material-icons">skip_next</i></button>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    playMedia() {
      this.$store.state.isPaused = false;
      this.$store.state.audio.play();
      this.$store.state.isPlaying = true;
    },
    pauseMedia() {
      this.$store.state.audio.pause();
      this.$store.state.isPlaying = false;
      this.$store.state.isPaused = true;
    },
  },
};
</script>

<style>
.app-PlayerControls {
  flex: 1;
  align-self: center;
}
</style>
