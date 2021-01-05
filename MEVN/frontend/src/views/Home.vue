<template>
  <div class="home">
    <Header />
    <div v-for="item in AllUser" :key="item.UserName" class="card" style="width: 18rem;">
      <img src="../assets/logo.png" class="card-img-top" width="50px" height="100px"  alt="logo">
      <div class="card-body">
        <h1>{{item.UserName}}</h1>
        <p class="card-text">{{item.UserAbout}}</p>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue';
import axios from 'axios';

export default {
  name: 'Home',
  data(){
  return{
    AllUser: []
  }
  },
  created(){
    axios.get('http://localhost:5000/api/user/alluser').then(response=>{
      this.AllUser = response.data;
    }).catch(error=>{
      this.errors.push(error)
    })
  },
  components: {
    Header
  }
}
</script>
