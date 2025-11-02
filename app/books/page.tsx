'use client'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Book = { bookid: number; bookname: string; bookauthor: string }

export default function BooksPage() {
  const [q, setQ] = useState('')
  const [data, setData] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('book')
        .select('*')
        .order('bookid', { ascending: true })
      if (cancelled) return
      if (error) setError(error.message)
      else setData(data || [])
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter(b =>
      [b.bookname, b.bookauthor].some(x => x?.toLowerCase().includes(term))
    )
  }, [q, data])

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
            {loading ? (
              <tr><td className="p-3" colSpan={3}>Loading…</td></tr>
            ) : error ? (
              <tr><td className="p-3 text-red-600" colSpan={3}>Error: {error}</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td className="p-3 text-slate-500" colSpan={3}>No books found.</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b.bookid} className="border-t">
                  <td className="p-3">{b.bookid}</td>
                  <td className="p-3">{b.bookname}</td>
                  <td className="p-3">{b.bookauthor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
