// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueFire from 'vuefire';
import router from './router';
import {
  auth
} from './firebase';
import graphql from './graphql';







router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser;
  let isLogin = to.matched.some(record => record.name === "login");
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("login");
  } else if (currentUser && isLogin) {
    next("admin");
  } else {
    next();
  }
})




Vue.config.productionTip = false

/* eslint-disable no-new */

let app;
auth.onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      graphql,
      components: {
        App
      },
      template: '<App/>'
    })
  }
});
