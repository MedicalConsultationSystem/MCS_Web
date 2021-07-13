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

// // 路由守卫
// router.beforeEach((to, from, next) => {
//     const isLogin = !!localStorage.eleToken
//
//     if (to.path === '/login' || to.path === '/register') {
//         next()
//     } else {
//         isLogin ? next() : next('/login')
//     }
// })

export default router
