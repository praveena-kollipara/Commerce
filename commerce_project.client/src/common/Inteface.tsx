export interface ICategories {
    id: number
    name: string
    description: string
    //products: any[]
}

export interface IProducts {
    id: number
    name: string
    description: string
    price: number
    categoryId: number
    stockQuantity: number
    brand: string
    publishedDate: string
    rating: number
    isActive: boolean
    //category: any
    //orderItems: any[]
}
