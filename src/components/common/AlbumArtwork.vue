<template>
  <div class="app-Avatar" :style="`width: ${size}px; height: ${size}px`">
    <img :src="hasImage" :alt="alt">
  </div>
</template>
<script>
export default {
  name: 'album-artwork',
  props: {
    size: {
      type: Number,
      default: 45,
    },
    src: {
      required: true,
    },
    alt: {
      required: true,
    },
  },
  computed: {
    hasImage() {
      if (this.src === null) {
        return 'http://www.langitmusik.co.id/images/now_playing.jpg';
      }
      return this.src;
    },
  },
};
</script>
<style lang="scss">

.app-Avatar {
  margin-right: 1em;

  img {
    width: 100%;
  }
}
</style>
