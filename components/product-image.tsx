'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function ProductImage({ src, alt, className }: { src?: string; alt: string; className: string }) {
  const [imageSrc, setImageSrc] = useState(src || '/placeholder.jpg')

  useEffect(() => {
    setImageSrc(src || '/placeholder.jpg')
  }, [src])

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      unoptimized
      onError={() => setImageSrc('/placeholder.jpg')}
      className={className}
    />
  )
}
