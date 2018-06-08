<template>
  <header class="container-fluid  no-padding-lr">
    <nav id="menu" class="navbar navbar-expand-lg navbar-light bg-color-header">
      <router-link :to="{name:'home'}"><img src="../assets/images/logo.png" class="img-fluid img-logo mt-2"></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li @click="activate(1)" :class="{ active : active_el == 1 }" class="nav-item ml-3 pl-1 pr-1 nav-btn" id="button">
             <router-link :to="{name:'home'}"><a class="nav-link"><i class="fa fa-user"></i>Mi perfil</a></router-link>
          </li>
          <li @click="activate(2)" :class="{ active : active_el == 2 }" class="nav-item pl-1 pr-1 nav-btn " id="button">
            <router-link :to="{name:'comics'}"><a class="nav-link"><i class="fa fa-leanpub"></i>Comics</a></router-link>
          </li>
          <li @click="activate(3)" :class="{ active : active_el == 3 }" class="nav-item pl-1 pr-1 nav-btn " id="button">
            <router-link :to="{name:'comicsdc'}"><a class="nav-link">DC Comics</a></router-link>
          </li>
          <li @click="activate(4)" :class="{ active : active_el == 4 }" class="nav-item pl-1 pr-1 nav-btn " id="button">
            <router-link :to="{name:'comicmarvel'}"><a class="nav-link">Marvel Comics</a></router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
           <li @click="activate(5)" :class="{ active : active_el == 5 }" class="nav-item pl-1 pr-1 nav-btn" v-if="user.role==='admin'" id="button">
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
      active_el: 1,
      userId: auth.currentUser.uid,
      user: {}
    };
  },
  created: function() {
    // CHECK USER
    db.ref("users/" + auth.currentUser.uid).on(
      "value",
      snapshot => {
        this.user = snapshot.val();
        return this.user;
      },
      function(errorObject) {}
    );
  },
  // CAPTURE UID USER
  currentUserId: function() {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      return null;
    }
  },

  methods: {
    // ADD ACTIVE CLASS IN NAVBAR
    activate: function(el) {
      this.active_el = el;
    },
    // LOGOUT
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
  background-color: #454545;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
}

.nav-link {
  color: #dedede !important;
  margin-top: 8px;
  padding-bottom: 15px;
  transition: color 1s;
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
  transition: background-color 1s, color 1s, border 1s;
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

