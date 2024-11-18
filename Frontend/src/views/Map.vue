<template>
  <div class="relative h-screen w-full">
    <!-- Search Bar -->
    <div class="fixed top-20 left-0 right-0 z-50 p-2 flex items-center gap-2">
      <input
        type="text"
        placeholder="Search for a location"
        v-model="searchQuery"
        @keyup.enter="searchLocation"
        class="input input-bordered flex-1 text-sm"
      />
      <button @click="searchLocation" class="btn btn-primary text-sm">
        Search
      </button>
    </div>

    <!-- Map -->
    <div id="map" class="fixed top-0 left-0 right-0"></div>

    <!-- Navigate Button -->
    <div v-if="destination" class="fixed bottom-20 left-0 right-0 flex justify-center z-50">
      <button @click="navigateToLocation" class="btn btn-secondary text-sm flex items-center gap-2">
        <i class="fas fa-route"></i> <!-- FontAwesome Route Icon -->
        {{ destinationName }}
      </button>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "SpinningGlobeWithSearch",
  data() {
    return {
      map: null,
      userInteracting: false,
      spinEnabled: true,
      searchQuery: "",
      destination: null,
      destinationName: "",
      // Configuration for globe spinning
      secondsPerRevolution: 240, // Time for one revolution
      maxSpinZoom: 5, // Max zoom level for spinning
      slowSpinZoom: 3, // Slow spinning above this zoom level
    };
  },
  mounted() {
    this.initializeMap();
    this.adjustForScreenSize();
  },
  methods: {
    initializeMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibHVja3l0ZWgwMDgzIiwiYSI6ImNtMzdnMXZsdjBjcW4yanF4Y2hvYmF2dHQifQ.RMimJe1YsWLiWShNracDTQ";

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        projection: "globe", // Use globe projection
        zoom: 0.5,
        center: [0, 15],
      });

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.scrollZoom.disable();

      this.map.on("style.load", () => {
        this.map.setFog({}); // Add default atmosphere style
      });

      // Event listeners to manage interaction state
      this.map.on("mousedown", () => {
        this.userInteracting = true;
      });
      this.map.on("dragstart", () => {
        this.userInteracting = true;
      });
      this.map.on("moveend", () => {
        this.spinGlobe(); // Restart spinning after interaction ends
      });

      // Start spinning the globe
      this.spinGlobe();
    },
    spinGlobe() {
      if (this.spinEnabled && !this.userInteracting) {
        const zoom = this.map.getZoom();
        if (zoom < this.maxSpinZoom) {
          let distancePerSecond = 360 / this.secondsPerRevolution;
          if (zoom > this.slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif =
              (this.maxSpinZoom - zoom) / (this.maxSpinZoom - this.slowSpinZoom);
            distancePerSecond *= zoomDif;
          }

          const center = this.map.getCenter();
          center.lng -= distancePerSecond;

          // Smoothly animate the map over one second
          this.map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }
    },
    adjustForScreenSize() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth <= 375) {
        // Optimize for smartphone dimensions
        this.map.setZoom(0.5);
        this.map.setCenter([0, 15]);
      }
    },
    async searchLocation() {
      if (!this.searchQuery.trim()) {
        alert("Please enter a search term.");
        return;
      }

      const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        this.searchQuery
      )}.json?access_token=${mapboxgl.accessToken}`;

      try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const location = data.features[0];
          const [lng, lat] = location.center;

          // Fly to the searched location
          this.map.flyTo({
            center: [lng, lat],
            zoom: 10,
          });

          // Add a marker at the searched location
          new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(
                `<h3>${location.text}</h3><p>${location.place_name}</p>`
              )
            )
            .addTo(this.map);

          // Set destination for navigation
          this.destination = { lat, lng };
          this.destinationName = location.text;
        } else {
          alert("Location not found. Try another search term.");
        }
      } catch (error) {
        console.error("Error searching location:", error);
        alert("Failed to search for location. Please try again.");
      }
    },
    navigateToLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${this.destination.lat},${this.destination.lng}`;
          window.open(url, "_blank");
        },
        () => {
          alert("Unable to get your location. Please enable location services.");
        }
      );
    },
  },
};
</script>

<style scoped>
/* Ensure map covers the full viewport */
#map {
  width: 100%;
  height: 100%;
}

/* Responsiveness and alignment for search bar */
.input {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>
