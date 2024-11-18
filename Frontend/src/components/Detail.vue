<template>
  <div class="container mx-auto p-4">
    <div class="card lg:card-side bg-base-100 shadow-xl">
      <!-- Image Section -->
      <figure class="lg:w-1/2">
        <img :src="imageUrl" :alt="name" class="w-full h-full object-cover" />
      </figure>
      <!-- Details Section -->
      <div class="card-body lg:w-1/2">
        <h2 class="card-title text-2xl font-bold mb-4">{{ name }}</h2>
        
        <!-- Display Province -->
        <p class="text-lg font-semibold mb-2">
          <span class="text-gray-500">Province: </span>{{ province }}
        </p>
        
        <!-- Display Event Type -->
        <p class="text-lg font-semibold mb-2">
          <span class="text-gray-500">Event Type: </span>{{ eventType }}
        </p>
        
        <!-- Display Telephone -->
        <p class="text-lg font-semibold mb-2">
          <span class="text-gray-500">Tel: </span>{{ tel }}
        </p>
        
        <!-- Display Website -->
        <p class="text-lg font-semibold mb-4">
          <span class="text-gray-500">Website: </span>
          <a :href="website" target="_blank" class="text-blue-500 hover:underline">
            {{ website }}
          </a>
        </p>
        
        <!-- Display Description -->
        <p class="text-base text-gray-700">{{ detail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPage",
  props: {
    name: String,
    province: String,
    eventType: String,
    tel: String,
    website: String,
    detail: String,
    imageUrl: String,
  },
};
</script>
