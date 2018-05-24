<template>
   <div class="container bg-main-container">
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <div class="bg-image img-fluid no-padding">
          <div class="">
            <form>
              <div class="row">
                <div class="col-ms-12 col-md-5 m-2">
                  <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" name="name" id="name" class="form-control" placeholder="Nombre del comic" required autofocus v-model="name">
                  </div>
                </div>
                <div class="col-sm-12 col-md-5 m-2">
                  <div class="form-group">
                    <label for="frontpage">Imagen de perfil</label>
                     <input type="file"  accept="image/*" @change="detectFilesIMG($event.target.files)">
                  </div>
                   <button type="submit" @click="profileChange" class="btn btn-outline-primary">Guardar cambios</button>
                   <router-link :to= "{name: 'home'}"><button class="btn btn-outline-primary">Volver</button></router-link>
                </div>
             </div>
            </form>
            <div class="dropdown-divider"></div>
            <br>
            <span v-if="successMsg !== ''" class="text-success">{{ successMsg }}</span>
            <span v-if="errorMsg !== ''" class="text-danger">{{ errorMsg }}</span>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /container -->
</template>

<script>
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { storage } from "../../firebase";
export default {
  data() {
    return {
      progressUpload: 0,
      file: File,
      uploadTask: "",
      downloadURL: "",
      currentFile: null,
      urlProfile: this.urlProfile,
      name: "",
      errorMsg: "",
      successMsg: ""
    };
  },
  currentUserId: function() {
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      return null;
    }
  },
  methods: {
    detectFilesIMG(fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadImg(fileList[x]);
      });
    },
    uploadImg(file) {
      let randomInt = Math.floor(Math.random() * 100 + 1);
      let fileName = randomInt + "_" + this.file.name;

      this.uploadTask = storage.ref("users/profile" + fileName).put(file);

      this.uploadTask.then(snapshot => {
        //this.downloadURL = this.uploadTask.snapshot.downloadURL;
        this.$emit("url", this.downloadURL);
        this.newProfile = this.uploadTask.snapshot.downloadURL;
        this.urlProfile = this.newProfile;

        var pathReference = storage.ref(
          "users/" + auth.currentUser.uid + "/profile/" + fileName
        );

        db.ref("users/" + auth.currentUser.uid).update({
          imgProfile: this.newProfile
        });
      });
      return this.urlProfile;
    },
    profileChange: function(e) {
      e.preventDefault();
      db.ref("users/" + auth.currentUser.uid).update({
        userName: this.name
      });
      setTimeout(
        function() {
          this.$router.replace("/home");
        }.bind(this),
        2000
      );
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on("state_changed", sp => {
        this.progressUpload = Math.floor(
          sp.bytesTransferred / sp.totalBytes * 100
        );
      });
    }
  },
  props: ["id"]
};
</script>

<style>
.bg-main-container {
  background-color: #e9e9e9;
  border-left: 2px solid #b2b2b2;
  border-right: 2px solid #b2b2b2;
}

label {
  font-family: "Slabo 27px", serif;
  font-weight: bold;
  font-size: 22px;
}

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

.header {
  display: inherit !important;
}
.progress-bar {
  margin: 10px 0;
}
</style>


  