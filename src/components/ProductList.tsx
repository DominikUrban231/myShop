import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../store/productSlice'
import { RootState } from '../store/store'
import ProductCard from './ProductCard'
import { Product, ProductListProps } from '../store/types'
import styled from 'styled-components'
import { fetchProducts } from '../services/porductService'

// const ProductList = ({ currentPage }: ProductListProps) => {
//   const dispatch = useDispatch()
//   const products = useSelector((state: RootState) => state.products.items)
//   const productsPerPage = 20
//   console.log(products)

//   useEffect(() => {
//     const loadProducts = async () => {
//       const fetchedProducts = await fetchProducts(currentPage, productsPerPage)
//       dispatch(setProducts(fetchedProducts)) 
//     }

//     loadProducts()
//   }, [currentPage, dispatch])

//   return (
//     <StyledProductList>
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </StyledProductList>
//   )
// }


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