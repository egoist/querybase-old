import { createRouter, createWebHashHistory } from "vue-router"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/HomeView.vue"),
    },
    {
      path: "/database",
      component: () => import("./views/DatabaseView.vue"),
    },
    {
      path: "/sql-query",
      component: () => import("./views/SqlQueryView.vue"),
    },
  ],
})
