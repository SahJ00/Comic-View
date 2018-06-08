<template>
<div class="container bg-main-container">
  <div class="row">
    <div class="col-md-12 mt-3">
      <div class="row">
        <div class="col-md-6 mb-2">
          <img v-bind:src="comics.frontpage" alt="portadas de comic" class="img fluid m-2">
        </div>
        <div class="col-md-6 mb-2">
          <h3>{{ comics.name }}</h3>
          <h5>
            <p class="m-2"> <span>Numero:</span> #{{ comics.number }} </p>
            <p class="m-2"> <span>Año:</span> {{ comics.year }} </p>
            <p class="m-2"> <span>Autor:</span> {{ comics.autor }} </p>
            <p class="m-2"> <span>Compañía:</span> {{ comics.company }} </p>
            <p class="m-2"> <span>Descripción:</span></p>
          </h5>
            {{ comics.description }}
            <br>
        <div class="btn-group" role="group">
				<button @click="favorites" class="btn btn-outline-favorites" type="button">
					<i class="fa fa-star"></i>Favoritos
				</button> 
				<button @click="read" class="btn btn-outline-read" type="button">
					<i class="fa fa-bookmark"></i>Leidos
				</button> 
				<button @click="pendingReading" class="btn btn-outline-readPending" type="button">
					<i class="fa fa-book"></i>Pendientes 
				</button> 
			</div>
      <div class="btn-group" role="group" v-if="user.role==='admin'">
				<button @click="deleteComic" class="btn btn-outline-delete" type="button">
					<i class="fa fa-trash"></i>
				</button> 
			</div>
      <div class="btn-group" role="group" v-if="user.role==='admin'">
      	<!-- <router-link :to= "{name: 'modificarcomic', params: {id: comic._id}}"><button class="btn btn-outline-modif" type="button">
					<i class="fa fa-edit"></i>
				</button></router-link> -->
      </div>
        </div>
      </div>
        <!-- <pdf v-bind:src="comics.viewComic"></pdf> -->
      <!-- <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
  <i class="fa fa-eye"></i>Leer comic
</button> -->

      <div class="dropdown-divider"></div>
      <button type="button" class="btn btn-outline-primary mb-2 mt-3">
        <i class="fa fa-eye"></i><a v-bind:href="comics.viewComic" target="_blank">Leer comic</a>
      </button>
          <!-- <div class="modal" tabindex="-1" role="dialog" id="exampleModal">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{{ comics.name }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <pdf v-bind:src="comics.viewComic" @num-pages="pageCount = $event" @page-loaded="currentPage = $event"></pdf>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

</template>

<script>
import pdf from "vue-pdf";
import { db } from "../../firebase";
import { auth } from "../../firebase";

export default {
  data() {
    return {
      comics: [],
      currentPage: 0,
      pageCount: 0,
      userId: auth.currentUser.uid,
      user: {}
    };
  },
  created: function() {
    this.getComics();
    db.ref("users/" + auth.currentUser.uid).on(
      "value",
      snapshot => {
        this.user = snapshot.val();
        return this.user;
      },
      function(errorObject) {}
    );
  },
  methods: {
    deleteComic: function(comic) {
      var option = confirm("¿Seguro que quieres eliminar este comic?");
      if ((option = true)) {
        try {
          const res = this.$graphql
            .request(
              `
             mutation  {
    deleteComic (_id:"${this.id}") {
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
        `
            )
            .then(res => {
              this.comics = res.comic;
            });
        } catch (err) {
          // do something with the error
        }
      }
      setTimeout(
        function() {
          this.$router.replace("/comics");
        }.bind(this),
        2000
      );
    },
    favorites: function(comics) {
      db
        .ref("users/" + auth.currentUser.uid + "/favorites")
        .child(this.comics._id)
        .set(true);
    },
    read: function(comics) {
      db
        .ref("users/" + auth.currentUser.uid + "/read")
        .child(this.id)
        .set(true);
    },
    pendingReading: function(comics) {
      db
        .ref("users/" + auth.currentUser.uid + "/pendingReading")
        .child(this.id)
        .set(true);
    },
    getComics() {
      try {
        const res = this.$graphql
          .request(
            `
             {
    comic (_id:"${this.id}") {
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
        `
          )
          .then(res => {
            this.comics = res.comic;
          });
      } catch (err) {
        // do something with the error
      }
    }
  },
  props: ["id"],
  components: {
    pdf
  }
};
</script>

<style>
.btn-outline-favorites {
  color: #ffc300;
  border: #ffc300 1px solid;
  transition: background-color 2s, color 2s, border 2s;
}

.btn-outline-favorites:hover {
  background-color: #ffc300;
  color: #0e0e0e;
  border: #232323 1px solid;
}

.btn-outline-read {
  color: #84e000;
  border: #84e000 1px solid;
  transition: background-color 2s, color 2s, border 2s;
}

.btn-outline-read:hover {
  background-color: #84e000;
  color: #0e0e0e;
  border: #232323 1px solid;
}

.btn-outline-readPending {
  color: #00bbe0;
  border: #00bbe0 1px solid;
  transition: background-color 2s, color 2s, border 2s;
}

.btn-outline-readPending:hover {
  background-color: #00bbe0;
  color: #0e0e0e;
  border: #232323 1px solid;
}

.btn-outline-delete {
  color: #e72a04;
  border: #e72a04 1px solid;
  transition: background-color 2s, color 2s, border 2s;
}

.btn-outline-delete:hover {
  background-color: #e72a04;
  color: #0e0e0e;
  border: #232323 1px solid;
}

.btn-outline-modif {
  color: #232323;
  border: #909090 1px solid;
  transition: background-color 2s, color 2s, border 2s;
}

.btn-outline-modif:hover {
  background-color: #A0A0A0;
  color: #0e0e0e;
  border: #232323 1px solid;
}

h3 {
  font-family: "Anton", sans-serif;
  font-weight: bold;
  font-size: 34px;
}

.modal-title {
  font-family: "Anton", sans-serif;
  font-weight: bold;
  font-size: 26px;
  color: #2c3e50 !important;
}

h5 p {
  font-family: "Slabo 27px", serif;
  font-weight: 400;
  font-size: 18px;
  color: #2c3e50 !important;
}

.bg-main-container {
  background-color: #e9e9e9;
  border-left: 2px solid #b2b2b2;
  border-right: 2px solid #b2b2b2;
}
.header {
  display: inherit !important;
}

span {
  font-weight: bold;
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
canvas {
  width: 100% !important;
}

.modal-backdrop {
  z-index: 0 !important;
}
</style>


