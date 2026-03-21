'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'

// ==========================
// 📦 TYPE DEFINITIONS
// ==========================
type Book = {
  bookid: number
  bookname: string
  bookauthor: string
}

export default function BooksPage() {
  // ==========================
  // 🧠 STATE MANAGEMENT
  // ==========================
  const [q, setQ] = useState('') 
  const [data, setData] = useState<Book[]>([]) // Database books
  const [aiResults, setAiResults] = useState<Book[] | null>(null) // AI Suggested books
  const [loading, setLoading] = useState(true) // DB loading
  const [aiLoading, setAiLoading] = useState(false) // AI thinking state
  const [error, setError] = useState<string | null>(null)

  // ==========================
  // 📚 FETCH FROM SUPABASE (ON MOUNT)
  // ==========================
  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
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

  // ==========================
  // 🔍 LOCAL FILTER (DB SEARCH)
  // ==========================
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter(b =>
      [b.bookname, b.bookauthor].some(x => x?.toLowerCase().includes(term))
    )
  }, [q, data])

  // ==========================
  // 🤖 AI SEARCH LOGIC
  // ==========================
  async function handleAISearch() {
    if (!q.trim()) return
    
    setAiLoading(true)
    setAiResults(null) // Clear old results

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      })

      if (!res.ok) throw new Error("Failed to fetch AI results")

      const result = await res.json()
      
      // result.books comes from the key we defined in the backend prompt
      setAiResults(result.books || [])

    } catch (err) {
      console.error("AI ERROR:", err)
      setError("AI Search failed. Please try again.")
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Library Explorer</h1>

      {/* 🔍 SEARCH BAR SECTION */}
      <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1">
          <input
            className="w-full border rounded-lg p-3 pl-4 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            placeholder="Search database or describe a vibe (e.g. 'happy books')..."
            value={q}
            onChange={e => {
              setQ(e.target.value)
              if (aiResults) setAiResults(null)
            }}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setQ(''); setAiResults(null); }}
            className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-slate-50 transition-colors"
          >
            Clear
          </button>
          
          <button
            onClick={handleAISearch}
            disabled={aiLoading || !q.trim()}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-all ${
              aiLoading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700 active:scale-95'
            }`}
          >
            {aiLoading ? 'Thinking...' : 'AI Search'}
          </button>
        </div>
      </div>

      {/* 📊 DATABASE TABLE */}
      <div className="space-y-2">
        <h2 className="text-sm font-uppercase tracking-wider text-slate-500 font-bold ml-1">
          DATABASE RESULTS
        </h2>
        <div className="overflow-hidden border rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">ID</th>
                <th className="text-left p-4 font-semibold text-slate-600">Title</th>
                <th className="text-left p-4 font-semibold text-slate-600">Author</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td className="p-8 text-center text-slate-400" colSpan={3}>Loading library...</td></tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="p-8 text-center text-slate-500" colSpan={3}>
                    No matches in local database. Try the <b>AI Search</b> button!
                  </td>
                </tr>
              ) : (
                filtered.map(b => (
                  <tr key={b.bookid} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-400">#{b.bookid}</td>
                    <td className="p-4 font-medium text-slate-800">{b.bookname}</td>
                    <td className="p-4 text-slate-600">{b.bookauthor}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✨ AI SUGGESTIONS TABLE (Only shows when results exist) */}
      {aiResults && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-sm font-bold tracking-wider text-amber-600 ml-1 flex items-center gap-2">
            ✨ AI RECOMMENDED
          </h2>
          <div className="overflow-hidden border border-amber-200 rounded-xl bg-amber-50/30 shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-amber-100/50 border-b border-amber-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-amber-800">ID</th>
                  <th className="text-left p-4 font-semibold text-amber-800">Suggested Title</th>
                  <th className="text-left p-4 font-semibold text-amber-800">Author</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {aiResults.map(b => (
                  <tr key={b.bookid} className="hover:bg-amber-50 transition-colors">
                    <td className="p-4 text-amber-400">AI-{b.bookid}</td>
                    <td className="p-4 font-bold text-slate-800">{b.bookname}</td>
                    <td className="p-4 text-slate-600 italic">{b.bookauthor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && <p className="text-center text-red-500 text-sm">⚠️ {error}</p>}
    </section>
  )
}