<template>
  <div class="bg-imagen">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <div class="bg-image img-fluid no-padding">
            <div class="container bg-container animated pulse">
              <h3 class="text-center">Registro</h3>
              <br>
              <form @submit="createUser">
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input type="email" name="email" id="email" class="form-control" placeholder="Email" required autofocus v-model="email">
                </div>
                <div class="form-group">
                  <label for="password">Contraseña:</label>
                  <input type="password" name="password" id="password" class="form-control" placeholder="Password" required v-model="password">
                </div>
                <button type="submit" class="btn btn-login">Regístrate</button>
              </form>
              <div class="dropdown-divider"></div>
              <router-link :to="{name:'login-email'}"><a class=" new-user m-2 mr-3 ml-4">Volver</a></router-link>
              <br>
              <span v-if="errorMsg !== ''" class="text-danger">{{ errorMsg }}</span>
              <span v-if="successMsg !== ''" class="text-success">{{ successMsg }}</span>
            </div>
          </div>
        </div>
      </div>
    </div><!-- /container -->
  </div>
</template>

<script>
import { auth } from "../../firebase";
import { db } from "../../firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      successMsg: "",
      errorMsg: "",
      authUser: null
    };
  },
  methods: {
    createUser: function(e) {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          var userId = auth.currentUser.uid;
          db.ref("users/" + userId).set({
            id: auth.currentUser.uid,
            email: this.email,
            role: "user",
            userName: "",
            imgProfile: "",
          });
          this.successMsg = "New user created successfully!";
          this.errorMsg = "";

          setTimeout(
            function() {
              this.$router.replace("/login-email");
            }.bind(this),
         
          );
        })
        .catch(err => {
          this.errorMsg = err.message;
        });
      e.preventDefault();
    },

    created() {
      firebase.auth().onAuthStateChanged(user => {
        this.authUser = user;
      });
    }
  }
};
</script>


<style>
.bg-imagen {
  background-color: #464646;
  background-image: url("../../assets/images/backgroundComic.png");
  width: 100%;
  height: 637px!important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left top;
}
.no-padding {
  padding: 0px !important;
}

.bg-container {
  background-color: rgb(233,233,233, 0.9);
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 3px solid #b2b2b2;
  margin-top: 10% !important;
  max-width: 600px !important;
  padding: 20px !important;
}

.btn-login {
  color: #c8c8c8;
  background-color: #232323;
  border: 2px #4a4a4a solid;
  border-radius: 10px;
  transition: background-color 2s, border 2s;
}

.btn-login:hover {
  color: #c8c8c8;
  background-color: #4a4a4a;
  border: 2px #232323 solid;
  border-radius: 10px;
}

a {
  color: #232323
}

a:hover {
  color: #4a4a4a
}
</style>
