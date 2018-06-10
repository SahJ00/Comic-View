<template>
  <div>
    <div class="row">
 	    <div class="card-group pt-3 pb-2 col-sm-3 col-md-3 " v-for="comic in comics">
        <div class="card hvr-grow m-2">
          <router-link :to= "{name: 'comic-details', params: {id: comic._id}}"><img v-bind:src="comic.frontpage" alt="portadas de comic" class="img fluid card-img-top "></router-link>
          <div class="card-body">
            <h5 class="card-title text-center">
							{{ comic.name }}
						</h5>
            <p class="card-text"> <span>Numero:</span> #{{ comic.number }} </p>
            <p class="card-text"> <span>Compañia:</span> {{ comic.company }} </p>
            <div class="dropdown-divider"></div>
            <div class="btn-group" role="group">
				      <button @click="deleteComicFav" class="btn btn-outline-delete" type="button">
					      <i class="fa fa-trash"></i>Quitar Comic
				      </button> 
			      </div>
          </div>
        </div>
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
      comicFav: []
    };
  },
  created: function() {
    db.ref("users/" + auth.currentUser.uid + "/favorites").on(
      "value",
      snapshot => {
        let addComic = snapshot.val();
        for (var comic in addComic) {
          this.comicFav = comic;
          try {
            const res = this.$graphql
              .request(
                `
             {
  comic (_id:"${comic}") {
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
                this.comics.push(res.comic);
              });
            // this.comics = res.mycomics;
          } catch (err) {
            // do something with the error
          }
        }
      },
      function(errorObject) {}
    );
  },
  methods: {
    deleteComicFav: function(comic) {
      var option = confirm(
        "¿Seguro que quieres quitar este comic de la lista de favoritos?"
      );
      if (option === true) {
        db
          .ref("users/" + auth.currentUser.uid + "/favorites/" + this.comicFav)
          .remove();
        setTimeout("document.location.reload()", 1000);
      }
    }
  }
};
</script>


<style>
.bg-containe {
  background-color: #e9e9e9;
  border-left: 3px solid #b2b2b2;
  border-right: 3px solid #b2b2b2;
}

.header {
  display: inherit !important;
}

.card-img-top {
  height: 300px;
}

.card-title {
  font-family: "Anton", sans-serif !important;
  font-size: 18px !important;
  color: #454545 !important;
}

.card-text {
  font-family: "Slabo 27px", serif !important;
  font-size: 16px !important;
}

span {
  font-weight: bold;
}

.btn-outline-delete {
  background-color: white!important;
  color: #e72a04;
  border: #e72a04 1px solid;
  transition: background-color 2s, color 2s, border 2s;
}

.btn-outline-delete:hover {
  background-color: #e72a04!important;
  color: #0e0e0e;
  border: #232323 1px solid;
}
</style>


