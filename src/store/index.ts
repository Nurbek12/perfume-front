import { createStore } from 'vuex'
import cookie from 'js-cookie'

export default createStore({
    state: {
        token: cookie.get('token') || '',
        user: JSON.parse(localStorage.getItem('user') || "{}"),
        cart: JSON.parse(localStorage.getItem('cart') || "[]"),
        saved: JSON.parse(localStorage.getItem('saved') || "[]"),

        colors: [],
        categories: [],
    },
    getters: {
        token: state => state.token,
        user: state => state.user,
        userid: state => state.user?._id,
        cart: state => state.cart,
        saved: state => state.saved,

        colors: state => state.colors,
        categories: state => state.categories,
        
        total_cart_sum: state => state.cart.reduce((a: number, b: any) => {
            return a + (b.discount?b.price - (b.price * b.discount / 100):b.price) * b.quantity
        }, 0)
    },
    actions: {},
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.token = payload
            const expires = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);
            cookie.set('token', payload, { expires })
        },
        SET_USER: (state, payload) => {
            state.user = payload
            localStorage.setItem('user', JSON.stringify(payload))
        },
        ADD_TO_CART: (state, item) => {
            const itemIndex = state.cart.findIndex((p: any) => p.id === item.id)

            if(itemIndex < 0) state.cart.push({...item, quantity: 1})
            else state.cart[itemIndex].quantity += 1

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
        REMOVE_TO_SAVE: (state, item) => {
            const itemIndex = state.saved.findIndex((s: any) => s.id === item.id)
            state.saved.splice(itemIndex, 1)
            localStorage.setItem('saved', JSON.stringify(state.saved))
        },
        LOGOUT: (state) => {
            state.token = ''
            state.user = {}
            localStorage.removeItem('user')
            cookie.remove('token')
            window.location.href = '/login'
        }
    },
})