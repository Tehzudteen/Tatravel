import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Travel from "@/views/Travel.vue";
import Aichat from "@/views/AIchat.vue";
import Map from "@/views/Map.vue";
import Profile from "@/views/Profile.vue";
import Detail from '@/components/Detail.vue';
import Login from '@/views/Login.vue';
import Register from "@/views/Register.vue";


const routes = [
  
  { path: "/", component: Home },
  { path: "/travel", component: Travel },
  { path: "/aichat", component: Aichat },
  { path: "/map", component: Map },
  { path: "/profile", component: Profile },
  { path: "/detail", component: Detail},
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  
]
;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
