import { supabase } from '../../lib/supabase'

export const revalidate = 30 // re-fetch periodically in production

export default async function BooksPage() {
  const { data: books, error } = await supabase
    .from('book')
    .select('*')
    .order('bookID', { ascending: true })

  if (error) {
    return <div className="text-red-600">Failed to load books.</div>
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Books</h1>

      {!books?.length ? (
        <p className="text-slate-600">No books found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((b: any) => (
            <div key={b.bookID} className="border rounded-xl p-4 bg-white">
              <div className="font-semibold">{b.bookName}</div>
              <div className="text-sm text-slate-600">{b.bookAuthor}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
