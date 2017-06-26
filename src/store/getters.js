export const autoPlay = state => () => state.autoPlay;
export const filterQueued = state => songId => state.myQueue.some(song => song.id === songId);
export const getAudioDuration = state => () => state.audioDuration;
export const getCurrentTime = state => () => state.currentTime;
export const getSeekProgress = state => () => state.seekProgress;
/* eslint-disable */
export const filterSongById = state => (listToFilter, songId) => state[listToFilter].find(song => song.id === songId);
