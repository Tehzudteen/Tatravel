<template>
    <div class="flex items-center justify-center m-3">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="alert alert-success shadow-lg">
            <div>
              <svg class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span >Login Successful!</span>
            </div>
          </div>
          <p class="text-base-content">Welcome back! You've successfully logged in.</p>
          <div class="card-actions justify-end">
            <button @click="redirectToDashboard" class="btn btn-primary">Go to Home</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToDashboard() {
        this.$router.push('/');
      },
    },
  };
  </script>