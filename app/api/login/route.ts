import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// ==========================
// 🔐 INITIAL SETUP
// ==========================
console.log("Entering 🔐 INITIAL SETUP (LOGIN API)")

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ==========================
// 🚀 POST FUNCTION
// ==========================
export async function POST(req: Request) {

  console.log("Entering 🚀 POST FUNCTION (LOGIN API)")

  try {

    // ==========================
    // 📥 RECEIVE USER INPUT
    // ==========================
    console.log("Entering 📥 RECEIVE USER INPUT")

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required.' },
        { status: 400 }
      )
    }

    // ==========================
    // 🔍 FETCH USER FROM DB
    // ==========================
    console.log("Entering 🔍 FETCH USER FROM DB")

    const { data: user, error } = await supabase
      .from('users')
      .select('userid, email, password, usertype')
      .eq('email', email)
      .maybeSingle()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 400 }
      )
    }

    // ==========================
    // 🔐 PASSWORD CHECK
    // ==========================
    console.log("Entering 🔐 PASSWORD CHECK")

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 400 }
      )
    }

    // ==========================
    // ✅ SUCCESS RESPONSE
    // ==========================
    console.log("Entering ✅ SUCCESS RESPONSE")
    

    return NextResponse.json({
      message: "Login successful",
      user: {
        email: user.email,
        role: user.usertype
      }
    })

  } catch (err) {

    console.log("Entering ❌ GLOBAL ERROR HANDLER")

    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}