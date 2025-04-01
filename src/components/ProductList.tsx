import ProductCard from './ProductCard'
import { Product } from '../store/types'
import styled from 'styled-components'

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <StyledProductList>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export default ProductList;