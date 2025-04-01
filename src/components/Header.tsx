import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useState } from 'react'
import styled from 'styled-components'
import Cart from './Cart'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 18px;
`

const CartButton = styled.button`
  position: relative;
  text-decoration: none;
  color: white;
  background: none;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
`

const Header = () => {
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCartClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <HeaderWrapper>
      <StyledLink to="/">Strona główna</StyledLink>
      <CartButton onClick={handleCartClick}>
        Koszyk
        {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
      </CartButton>
      {isModalOpen && <Cart onClose={handleModalClose} isOpen={isModalOpen} />}
    </HeaderWrapper>
  )
}

export default Header
