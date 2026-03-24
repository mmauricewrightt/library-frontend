import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

console.log("Inside backend1111111111111111111111111")
console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Loaded" : "Missing")
console.log("SERVICE ROLE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing")
console.log("RESEND KEY:", process.env.RESEND_API_KEY ? "Loaded" : "Missing")

// ==========================
// 🔐 INITIAL SETUP
// ==========================

// Supabase client with secure service role key (server-side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Email service setup
const resend = new Resend(process.env.RESEND_API_KEY!)


// ==========================
// 🚀 MAIN HANDLER
// ==========================
export async function POST(req: Request) {

  try {
    const formData = await req.formData()

    const firstName = formData.get("firstName") as string
    const lastName  = formData.get("lastName") as string
    const email     = formData.get("email") as string
    const password  = formData.get("password") as string

    const image = formData.get("image") as File | null
    const file  = formData.get("file") as File | null

    // ==========================
    // 🧪 1. VALIDATION SECTION
    // ==========================
    // Checking if all required fields are present and valid

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    console.log("After validation2222222222222222222222222222")
    // ==========================
    // 🔍 2. CHECK IF EMAIL EXISTS
    // ==========================
    // Sending request to database to see if email already exists
    // Here we are listening for a response from Supabase

    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle()

    // Checking if there was an error during query
    if (fetchError) {
      return NextResponse.json(
        { error: 'Error checking existing users.' },
        { status: 500 }
      )
    }

    // Checking response: if user exists, stop process
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists.' },
        { status: 400 }
      )
    }

    console.log("After email exist check3333333333333333333333333")
    // ==========================
    // 🔐 3. HASH PASSWORD
    // ==========================
    // Never store raw passwords

    const hashedPassword = await bcrypt.hash(password, 10)


    // ==========================
    // 💾 4. SAVE USER TO DATABASE
    // ==========================
    // Inserting new user into Account table


    // below is the code to get url for image and save to database

    
    console.log("Before image sorting")


    let imagePath = null

    if (image) {
      imagePath = `profiles/${Date.now()}-${image.name}`
    }

    if (image && imagePath) {
      const { error } = await supabase.storage
        .from('Library_DB_files_imgs')
        .upload(imagePath, image)

      if (error) {
        return NextResponse.json({ error: "image Upload failed" }, { status: 500 })
      }
    }

    console.log("After image sorting")



    // below is the code to get url for file and save to database

    
    console.log("Before file sorting")


    let filePath = null

    if (file) {
      filePath = `files/${Date.now()}-${file.name}`
    }

    if (file && filePath) {
      const { error } = await supabase.storage
        .from('Library_DB_files_imgs')
        .upload(filePath, file)

      if (error) {
        return NextResponse.json({ error: "file Upload failed" }, { status: 500 })
      }
    }

    console.log("After file sorting")





    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          usertype: 'member',
          password: hashedPassword,
          profile_image: imagePath,
          uploaded_file: filePath
        }
      ])

    // Check if insert failed
    if (insertError) {
      return NextResponse.json(
        { error: 'Error creating account.' },
        { status: 500 }
      )
    }

    console.log("After save user to database444444444444444444444444")
    // ==========================
    // 📧 5. SEND CONFIRMATION EMAIL
    // ==========================
    // Sending email after successful signup
    try{
        await resend.emails.send({
        from: 'Library <onboarding@resend.dev>',
        to: "mmauricewrightt@gmail.com",
        subject: 'Welcome to the Library',
        html: `
            <h2>New User to library database!</h2>
            <p>Name: ${firstName} ${lastName}</p>
            <p>Email: ${email}</p>
        `
        })
    }catch(err){
        console.error("Send email error:", err)
    }
    
    console.log("After send email55555555555555555555555555")
    // ==========================
    // ✅ 6. FINAL RESPONSE
    // ==========================
    // Everything worked
    
    console.log("Bout to send final response66666666666666666666")
    
    return NextResponse.json(
      { message: 'Signup successful. Email sent.' },
      { status: 200 }
    )
    
  } catch (err) {

    
    // ==========================
    // ❌ GLOBAL ERROR HANDLER
    // ==========================
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}