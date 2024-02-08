'use client'

import { useState } from 'react'

const ImageWithFallback = (props: any) => {
  const { src, fallback } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback)
      }}
    />
  )
}

export default ImageWithFallback
