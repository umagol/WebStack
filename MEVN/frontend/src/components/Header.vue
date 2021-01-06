<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-teal-500 nav-width">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">MEVN Stack </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link me-5" aria-current="page">
                <router-link class="text-decoration-none text-dark" to="/home"
                  >Home</router-link
                >
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link me-5 text-dark text-decoration-none"
                aria-current="page"
              >
                <router-link class="text-decoration-none text-dark" to="/about"
                  >About</router-link
                >
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link me-5 text-dark text-decoration-none"
                aria-current="page"
              >
                <router-link
                  class="text-decoration-none text-dark"
                  to="/contact"
                  >Contact</router-link
                >
              </a>
            </li>

            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link me-5 dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li> -->
            <li>
              <button
              v-if="IsLogin == false"
                type="button"
                class="btn btn-outline-dark me-2 lh-1 m-1"
                data-bs-toggle="modal"
                data-bs-target="#login"
              >
                Login
              </button>
              <button
                type="button"
                class="btn btn-outline-dark lh-1 m-1"
                data-bs-toggle="modal"
                data-bs-target="#signup"
                v-if="IsLogin == false"
              >
                Signup
              </button>
              <button
                v-if="IsLogin == true"
                type="button"
                class="btn iconwitdh"
                data-bs-toggle="modal"
                data-bs-target="#signup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Model is Start -->

    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- <form > -->
            <div class="modal-body">
              <input
                class="form-control"
                type="email"
                placeholder="Enter Email Address"
                v-model.trim="Login_model.email"
              /><br />
              <!-- <label class="form-control me-auth">Password</label> -->
              <input
                class="form-control"
                type="password"
                placeholder="Enter Password"
                v-model.trim="Login_model.password"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" v-on:click="LogIn()" class="btn btn-primary" >
                Submit
              </button>
            </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="signup"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Signup</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
             
              <input
                class="form-control"
                type="text"
                placeholder="Enter User Name"
              /><br />
             <input
                class="form-control"
                type="email"
                placeholder="Enter Email"
              /><br />
              <!-- <label class="form-control me-auth">Password</label> -->
              <input
                class="form-control"
                type="password"
                placeholder="Enter Password"
              /><br />
              <textarea class="form-control" placeholder="Enter About You">

              </textarea>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" v-on:click="SignUp()" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      errors: [],
      IsLogin:false,
      Login_model: {
        email:null,
        password:null
      },
      Signup_model:{}
    };
  },
  methods: {
    LogIn() {
      axios.post(`http://localhost:5000/api/auth/login`, this.Login_model)
      .then(response => {
        localStorage.setItem("Access-Token",response.data.Accesstoken);
        window.location.reload();
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    SignUp() {
      console.log("Signup is Work");
    },
  },
  created(){
    if(localStorage.getItem('Access-Token') == null){
      this.IsLogin=false;
    }else{
      this.IsLogin=true;
    }
  },
  mounted(){
    if(localStorage.getItem('Access-Token') == null){
      this.IsLogin=false;
    }else{
      this.IsLogin=true;
    }
  }
};
</script>



<style lang="stylus">
.nav-width {
  height: 50px;
  background-color: #4CAF50;
}

.iconwitdh {
  height: 40px;
}
</style>