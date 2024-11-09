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

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              class="btn btn-outline"
              :disabled="isSuccess"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.167 20 14.418 20 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd" />
              </svg>
              Github
            </button>
            <button 
              type="button" 
              class="btn btn-outline"
              :disabled="isSuccess"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Google
            </button>
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