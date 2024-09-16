<template>
  <div class=" carousel relative w-full h-64 sm:h-80 overflow-hidden">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out"
      :class="{
        'opacity-100': index === currentSlide,
        'opacity-0': index !== currentSlide,
      }"
    >
      <img
        :src="slide.image"
        class="w-full h-full object-cover"
        :alt="slide.title"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
      >
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <h2 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
            {{ slide.title }}
          </h2>
          <p class="text-sm sm:text-base mb-2 sm:mb-4">
            {{ slide.description }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="absolute top-1/2 left-2 right-2 flex justify-between items-center -translate-y-1/2"
    >
      <button
        @click="prevSlide"
        class="btn btn-circle btn-sm bg-black/10 text-white border-none"
      >
        ❮
      </button>
      <button
        @click="nextSlide"
        class="btn btn-circle btn-sm bg-black/10 text-white border-none"
      >
        ❯
      </button>
    </div>

    <div
      class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="setSlide(index)"
        class="w-2 h-2 rounded-full transition-colors duration-300 ease-in-out"
        :class="index === currentSlide ? 'bg-white' : 'bg-white/50'"
        :aria-current="index === currentSlide"
        :aria-label="`Slide ${index + 1}`"
      ></button>
    </div>
  </div>

  <!--card top 10-->
  <h4 class="my-4 mx-3 mb-0 p-2 font-bold rounded-full bg-gradient-to-r from-yellow-300">Top 10 Travel In Thailand</h4>
  <div class="carousel carousel-center rounded-box max-w-full space-x-4 p-4">
    <div  v-for="items in [1,2,3,4,5,6,7,8,9] "  class="carousel-item">
      <div class="card bg-base-100 w-64  shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Shoes!
            <div class="badge badge-secondary ">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
<!--card view-->
<h4 class="my-4 mx-3 mb-0 p-2 font-bold rounded-full bg-gradient-to-r from-yellow-300 ">Top 10 Travel In Thailand</h4>
  <div class="carousel carousel-center rounded-box max-w-full space-x-4 p-4">
    <div  v-for="items in [1,2,3,4,5,6,7,8,9] "  class="carousel-item">
      <div class="card bg-base-100 w-64  shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            Shoes!
            <div class="badge badge-secondary ">NEW</div>
          </h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <div class="badge badge-outline">Fashion</div>
            <div class="badge badge-outline">Products</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentSlide = ref(0);
const slides = ref([
  {
    image:
      "https://i.pinimg.com/564x/7f/74/3f/7f743f143aa18ac68c3645886113514a.jpg",
    title: "Discover Thailand's Beauty",
    description: "Explore breathtaking landscapes and rich culture",
  },
  {
    image:
      "https://i.pinimg.com/564x/46/db/08/46db080e32f80821c45509089d7d581b.jpg",
    title: "Adventure Awaits",
    description: "Embark on thrilling journeys across the country",
  },
  {
    image:
      "https://i.pinimg.com/236x/70/71/fb/7071fbc9c966083b1fd2274f4e32fe23.jpg",
    title: "Relax in Paradise",
    description: "Unwind on pristine beaches and luxurious resorts",
  },
]);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const setSlide = (index) => {
  currentSlide.value = index;
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
