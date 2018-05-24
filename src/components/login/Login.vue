<template >
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="bg-image img-fluid no-padding">
          <div class="container bg-container">
            <form>
            <div class="form-group text-center">
              <button class="btn btn-lg btn-google">
                <i class="fa fa-google"></i>
                Conectate con Google
                </button>
              </div>
              <div class="form-group text-center">
                <router-link :to="{name:'login-email'}"><button class="btn btn-lg btn-email">
                  <i class="fa fa-envelope-square"></i>
                   Conectate con Email
                </button></router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /container fluid -->
</template>

<script>
import { auth } from "../../firebase";
import firebase from "firebase";
import firebaseui from "firebaseui";

export default {
  data() {
    return {};
  },
  methods: {}
};
</script>


<style>



.no-padding {
  padding: 0px !important;
}

.bg-container {
  background-color: rgb(200, 200, 200, 0.9);
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 5px solid #4a4a4a;
  margin-top: 10% !important;
  max-width: 600px !important;
  padding: 20px !important;
}

.btn-google {
  background-color: #dd4b39;
  transition: 0.5s ease-out;
}

.btn-google:hover {
  background-color: #ee330b;
  color: white;
  border: 3px solid #cc300f;
  border-radius: 10px;
}

.btn-email {
  background-color: #e3dedd;
  transition: 0.5s ease-out;
}

.btn-email:hover {
  background-color: #f7f7f7;
  color: #cc300f;
  border: 3px solid #cc300f;
  border-radius: 10px;
}

.new-user {
  color: #4a4a4a;
}

.new-user:hover {
  color: #232323;
}

.reset-password {
  color: #4a4a4a;
}

.reset-password:hover {
  color: #232323;
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

</style>
