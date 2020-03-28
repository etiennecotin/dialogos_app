import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/security/Register.vue";
import Login from "../views/security/Login.vue";
import LoginPassword from "../views/security/LoginPassword.vue";
import Logout from "../views/security/Logout";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/debate",
    name: "debat",
    component: Home,
    meta: {
      pageTitle: "Non reconnu",
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      anonymous: false
    }
  },
  {
    path: "/login/password",
    name: "loginPaswword",
    component: LoginPassword,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "logout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Logout,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// TODO ajouter sauvegarde de la route quand la personne n'est plus connectée
router.beforeEach((to, from, next) => {
  const isLogged = store.getters.isLogged;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogged) {
      next({ name: "login" });
      return;
    }
    next();
  } else {
    if (isLogged) {
      next({ name: "home" });
      return;
    }
    next();
  }
});

export default router;
