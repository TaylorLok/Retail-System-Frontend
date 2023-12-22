<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <RouterLink class="navbar-brand" to="#">LOGO</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/about">About Us</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/products">Products</RouterLink>
              </li>
              <li class="nav-item" v-if="!isLoggedIn">
                <RouterLink class="nav-link" to="/register">Registration</RouterLink>
              </li>
              <li class="nav-item" v-if="!isLoggedIn">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
              </li>
              <li class="nav-item" v-if="isLoggedIn">
                <RouterLink class="nav-link" @click="logout" to="/">Logout</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  
  <RouterView />
  <Footer />
  
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}

</script>
