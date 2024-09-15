import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Book from "@/views/Book.vue";
import Chat from "@/views/Chat.vue";
import Map from "@/views/Map.vue";
import Profile from "@/views/Profile.vue";


const routes = [
  { path: "/", component: Home },
  { path: "/book", component: Book },
  { path: "/chat", component: Chat },
  { path: "/map", component: Map },
  { path: "/profile", component: Profile },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
