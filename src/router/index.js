import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";
import Home from "@/components/home.vue";
import { getAuth } from 'firebase/auth'
import firebaseApp from '@/firebase'

const routes = [
  { path: "/login", component: Login, meta: { requiresGuest: true } },
  { path: "/register", component: Register, meta: { requiresGuest: true } },
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let authReady = false

router.beforeEach(async (to, from, next) => {
  const auth = getAuth(firebaseApp)

  if (!authReady) {
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged(() => {
        authReady = true
        unsubscribe()
        resolve()
      })
      setTimeout(() => {
        if (!authReady) {
          authReady = true
          unsubscribe()
          resolve()
        }
      }, 1000)
    })
  }

  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresGuest = to.matched.some(r => r.meta.requiresGuest)

  if (requiresGuest && currentUser) {
    next("/home")
    return
  }

  if (requiresAuth && !currentUser) {
    next("/login")
    return
  }

  next()
})

export default router
