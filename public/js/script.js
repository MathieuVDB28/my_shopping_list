const routes = [
  { path: "/", component: Home },
  { path: "/list", component: List },
  { path: "/categories", component: Categories },
  { path: "/addCategorie", component: addCategorie },
  { path: "/register", component: Register },
  { path: "/add", component: Addproduct },
  { path: "/login", component: Login },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const vueApp = {
  methods: {
    logout() {
      localStorage.removeItem("user_token");
      this.$router.push("/login");
      console.log("logout");
    },
  },
};

const app = Vue.createApp(vueApp);
app.use(router);

window.addEventListener("DOMContentLoaded", () => {
  app.mount("#myapp");
});
