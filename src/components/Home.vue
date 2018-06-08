<template>
  <div class="container bg-main-container pt-2 pb-2">
    <UserHome/>
    <div class="row">
      <div class="col-md-12">
				<div class="card text-center">
					<div class="card-header">
						 <a class="card-link collapsed" data-toggle="collapse" href="#card-comic-favorite"><h3>Comics Favoritos</h3></a>
					</div>
					<div id="card-comic-favorite" class="collapse">
						<div class="card-body">
							<ComicFavorit/>
						</div>
					</div>
				</div>
				<div class="card text-center">
					<div class="card-header">
						 <a class="card-link collapsed" data-toggle="collapse" href="#card-comic-read"><h3>Comics Leidos</h3></a>
					</div>
					<div id="card-comic-read" class="collapse">
						<div class="card-body">
							<ComicRead/>
						</div>
					</div>
				</div>
        	<div class="card text-center">
					  <div class="card-header">
						 <a class="card-link collapsed" data-toggle="collapse" href="#card-comic-pending-reading"><h3>Comics Pendientes de Leer</h3></a>
					  </div>
					  <div id="card-comic-pending-reading" class="collapse">
						  <div class="card-body">
							  <PendingReading/>
						  </div>
					  </div>
				  </div>
			</div>
		</div>
  </div>
</template>
<script>
import Header from "./Header";
import UserHome from "./user/User-home";
import Footer from "./Footer";
import ComicFavorit from "./user/ComicFavorit";
import ComicRead from "./user/ComicRead";
import PendingReading from "./user/PendingReading";

export default {
  components: {
    Header,
    Footer,
    UserHome,
    ComicFavorit,
    ComicRead,
    PendingReading

  }
};
</script>
<style>
body {
  background-image: none;
}

.header {
  display: inherit !important;
}

.no-padding-lr {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.card-header {
  background-color: #e9e9e9;
}

.card-header h3 {
  color: #4a4a4a;
  transition: color 2s;
}

.card-header h3:hover {
  color: #222222;
}



</style>
