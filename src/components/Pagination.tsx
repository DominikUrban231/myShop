import styled from 'styled-components'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
`

const Button = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
  color: ${({ disabled }) => (disabled ? '#666' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')};
  }

  &:focus {
    outline: none;
  }
`

const PageInfo = styled.span`
  font-size: 1rem;
  color: #333;
`

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <PaginationWrapper>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Poprzednia
      </Button>
      <PageInfo>
        Strona {currentPage} z {totalPages}
      </PageInfo>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Następna
      </Button>
    </PaginationWrapper>
  )
}

export default Pagination
