<template>
  <div class="home">
    <Header />
    <div class="container-fluid mt-3">
      <div class="row">
        <div
          v-for="item in AllUser"
          :key="item.UserName"
          class="card ms-1"
          style="width: 18rem"
        >
          <img :src="item.ProfileImagePath" class="card-img-top" alt="logo" />
          <div class="card-body">
            <h1>{{ item.UserName }}</h1>
            <p class="card-text">{{ item.UserAbout }}</p>
          </div>
          <div class="card-footer text-muted" v-if="status == true">
            <a href="#" class="btn me-1 btn-primary">More Info </a>
            <a href="#" class="btn ms-1 btn-primary" v-on:click="sendMessage('hi satish')">Message</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header.vue";
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      AllUser: [],
      connection: null,
      status: false,
      message:{}
    };
  },
  methods:{
    sendMessage: function(message) {
      console.log(message);
      this.connection.send(message);
    }
  },
  created() {
    axios
      .get("http://localhost:5000/api/user/alluser")
      .then((response) => {
        if (localStorage.getItem("Access-Token")) {
          //check is login or not
          this.status = true;
          
          // Web socket is start
          console.log("Starting connection to WebSocket Server")
          this.connection = new WebSocket("wss://echo.websocket.org")

          this.connection.onmessage = function(event) {
            console.log(event);
          }

          this.connection.onopen = function(event) {
            console.log(event)
            console.log("Successfully connected to the echo websocket server...")
          }

        }
        this.AllUser = response.data;
      })
      .catch((error) => {
        this.errors.push(error);
      });
  },
  components: {
    Header,
  },
};
</script>
