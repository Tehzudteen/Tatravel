<template>
  <div class="app-container">
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-content p-4 flex justify-between items-center min-w-80"
    >
      <h1 class="text-2xl font-bold">Tatravel</h1>
      <!--  Search  -->
      <div class="mx-3 join ">
        <input
          type="text"
          placeholder="Search books..."
          class="input  input-bordered input-primary join-item max-w-32"
        />
        <button class="btn btn-neutral join-item max-w-1 fa fa-magnifying-glass"style="color: #ffd43b"></button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow pt-4 my-16">
      <slot></slot>
    </main>

    <!-- Mobile Bottom Navigation -->
    <nav
      class="btm-nav bg bg-base-100 text-primary-content shadow-lg lg:hidden md:hidden hidden absolute min-w-80 drop-shadow"
    >
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button @click="navigate " :class="{ active: isActive }">
          <i
            :class="['fas',tab.icon,'text-2xl',{ 'animate-bounce': isActive },]"
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
      { name: "Ai", icon: "fa-poo", path: "/aichat" },
      { name: "Map", icon: "fa-map-location-dot", path: "/map" },
      { name: "Profile", icon: "fa-address-card", path: "/profile" },
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
  @apply bg-primary rounded-t-box text-base-100;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 0.25s;
}


</style>
