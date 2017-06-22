<template>
  <div class="app-Player">
    <div v-if="$store.state.isPlaying || $store.state.isPaused" class="app-Player_ProgressBar">
      <input type="range"
             class="app-ProgressBar_Range"
             min="0"
             :max="$store.state.audio.duration"
             v-model="$store.state.audio.currentTime">
      <span ref="songProgress" class="app-Player_CurrentProgress"></span>
    </div>
    <div class="wrapper" v-cloak>
      <div class="app-Player_AlbumCover" v-show="$store.state.isPlaying || $store.state.isPaused">
        <!-- TODO: Clean this ternary -->
        <img :src="songData.artwork ? songData.artwork : 'http://www.langitmusik.co.id/images/now_playing.jpg'" :alt="songData.artist">
        {{songData.artwork}}
      </div>
      <div class="app-Player_CurrentSong">
        <p class="app-Player_SongName">{{songData.title}}</p>
        <small class="app-Player_SongDetails">
          <router-link :to="{ name: 'user', params: {userId: $store.state.selectedSong.ownerId }}">{{songData.artist}}</router-link>
        </small>
      </div>
    </div>
    <player-controls></player-controls>
    <div class="app-Player_SongTimer">
      <small>{{currentTime | humanizeTime}}/{{$store.state.audioDuration | humanizeTime}}</small>
    </div>
    <audio id="playerId" ref="audiofile" :src="songData.stream" preload="auto" style="display:none;"></audio>
  </div>
</template>

<script>
import PlayerControls from '@/components/player/PlayerControls';

export default {
  name: 'player-bar',
  props: {
    songData: {
      type: Object,
      default() {
        return {
          title: '',
          artwork: '',
          artist: '',
          stream: '',
        };
      },
    },
  },
  data() {
    return {
      loaded: false,
      currentTime: 0,
    };
  },
  methods: {
    manageAudioLoad() {
      if (this.$store.state.audio.readyState >= 2) {
        this.loaded = true;
        this.$store.state.audioDuration = this.$store.state.audio.duration;
      }
    },
    currentAudioTime() {
      this.currentTime = this.$store.state.audio.currentTime;
      this.$refs.songProgress.setAttribute('style', `width: ${(((this.currentTime / this.$store.state.audioDuration) * 100) + 0.3)}%`);
    },
  },
  mounted() {
    this.$store.state.audio = this.$el.querySelectorAll('audio')[0];
    this.$store.state.audio.addEventListener('loadeddata', this.manageAudioLoad);
    this.$store.state.audio.addEventListener('timeupdate', this.currentAudioTime);
  },
  components: {
    PlayerControls,
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex: 1;
}

.app-Player {
  display: flex;
  background: white;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0;
}

.app-Player_AlbumCover {
  width: 90px;
  height: 90px;
  margin-right: 1em;

  img {
    width: 100%;
    min-width: 90px;
  }
}

.app-Player_CurrentSong {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app-Player_SongDetails {
  color: #555;
}

.app-Player_SongName {
  margin: 0;
  margin-bottom: .5em;
}

.app-Player_SongTimer {
  margin: 1em;
}

.app-Player_ProgressBar {
  background: #bbb;
  height: 3px;
  width: 100%;
  position: absolute;
  margin-left: 90px;

  &:hover {
    .app-ProgressBar_Range {
      opacity: 1;
    }
  }
}

.app-ProgressBar_Range {
  width: 100%;
  position: absolute;
  top: -2px;
  height: 3px;
  -webkit-appearance: none;
  z-index: 1;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  transition: opacity 200ms linear;

  &:focus {
    outline: none;
  }
}

.app-Player_CurrentProgress {
  min-width: 1%;
  position: absolute;
  top: 0;
  background: #ff814a;
  height: 3px;
  appeareance: none;
}
</style>
