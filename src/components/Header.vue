<template>
  <header class="container-fluid  no-padding-lr">
    <nav id="menu" class="navbar navbar-expand-lg navbar-light bg-color-header">
      <router-link :to="{name:'home'}"><img src="../assets/images/logo.png" class="img-fluid img-logo mt-2"></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ml-3 pl-1 pr-1 active nav-btn" id="">
             <router-link :to="{name:'home'}"><a class="nav-link"><i class="fa fa-user"></i>Mi perfil</a></router-link>
          </li>
          <li class="nav-item pl-1 pr-1 nav-btn " id="">
            <router-link :to="{name:'comics'}"><a class="nav-link"><i class="fa fa-leanpub"></i>Comics</a></router-link>
          </li>
          <li class="nav-item pl-1 pr-1 nav-btn " id="">
            <router-link :to="{name:'comicsdc'}"><a class="nav-link">DC Comics</a></router-link>
          </li>
          <li class="nav-item pl-1 pr-1 nav-btn " id="">
            <router-link :to="{name:'comicmarvel'}"><a class="nav-link">Marvel Comics</a></router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
           <li class="nav-item pl-1 pr-1 nav-btn active" v-if="user.role==='admin'" id="">
             <router-link :to="{name:'newcomic'}"><a class="nav-link"><i class="fa fa-plus-circle"></i>Añadir comic</a></router-link>
          </li>
          <li class="nav-item pl-3 pr-3 nav-btn">
            <a class="nav-link" @click="logout"><i class="fa fa-unlock"></i>Salir</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>

import { auth } from "../firebase";
import { db } from "../firebase";
export default {
  data() {
    return {
      userId: auth.currentUser.uid,
      user: {}
    };
  },
  created: function() {
    db.ref("users/" + auth.currentUser.uid).on(
      "value",
      snapshot => {
        this.user = snapshot.val();
        console.log("soy rol de admin :" + user.role);
        return this.user;
      },
      function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
  },
  currentUserId: function() {
    if (auth.currentUser) {
      console.debug(auth.currentUser.uid);
      return auth.currentUser.uid;
    } else {
      return null;
    }
  },

  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace("/login-email");
      });
    }
  }
};
</script>


<style>
.fa {
  margin-right: 5px;
}
.no-padding-lr {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.img-logo {
  width: 250px;
}
.bg-color-header {
  /*background-color: #2a2a2a;*/
  background-color: #454545;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  /* border-bottom: #232323 1px solid; */
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
}

.nav-link {
  color: #dedede !important;
  margin-top: 8px;
  padding-bottom: 15px;
}

.nav-link:hover {
  color: #343434 !important;
}

.nav-link:focus {
  color: #0e0e0e !important;
}

.nav-btn {
  color: #dedede;
  margin-top: 5px !important;
}

.nav-btn:hover {
  background-color: #dedede;
  color: #0e0e0e;
  border: #232323 1px solid;
  border-radius: 10px 10px 0px 0px;
  -moz-border-radius: 10px 10px 0px 0px;
  -webkit-border-radius: 10px 10px 0px 0px;
}

.active {
  background-color: #222222;
  color: #454545;
  border: #dedede 1px solid;
  border-radius: 10px 10px 0px 0px;
  -moz-border-radius: 10px 10px 0px 0px;
  -webkit-border-radius: 10px 10px 0px 0px;
}
</style>

