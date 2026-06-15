/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('catering');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorBox, setErrorBox] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorBox('Please fill out all the fields so we can get in touch.');
      return;
    }
    if (!email.includes('@')) {
      setErrorBox('Please provide a valid email address.');
      return;
    }

    setSubmitted(true);
    setErrorBox('');
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="py-16 bg-[#F4F3EE] border-t border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#606C38] font-bold text-xs uppercase tracking-widest block mb-1">
            Find Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#283618] tracking-tight">
            Stop By & Stay A While
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Located right on Horton Parkway, we are easy to find and have ample comfortable space waitin' for you.
          </p>
        </div>

        {/* Main Columns: Grid with Info / Form & Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Column 1: Info Cards (4/12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Card info */}
            <div className="bg-white rounded-3xl border border-[#EBE6DD] p-6 space-y-6 shadow-xs">
              
              {/* Address details */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#283618]/10 text-[#283618] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#283618] mb-1">South Arrow Coffee</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    102 N Horton Pkwy<br />Chapel Hill, TN 37034
                  </p>
                </div>
              </div>

              {/* Call details */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#DDA15E]/10 text-[#DDA15E] rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#283618] mb-1">Call Our Baristas</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    (931) 364-2233
                  </p>
                </div>
              </div>

              {/* Mail details */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#606C38]/10 text-[#606C38] rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#283618] mb-1">Got Inquiries?</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    hello@southarrowcoffee.com
                  </p>
                </div>
              </div>

              {/* Specific Hours */}
              <div className="flex gap-4 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 bg-stone-100 text-stone-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#283618] mb-1">Business Hours</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li><strong className="text-[#283618]">Mon–Fri:</strong> 6:30 AM – 4:00 PM</li>
                    <li><strong className="text-[#283618]">Saturday:</strong> 7:00 AM – 3:00 PM</li>
                    <li><strong className="text-[#283618]">Sunday:</strong> Closed</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Quick directions info box */}
            <div className="bg-[#606C38]/5 border border-[#606C38]/15 rounded-3xl p-5">
              <h5 className="font-serif font-bold text-sm text-[#283618] flex items-center gap-1.5 mb-2">
                <Navigation className="w-4 h-4 text-[#606C38]" /> Driving Directions
              </h5>
              <p className="text-xs text-[#6C584C] leading-relaxed">
                We are conveniently situated along Hwy 31A (N Horton Pkwy) in North Marshall/Chapel Hill, just minutes south of Henry Horton State Park. Swing in before a trek or on your daily commute to work!
              </p>
            </div>

          </div>

          {/* Column 2: Rich Embedded Google Map (4/12) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EBE6DD] overflow-hidden shadow-xs relative aspect-[4/3] sm:aspect-auto sm:min-h-[350px] flex flex-col justify-between">
            <div className="w-full h-full min-h-[300px] bg-stone-100">
              <iframe
                title="Google Maps Location for South Arrow Coffee Co."
                src="https://maps.google.com/maps?q=102%20N%20Horton%20Pkwy,%20Chapel%20Hill,%20TN%2037034&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
                id="gmap-embed-iframe"
              ></iframe>
            </div>
          </div>

          {/* Column 3: Contact Form (4/12) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#EBE6DD] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#283618] mb-1">Local Message Board</h3>
              <p className="text-xs text-gray-500 mb-6">Need bulk catering, custom mugs, or have questions? Email us directly below.</p>
              
              {submitted ? (
                <div className="bg-emerald-800 text-[#FEFAE0] rounded-2xl p-5 space-y-2 animate-in zoom-in-95 duration-200" id="contact-success-box">
                  <CheckCircle2 className="w-6 h-6" />
                  <h4 className="font-serif font-bold">Message Dispatched!</h4>
                  <p className="text-xs text-stone-200">Thanks for writing to South Arrow! One of our local baristas or managers will reach back within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase block">Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-250 bg-white text-xs"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase block">Email Address</label>
                    <input
                      type="text"
                      placeholder="eleanor@vancefarm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-250 bg-white text-xs"
                    />
                  </div>

                  {/* Topic selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase block">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-250 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="catering">Event & Catering Request</option>
                      <option value="ceramics">Local Pottery Order</option>
                      <option value="employment">Job Openings / Employment</option>
                      <option value="general">General Inquiries</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 uppercase block">Your Message</label>
                    <textarea
                      rows={3}
                      placeholder="Share details of what you need..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-250 bg-white text-xs focus:outline-none"
                    />
                  </div>

                  {errorBox && (
                    <p className="text-red-700 text-xs font-bold">{errorBox}</p>
                  )}

                  <button
                    type="submit"
                    id="contact-form-submit-btn"
                    className="w-full py-3 bg-[#606C38] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-900 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
