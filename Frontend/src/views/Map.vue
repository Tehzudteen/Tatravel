<script setup></script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold text-center mb-4">Map Page</h1>
    <div class="map-container w-full h-full">
      <GMapMap
        :center="{ lat: 40.73061, lng: -73.935242 }"
        :zoom="12"
        class="h-96 w-full"
      >
        <GMapMarker :position="{ lat: 40.73061, lng: -73.935242 }" />
      </GMapMap>
    </div>
  </div>
</template>

