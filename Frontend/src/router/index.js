import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Travel from "@/views/Travel.vue";
import Chat from "@/views/Chat.vue";
import Map from "@/views/Map.vue";
import Profile from "@/views/Profile.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/travel", component: Travel },
  { path: "/chat", component: Chat },
  { path: "/map", component: Map },
  { path: "/profile", component: Profile },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
