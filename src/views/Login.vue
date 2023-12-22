<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header text-center">
          <h1>Login</h1>
        </div>
        <div class="card-body">
            <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                    {{ error[0] }}
                </li>
            </ul>
            <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" v-model="user.email" id="email" class="form-control"  placeholder="Enter your email">
            </div>
            <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="user.password" id="password" class="form-control" placeholder="Enter your password">
            </div>

            <button type="submit" @click="loginUser" class="btn btn-primary">Login</button>
            
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        errorList:[],
        user: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async loginUser() {
        try 
        {
            var mythis = this;
            const response = await axios.post('http://localhost:8000/api/login', this.user);
            console.log(response);

            if (response.data && response.data.token) {
                // Extract user information from the response
                const { user, token } = response.data;
                console.log('User info:', user);
                localStorage.setItem('token', token); // store token in local storage for session management
                console.log('Token saved in localStorage:', localStorage.getItem('token'));
                //adding username to be shown once is loggedin
                this.$store.commit('LOGIN', { user });
                console.log('User info saved in vuex store:', this.$store.state.user);
                this.$router.push({ name: 'home' });
            } else {
                console.log('Unexpected response data:', response.data);
            }
        } 
        catch (error) 
        {
            console.log('Error during login:', error);

            if (error.response) {
                if (error.response.status === 422) {
                    mythis.errorList = error.response.data.error;
                }else {
                    // Handle other error cases
                    this.errorList = ['An error occurred. Please try again.'];
                }
            }else if (error.request) {
                console.log('Error in request:', error.request);
            }
        }
      },
    },
  };
  </script>
  