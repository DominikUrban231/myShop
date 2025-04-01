import { Link } from "react-router-dom"
import styled from 'styled-components'


const NotFound = () => (
  <Container>
    <Title>Strona nie znaleziona</Title>
    <StyledLink to="/">Wróć na stronę główną</StyledLink>
  </Container>
)

const Container = styled.div`
  text-align: center;
  padding: 50px;
`

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default NotFound
