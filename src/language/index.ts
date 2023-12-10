import { createI18n } from 'vue-i18n'
import * as links from './links'
import * as footer from './footer'

export default createI18n({
    locale: localStorage.getItem('language') || 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en: {
            links: links.en,
            footer: footer.en,
            price: "Price",
            sum: "sum",
            worktime: "Working Time",
            delivery: "Delivery service",
            total_sum: "Total price",
            no_data: "Empty",
            products: "Products",
        },
        ru: {
            links: links.ru,
            footer: footer.ru,
            price: "Цена",
            sum: "сум",
            worktime: "Рабочее время",
            delivery: "Служба доставки",
            total_sum: "Обшая сумма",
            no_data: "Пусто",
            products: "Продукты",
        },
        uz: {
            links: links.uz,
            footer: footer.uz,
            price: "Narxi",
            sum: "so'm",
            worktime: "Ish vaqti",
            delivery: "Yetkazib berish xizmati",
            total_sum: "Jami summa",
            no_data: "Ma'lumotlar topilmadi",
            products: "Mahsulotlar",
        }
    }
})