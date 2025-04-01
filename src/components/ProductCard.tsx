import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import styled from 'styled-components';
import { Product } from '../store/types';
import { withNavigation } from '../utils/withNavigation';

interface ProductCardProps {
  product: Product;
  cartItems: any[];
  addToCart: (item: any) => void;
  navigate: (path: string) => void;
}

interface ProductCardState {
  quantity: number;
}

class ProductCard extends Component<ProductCardProps, ProductCardState> {
  constructor(props: ProductCardProps) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  getCurrentProductQuantityInCart = (productId: number) => {
    const productInCart = this.props.cartItems.find((item) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { product, addToCart } = this.props;
    const { quantity } = this.state;
    const currentQuantityInCart = this.getCurrentProductQuantityInCart(product.id);
    
    if (currentQuantityInCart + quantity > product.stock) {
      alert(`Nie możesz dodać więcej niż ${product.stock} sztuk tego produktu do koszyka.`);
      return;
    }

    addToCart({ product, quantity });
  };

  handleNavigateToProduct = () => {
    this.props.navigate(`/product/${this.props.product.id}`);
  };

  handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ quantity: Math.min(Number(e.target.value), this.props.product.stock) });
  };

  render() {
    const { product } = this.props;
    const { quantity } = this.state;

    return (
      <StyledCard onClick={this.handleNavigateToProduct}>
        <StyledImage src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Available products: {product.stock}</p>

        <StyledInput
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={this.handleQuantityChange}
          onClick={(e) => e.stopPropagation()}
        />

        <StyledButton onClick={this.handleAddToCart}>Add to cart</StyledButton>
      </StyledCard>
    );
  }
}

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.items,
});

const mapDispatchToProps = {
  addToCart,
};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ProductCard));

const StyledCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const StyledInput = styled.input`
  width: 50px;
  padding: 5px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;
