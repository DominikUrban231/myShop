import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { addToCart } from '../store/cartSlice'
import styled from 'styled-components'
import { useState } from 'react'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  )

  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
    }
  };

  if (!product) {
    return <div>
      <h2>Produkt nie został znaleziony.</h2>
    </div>
  }

  return (
    <Container>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price><strong>Cena:</strong> ${product.price}</Price>

      {/* Wybór ilości */}
      <QuantitySelector>
        <label htmlFor="quantity">Ilość: </label>
        <Input
          id="quantity"
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.min(Number(e.target.value), product.stock))}
        />
      </QuantitySelector>

      <AddToCartButton onClick={handleAddToCart}>
        Dodaj do koszyka
      </AddToCartButton>
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  object-fit: cover;
`

const Title = styled.h2`
  font-size: 2rem;
  margin-top: 20px;
`

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
`

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`

const QuantitySelector = styled.div`
  margin-top: 20px;
`

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  width: 50px;
  text-align: center;
  margin-left: 10px;
`

const AddToCartButton = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

export default ProductPage
