<template>
  <div class="app-PlayerControls">
    <button class="app-PlayerControls_Reverse"><i class="material-icons">skip_previous</i></button>
    <button v-if="isPlaying"class="app-PlayerControls_Play" @click="pauseMedia()"><i class="material-icons">pause</i></button>
    <button v-else class="app-PlayerControls_Play" @click="playMedia()"><i class="material-icons">play_arrow</i></button>
    <button class="app-PlayerControls_Forward"><i class="material-icons">skip_next</i></button>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isPlaying: false,
      isPaused: false,
    };
  },
  methods: {
    playMedia() {
      this.isPaused = false;
      this.$store.state.audio.play();
      this.isPlaying = true;
    },
    pauseMedia() {
      this.$store.state.audio.pause();
      this.isPlaying = false;
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
