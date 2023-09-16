import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import StudentsView from '../views/Student/StudentsView.vue';
import StudentCreate from '../views/Student/StudentCreate.vue';
import StudentEdit from '../views/Student/StudentEdit.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/students',
    name: 'studentsView',
    component: StudentsView
  },
  {
    path: '/student/create',
    name: 'studentCreate',
    component: StudentCreate
  },
  {
    path: '/student/:slug/edit',
    name: 'studentEdit',
    component: StudentEdit
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
