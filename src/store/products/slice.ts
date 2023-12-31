import { createSlice } from "@reduxjs/toolkit"
import { getProducts } from "./api"
import { Product } from "@api/methods"

type ProductsState = {
  data: Product[]
  loading: boolean
}

const initialState: ProductsState = {
  data: [],
  loading: false
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, state => {
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.data = payload || []
        state.loading = false
      })
      .addCase(getProducts.rejected, state => {
        state.loading = false
      })
  }
})

export default productsSlice.reducer
