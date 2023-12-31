import React, { useRef, useEffect } from "react"

import type { Product as ProductType } from "api/methods"

type Props = {
  product: ProductType
}

const EDGE = 200

const Product: React.FC<Props> = ({ product }) => {
  const myCanvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!myCanvas?.current) return

    const canvas = myCanvas.current.getContext("2d")
    const image = new Image()
    ;(image.src = product.image_url),
      (image.onload = () => {
        const wrh = image.width / image.height
        let newWidth = EDGE
        let newHeight = newWidth / wrh
        if (newHeight > EDGE) {
          newHeight = EDGE
          newWidth = newHeight * wrh
        }
        const xOffset = newWidth < EDGE ? (EDGE - newWidth) / 2 : 0
        const yOffset = newHeight < EDGE ? (EDGE - newHeight) / 2 : 0
        canvas?.drawImage(image, xOffset, yOffset, newWidth, newHeight)
      })
  }, [])

  const productBody = product.body_html.replaceAll(/<\s*span[^>]*>[^<]+(http)(.*?)(.png|jpg)<\/span>/g, "")

  return (
    <div className="product">
      <canvas ref={myCanvas} width={EDGE} height={EDGE} />
      <div dangerouslySetInnerHTML={{ __html: productBody }} />
    </div>
  )
}

export default Product
