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
    autoPlay: false,
    searchResults: [],
    selectedSong: {},
    ownerUser: {},
    myQueue: storagePlaylist.fetch(),
    currentIndexSongQueue: undefined,
    mainQueue: [],
  },
  getters: {
    /* eslint-disable */
    filterSongById: state => (listToFilter, songId) => state[listToFilter].find(song => song.id === songId),
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
    NEXT_SONG(state) {
      const nextSong = state.mainQueue[state.currentIndexSongQueue + 1];
      state.selectedSong = nextSong;
      state.currentIndexSongQueue = state.currentIndexSongQueue + 1;
    },
    PREV_SONG(state) {
      const prevSong = state.mainQueue[state.currentIndexSongQueue - 1];
      state.selectedSong = prevSong;
      state.currentIndexSongQueue = state.currentIndexSongQueue - 1;
    },
    AUTO_PLAY(state, autoPlay) {
      if (autoPlay) {
        state.autoPlay = true;
      }
    },
  },
  actions: {
    playSong: ({ commit, getters }, payload) => {
      const filteredSong = getters.filterSongById(payload.listToFilter, payload.songId);
      commit('PLAY_SONG', filteredSong, payload.index);
      commit('AUTO_PLAY', payload.autoPlay);
    },
    queueSong: ({ commit, getters }, payload) => {
      const filteredSong = getters.filterSongById(payload.listToFilter, payload.songId);
      const AlreadyQueued = getters.filterQueued(payload.songId);
      if (!AlreadyQueued) {
        commit('QUEUE_SONG', filteredSong);
      } else {
        alert('Ya ha sido añadida');
      }
    },
  },
});
