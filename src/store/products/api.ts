import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchProducts } from "@api/methods"

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  try {
    const response = await fetchProducts()
    return response.data
  } catch (error) {
    console.log(error)
  }
})
