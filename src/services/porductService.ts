import { Product } from "../store/types"

  
  // const fetchProducts = async (currentPage: number, productsPerPage: number): Promise<Product[]> => {
  //   try {
  //     const response = await fetch('https://fakestoreapi.com/products')
  //     const data = await response.json()
  
  //     const start = (currentPage - 1) * productsPerPage
  //     const end = currentPage * productsPerPage
  
  //     return data.slice(start, end).map((product: Omit<Product, 'stock'>) => ({
  //       ...product,
  //       stock: Math.floor(Math.random() * 15) + 1,
  //     }))    
  //   } catch (error) {
  //     console.error('Błąd pobierania produktów:', error)
  //     return []
  //   }
  // }
  
  // export { fetchProducts }

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
  
      return data.map((product: Omit<Product, 'stock'>) => ({
        ...product,
        stock: Math.floor(Math.random() * 15) + 1,
      }))    
    } catch (error) {
      console.error('Błąd pobierania produktów:', error)
      return []
    }
  }
  
  export { fetchProducts }

  