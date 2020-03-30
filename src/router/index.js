import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/security/Register.vue";
import Login from "../views/security/Login.vue";
import LoginPassword from "../views/security/LoginPassword.vue";
import Logout from "../views/security/Logout";
import store from "../store";
import Calendar from "../views/Calendar";
import Search from "../views/Search";
import Profil from "../views/Profil";
import firebase from "firebase";
import Debate from "../views/Debate";

Vue.use(VueRouter);

const lazyLoad = view => {
  return () => import(`@/views/${view}.vue`);
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/debate/:uid",
    name: "debat",
    component: Debate,
    meta: {
      pageTitle: "Non reconnu",
      requiresAuth: true
    },
    props: route => ({ debateId: route.params.uid })
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
    meta: {
      pageTitle: "Calendrier",
      requiresAuth: true
    }
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      pageTitle: "Recherche",
      requiresAuth: true
    }
  },
  {
    path: "/profil",
    name: "profil",
    component: Profil,
    meta: {
      pageTitle: "Mon profil",
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
  },
  {
    path: "*",
    component: lazyLoad("PageNotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// TODO ajouter sauvegarde de la route quand la personne n'est plus connectée
router.beforeEach(async (to, from, next) => {
  const isLogged = store.getters.isLogged;
  const isAppReady = await store.getters.isAppReady;
  let currentUser = null;
  if (!isAppReady) {
    currentUser = await new Promise(resolve => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogged && !currentUser) {
      next({ name: "login" });
      return;
    }
    next();
  } else {
    if (isLogged || currentUser) {
      if (to.name) {
        next({ name: "home" });
        return;
      }
    }
    next();
  }
});

export default router;
