<template>
  <div >
    <div class="row">
      <div class="col-md-12">
        <img v-if ="user.imgProfile !== ''" v-bind:src="user.imgProfile" alt="Imagen de perfil del usuario" class="rounded-circle img-fluid img-profile m-2" />
        <h3 class="m-2" v-if ="user.userName === ''">
          Bienvenid@ {{user.email}}.
        </h3>
        <h3 class="m-2" v-else>
          Bienvenid@ {{user.userName}}.
        </h3> 
        <router-link :to= "{name: 'user-profile', params: {id: userId}}"><button type="button" class="btn btn-outline-primary mb-2 mt-2">
          Modificar Perfil
        </button></router-link>
      </div>
	  </div>
  </div>
</template>

<script>
import { auth } from "../../firebase";
import { db } from "../../firebase";

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
        return this.user;
      },
      function(errorObject) {}
    );
  },

  currentUserId: function() {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      return null;
    }
  }
};
</script>


<style>
.btn-outline-primary {
  color: #454545;
  border: #454545 1px solid;
  transition: background-color 2s;
}

.btn-outline-primary:hover {
  background-color: #b2b2b2;
  color: #0e0e0e;
  border: #232323 1px solid;
}

.bg-main-container {
  background-color: #e9e9e9;
  border-left: 3px solid #b2b2b2;
  border-right: 3px solid #b2b2b2;
}

.img-profile {
  width: 250px;
  height: 250px;
}
</style>

