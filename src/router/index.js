import Vue from 'vue';
import Router from 'vue-router';
import UserProfile from '@/components/UserProfile/UserProfile';
import PlayList from '@/components/PlayList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: UserProfile,
    },
    {
      path: '/queue',
      name: 'queue',
      component: PlayList,
    },
  ],
});
