<template>
    <div class="flex items-center justify-center  m-5">
      <div class="card w-96 bg-base-100 shadow-xl ">
        <div class="card-body ">
          <div class="alert alert-error shadow-lg">
            <div>
              <svg class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Login Failed</span>
            </div>
          </div>
          <p class="text-base-content">Please check your credentials and try again.</p>
          <div class="card-actions justify-end">
            <button @click="redirectToLogin" class="btn btn-error">Retry Login</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToLogin() {
        this.$router.push('/login');
      },
    },
  };
  </script>