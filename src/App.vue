<template>
  <div id="app" class="container-fluid no-padding-lr">
    <div class="header" style="display:none">
      <Header/>
    </div>
    <router-view/>
    <div class="header" style="display:none">
      <Footer/>
    </div>
  </div>
</template>

<script>
import LoginEmail from "./components/login/Login-email";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    LoginEmail,
    Header,
    Footer
  }
};
</script>

<style>
#app {
  /* background-color: #bdbdbd; */
 background: rgba(255,255,255,1);
background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(47%, rgba(246,246,246,1)), color-stop(100%, rgba(237,237,237,1)));
background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=0 );
 
  
}

h3 {
  font-family: "Anton", sans-serif;
  font-weight: bold;
  font-size: 34px;
}

#app {
  font-family: "Slabo 27px", serif;
  font-weight: 400;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.no-padding-lr {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
