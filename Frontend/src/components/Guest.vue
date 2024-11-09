<template>
    <div class="container mx-auto p-5 sm:p-4">
      <div class="card bg-base-100 shadow-xl">
        <!-- Cover Photo -->
        <figure class="relative">
          <img :src="user.coverPhoto" alt="Cover Photo" class="w-full h-32 sm:h-48 object-cover" />
        </figure>
  
        <div class="card-body p-4">
          <!-- Profile Info -->
          <div class="flex flex-col sm:flex-row items-center sm:space-x-4">
            <div class="avatar relative mb-4 sm:mb-0">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="user.avatarUrl" alt="User Avatar" />
              </div>
            </div>
            <div class="text-center sm:text-left">
              <h2 class="card-title text-xl sm:text-2xl mb-2">
                {{ user.name }}
              </h2>
              <p class="text-base-content text-opacity-70">
                {{ user.email }}
              </p>
              <p class="text-base-content text-opacity-70 mt-2">
                {{ user.location }}
              </p>
            </div>
          </div>
  
          <!-- Bio -->
          <div class="mt-4">
            <p class="text-base-content text-opacity-70">{{ user.bio }}</p>
          </div>
  
          <!-- Divider -->
          <div class="divider my-6">Want to join?</div>
  
          <!-- Login/Register Section -->
          <div class="space-y-4">
            <!-- Login Form -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input 
                v-model="loginForm.email" 
                type="email" 
                placeholder="email@example.com" 
                class="input input-bordered w-full"
              />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input 
                v-model="loginForm.password" 
                type="password" 
                placeholder="••••••••" 
                class="input input-bordered w-full"
              />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
  
            <!-- Action Buttons -->
            <div class="space-y-2">
              <button 
                class="btn btn-primary w-full" 
                @click="handleLogin"
                :disabled="!loginForm.email || !loginForm.password"
              >
                Login
              </button>
              <div class="text-center">
                <span class="text-sm">Don't have an account? </span>
                <a href="#" class="text-sm text-primary hover:underline">Register here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const user = reactive({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    bio: 'Passionate traveler and photographer. Always seeking new adventures!',
    avatarUrl: '/api/placeholder/96/96',
    coverPhoto: '/api/placeholder/800/200',
  })
  
  const loginForm = reactive({
    email: '',
    password: ''
  })
  
  const handleLogin = () => {
    // Add your login logic here
    console.log('Login attempt with:', loginForm.email)
  }
  </script>
  
  <style scoped>
  .divider {
    @apply flex items-center text-base-content text-opacity-70 text-sm;
  }
  
  .divider::before,
  .divider::after {
    @apply content-[''] flex-1 h-px bg-base-content bg-opacity-10;
  }
  
  .divider::before {
    @apply mr-4;
  }
  
  .divider::after {
    @apply ml-4;
  }
  </style>