<template>
  <article class="app-UserProfile" v-cloak>
    <figure class="app-UserProfile_Avatar">
      <img :src="$store.state.ownerUser.avatar_url" :alt="$store.state.ownerUser.username">
    </figure>
    <div class="app-UserProfile_Content">
      <div class="app-UserProfile_Bio">
        <p class="app-UserProfile_UserName">
          <strong>{{$store.state.ownerUser.full_name}}</strong>
          <small>@{{$store.state.ownerUser.username}}</small>
        </p>
        <p class="app-UserProfile_Location">
          <small>{{$store.state.ownerUser.city}}, {{$store.state.ownerUser.country}}</small>
        </p>
      </div>
      <p class="app-UserProfile_Description">{{$store.state.ownerUser.description}}</p>
    </div>
  </article>
</template>

<script>
import { fetchUser } from '@/api';

export default {
  name: '',
  data: function data() {
    return {
      errors: [],
    };
  },
  watch: {
    $route: 'fetchUserData',
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      fetchUser(this.$route.params.userId).then((response) => {
        this.$store.state.ownerUser = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
    },
  },
};
</script>
<style lang="scss">
.app-UserProfile {
  display: flex;
  background: white;
  border: 1px solid #ddd;
  width: 60%;
  margin: 1em auto;
  padding: 1em;
  border-radius: 2px;
}

.app-UserProfile_Avatar {
  margin: 0;
  margin-right: 1em;
}

.app-UserProfile_UserName {
  margin: .3em 0;
}

.app-UserProfile_Location {
  margin: 0;
  color: #888;
}
</style>
