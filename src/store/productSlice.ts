import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from './types'

interface ProductsState {
  items: Product[]
}

const initialState: ProductsState = {
  items: [],
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
    },
  },
})

// Eksportuj reducer jako domyślny
export const { setProducts } = productsSlice.actions
export default productsSlice.reducer
