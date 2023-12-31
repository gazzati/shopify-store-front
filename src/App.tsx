import React, { useEffect } from "react"

import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "@store/index"
import { getProducts } from "@root/store/products/api"
import Product from "@components/Product"

const App = () => {
  const dispatch = useAppDispatch()

  const { data, loading } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <main>
      {loading && <div>Loading...</div>}
      {data?.length ? (
        <div className="content">
          {data.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        ""
      )}
    </main>
  )
}

export default App
