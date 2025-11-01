'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/librarians', label: 'Librarians' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/signup', label: 'Sign Up' },
  { href: '/login', label: 'Login' },
]

export default function Header() {
  const pathname = usePathname()
  return (
    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">📚 Library</Link>
        <nav className="hidden md:flex gap-5">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:text-sky-600 ${pathname === n.href ? 'text-sky-600' : 'text-slate-700'}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
