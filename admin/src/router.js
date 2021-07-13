import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: 'index'
        },
        {
            path: '/index',
            name: 'Index',
            component: () => import('./views/Index.vue'),
            meta: { title: '首页' },
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('./views/home/Home'),
                    meta: { title: '首页' }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login/Login')
        }

    ]
    // mode: "history"
})


export default router
