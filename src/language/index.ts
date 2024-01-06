import { createI18n } from 'vue-i18n'
import * as links from './links'
import * as condition from './conditions'
import * as footer from './footer'
import * as products from './products'
import * as home from './home'
import * as admin from './admin'

export default createI18n({
    locale: localStorage.getItem('language') || 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en: {
            links: links.en,
            footer: footer.en,
            admin: admin.en,
            products: products.en,
            condition: condition.en,
            home: home.en,
            price: "Price",
            sum: "sum",
            worktime: "Working Time",
            delivery: "Delivery service",
            total_sum: "Total price",
            no_data: "Empty",
            loading: "Loading",
        },
        ru: {
            links: links.ru,
            footer: footer.ru,
            admin: admin.ru,
            products: products.ru,
            condition: condition.ru,
            home: home.ru,
            price: "Цена",
            sum: "сум",
            worktime: "Рабочее время",
            delivery: "Служба доставки",
            total_sum: "Обшая сумма",
            no_data: "Пусто",
            loading: "Загрузка",
        },
        uz: {
            links: links.uz,
            footer: footer.uz,
            admin: admin.uz,
            products: products.uz,
            condition: condition.uz,
            home: home.uz,
            price: "Narxi",
            sum: "so'm",
            worktime: "Ish vaqti",
            delivery: "Yetkazib berish xizmati",
            total_sum: "Jami summa",
            no_data: "Ma'lumotlar topilmadi",
            loading: "Yuklanyapti",
        }
    }
})