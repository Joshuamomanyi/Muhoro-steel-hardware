'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const images = [
  '/Muhoro receptiona.jpeg',
  '/muhoro blue products.jpeg',
  '/Muhoro columns and pillars steel.jpeg',
  '/muhoro2.jpeg',
  '/Muhoromabati.jpeg',
  '/Muhoro cardboards.jpeg',
  '/Muhoro binding wire.jpeg',
]

const backgroundImages = [
  '/Muhoro receptiona.jpeg',
  '/Muhoro reception2.jpeg',
  '/Muhoro reception3.jpeg',
  '/Muhoro General banners.jpeg',
  '/Muhoro General stores1.jpeg',
  '/Muhoro General stores2.jpeg',
  '/Muhoro interior look.jpeg',
  '/Muhoro1.jpeg',
  '/muhoro2.jpeg',
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-steel" aria-hidden="true">
      {backgroundImages.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt=""
          fill
          unoptimized
          fetchPriority={index === 0 ? 'high' : 'auto'}
          className={`object-cover transition-opacity duration-1000 ${index === backgroundActive ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-steel/55 sm:bg-[linear-gradient(90deg,rgba(3,46,84,.98)_0%,rgba(3,46,84,.86)_45%,rgba(3,46,84,.28)_100%)]" />
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center px-5 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[48%] sm:px-8">
        <div className="relative h-[190px] w-full max-w-[560px] overflow-hidden border border-white/25 bg-white/10 shadow-2xl sm:h-[min(360px,52vh)] lg:h-[min(460px,68vh)] lg:bg-white">
          {images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt=""
              fill
              unoptimized
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className={`object-contain transition-opacity duration-1000 sm:p-2 ${index === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-steel/10 sm:hidden" />
        </div>
      </div>
    </div>
  )
}
