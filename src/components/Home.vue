<template>
  <div>
   <UserHome/>
   <ComicFavorit/>
   <ComicRead/>
   <PendingReading/>
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
</style>
