<template>
  <div class="app-PlayerBar">
    <div class="wrapper">
      <div class="app-PlayerBar_AlbumCover">
        <img src="https://lh3.googleusercontent.com/I15JehkCt1tBXHZBcUUfoUMeUxFPl3nCywWy87L4mYKWuSEpLS-FzEptzhIVNkPbq-J0Qjjt=s90-c-e100" alt="Dada">
      </div>
      <div class="app-PlayerBar_CurrentSong">
        <p class="app-PlayerBar_SongName">Stairway to heaven</p>
        <small class="app-PlayerBar_SongDetails">Led Zeppelin - Mothership(Remastered)</small>
      </div>
    </div>
    <player-controls></player-controls>
    <div class="app-PlayerBar_SongTimer">
      <small>{{currentTime | humanizeTime}}/{{$store.state.audioDuration | humanizeTime}}</small>
    </div>
    <audio id="playerId" ref="audiofile" src="http://vocaroo.com/media_command.php?media=s1StrCqnzQT6&command=download_mp3" preload="auto" style="display:none;"></audio>
  </div>
</template>

<script>
import PlayerControls from '@/components/PlayerControls';

export default {
  name: 'player-bar',
  props: {
    file: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loaded: false,
      currentTime: '',
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

<style scoped>
.wrapper {
  display: flex;
  flex: 1;
}
.app-PlayerBar {
  display: flex;
  background: white;
  box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0;
}

.app-PlayerBar_AlbumCover {
  margin-right: 1em;
}

.app-PlayerBar_CurrentSong {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.app-PlayerBar_SongDetails {
  color: #555;
}

.app-PlayerBar_SongName {
  margin: 0;
  margin-bottom: .5em;
}

.app-PlayerBar_SongTimer {
  margin: 1em;
}
</style>
