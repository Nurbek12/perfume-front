export interface IUser {
    id: number
    first_name: string
    mobile: string

    password?: string
}

export interface ICategory {
    id?: number

    name: string
    name_uz: string
    name_ru: string
    name_en: string

    parent?: number | null
    children?: ICategory[]
}

export interface IBrand {
    id: number

    name: string
    image: string

    description_en: string 
    description_uz: string   
    description_ru: string 
}

export interface IProductUnit {
    id: number
    color: number
    balance: number
    product: number
    product_title: number
}

export interface IProductColor {
    id: number
    name: string
    hex: string
}

export interface IProduct {
    id?: number
    balance: number
    selected: number
    quantity: number
    title: string
    description: string
    description_uz: string
    description_en: string
    description_ru: string
    using: string
    image?: string,
    images?: any[]
    thumbnail?: string[]
    
    colors: IProductColor[]
    units: IProductUnit[]
    rating?: {userid: number, rate: number}[] | number

    price: number
    discount: number
    count: number

    ratings?: IReview[]

    category: ICategory

    publish?: boolean
    brand?: IBrand
    surpirce?: boolean
}

export interface IReview {
    user: IUser
    review: string
    date?: Date | string
    rate: number
    product: IProduct | number
}

export interface IStorageHistory {
    product: IProduct | number
    count: number
    date: Date
    status: number
}

export interface IOrderItem extends IProduct {
    quantity: number
    product: number
}

export interface IOrder {
    id?: number
    items: IOrderItem[]
    user: IUser | string
    date: Date
    total_sum: number
    zip_code: number
    address: string

    type_delevery: string
    date_delevery: string

    status: 'process' | 'delivered' | 'canceled'
}