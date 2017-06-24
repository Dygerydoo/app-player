import Vue from 'vue';
import Vuex from 'vuex';

const storagePlaylist = {
  fetch() {
    return JSON.parse(localStorage.getItem('queue') || '[]');
  },
};

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
    myQueue: storagePlaylist.fetch(),
    currentIndexSongQueue: undefined,
    mainQueue: [],
  },
  getters: {
    filterSongById: state => songId => state.searchResults.find(song => song.id === songId),
    AlreadyQueued: state => songId => state.myQueue.some(song => song.id === songId),
  },
  mutations: {
    PLAY_SONG(state, selectedSong) {
      state.isPlaying = true;
      state.isPaused = false;
      state.selectedSong = selectedSong;
    },
    PAUSE_SONG(state) {
      state.isPlaying = false;
      state.isPaused = true;
    },
  },
});
