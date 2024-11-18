<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="card w-full max-w-md bg-white shadow-xl">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center mb-6">Create Account</h2>
        
        <!-- Success Alert -->
        <div v-if="successMessage" class="alert alert-success text-sm mb-4">
          {{ successMessage }}
          <div class="text-xs mt-1">Redirecting to login page...</div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="label">
                <span class="label-text">First Name</span>
              </label>
              <input 
                v-model="formData.firstName"
                type="text"
                placeholder="John"
                required
                class="input input-bordered w-full"
              />
            </div>
            <div class="space-y-2">
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input 
                v-model="formData.lastName"
                type="text"
                placeholder="Doe"
                required
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <!-- Username Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input 
              v-model="formData.username"
              type="text"
              placeholder="johndoe"
              required
              class="input input-bordered w-full"
            />
          </div>

          <!-- Email Field -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input 
              v-model="formData.email"
              type="email"
              placeholder="john@example.com"
              required
              class="input input-bordered w-full"
            />
          </div>

          <!-- Password Fields -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input 
              v-model="formData.password"
              type="password"
              required
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input 
              v-model="formData.confirmPassword"
              type="password"
              required
              class="input input-bordered w-full"
            />
            <label v-if="passwordMismatch" class="label">
              <span class="label-text-alt text-error">Passwords do not match</span>
            </label>
          </div>

          <!-- Error Alert -->
          <div v-if="error" class="alert alert-error text-sm">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-primary w-full"
            :disabled="loading || passwordMismatch || isSuccess"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
            {{ loading ? 'Creating account...' : 'Create Account' }}
            <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>


          <!-- Login Link -->
          <p class="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <router-link 
              to="/login" 
              class="text-primary hover:underline"
              :class="{ 'pointer-events-none': isSuccess }"
            >
              Sign in
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      },
      loading: false,
      error: '',
      successMessage: '',
      isSuccess: false
    };
  },
  computed: {
    passwordMismatch() {
      return this.formData.password !== this.formData.confirmPassword 
        && this.formData.confirmPassword !== '';
    }
  },
  methods: {
    async handleRegister() {
      if (this.passwordMismatch) {
        return;
      }

      this.loading = true;
      this.error = '';

      try {
        const response = await axios.post('http://localhost:3000/auth/register', {
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password,
          first_name: this.formData.firstName,
          last_name: this.formData.lastName
        });

        // Handle successful registration
        this.isSuccess = true;
        this.successMessage = 'Registration successful! Welcome aboard.';
        
        // Clear any previous error
        this.error = '';
        
        // Optional: Clear the form
        this.formData = {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        };
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);

      } catch (err) {
        this.error = err.response?.data?.error || 'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>