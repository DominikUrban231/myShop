import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, addToCart, updateQuantity } from '../store/cartSlice';
import styled from 'styled-components';

const CartPage = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item: any) => item.id === id);
    if (item) {
      const updatedItem = { product: item, quantity: 1 };
      dispatch(addToCart(updatedItem));
    }
  };
  
  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item: any) => item.id === id);
    if (item && item.quantity > 1) {
      const updatedItem = { product: item, quantity: -1 };
      dispatch(addToCart(updatedItem));
    }
  };
  
  const handleChangeQuantity = (id: number, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0);
  };

  const totalCost = calculateTotal();

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h1>Koszyk</h1>
        {cartItems.length === 0 ? (
          <EmptyCartMessage>
            <p>Twój koszyk jest pusty.</p>
            <p>Dodaj produkty, aby kontynuować zakupy.</p>
          </EmptyCartMessage>
        ) : (
          <CartItems>
            {cartItems.map((item: any) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.title} />
                <ItemDetails>
                  <h3>{item.title}</h3>
                  <p>Cena: ${item.price}</p>
                  <p>Kwota: ${item.price * item.quantity}</p>
                  <QuantityControl>
                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleChangeQuantity(item.id, Number(e.target.value))}
                    />
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </QuantityControl>
                </ItemDetails>
                <RemoveButton onClick={() => handleRemoveFromCart(item.id)}>
                  Usuń
                </RemoveButton>
              </CartItem>
            ))}
            <TotalPrice>
              <p><strong>Suma: ${totalCost.toFixed(2)}</strong></p>
            </TotalPrice>
            <ClearButton onClick={handleClearCart}>Wyczyść koszyk</ClearButton>
          </CartItems>
        )}
      </Modal>
    </Overlay>
  );
};

export default CartPage;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      background-color: #0056b3;
    }
  }

  input {
    width: 50px;
    text-align: center;
    margin: 0 10px;
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  cursor: default;
`;

const CloseButton = styled.button`
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const CartItems = styled.div`
  margin-top: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  flex: 1;
  padding-left: 15px;
  color: black;
`;

const RemoveButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #cc0000;
  }
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ClearButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin-top: 20px;
`;
