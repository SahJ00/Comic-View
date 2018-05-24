import Vue from 'vue'
import Router from 'vue-router'
import VueFire from 'vuefire'


import Login from '../components/login/Login'
import LoginEmail from '../components/login/Login-email'
import LoginRegister from '../components/login/Login-register'
import LoginResetPass from '../components/login/Login-reset-pass'
import Comics from '../components/comics/Comics'
import NewComic from '../components/comics/NewComic'
import Home from '../components/Home'
import ComicDetails from '../components/comics/ComicDetails'
import UserHome from '../components/user/User-home'
import UserProfile from '../components/user/User-profile'
import ComicFavorit from "../components/user/ComicFavorit"
import ComicDCComic from '../components/comics/ComicDC'
import ComicMarvel from '../components/comics/ComicMarvel'
import ModificarComic from '../components/comics/ModificarComic'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //{ path: '/', name:"principal", component: Login },
    { path: '/', name:"login-email", component: LoginEmail },
    { path: '/home', name: "home", component: Home},
    //{ path: '/login-email', name:"login-email", component: LoginEmail },
    { path: '/login-register', name:"register", component: LoginRegister },
    { path: '/login-reset-password', name:"reset-password", component: LoginResetPass },
    { path: '/comics', name: 'comics', component: Comics },
    { path: '/comics-dc-comic', name: 'comicsdc', component: ComicDCComic },
    { path: '/comics-marvel', name:'comicmarvel', component: ComicMarvel },
    { path: '/comic-details/:id', name: 'comic-details', component: ComicDetails, props: true },
    { path: '/modificar-comic/:id', name: 'modificarcomic', component: ModificarComic, props: true },
    { path: '/new-comic', name: 'newcomic', component: NewComic },
    { path: '/user-home', name:'user-home', component: UserHome },
    { path: '/user-profile/:id', name:'user-profile', component: UserProfile, props: true},
    { path: '*', redirect: '/' }

  ]
})
// router.beforeEach((to,from,next) => {
//   let currentUser = auth.currentUser;
//   let isLogin = to.matched.some( record => record.name === "login");
//   let requiresAuth = to.matched.some( record => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) {
//     next("login");
//   }else if(currentUser && isLogin){
//     next("admin");
//   }else{
//     next();
//   }
// })