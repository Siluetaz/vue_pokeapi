import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GenerationView from '../components/GenerationView.vue'
import PokeDetail from '../components/PokeDetail.vue'


export const routes = [
  { path: '/', component: HomeView, name: 'Pokémon' },
  { path: '/pokemon/:name', component: PokeDetail},
  {
    path: '/generations', component: GenerationView, name: 'Generaciones', children: [
      { path: '/generations/1', component: GenerationView, name: 'Generación 1' },
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})