import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Travel from "@/views/Travel.vue";
import Aichat from "@/views/AIchat.vue";
import Map from "@/views/Map.vue";
import Profile from "@/views/Profile.vue";
import Detail from '@/components/Detail.vue';
import Login from '@/views/Login.vue';
import Register from "@/views/Register.vue";
import Guest from "@/components/Guest.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/travel", component: Travel },
  { path: "/aichat", component: Aichat },
  { path: "/map", component: Map },
  { path: "/profile", component: Profile },
  { 
    path: "/detail", 
    component: Detail, 
    props: route => ({
      name: route.query.name,
      province: route.query.province,
      eventType: route.query.eventType,
      tel: route.query.tel,
      website: route.query.website,
      detail: route.query.detail,
      imageUrl: route.query.imageUrl,
    }) 
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/guest", component: Guest },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
