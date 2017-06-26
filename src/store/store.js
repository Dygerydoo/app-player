import Vue from 'vue';
import Vuex from 'vuex';

const QUEUE_KEY = process.env.QUEUE_KEY;

const storagePlaylist = {
  fetch() {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  },
};

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    audio: '',
    audioDuration: '',
    currentTime: 0,
    seekProgress: 0,
    isPlaying: false,
    isPaused: false,
    autoPlay: undefined,
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
    getAudioDuration: state => () => state.audioDuration,
    getCurrentTime: state => () => state.currentTime,
    getSeekProgress: state => () => state.seekProgress,
  },
  mutations: {
    GET_AUDIO(state, audio) {
      state.audio = audio;
    },
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
      localStorage.setItem(QUEUE_KEY, JSON.stringify(state.myQueue));
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
      state.autoPlay = autoPlay;
    },
    REMOVE_QUEUE(state) {
      localStorage.removeItem(process.env.QUEUE_KEY);
      state.myQueue = [];
    },
    SET_AUDIO_DURATION(state) {
      state.audioDuration = state.audio.duration;
    },
    CURRENT_AUDIO_TIME(state, payload) {
      if (payload) {
        state.audio.currentTime = payload;
        state.currentTime = payload;
      }
      state.currentTime = state.audio.currentTime;
      state.seekProgress = `${(((state.currentTime / state.audioDuration) * 100))}%`
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
    autoPlay: ({commit, state}) => {
      if (state.autoPlay === true) {
        commit('NEXT_SONG');
      }
    },
    updateSeek: ({ commit }, payload) => {
      commit('CURRENT_AUDIO_TIME', payload);
    },
  },
});
