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
        <album-artwork :src="songData.artwork" :alt="songData.artist" :size="90"></album-artwork>
      </div>
      <div class="app-Player_CurrentSong">
        <p class="app-Player_SongName">{{songData.title}}</p>
        <small class="app-Player_SongDetails">
          <router-link :to="{ name: 'user', params: {userId: songData.ownerId }}">{{songData.artist}}</router-link>
        </small>
      </div>
    </div>
    <player-controls></player-controls>
    <nav class="app-Player_Utilities">
      <router-link to="/queue"><i class="material-icons">view_list</i></router-link>
    </nav>
    <div class="app-Player_SongTimer">
      <small>{{currentTime | humanizeTime}}/{{$store.state.audioDuration | humanizeTime}}</small>
    </div>
    <audio id="playerId" ref="audiofile" :src="songData.stream" preload="auto" style="display:none;"></audio>
  </div>
</template>

<script>
import PlayerControls from '@/components/player/PlayerControls';
import AlbumArtwork from '@/components/common/AlbumArtwork';

export default {
  name: 'player-bar',
  props: {
    songData: {
      type: Object,
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
      this.$refs.songProgress.setAttribute('style', `width: ${(((this.currentTime / this.$store.state.audioDuration) * 100))}%`);
    },
    autoPlay() {
      if (this.$store.state.autoPlay) {
        this.$store.commit('NEXT_SONG');
      }
    },
  },
  mounted() {
    this.$store.state.audio = this.$el.querySelectorAll('audio')[0];
    this.$store.state.audio.addEventListener('loadeddata', this.manageAudioLoad);
    this.$store.state.audio.addEventListener('timeupdate', this.currentAudioTime);
    this.$store.state.audio.addEventListener('ended', this.autoPlay);
  },
  components: {
    PlayerControls,
    AlbumArtwork,
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/stylesheets/foundation/config';
@import '~@/assets/stylesheets/foundation/helpers';

.wrapper {
  display: flex;
  flex: 1;
}

.app-Player {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  background: $white;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.15);
}

.app-Player_Utilities {
  display: flex;
  align-items: center;
  margin-right: 1em;
  margin-left: auto;
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
  width: 60%;
  min-width: 250px;
  max-width: 250px;
}

.app-Player_SongDetails {
  color: $grey-medium;
}

.app-Player_SongName {
  @include ellipsis;
  margin: 0;
  margin-bottom: .5em;
}

.app-Player_SongTimer {
  align-self: center;
  margin: 1em;
}

.app-Player_ProgressBar {
  position: absolute;
  width: calc(100% - 90px);
  height: 5px;
  margin-left: 90px;
  background: $grey-light;

  &:hover {
    .app-ProgressBar_Range {
      opacity: 1;
    }
  }
}

.app-ProgressBar_Range {
  cursor: pointer;
  position: absolute;
  top: -2px;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 5px;
  background: transparent;
  opacity: 0;
  transition: opacity 200ms linear;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
}

.app-Player_CurrentProgress {
  appearance: none;
  position: absolute;
  top: 0;
  height: 5px;
  background: $color-primary;
}
</style>
