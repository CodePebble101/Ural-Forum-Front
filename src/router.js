import { createRouter, createWebHistory } from 'vue-router';
import VideoPlayer from  "@/components/VideoPlayer.vue"


const routes = [
  {
    path: '/',
    name: 'Main',
    component: VideoPlayer, 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;