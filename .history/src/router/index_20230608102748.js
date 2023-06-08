import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FluxoDeCaixaView from "../views/FluxoDeCaixaView.vue";
import ProjecoesEMetasView from "../views/ProjecoesEMetasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
