export const playSong = ({ commit, getters }, payload) => {
  const filteredSong = getters.filterSongById(payload.listToFilter, payload.songId);
  commit('PLAY_SONG', { filteredSong, index: payload.index });
  commit('AUTO_PLAY', payload.autoPlay);
};

export const queueSong = ({ commit, getters }, payload) => {
  const filteredSong = getters.filterSongById(payload.listToFilter, payload.songId);
  const AlreadyQueued = getters.filterQueued(payload.songId);
  if (!AlreadyQueued) {
    commit('QUEUE_SONG', filteredSong);
  } else {
    alert('Ya ha sido añadida');
  }
};

export const autoPlay = ({ commit, state }) => {
  if (state.autoPlay === true) {
    commit('NEXT_SONG');
  }
};

export const updateSeek = ({ commit }, payload) => {
  commit('CURRENT_AUDIO_TIME', payload);
};
