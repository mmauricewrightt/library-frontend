export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Library. All rights reserved.</div>
        <div className="space-x-4">
          <a className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="/about">About</a>
          <a className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="/contact">Contact</a>
          <a className="text-sky-600 hover:text-sky-700 underline underline-offset-4" href="#">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
