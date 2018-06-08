<template>
<div class="container bg-main-container">
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
                <p class="card-text"> <span>Año:</span> {{ comic.year }} </p>
                <p class="card-text"> <span>Autor:</span> {{ comic.autor }} </p>
                <p class="card-text"> <span>Compañia:</span> {{ comic.company }} </p>
							  <div class="dropdown-divider"></div>
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
export default {
  data() {
    return {
      comics: []
    };
  },
  created() {
    this.getComics();
  },
  methods: {
    getComics() {
      try {
        const res = this.$graphql
          .request(
            `
             {
              filter(company: "Marvel"){
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
            this.comics = res.filter;
          });
      } catch (err) {
        // do something with the error
      }
    }
  }
};
</script>

<style>
a{
  color:#3273dc!important;
}

.bg-main-container {
  background-color: #e9e9e9;
  border-left: 2px solid #b2b2b2;
  border-right: 2px solid #b2b2b2;
}
.header {
  display: inherit !important;
}
.card-img-top {
  height: 300px;
}
span {
  font-weight: bold;
}
.card-title {
  font-family: "Anton", sans-serif !important;
  font-size: 18px !important;
  color: #454545 !important;
}

.card-text {
  font-family: "Slabo 27px", serif;
  font-weight: 400;
  font-size: 16px;
}
</style>


  