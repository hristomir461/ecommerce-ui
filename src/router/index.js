import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateCtagory from '../views/Admin/Categories/Create.vue'
import CreateProduct from '../views/Admin/Products/Create.vue'
import AllProducts from '../views/Admin/Products/All.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin/category/create',
    name: 'createCategory',
    component: CreateCtagory
  },
  {
    path: '/admin/product/create',
    name: 'createProduct',
    component: CreateProduct
  },
  {
    path: '/admin/product/all',
    name: 'allProducts',
    component: AllProducts
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
