import Vue from 'vue';
import Router from 'vue-router';

// Component list
import Home from '@/components/Home';
import UserProfile from '@/components/UserProfile/UserProfile';
import PlayList from '@/components/PlayList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
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
