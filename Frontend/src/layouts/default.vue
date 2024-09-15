<template>
  <div class="app-container">
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-content p-4 flex justify-between items-center min-w-80"
    >
      <h1 class="text-2xl font-bold">Tatravel</h1>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center space-x-4">
        <!-- Search Bar -->
        <input
          type="text"
          placeholder="Search books..."
          class="input input-bordered input-primary"
        />
        <router-link
          v-for="tab in tabs"
          :key="tab.path"
          :to="tab.path"
          class="btn btn-ghost"
        >
          <i :class="['fas', tab.icon, 'mr-2']"></i>
          {{ tab.name }}
        </router-link>
      </nav>

      <!--  Search for Mobile  -->
      <div class="ml-5 lg:hidden">
        <input
          type="text"
          placeholder="Search books..."
          class="input input-bordered input-primary max-w-32"
        />
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow pt-4 my-16">
      <slot></slot>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav
      class="btm-nav bg bg-base-100 shadow-lg lg:hidden md:hidden hidden absolute min-w-80"
    >
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button @click="navigate" :class="{ active: isActive }">
          <i
            :class="[
              'fas',
              tab.icon,
              'text-2xl',
              { 'animate-bounce': isActive },
            ]"
          ></i>
          <span class="btm-nav-label">{{ tab.name }}</span>
        </button>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "DefaultLayout",
  setup() {
    const route = useRoute();
    const tabs = ref([
      { name: "Home", icon: "fa-home", path: "/" },
      { name: "Travel", icon: "fa-van-shuttle", path: "/travel" },
      { name: "Chat", icon: "fa-comments", path: "/chat" },
      { name: "Map", icon: "fa-map-marker-alt", path: "/map" },
      { name: "Profile", icon: "fa-user", path: "/profile" },
    ]);

    const dropdowns = ref([
      { name: "Profile", icon: "fa-user", path: "/profile" },
    ]);

    return { tabs};
  },
};
</script>

<style scoped>
.app-container {
  @apply min-h-screen flex flex-col;
}

.btm-nav {
  @apply fixed bottom-0 left-0 right-0 flex justify-around items-center h-16;
}

.btm-nav > button.active {
  @apply bg-primary text-primary-content;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.animate-bounce {
  animation: bounce 0.25s;
}

/* Add this media query to hide btm-nav on desktop sizes */
@media (min-width: 811px) {
  .btm-nav {
    display: none;
  }
}
</style>
