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
  data() {
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
@import '~@/assets/stylesheets/foundation/config';
@import '~@/assets/stylesheets/foundation/helpers';

.app-UserProfile {
  width: 60%;
  padding: 1em;
  margin: 1em auto;
}

.app-UserProfileContainer {
  display: flex;
  padding: 1em;
  border: $border-default;
  border-radius: 2px;
  background: $white;
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
  color: $grey-medium;
}

.app-UserProfile_Description {
  padding-top: 1em;
  border-top: $border-default;
}
</style>
