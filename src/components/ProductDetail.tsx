import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Product } from '../store/types'


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error('Błąd pobierania produktu:', error))
    }
  }, [id])

  if (!product) {
    return <div>Ładowanie...</div>
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Cena: ${product.price.toFixed(2)}</p>
      <button>Dodaj do koszyka</button>
    </div>
  )
}

export default ProductDetail

export {}
