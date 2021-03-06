import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ 'views/login/LoginPage.vue')
  },
  {
    path: '/MobileLoginTel',
    name: 'MobileLoginTel',
    component: () =>
      import(
        /* webpackChunkName: "login-Mode" */ 'views/login/mobileLogin/Tel.vue'
      )
  },
  {
    path: '/MobileLoginPass',
    name: 'MobileLoginPass',
    component: () =>
      import(
        /* webpackChunkName: "login-Mode" */ 'views/login/mobileLogin/Password.vue'
      )
  },
  {
    path: '/Main/',
    name: 'Main',
    component: () =>
      import(/* webpackChunkName: "main" */ 'views/main/Main.vue'),
    children: [
      {
        path: 'My',
        name: 'My',
        component: () =>
          import(/* webpackChunkName: "main-My" */ 'views/main/my/My.vue')
      },
      {
        path: 'Find',
        name: 'Find',
        component: () =>
          import(/* webpackChunkName: "main-Find" */ 'views/main/find/Find.vue')
      }
    ]
  }
  // {
  //   path: '/SongListDetails',
  //   name: 'SongListDetails',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "main-Find" */ 'views/main/songList/songListDetails'
  //     )
  // }
]

const router = new VueRouter({
  routes
})

export default router
