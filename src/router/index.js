import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)
const lazyLoad = (path) => {
  return () => import(/* webpackChunkName: "about" */`../views/${path}.vue`);
}


const routes = [
  {
    path: '/',
    component: lazyLoad('Main'),
    children: [
      {
        path: "/",
        name: 'Home',
        component: lazyLoad('home/Home')
      },
      {
        path: "/open-video/:id",
        name: 'OpenVideo',
        component: lazyLoad('home/OpenVideo'),
        props: true
      }
    ],
  },
  {
    path: '/login',
    component: lazyLoad('login/login'),
    name: 'Login'
  },
  {
    path: '/admin',
    component: lazyLoad('Admin'),
    children: [
      {
        path: '/admin',
        name: "Users",
        component: lazyLoad("users/users")
      },
      {
        path: '/admin/type',
        name: "Type",
        component: lazyLoad("type/types")
      },
      {
        path: '/admin/category',
        name: "Type",
        component: lazyLoad("category/categories")
      },
      {
        path: '/admin/movies',
        name: "Movies",
        component: lazyLoad("movies/movie")
      },
      {
        path: '/admin/playVideo',
        name: "AdminPlayVideo",
        component: lazyLoad("movies/adminPlayMovie")
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem("access_token");
  const publicPages = ["Login", "Home", "OpenVideo"];
  const notPublicPages = !publicPages.includes(to.name);
  let logged = false;
  if (session) {
    logged = true;
  }
  if (logged && !notPublicPages) {
    next("/admin");
  } else if (!logged && notPublicPages) {
    next("/login");
  } else {
    next();
  }
});
export default router
