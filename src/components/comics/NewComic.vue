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
                    <label for="name">Nombre del comic:</label>
                    <input type="text" name="name" id="name" class="form-control" placeholder="Nombre del comic" required autofocus v-model="name">
                  </div>
                  <div class="form-group">
                    <label for="year">Año del comic:</label>
                    <input type="text" name="year" id="year" class="form-control" placeholder="Año del comic" required autofocus v-model="year">
                  </div>
                  <div class="form-group">
                    <label for="number">Número del comic:</label>
                    <input type="text" name="number" id="number" class="form-control" placeholder="Número del comic" required autofocus v-model="number">
                  </div>
                  <div class="form-group">
                    <label for="autor">autor del comic:</label>
                    <input type="text" name="autor" id="autor" class="form-control" placeholder="autor del comic" required autofocus v-model="autor">
                  </div>
                  <div class="form-group">
                    <label for="company">Compañia:</label>
                    <input type="text" name="company" id="company" class="form-control" placeholder="Compañia" required autofocus v-model="company">
                  </div>
                </div>
                <div class="col-sm-12 col-md-5 m-2">
                   <div class="form-group">
                    <label for="tag">Protagonista del comic:</label>
                    <input type="text" name="tag" id="tag" class="form-control" placeholder="ejem Batman..." required autofocus v-model="tag">
                  </div>
                  <div class="form-group">
                    <label for="description">descipción del comic:</label>
                    <textarea rows="5" cols="30" class="form-control" id="descripcion" placeholder="..." required v-model="description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="frontpage">Portada:</label>
                     <input type="file"  accept="image/*" @change="detectFilesIMG($event.target.files)">
                  </div>
                  <div class="form-group">
                   <label for="viewComic">Comic:</label>
                  <input type="file"  accept="pdf/*" @change="detectFilesPDF($event.target.files)">
                   <div class="dropdown-divider"></div>
                  <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div>
                  </div>
                  <button type="submit" @click="addPhotoComic" class="btn btn-login">Enviar</button>
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
      urlPortada: this.urlPortada,
      urlPDF: this.urlPDF,

      newComic: {
        photo: "",
        pdf: ""
      },

      errorMsg: "",
      successMsg: "",
      comic: [],
      frontpage: "",
      name: "",
      year: "",
      number: "",
      description: "",
      autor: "",
      company: "",
      tag: "",
      slug: "",
      viewComic: ""
    };
  },
  methods: {
    detectFilesIMG(fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadImg(fileList[x]);
      });
    },
    detectFilesPDF(fileList) {
      Array.from(Array(fileList.length).keys()).map(x => {
        this.uploadPDF(fileList[x]);
      });
    },
    uploadImg(file) {
      let randomInt = Math.floor(Math.random() * 100 + 1);
      let fileName = randomInt + "_" + this.file.name;

      this.uploadTask = storage.ref("comics/portada" + fileName).put(file);

      this.uploadTask.then(snapshot => {
        //this.downloadURL = this.uploadTask.snapshot.downloadURL;
        this.$emit("url", this.downloadURL);
        this.newComic.photo = this.uploadTask.snapshot.downloadURL;
        this.urlPortada = this.newComic.photo;

        var pathReference = storage.ref("comics/fotos/" + fileName);

        db
          .ref("comics")
          .push(this.newComic)
          .then(() => {
            this.sending = false;
            this.imageData = "";
            this.progressUpload = 0;

            this.newComic = {
              photo: ""
            };
          });
      });
      return this.urlPortada;
    },
    uploadPDF(file) {
      let randomInt = Math.floor(Math.random() * 100 + 1);
      let fileName = randomInt + "_" + this.file.name;

      this.uploadTask = storage.ref("comics/pdf/" + fileName).put(file);

      this.uploadTask.then(snapshot => {
        //this.downloadURL = this.uploadTask.snapshot.downloadURL;
        this.$emit("url", this.downloadURL);
        this.newComic.pdf = this.uploadTask.snapshot.downloadURL;
        this.urlPDF = this.newComic.pdf;

        var pathReference = storage.ref("comics/pdf" + fileName);
        db
          .ref("comics")
          .push(this.newComic)
          .then(() => {
            this.sending = false;
            this.imageData = "";
            this.progressUpload = 0;

            this.newComic = {
              pdf: ""
            };
          });
      });
      return this.urlPDF;
    },
    addPhotoComic: function(e) {
      e.preventDefault();
      try {
        let query = `
          mutation {
            addComic (
              frontpage: "${this.urlPortada}",
              name: "${this.name}",
              year: "${this.year}",
              number: "${this.number}",
              description: "${this.description}",
              autor: "${this.autor}",
              company: "${this.company}",
              tag: "${this.tag}",
              slug: "${this.name}-${this.number}-${this.year}",
              viewComic: "${this.urlPDF}"
            ) {
              _id
              frontpage
              name
              year
              number
              description
              autor
              company
              tag
              slug
              viewComic
            }
          }
        `;
        const res = this.$graphql.request(query).then(res => {
          this.comic = res.comics;
          this.successMsg = "El comic se añadio a la base de datos";
        });
        setTimeout(
          function() {
            this.$router.replace("comics");
          }.bind(this),
          2000
        );
      } catch (err) {
        this.errorMsg = err.message;
      }
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
  }
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
.header {
display: inherit !important;
}
.progress-bar {
  margin: 10px 0;
}
</style>


  