import { createRouter, createWebHistory } from 'vue-router';
import VideoPlayer from  "@/components/VideoPlayer.vue"
import Final from  "@/components/Final.vue"


const routes = [
  {
    path: '/',
    name: 'Main',
    component: VideoPlayer, 
  },
  {
    path: '/final',
    name: 'Final',
    component: Final, 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;