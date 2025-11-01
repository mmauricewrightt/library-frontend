export default function AboutPage() {
  return (
    <section className="space-y-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">About Our Library</h1>
        <p className="text-slate-600">
          We serve our community with books, study spaces, programs, and a welcoming space for learners of all ages.
        </p>
      </header>

      {/* Two feature cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60"
            alt="Bookshelves"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h2 className="font-semibold mb-1">A Home for Readers</h2>
            <p className="text-sm text-slate-600">
              Browse thousands of titles across fiction, non-fiction, and research—plus quiet study areas and free Wi-Fi.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=60"
            alt="Children reading"
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h2 className="font-semibold mb-1">Community & Programs</h2>
            <p className="text-sm text-slate-600">
              Join weekly story time, workshops, and tutoring. Everyone is welcome—memberships are free.
            </p>
          </div>
        </div>
      </div>

      {/* Quick highlights */}
      <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
        <li className="border rounded-xl p-4 bg-white">📚 Lending services & holds</li>
        <li className="border rounded-xl p-4 bg-white">🧒 Children’s story time</li>
        <li className="border rounded-xl p-4 bg-white">💻 Public computers & Wi-Fi</li>
        <li className="border rounded-xl p-4 bg-white">🎓 Workshops & exam prep</li>
      </ul>
    </section>
  )
}
