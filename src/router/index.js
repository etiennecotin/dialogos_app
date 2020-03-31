import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import firebase from "firebase";

Vue.use(VueRouter);

const lazyLoad = view => {
  return () => import(`@/views/${view}.vue`);
};

const routes = [
  {
    path: "/",
    name: "home",
    component: lazyLoad('Home'),
    meta: {
      pageTitle: "Dialogos",
      requiresAuth: true
    }
  },
  {
    path: "/debate/:uid",
    name: "debate",
    component: lazyLoad('Debate'),
    meta: {
      requiresAuth: true
    },
    props: route => ({ debateId: route.params.uid })
  },
  {
    path: "/calendar",
    name: "calendar",
    component: lazyLoad('Calendar'),
    meta: {
      pageTitle: "Calendrier",
      requiresAuth: true
    }
  },
  {
    path: "/search",
    name: "search",
    component: lazyLoad('Search'),
    meta: {
      pageTitle: "Recherche",
      requiresAuth: true
    }
  },
  {
    path: "/profil",
    name: "profil",
    component: lazyLoad('Profil'),
    meta: {
      pageTitle: "Mon profil",
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: lazyLoad('security/Login'),
    meta: {
      anonymous: false
    }
  },
  {
    path: "/login/password",
    name: "loginPaswword",
    component: lazyLoad('security/LoginPassword'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: lazyLoad('security/Register'),
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
    component: lazyLoad('security/Logout'),
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
