import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from './store'

const beforeEnter = (_: any, __: any, next: any) => {
    if (!store.getters.isLogged) next('/login')
    else next()
}

const routes: RouteRecordRaw[] = [
    { 
        path: '/', 
        component: () => import('./pages/variant/Index.vue'),
        children: [
            { path: '/', name: "home", component: () => import('./pages/variant/Home.vue') },
            { path: '/products', name: "products", component: () => import('./pages/variant/Products.vue') },
            { path: '/saved', name: "saved", component: () => import('./pages/variant/Saved.vue') },
            { path: '/product/:id', name: "product", component: () => import('./pages/variant/Product.vue') },
            { path: '/brands', name: "brands", component: () => import('./pages/variant/Manufacturers.vue') },
        ]
    },
    { 
        path: '/admin', 
        component: () => import('./pages/admin/Admin.vue'),
        beforeEnter,
        children: [
            { path: '', name: "adminproducts", component: () => import('./pages/admin/Products-Admin.vue') },
            { path: 'categories', name: "admincategories", component: () => import('./pages/admin/Categories.vue') },
            { path: 'brands', name: "adminbrands", component: () => import('./pages/admin/Brands.vue') },
            { path: 'orders', name: "adminorders", component: () => import('./pages/admin/Orders.vue') },
        ]
    },
    { path: '/login', name: 'login', component: () => import('./pages/admin/Login.vue') }
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _, savedPosition) {
        if (to.hash)
            return { el: to.hash }
        else if (savedPosition)
            return savedPosition
        else 
            return { top: 0 }
    }
})