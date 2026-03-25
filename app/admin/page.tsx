'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {

  const router = useRouter()

  // ==========================
  // 🔒 AUTH GUARD
  // ==========================
  console.log("Entering 🔒 AUTH GUARD")

  useEffect(() => {
    const role = localStorage.getItem("role")

    if (role !== "admin") {
      router.push('/')
    }
  }, [])

  // ==========================
  // 🖥️ UI RENDER
  // ==========================
  console.log("Entering 🖥️ UI RENDER (ADMIN DASHBOARD)")

  return (
    <section className="p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ==========================
          📦 DASHBOARD CARDS
      ========================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link href="/admin/books" className="p-6 bg-white shadow rounded-xl hover:bg-slate-100">
          📚 Manage Books
        </Link>

        <Link href="/admin/members" className="p-6 bg-white shadow rounded-xl hover:bg-slate-100">
          👥 Manage Members
        </Link>

        <Link href="/admin/events" className="p-6 bg-white shadow rounded-xl hover:bg-slate-100">
          📅 Manage Events
        </Link>

      </div>

    </section>
  )
}