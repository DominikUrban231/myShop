import styled from 'styled-components'
import ProductList from '../components/ProductList'
import Pagination from '../components/Pagination'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/porductService'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setProducts } from '../store/productSlice'




const Home = () => {
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      dispatch(setProducts(fetchedProducts));
    }
    loadProducts();
  }, [])
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const start = (currentPage - 1) * productsPerPage;
  const end = currentPage * productsPerPage;
  const currentProducts = products.slice(start, end);




  return (
    <Container>
      <Title>Sklep internetowy</Title>
      <ProductList products={currentProducts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`



export default Home
