<template>
    <div class="container mx-auto p-4">
      <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure class="lg:w-1/2">
          <img :src="imageUrl" :alt="name" class="w-full h-full object-cover" />
        </figure>
        <div class="card-body lg:w-1/2">
          <h2 class="card-title text-2xl font-bold mb-4">{{ name }}</h2>
          
          <div class="grid grid-cols-1 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Province</span>
              </label>
              <input type="text" :value="province" class="input input-bordered" readonly />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Event Type</span>
              </label>
              <input type="text" :value="eventType" class="input input-bordered " readonly />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Tel</span>
              </label>
              <input type="text" :value="tel" class="input input-bordered" readonly />
            </div>
            
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Website</span>
              </label>
              <input type="text" :value="website" class="input input-bordered" readonly />
            </div>
          </div>
          
          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-2">Detail</h3>
            <p class="text-sm">{{ detail }}</p>
          </div>
  
          <!-- Rating Section -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-2">Rating</h3>
            <div class="rating rating-lg">
              <input type="radio" name="rating-8" class="mask mask-star-2 bg-orange-400" v-for="i in 5" :key="i" :value="i" v-model="userRating" @change="submitRating" />
            </div>
            <p class="mt-2">Average Rating: {{ averageRating.toFixed(1) }} ({{ totalRatings }} ratings)</p>
          </div>
  
          <!-- Comment Section -->
          <div class="mt-6">
            <h3 class="text-xl font-semibold mb-2">Comments</h3>
            <div v-for="comment in comments" :key="comment.id" class="bg-base-200 p-3 rounded-lg mb-2">
              <p class="font-semibold">{{ comment.user }}</p>
              <p>{{ comment.text }}</p>
            </div>
            <div class="mt-4">
              <textarea v-model="newComment" @keypress.enter="submitComment" class="textarea textarea-bordered w-full" placeholder="Add a comment..."></textarea>
              <button @click="submitComment" class="btn btn-primary mt-2">Post Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FestivalDetailPage',
    data() {
      return {
        name: 'Ancient Capital Loi Krathong Festival',
        province: 'Phra Nakhon Si Ayutthaya',
        eventType: 'Fairs & Festivals',
        tel: '0 3524 6076-7',
        website: 'https://www.tourismthailand.org/Events-and-Festivals/Ancient-Capital-Loi-Krathong-Festival--9290',
        detail: 'Ancient Capital Loi Krathong Festival. Schedule: 22 November, 2018. Venue: The Monument of King Naresuan the Great, Phukao Thong, Phra Nakhon Si Ayutthaya. Activities:- To float Krathong cups;- Contest of Krathong cups made with materials;- Nang Nopphamat (beautiful woman) and Na Noi Nopphamat (cute girl) contest;- Stage performances;- To take a bath under the full moon light;- Walking Street. Contact: Tourism Authority of Thailand (TAT), Phra Nakhon Si Ayutthaya Tel. 0 3524 6076-7. Email:',
        imageUrl: 'https://i.pinimg.com/originals/87/85/ad/8785ad36346ae3ba48ab80cabd498b8b.gif',
        userRating: 0,
        averageRating: 4.2, // This would typically come from an API
        totalRatings: 50, // This would typically come from an API
        comments: [
          { id: 1, user: 'John Doe', text: 'Great festival! Loved the atmosphere.' },
          { id: 2, user: 'Jane Smith', text: 'Beautiful location and well organized.' }
        ],
        newComment: ''
      }
    },
    methods: {
      submitRating() {
        // Here you would typically send this rating to your backend API
        console.log('User submitted rating:', this.userRating);
        // For demonstration, we'll just update the average rating locally
        this.averageRating = (this.averageRating * this.totalRatings + this.userRating) / (this.totalRatings + 1);
        this.totalRatings++;
      },
      submitComment() {
        if (this.newComment.trim()) {
          this.comments.push({
            id: this.comments.length + 1,
            user: 'Current User', // This would typically come from a user authentication system
            text: this.newComment.trim()
          });
          this.newComment = '';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any additional custom styles here if needed */
  </style>
