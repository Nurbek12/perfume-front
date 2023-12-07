import { createI18n } from 'vue-i18n'
import * as links from './links'

export default createI18n({
    locale: localStorage.getItem('language') || 'en',
    legacy: false,
    globalInjection: true,
    messages: {
        en: {
            links: links.en,
            price: "Price",
            sum: "sum",
            worktime: "Working Time",
            delivery: "Delivery service",
            total_sum: "Total price",
            no_data: "Empty",
        },
        ru: {
            links: links.ru,
            price: "Цена",
            sum: "сум",
            worktime: "Рабочее время",
            delivery: "Служба доставки",
            total_sum: "Обшая сумма",
            no_data: "Пусто",
        },
        uz: {
            links: links.uz,
            price: "Narxi",
            sum: "so'm",
            worktime: "Ish vaqti",
            delivery: "Yetkazib berish xizmati",
            total_sum: "Jami summa",
            no_data: "Ma'lumotlar topilmadi",
        }
    }
})