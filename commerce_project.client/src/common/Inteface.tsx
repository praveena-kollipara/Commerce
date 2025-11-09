

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
    IsDeleted: boolean
    //category: any
    //orderItems: any[]
}

export interface ICategories {
    id: number
    name: string
    description: string
}
