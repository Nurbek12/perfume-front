export const languages = [
    { lang: 'en', img: '/flag/us.svg', title: "English" },
    { lang: 'ru', img: '/flag/ru.svg', title: "Русский" },
    { lang: 'uz', img: '/flag/uz.svg', title: "O'zbekcha" },
]

export const links = [
    'home',
    'products',
    'brands',
]

export const icons2 = [
    { icon: "mdi-airplane", title: "Free Shipping", subtitle: "lorem ipsum dolor emit" },
    { icon: "mdi-diamond-stone", title: "Jobs Rich Free", subtitle: "lorem ipsum dolor emit" },
    { icon: "mdi-coffee", title: "Support 24/7", subtitle: "lorem ipsum dolor emit" },
    { icon: "mdi-anchor", title: "100% Safe", subtitle: "lorem ipsum dolor emit" },
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