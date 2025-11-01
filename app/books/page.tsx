'use client'
import { useMemo, useState } from 'react'

type Book = { bookID: number; bookName: string; bookAuthor: string }

// Start empty; later we’ll fetch from Supabase
const INITIAL: Book[] = []

export default function BooksPage() {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return INITIAL
    return INITIAL.filter(b =>
      [b.bookName, b.bookAuthor].some(x => x?.toLowerCase().includes(term))
    )
  }, [q])

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Books</h1>

      <div className="flex gap-2">
        <input
          className="border rounded-md p-2 w-full"
          placeholder="Search by title or author…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button
          onClick={() => setQ('')}
          className="px-3 py-2 rounded-md border bg-white hover:bg-slate-50"
        >
          Clear
        </button>
      </div>

      <div className="overflow-auto border rounded-xl bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Author</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-slate-500" colSpan={3}>
                  No books yet.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.bookID} className="border-t">
                  <td className="p-3">{b.bookID}</td>
                  <td className="p-3">{b.bookName}</td>
                  <td className="p-3">{b.bookAuthor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
