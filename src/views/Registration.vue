<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header text-center">
          <h1>Register</h1>
        </div>
        <div class="card-body">

            <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
                <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                    {{ error[0] }}
                </li>
            </ul>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" v-model="user.name" id="name" class="form-control" placeholder="Enter your fullname">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" v-model="user.email" id="email" class="form-control"  placeholder="Enter your email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="user.password" id="password" class="form-control" placeholder="Enter your password">
            </div>
            <div class="mb-3">
                <label for="password_confirmation" class="form-label">Confirm Password</label>
                <input type="password" v-model="user.password_confirmation" id="password_confirmation" class="form-control"  placeholder="Re-Enter your password">
            </div>
            <div>
                <button type="submit"  @click="registerUser" class="btn btn-primary" :disabled="isLoading" style="margin-right: 10px;">Register</button>
                <RouterLink to="/login" class="btn btn-secondary">Login</RouterLink>
            </div>
     
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'register',
    data() {
      return {
        isLoading: false,
        errorList:[],
        user: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        },
      };
    },
    methods: {

        async registerUser() {
            try
            {
                this.isLoading = true;
                var mythis = this;
                const response = await axios.post('http://localhost:8000/api/register', this.user);
                console.log(response);
                if (response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token); // store token in local storage for session management
                    this.$store.commit('LOGIN'); // store token in vuex store for global access
                    this.$router.push({ name: 'home' });
                } else {
                    console.log('Unexpected response data:', response.data);
                }
            }
            catch( error) 
            {
                console.log('Error during login:', error);

                if (error.response) {
                    if (error.response.status === 422) {

                        mythis.errorList = error.response.data.error;

                    }else {
                        // Handle other error cases
                        this.errorList = ['An error occurred. Please try again.'];
                    }
                }
                else if (error.request) {
                    console.log('Error in request:', error.request);
                }
            }
            finally
            {
                this.isLoading = false;
            }
        },
    },
  };
  </script>