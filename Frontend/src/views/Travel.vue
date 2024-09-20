<template>
  <div v-for="items in [1, 2, 3, 4, 5, 6, 7, 8, 9]" class="carousel-item">
    <div class="relative flex flex-2 my-2 mx-2 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
      <div class="relative h-fit w-full m-2.5 overflow-hidden text-white rounded-md">
        <img src="https://i.pinimg.com/originals/87/85/ad/8785ad36346ae3ba48ab80cabd498b8b.gif" class="h-full w-full" />
      </div>
      <div class="p-4 ">
        <div class="flex items-center justify-between mb-2 ">
          <h6 class="text-slate-800 text-xl font-semibold">
            Wooden House, Florida
          </h6>

          <h1 class="text-xs ">
            56km.
          </h1>
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