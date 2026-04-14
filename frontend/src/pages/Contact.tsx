import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "../config/api";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = "951175 7781"; // Replace with real number
  const whatsappMessage = encodeURIComponent("Hello Om Sai Classes, I have a query regarding...");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto space-y-20 bg-white">
      {/* ... existing header ... */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900">Contact Us</h1>
        <p className="text-slate-600 text-lg">Have questions? We're here to help you on your academic journey.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ... existing info section ... */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 space-y-8 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-6 text-slate-600">
                <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Call Us</div>
                  <div className="text-xl font-bold text-slate-900">+91 951175 7781</div>
                  <p className="text-sm text-slate-500">For any query contact on call.</p>
                </div>
              </div>

              <div className="flex items-start gap-6 text-slate-600">
                <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Calling Timings</div>
                  <div className="text-slate-900 font-medium">Mon - Sat: 9:00 AM to 8:00 PM</div>
                  <div className="text-slate-900 font-medium">Sunday: 10:00 AM to 2:00 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-6 text-slate-600">
                <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Us</div>
                  <div className="text-slate-900 font-medium">maheshanap260@gmail.com</div>
                </div>
              </div>

              <div className="flex items-start gap-6 text-slate-600">
                <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center text-brand-blue flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Visit Us</div>
                  <div className="text-slate-900 font-medium">Satral Maharashtra 413711, India</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-200"
              >
                <MessageCircle size={24} />
                Chat on WhatsApp
              </a>
              <a
                href="tel:+919876543210"
                className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200"
              >
                <Phone size={24} />
                Call Now
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 space-y-6 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Send a Message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-green-900">Message Sent!</h3>
                <p className="text-green-700 text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                    placeholder="Course Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-900 focus:ring-2 focus:ring-brand-blue outline-none resize-none transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-red-200 disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      {/* ... existing map section ... */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Find Us on Map</h2>
          <p className="text-slate-600">Visit our main center for a personal consultation.</p>
        </div>
        <div className="w-full h-[450px] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3760.4233045335386!2d74.47376971079544!3d19.523431981699495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcf16ccbc2b243%3A0x69336b57dea64cb!2sOm%20Sai%20Classes!5e0!3m2!1sen!2sin!4v1776161077830!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

