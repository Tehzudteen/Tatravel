login
<template>
  <div class="flex items-center justify-center m-3 ">
    <div class="card w-96 bg-base-100  shadow-2xl">
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
        <p class="mt-4">Don't have an account? <router-link to="/register">Register here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Implement login logic here
      console.log('Logging in with:', this.email, this.password);
    }
  }
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
