import Link from 'next/link'

export default function Aside() {
  return (
    <aside className="border rounded-xl p-4 h-fit bg-white">
      <h3 className="font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2">
        <li><Link className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="/books">See Books</Link></li>
        <li><Link className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="/librarians">See Librarians</Link></li>
        <li><Link className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="/signup">Sign Up</Link></li>
        <li><Link className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="/login">Login</Link></li>
      </ul>

      <div className="mt-6 text-sm text-slate-600">
        Welcome! Browse our collection and check upcoming events.
      </div>
    </aside>
  )
}
