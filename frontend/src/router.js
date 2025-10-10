import { createRouter, createWebHistory } from "vue-router";
import Atendimento from "./views/Atendimento.vue";
import Cozinha from "./views/Cozinha.vue";
import Despachante from "./views/Despachante.vue";

const routes = [
  { path: "/", redirect: "/atendimento" },
  { path: "/atendimento", component: Atendimento },
  { path: "/cozinha", component: Cozinha },
  { path: "/despachante", component: Despachante },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
