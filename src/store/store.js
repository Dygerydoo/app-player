import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';


const storagePlaylist = {
  fetch() {
    return JSON.parse(localStorage.getItem(process.env.QUEUE_KEY) || '[]');
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
  getters,
  mutations,
  actions,
});
