interface Product {
    id: number
    description: string
    title: string
    price: number
    image: string
    quantity: number
    stock: number
  }

interface CartState {
items: Product[]
}

interface ProductsState {
items: Product[]
}

interface ProductListProps {
currentPage: number
}

export type { CartState, ProductsState, Product, ProductListProps }