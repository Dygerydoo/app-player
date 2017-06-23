import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    audio: '',
    audioDuration: '',
    isPlaying: false,
    isPaused: false,
    searchResults: [],
    selectedSong: {},
    ownerUser: {},
    userPlaylist: [],
    myQueue: [
      { title: 'Hola', artist: 'Adios' },
    ],
  },
  mutations: {
    PLAY_SONG(state) {
      state.isPlaying = true;
      state.isPaused = false;
      state.audio.play();
    },
    PAUSE_SONG(state) {
      state.isPlaying = false;
      state.isPaused = true;
    },
  },
});
