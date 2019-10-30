import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Index from '../components/Index.vue'
import Users from '../components/Users/User.vue'
import Rights from '../components/Rights/Rights.vue'
import Roles from '../components/Roles/Roles.vue'
import Categores from '../components/Products/categories.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  {
    path: '/index',
    component: Index,
    children: [
      { path: '/users', name: 'user', component: Users },
      { path: '/rights', name: 'rights', component: Rights },
      { path: '/roles', name: 'roles', component: Roles },
      { path: '/categories', name: 'categories', component: Categores }
    ]
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
