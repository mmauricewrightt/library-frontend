export default function ContactPage() {
  return (
    <section className="prose max-w-none">
      <h1>Contact Us</h1>
      <p>
        Have questions or need help? Get in touch with our library team using
        the form below or through our contact details.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <form className="space-y-4 border rounded-2xl p-5 bg-white shadow">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="border rounded-md p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              placeholder="Type your message here..."
              className="border rounded-md p-2 w-full h-24 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Send Message
          </button>
        </form>

        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Library Contact Info</h2>
          <p>📍 123 Reading Lane, Kingston</p>
          <p>📞 (876) 555-0123</p>
          <p>✉️ info@libraryjamaica.com</p>
          <p>🕒 Mon–Fri: 9 AM – 6 PM</p>
        </div>
      </div>
    </section>
  );
}
