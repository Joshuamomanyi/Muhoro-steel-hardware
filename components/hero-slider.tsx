'use client'

import { useEffect, useState } from 'react'

const images = [
  '/muhoro-delivery.jpg',
  '/hardware 1.jpg',
  '/hardware 2.jpg',
  '/hardware 3.jpg',
  '/Hardware 4.jpg',
]

export function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 2000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-steel" aria-hidden="true">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === active ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,46,84,.98)_0%,rgba(3,46,84,.86)_45%,rgba(3,46,84,.28)_100%)]" />
    </div>
  )
}
