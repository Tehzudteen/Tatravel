<template>
  <div v-for="items in [1, 2, 3, 4, 5, 6, 7, 8, 9]" class="carousel-item">
    <div
      class="relative flex flex-2 my-2 mx-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full"
    >
      <div
        class="relative h-fit w-full m-2.5 overflow-hidden text-white rounded-md"
      >
        <img
          src="https://i.pinimg.com/originals/87/85/ad/8785ad36346ae3ba48ab80cabd498b8b.gif"
          class="h-full w-full"
        />
      </div>
      <div class="p-4">
        <div class="flex items-center mb-2">
          <h6 class="text-slate-800 text-xl font-semibold">
            Wooden House, Florida
          </h6>

          <div class="flex items-center gap-0 5 ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-5 h-5 text-yellow-600"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="text-slate-600 ml-1.5">5.0</span>
          </div>
        </div>

        <p class="text-slate-600 leading-normal font-light">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>
