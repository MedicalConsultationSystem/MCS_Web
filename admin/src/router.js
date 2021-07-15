import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: '/index',
            name: 'Index',
            component: () => import('./views/Index.vue'),
            meta: { title: '首页' },
            redirect: '/doctor',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('./views/home/Home'),
                    meta: { title: '首页' }
                },
                {
                    path: '/doctor',
                    name: 'doctor',
                    component: () => import('./views/doctor/Doctor'),
                },
                {
                    path: '/medicine',
                    name: 'medicine',
                    component: () => import('./views/medicine/Medicine'),
                },
                {
                    path: '/dept',
                    name: 'dept',
                    component: () => import('./views/dept/Dept'),
                },
                {
                    path: '/org',
                    name: 'org',
                    component: () => import('./views/org/Org'),
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login/Login')
        }
    ]
})


export default router
