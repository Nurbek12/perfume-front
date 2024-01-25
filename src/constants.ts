export const languages = [
    { lang: 'en', img: '/static/flag/us.svg', title: "English" },
    { lang: 'ru', img: '/static/flag/ru.svg', title: "Русский" },
    { lang: 'uz', img: '/static/flag/uz.svg', title: "O'zbekcha" },
]

export const links = [
    'home',
    'products',
    'brands',
    // 'adminproducts',
]

export const conditions = [
    { title_uz: "Yangi", title_en: "New", title_ru: 'Новый', value: 'new' },
    { title_uz: "Qutisi ochilgan", title_en: "Openbox", title_ru: 'Открытая коробка', value: 'openbox' },
    { title_uz: "Ta\'mirlangan", title_en: "Refurbished", title_ru: 'Отремонтированный', value: 'refurbished' },
    { title_uz: "Ishlatilgan", title_en: "Used", title_ru: 'Использовал', value: 'used' },
]

export const namerules = [(v: any) => !!v || "Required"]

export const admin_links = [
    // { title: 'Dashboard', icon: 'mdi-chart-bar-stacked', url: '/admin' },
    { title: 'admin.products', icon: 'mdi-package-variant-closed', url: '/admin' },
    // { title: 'Parts', icon: 'mdi-sitemap', url: '/admin/parts' },
    // { title: 'Storage', icon: 'mdi-garage', url: '/admin/storage' },
    { title: 'products.categories', icon: 'mdi-hexagon-multiple', url: '/admin/categories' },
    { title: 'products.brands', icon: 'mdi-hexagon-slice-1', url: '/admin/brands' },
    // { title: 'Prices', icon: 'mdi-gift', url: '/admin/prices' },
    // { title: 'Clients', icon: 'mdi-account-group', url: '/admin/clients' },
    { title: 'admin.orders', icon: 'mdi-shopping', url: '/admin/orders' },
    // { title: 'Settngs', icon: 'mdi-settings', url: '/admin/settings' },
]

export const faqs = [
    {
        question: {
            en:"What types of medical equipment do you offer?",
            uz:"Qanday turdagi tibbiy uskunalarni takliv qilasiz?",
            ru:"Какие виды медицинского оборудования вы предлагаете?",
        },
        answer: {
            en:"Our range includes advanced technologies for the diagnosis, treatment, and prevention of various medical conditions.",
            uz:"Bizning zamonaviy diagnostika texnologiyalarimiz yordamida natijalar eng qisqa vaqt ichida aniqlik va samaradorlikni ta'minlaydi.",
            ru:"Наш ассортимент включает передовые технологии для диагностики, лечения и профилактики различных заболеваний.",
        },
    },
    {
        question: {
            en:"How quickly can I get diagnostic results?",
            uz:"Diagnostika natijalarini qanchalik tez olishim mumkin?",
            ru:"Как быстро можно получить результаты диагностики?",
        },
        answer: {
            en:"With our state-of-the-art diagnostic technologies, results are available in the shortest possible time, ensuring accuracy and effectiveness.",
            uz:"Bizning zamonaviy diagnostika texnologiyalarimiz yordamida natijalar eng qisqa vaqt ichida aniqlik va samaradorlikni ta'minlaydi.",
            ru:"С использованием наших современных технологий диагностики, результаты доступны в кратчайшие сроки, обеспечивая точность и эффективность.",
        },
    },
    {
        question: {
            en:"Can I get a consultation with a doctor about your products?",
            uz:"Mahsulotlaringiz haqida shifokor bilan maslahatlashsam bo'ladimi?",
            ru:"Могу ли я получить консультацию врача о продуктах?",
        },
        answer: {
            en:"Yes, our experienced doctors are ready to provide you with professional consultations. Contact us to schedule a consultation.",
            uz:"Ha, bizning tajribali shifokorlarimiz sizga professional maslahatlar berishga tayyor. Konsultatsiyani rejalashtirish uchun biz bilan bog'laning.",
            ru:"Да, наши опытные врачи готовы предоставить вам профессиональные консультации. Свяжитесь с нами для записи на консультацию.",
        },
    },
    {
        question: {
            en:"Do you provide warranties for your medical equipment?",
            uz:"Tibbiy asbob-uskunalaringizga kafolat berasizmi?",
            ru:"Предоставляют ли вы гарантии на ваше медицинское оборудование?",
        },
        answer: {
            en:"Yes, we offer warranties for all our products. We are confident in the high quality and reliability of our equipment.",
            uz:"Ha, biz barcha mahsulotlarimiz uchun kafolat beramiz. Uskunalarimizning yuqori sifati va ishonchliligiga ishonchimiz komil.",
            ru:"Да, мы предоставляем гарантии на все наши продукты. Мы уверены в высоком качестве и надежности нашего оборудования.",
        },
    },
]

export const home_service_cards = [
    { icon: 'mdi-truck-delivery', title: 'home.card_1_title', subtitle: 'home.card_1_desc' },
    { icon: 'mdi-hammer', title: 'home.card_2_title', subtitle: 'home.card_2_desc' },
    { icon: 'mdi-wrench', title: 'home.card_3_title', subtitle: 'home.card_3_desc' },
    { icon: 'mdi-clock-outline', title: 'home.card_4_title', subtitle: 'home.card_4_desc' },
]