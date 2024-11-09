<template>
  <div class="flex items-center justify-center m-3">
    <div class="card w-96 bg-base-100 shadow-2xl">
      <div class="card-body">
        <h2 class="card-title">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" v-model="email" required class="input input-bordered" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" v-model="password" required class="input input-bordered" />
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <p class="mt-4">Don't have an account? <router-link to="/register" class="text-primary hover:underline">Register here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password
        });
        const token = response.data.token;
        localStorage.setItem('token', token); // Save token for authentication
        this.$router.push('/'); // Redirect to Home page
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
      }
    }
  }
};
</script>
