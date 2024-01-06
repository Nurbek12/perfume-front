import { createStore } from 'vuex'
// import cookie from 'js-cookie'
import { IProduct } from '../interfaces'

export default createStore({
    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user') || "{}"),
        cart: JSON.parse(localStorage.getItem('cart') || "[]"),
        saved: JSON.parse(localStorage.getItem('saved') || "[]"),

        colors: [],
        brands: [],
        categories: [],
    },
    getters: {
        token: state => state.token,
        isLogged: state => !!state.token,
        user: state => state.user,
        userid: state => state.user?._id,
        cart: state => state.cart,
        saved: state => state.saved,

        colors: state => state.colors,
        brands: state => state.brands,
        categories: state => state.categories,
        parent_categories: state => state.categories.filter((c: any) => c.parent === null),
        
        total_cart_sum: state => state.cart.reduce((a: number, b: any) => {
            return a + (b.discount?b.price - (b.price * b.discount / 100):b.price) * b.quantity
        }, 0)
    },
    actions: {},
    mutations: {
        SET_COLORS: (state, payload) => {
            state.colors = payload
        },
        SET_CATEGORIES: (state, payload) => {
            state.categories = payload
        },
        SET_BRANDS: (state, payload) => {
            state.brands = payload
        },
        SET_TOKEN: (state, payload) => {
            state.token = payload
            localStorage.setItem('token', payload)
            // const expires = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);
            // cookie.set('token', payload, { expires })
        },
        SET_USER: (state, payload) => {
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        },
        ADD_TO_CART: (state, item) => {
            const itemIndex = state.cart.findIndex((p: any) => p.id === item.id)

            if(itemIndex < 0) state.cart.push({...item, quantity: 1, 
                selected: item?.units?.[0]?.id || 0
            })
            else state.cart[itemIndex].quantity += 1

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        SET_COLOR_CART: (state, payload: [IProduct, number]) => {
            const [item, selected] = payload
            const itemIndex = state.cart.findIndex((p: any) => p.id === item.id)

            if(itemIndex < 0) state.cart.push({...item, quantity: 1, selected })
            else state.cart[itemIndex].selected = selected
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        REMOVE_TO_CART: (state, item) => {
            const itemIndex = state.cart.findIndex((p: any) => p.id === item.id)
            state.cart[itemIndex].quantity -= 1

            if(state.cart[itemIndex].quantity == 0) state.cart.splice(itemIndex, 1)

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        ADD_TO_SAVE: (state, item) => {
            state.saved.push(item)
            localStorage.setItem('saved', JSON.stringify(state.saved))
        },
        CLEAR_CART: (state) => {
            state.cart = []
            localStorage.removeItem('cart')
        },
        REMOVE_TO_SAVE: (state, item) => {
            const itemIndex = state.saved.findIndex((s: any) => s.id === item.id)
            state.saved.splice(itemIndex, 1)
            localStorage.setItem('saved', JSON.stringify(state.saved))
        },
        LOGOUT: (state) => {
            state.token = ''
            state.user = {}
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            // cookie.remove('token')
            window.location.href = '/login'
        }
    },
})