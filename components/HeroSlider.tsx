'use client'
import { useEffect, useState } from 'react'

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    caption: 'Explore new worlds in our stacks',
  },
  {
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    caption: 'Reading time for kids every week',
  },
  {
    src: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
    caption: 'Quiet spaces for study and focus',
  },
]

export default function HeroSlider() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % slides.length), 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl shadow">
      {slides.map((s, idx) => (
        <img
          key={s.src}
          src={`${s.src}?auto=format&fit=crop&w=1600&q=60`}
          alt={s.caption}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white p-4 text-sm">
        {slides[i].caption}
      </div>
    </div>
  )
}
