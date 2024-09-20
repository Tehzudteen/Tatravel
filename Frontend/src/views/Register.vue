<template>
  <div class="flex items-center justify-center m-3 ">
    <div class="card w-96 bg-base-100 shadow-2xl">
      <div class="card-body">
        <h2 class="card-title">Register</h2>
        <form @submit.prevent="handleRegister">
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
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input type="password" v-model="confirmPassword" required class="input input-bordered" />
            <label v-if="passwordMismatch" class="label-text text-red-500">
              Passwords do not match.
            </label>
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">Register</button>
          </div>
        </form>
        <p class="mt-4">Already have an account? <router-link to="/login">Login here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    passwordMismatch() {
      return this.password !== this.confirmPassword;
    },
  },
  methods: {
    handleRegister() {
      if (this.password === this.confirmPassword) {
        // Implement registration logic here
        console.log('Registering with:', this.email, this.password);
      }
    },
  },
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
