<template>
    <div class="container mx-auto p-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-4">Festival Location</h2>
          <div id="map" class="w-full h-96 mb-4"></div>
          <div class="flex justify-between">
            <button @click="centerMap" class="btn btn-primary">Center Map</button>
            <button @click="getDirections" class="btn btn-secondary">Get Directions</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MapPage',
    data() {
      return {
        map: null,
        marker: null,
        // These would typically come from an API in the future
        festivalLocation: { lat: 14.3534, lng: 100.5683 }, // Example coordinates for Ayutthaya
        festivalName: 'Ancient Capital Loi Krathong Festival',
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
      }
    },
    mounted() {
      this.loadGoogleMapsAPI()
    },
    methods: {
      loadGoogleMapsAPI() {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`
        script.async = true
        script.defer = true
        window.initMap = this.initMap
        document.head.appendChild(script)
      },
      initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: this.festivalLocation,
          zoom: 14
        })
        this.marker = new google.maps.Marker({
          position: this.festivalLocation,
          map: this.map,
          title: this.festivalName
        })
      },
      centerMap() {
        if (this.map && this.marker) {
          this.map.panTo(this.marker.getPosition())
          this.map.setZoom(15)
        }
      },
      getDirections() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
              const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${this.festivalLocation.lat},${this.festivalLocation.lng}`
              window.open(url, '_blank')
            },
            () => {
              alert('Unable to get your location. Please enable location services and try again.')
            }
          )
        } else {
          alert('Geolocation is not supported by your browser.')
        }
      },
      // Placeholder method for future API integration
      async fetchFestivalDetails() {
        try {
          // In the future, replace this with an actual API call
          // const response = await fetch('your-api-endpoint');
          // const data = await response.json();
          // this.festivalLocation = data.location;
          // this.festivalName = data.name;
          console.log('Fetching festival details from API...')
        } catch (error) {
          console.error('Error fetching festival details:', error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any additional custom styles here if needed */
  </style>


