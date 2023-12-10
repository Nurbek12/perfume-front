import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import Index from '../pages/index/Index.vue'
import Home from '../pages/index/Home.vue'
import Cart from '../pages/index/Cart.vue'
// import Saved from '../pages/index/Saved.vue'
import Product from '../pages/index/Product.vue'
import Products from '../pages/index/Products.vue'
// import Login from '../pages/index/Login.vue'
import Profile from '../pages/index/Profile.vue'
import Gifts from '../pages/index/Gifts.vue'
import Brand from '../pages/index/Brands.vue'

// import Admin from '../pages/admin/Admin.vue'
// import Dashboard from '../pages/admin/Dashboard.vue'
// import AdminProducts from '../pages/admin/Products.vue'
// import ProductStorage from '../pages/admin/Storage.vue'
// import Categories from '../pages/admin/Categories.vue'
// import Brands from '../pages/admin/Brands.vue'
// import Clients from '../pages/admin/Clients.vue'
// import Orders from '../pages/admin/Orders.vue'
// import Settings from '../pages/admin/Settings.vue'

const routes: RouteRecordRaw[] = [
    // { 
    //     path: '/', 
    //     component: Index,
    //     children: [
    { path: '/', name: "home", component: Home },
    { path: '/cart', name: "cart", component: Cart },
    { path: '/products', name: "products", component: Products },
    // { path: 'saved', name: "saved", component: Saved },
    // { path: '/login', name: "login", component: Login },
    { path: '/product/:id', name: "product", component: Product },
    { path: '/profile', name: "profile", component: Profile },
    { path: '/gifts', name: "gifts", component: Gifts },
    { path: '/brand/:id', name: "brand", component: Brand },
    //     ]
    // },
    // { 
    //     path: '/admin', 
    //     component: Admin,
    //     children: [
    //         { path: '', name: "dashboard", component: Dashboard },
    //         { path: 'products', name: "products", component: AdminProducts },
    //         { path: 'storage', name: "storage", component: ProductStorage },
    //         { path: 'categories', name: "categories", component: Categories },
    //         { path: 'brands', name: "brands", component: Brands },
    //         { path: 'orders', name: "orders", component: Orders },
    //         { path: 'clients', name: "clients", component: Clients },
    //         { path: 'settings', name: "settings", component: Settings },
    //     ]
    // },
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