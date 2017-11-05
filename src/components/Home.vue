<template>
  <div class="app-Home">
    <h1>Bienvenido</h1>
    <template v-if="$store.state.myQueue.length">
      <router-link to="/queue">
        <div class="app-QueueShortcut">
          <p>Mi cola de reproducción actual</p>
        </div>
      </router-link>
    </template>
    <p v-else>Para crear una cola de reproducción, usa el buscador y añade tus canciones favoritas.</p>
  </div>
</template>
<script>
export default {
  name: 'app-home',
};
</script>
<style lang="scss">
.app-Home {
  width: 90%;
  margin: 0 auto;
}
</style>
