const QUEUE_KEY = process.env.QUEUE_KEY;

export const GET_AUDIO = (state, audio) => {
  state.audio = audio;
};

export const PLAY_SONG = (state, payload) => {
  state.isPlaying = true;
  state.isPaused = false;
  state.selectedSong = payload.filteredSong;
  state.currentIndexSongQueue = payload.index;
  state.audio.addEventListener('loadeddata', () => {
    state.audio.play();
  });
};

export const PAUSE_SONG = (state) => {
  state.isPlaying = false;
  state.isPaused = true;
  state.audio.pause();
};

export const QUEUE_SONG = (state, selectedSong) => {
  state.myQueue.push(selectedSong);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(state.myQueue));
};

export const NEXT_SONG = (state) => {
  if (state.currentIndexSongQueue >= (state.mainQueue.length - 1) && state.autoPlay) {
    state.selectedSong = state.mainQueue[0];
    state.currentIndexSongQueue = 0;
  } else {
    const nextSong = state.mainQueue[state.currentIndexSongQueue + 1];
    state.selectedSong = nextSong;
    state.currentIndexSongQueue = state.mainQueue.indexOf(nextSong);
  }
};

export const PREV_SONG = (state) => {
  if (state.currentIndexSongQueue <= (state.mainQueue.length - 1) && state.autoPlay) {
    const lastSong = state.mainQueue.length - 1;
    state.selectedSong = state.mainQueue[lastSong];
    state.currentIndexSongQueue = lastSong;
  } else {
    const prevSong = state.mainQueue[state.currentIndexSongQueue - 1];
    state.selectedSong = prevSong;
    state.currentIndexSongQueue = state.mainQueue.indexOf(prevSong);
  }
};

export const AUTO_PLAY = (state, autoPlay) => {
  state.autoPlay = autoPlay;
};

export const REMOVE_QUEUE = (state) => {
  localStorage.removeItem(QUEUE_KEY);
  state.myQueue = [];
};

export const SET_AUDIO_DURATION = (state) => {
  state.audioDuration = state.audio.duration;
};

export const CURRENT_AUDIO_TIME = (state, payload) => {
  if (payload) {
    state.audio.currentTime = payload;
    state.currentTime = payload;
  }
  state.currentTime = state.audio.currentTime;
  state.seekProgress = `${(((state.currentTime / state.audioDuration) * 100))}%`;
};
