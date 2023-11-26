export interface IUser {
    id?: number
    name: string
    phone: string
    email?: string
    image?: string

    password?: string
}

export interface ICategory {
    id?: number

    name: string

    parent?: ICategory
    children?: ICategory[]
}

export interface IBrand {
    id: number

    name: string
    image: string
}

export interface IProduct {
    id?: number
    title: string
    description: string
    using: string
    image?: string,
    images?: string[]
    thumbnail?: string[]
    
    rate?: {userid: number, rate: number}[] | number

    price: number
    discount: number
    count: number

    reviews?: IReview[]

    category?: ICategory | string
    child_category?: ICategory | string
    d_child_category?: ICategory | string

    publish?: boolean
    brand?: IBrand | string
    surpirce?: boolean
}

export interface IReview {
    user: IUser | number
    text: string
    date: Date | string
    product: IProduct
}

export interface IStorageHistory {
    product: IProduct | number
    count: number
    date: Date
    status: number
}

export interface IOrderItem extends IProduct {
    quantity: number
}

export interface IOrder {
    id?: number
    items: IOrderItem[]
    user: IUser
    date: Date
    total_sum: number
    zip_code: number
    address: string
    status: 'process' | 'delivered' | 'canceled'
}