import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-1">📍 Our Address</h3>
              <p>DSA Tracker Pvt. Ltd.</p>
              <p>Trimurti Nagar Near PICT Pune, Pune, Maharashtra, India</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">✉️ Email</h3>
              <p>support@dsatracker.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">📞 Phone</h3>
              <p>+91 94202 07903</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">⏰ Working Hours</h3>
              <p>Mon - Fri: 9:00 AM to 6:00 PM</p>
              <p>Sat - Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
