import React from 'react'

function Contact() {
  return (
   <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-[#04050a] shadow-2xl rounded-xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
        
        {/* Contact Form Section */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get in Touch 📞
          </h2>
          <p className="text-white mb-8">
            We'd love to hear from you. Fill out the form below, and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                required 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="Your Message..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info/Details Section */}
        <div className="lg:w-1/2 bg-gray-400 p-8 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Our Information 🗺️
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="block text-indigo-600">Email:</strong>
              <a href="mailto:info@yourcompany.com" className="hover:underline">laonlink@gmail.com</a>
            </p>
            <p>
              <strong className="block text-indigo-600">Phone:</strong>
              <a href="tel:+1234567890" className="hover:underline">0124696565</a>
            </p>
            <p>
              <strong className="block text-indigo-600">Address:</strong>
              123 Sabbir Lane, Suite 456, Masdair city, TS 78901
            </p>
            
           
            
        
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact