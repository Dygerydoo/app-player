import Vue from 'vue';
import Router from 'vue-router';
import UserProfile from '@/components/UserProfile/UserProfile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: UserProfile,
    },
  ],
});
