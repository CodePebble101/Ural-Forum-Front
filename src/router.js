import { createRouter, createWebHistory } from 'vue-router';
import VideoPlayer from  "@/components/VideoPlayer.vue"
import Final from  "@/components/Final.vue"
import Start from  "@/components/Start.vue"


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Start, 
  },
  {
    path: '/final',
    name: 'Final',
    component: Final, 
  },
  {
    path: '/game',
    name: 'Game',
    component: VideoPlayer,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;