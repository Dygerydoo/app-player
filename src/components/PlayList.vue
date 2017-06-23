<template>
  <div class="app-Queue">
    <song-list :list-content="$store.state.myQueue"></song-list>
  </div>
</template>
<script>
import SongList from '@/components/common/SongList';

export default {
  name: '',
  data: function data() {
    return {

    };
  },
  components: {
    SongList,
  },
};
</script>
<style lang="scss">
.app-Queue {
  width: 90%;
  margin: 0 auto;
}
</style>
