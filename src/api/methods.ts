import { api } from "./index"

export type Product = {
  id: string
  body_html: string
  image_url: string
}

export const fetchProducts = async () => {
  return api.get<Product[]>("/products")
}
