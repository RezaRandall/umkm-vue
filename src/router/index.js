//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "umkms.index",
    component: () => import("../views/umkms/index.vue"),
  },
  {
    path: "/create",
    name: "umkms.create",
    component: () => import("../views/umkms/create.vue"),

    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const loggedIn = localStorage.getItem("loggedIn");
      if (role !== "admin" || loggedIn !== "true") {
        // if not admin or not login, redirect to login page
        next({ name: "auth.login" });
      } else {
        // if admin already login, return to index page
        next();
      }
    },
  },
  {
    path: "/edit/:id",
    name: "umkms.edit",
    component: () => import("../views/umkms/edit.vue"),
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem("role");
      const loggedIn = localStorage.getItem("loggedIn");
      if (role !== "admin" || loggedIn !== "true") {
        // if not admin or not login, redirect to login page
        next({ name: "auth.login" });
      } else {
        // if admin already login, return to index page
        next();
      }
    },
  },
  {
    path: "/detail/:id",
    name: "umkms.detail",
    component: () => import("../views/umkms/detail.vue"),
  },
  {
    path: "/login",
    name: "auth.login",
    component: () => import("../views/auth/Login.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
