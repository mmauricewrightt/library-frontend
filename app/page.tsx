import HeroSlider from '../components/HeroSlider'

export default function Home() {
  return (
    <section className="space-y-6">
      <HeroSlider />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 border rounded-2xl">
          <h3 className="font-semibold mb-2">General Information</h3>
          <p className="text-sm text-slate-600">Our library offers free membership, study spaces, and weekly community events.</p>
        </div>
        <div className="p-5 border rounded-2xl">
          <h3 className="font-semibold mb-2">Opening Hours</h3>
          <p className="text-sm text-slate-600">Mon–Fri: 9am–6pm • Sat: 10am–4pm • Sun: Closed</p>
        </div>
        <div className="p-5 border rounded-2xl">
          <h3 className="font-semibold mb-2">Membership</h3>
          <p className="text-sm text-slate-600">Sign up for a free account to borrow up to 5 books at a time.</p>
        </div>
      </div>
    </section>
  )
}
