<template>
<div >
	<div class="row">
		<div class="col-md-12">
			<div class="row">
        	  <div class="card-group pt-2 pb-2 col-sm-3 col-md-3" v-for="comic in comics">
              <div class="card  m-2">
                <img v-bind:src="comic.frontpage" alt="portadas de comic" class="img fluid card-img-top">
                <div class="card-body">
                <h5 class="card-title text-center">
								{{ comic.name }}
							  </h5>
                <p class="card-text"> <span>Numero:</span> #{{ comic.number }} </p>
                <p class="card-text"> <span>Compañia:</span> {{ comic.company }} </p>
							  <div class="dropdown-divider"></div>
                <div class="btn-group" role="group">
				          <button @click="deleteComicPendRead" class="btn btn-outline-delete" type="button">
					          <i class="fa fa-trash"></i>Quitar Comic
				          </button> 
			          </div>
                <router-link :to= "{name: 'comic-details', params: {id: comic._id}}"><a class="btn">Ver más</a></router-link>
                </div>
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
      comicPendRead: []
    };
  },
   created: function() {
    // traerse los comic pendiente de leer de la bd
        db.ref('users/' + auth.currentUser.uid + '/pendingReading').on("value", (snapshot) => {
         let addComic = snapshot.val();
          for (var comic in addComic){
            this.comicPendRead = comic;
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
      } catch (err) {
        // do something with the error
      }
    
         }
      },
       function (errorObject) {

      });
  },
  methods: {
    deleteComicPendRead: function(comic) {
      var option = confirm ("¿Seguro que quieres quitar este comic de la lista de pendiente de leer?")
      if(option === true) {
        db.ref("users/" + auth.currentUser.uid + "/pendingReading/" + this.comicPendRead).remove();
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
</style>


