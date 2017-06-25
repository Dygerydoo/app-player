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
    filterQueued: state => songId => state.myQueue.some(song => song.id === songId),
  },
  mutations: {
    PLAY_SONG(state, selectedSong) {
      state.isPlaying = true;
      state.isPaused = false;
      state.selectedSong = selectedSong;
      state.audio.addEventListener('loadeddata', () => {
        state.audio.play();
      });
    },
    PAUSE_SONG(state) {
      state.isPlaying = false;
      state.isPaused = true;
      state.audio.pause();
    },
    QUEUE_SONG(state, selectedSong) {
      state.myQueue.push(selectedSong);
      localStorage.setItem('queue', JSON.stringify(state.myQueue));
    },
  },
  actions: {
    playSong: ({ commit, getters }, songId, index) => {
      const filteredSong = getters.filterSongById(songId);
      commit('PLAY_SONG', filteredSong, index);
    },
    queueSong: ({ commit, getters }, songId) => {
      const filteredSong = getters.filterSongById(songId);
      const AlreadyQueued = getters.filterQueued(songId);
      if (!AlreadyQueued) {
        commit('QUEUE_SONG', filteredSong);
      } else {
        alert('Ya ha sido añadida');
      }
    },
  },
});
