import './globals.css'
import type { Metadata } from 'next'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Library Portal',
  description: 'A clean library website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 w-full">
          <Aside />
          <main className="min-h-[60vh]">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
