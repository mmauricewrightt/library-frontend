'use client'

import { useEffect, useState } from 'react'

// ==========================
// 📦 COMPONENT START
// ==========================
console.log("Entering 📦 MEMBERS COMPONENT")

export default function MembersPage() {

  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState("")

  // ==========================
  // 📥 FETCH USERS
  // ==========================
  console.log("Entering 📥 FETCH USERS")

  async function fetchUsers() {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data.users || [])
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // ==========================
  // 🔍 SEARCH FILTER
  // ==========================
  console.log("Entering 🔍 SEARCH FILTER")

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  // ==========================
  // ❌ DELETE USER
  // ==========================
  console.log("Entering ❌ DELETE USER")

  async function handleDelete(id: string) {

    const confirmDelete = confirm("Are you sure you want to delete this user?")

    if (!confirmDelete) return

    await fetch('/api/admin/users/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    fetchUsers() // refresh table
  }

  // ==========================
  // ✏️ EDIT USER (BASIC)
  // ==========================
  console.log("Entering ✏️ EDIT USER")

  function handleEdit(user: any) {
    alert("Edit functionality coming next step")
  }

  // ==========================
  // ➕ ADD USER
  // ==========================
  console.log("Entering ➕ ADD USER")

  function handleAdd() {
    alert("Add user form coming next step")
  }

  // ==========================
  // 🖥️ UI RENDER
  // ==========================
  console.log("Entering 🖥️ UI RENDER")

  return (
    <section className="p-6">

      <h1 className="text-2xl font-bold mb-4">Manage Members</h1>

      {/* ==========================
          🔍 SEARCH + ADD
      ========================== */}
      <div className="flex gap-4 mb-4">

        <input
          type="text"
          placeholder="Search by email..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>

      </div>

      {/* ==========================
          📊 USERS TABLE
      ========================== */}
      <table className="w-full border">

        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t">

              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.usertype}</td>

              <td className="p-2 flex gap-2">

                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </section>
  )
}