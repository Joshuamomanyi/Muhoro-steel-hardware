'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const images = [
  '/muhoro-delivery.jpg',
  '/hardware 1.jpg',
  '/hardware 2.jpg',
  '/hardware 3.jpg',
  '/Hardware 4.jpg',
]

const backgroundImages = [
  '/Muhoro new Isuzu.jpg',
  '/Structural Steel.png',
  '/Hardware 6.jpg',
  '/hardware 7.jpg',
  '/hardware 8.jpg',
  '/hardware 9.jpg',
]

export function HeroSlider() {
  const [active, setActive] = useState(0)
  const [backgroundActive, setBackgroundActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setBackgroundActive((current) => (current + 1) % backgroundImages.length), 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-steel" aria-hidden="true">
      {backgroundImages.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt=""
          fill
          unoptimized
          className={`object-cover transition-opacity duration-1000 ${index === backgroundActive ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,46,84,.98)_0%,rgba(3,46,84,.86)_45%,rgba(3,46,84,.28)_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center px-5 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[48%] lg:px-8">
        <div className="relative h-[min(360px,52vh)] w-full max-w-[560px] overflow-hidden lg:h-[min(460px,68vh)] lg:border lg:border-white/25 lg:bg-white lg:shadow-2xl">
          {images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt=""
              fill
              unoptimized
              className={`object-contain transition-opacity duration-1000 lg:p-2 ${index === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
