import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import { useStore } from "vuex";
import { store } from "@/store";
import { ActionModule } from "@/store/users/action-types";
import { GetterTypes } from "@/store/users/getter-types";

// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

// Create the router instance and pass the `routes` option
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  //const { authState } = useAuthStore(router.pinia);

  // Check if user is already logged in
  const authDetails =
    store.getters[`${ActionModule}/${GetterTypes.GET_AUTH_DETAILS}`];

  // Check if auth details have not defined
  if (
    to &&
    to.path !== "/signin" &&
    to.path !== "/signup" &&
    (!authDetails || Object.keys(authDetails).length === 0)
  ) {
    // Redirect to sign in page
    router.push({ path: "/signin" });
  }

  next();
});

export default router;
