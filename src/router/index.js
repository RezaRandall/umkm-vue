//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
  },
  {
    path: "/umkms",
    name: "umkms.index",
    component: () => import(/* webpackChunkName: "index" */ "../views/umkms/index.vue"),
  },
  {
    path: "/create",
    name: "umkms.create",
    component: () => import(/* webpackChunkName: "create" */ "../views/umkms/create.vue"),
  },
  {
    path: "/edit/:id",
    name: "umkms.edit",
    component: () => import(/* webpackChunkName: "edit" */ "../views/umkms/edit.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
