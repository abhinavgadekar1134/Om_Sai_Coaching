import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star, Calendar, Award, BookOpen, Users, CheckCircle2, Quote, TrendingUp, ShieldCheck, Zap, MessageCircle, Phone, Book, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { API_BASE_URL } from "../config/api";
import om_sai from "../components/om_sai.png";
export default function Home() {
  const [stats] = useState([
    { label: "Students Enrolled", value: "5000+", icon: <Users className="text-brand-blue" /> },
    { label: "Success Rate", value: "98%", icon: <Award className="text-brand-green" /> },
    { label: "Expert Teachers", value: "10+", icon: <Users className="text-brand-red" /> },
    { label: "Years Experience", value: new Date().getFullYear() - 2014 + "+", icon: <Calendar className="text-brand-blue" /> },
  ]);

  const [apiCourses, setApiCourses] = useState<any[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setApiCourses(data);
        setIsLoadingCourses(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setIsLoadingCourses(false);
      });
  }, []);

  const whyChooseUs = [
    {
      title: "Expert Faculty",
      description: "Learn from highly qualified and experienced teachers who are experts in their fields.",
      icon: <Users className="text-brand-red" />
    },
    {
      title: "Personalized Attention",
      description: "Small batch sizes ensure that every student gets the individual attention they deserve.",
      icon: <ShieldCheck className="text-brand-green" />
    },
    {
      title: "Proven Results",
      description: "Our consistent track record of high success rates speaks for itself.",
      icon: <TrendingUp className="text-brand-blue" />
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art classrooms and digital learning tools for an enhanced experience.",
      icon: <Zap className="text-brand-red" />
    }
  ];

  const successStories = [
    {
      name: "Rahul Sharma",
      achievement: "IIT-JEE AIR 452",
      story: "Om Sai Classes provided the perfect environment for my preparation. The doubt-clearing sessions were a game-changer.",
      image: "https://i.pravatar.cc/150?u=rahul"
    },
    {
      name: "Priya Patel",
      achievement: "NEET 685/720",
      story: "The faculty here is amazing. They don't just teach; they mentor you throughout the journey.",
      image: "https://i.pravatar.cc/150?u=priya"
    },
    {
      name: "Amit Verma",
      achievement: "CET 99.98 Percentile",
      story: "The test series and study material are very comprehensive and aligned with the latest exam patterns.",
      image: "https://i.pravatar.cc/150?u=amit"
    }
  ];

  const whatsappNumber = "9511757781";
  const whatsappMessage = encodeURIComponent("Hello Om Sai Classes, I'm interested in your courses.");

  return (
    <div className="space-y-24 pb-24 relative">
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-200 shadow-xl">
          Chat with us
        </span>
      </a>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
            alt="Coaching Background"
            className="w-full h-full object-cover opacity-5"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-sm font-bold mb-4"
          >
            Admissions Open for 2024-25
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* <div className="absolute inset-0 rounded-full border-4 border-brand-red border-t-brand-green border-r-brand-green animate-spin-slow"></div> */}
              <img src={om_sai} style={{ width: "200px" }} alt="" />
              <Book className="text-brand-blue" size={48} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold tracking-tight text-slate-900"
          >
            Empowering <span className="text-brand-red">Dreams</span>,<br />Achieving <span className="text-brand-green">Excellence</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-brand-green font-bold uppercase tracking-[0.4em] text-lg md:text-2xl"
          >
            Symbol of Success
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Join Om Sai Coaching Classes - Where we nurture talent and guide you towards academic success with {new Date().getFullYear() - 2014 + "+"} years of excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/courses"
              className="px-8 py-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 group shadow-lg shadow-red-200"
            >
              View Our Courses
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              Get in Touch
            </Link>
            <a
              href="https://drive.google.com/your-brochure-link-here"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl transition-all hover:bg-slate-800 flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              <Download size={20} />
              Download Brochure
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8 flex items-center justify-center gap-2 text-slate-400 text-sm font-medium"
          >
            <Phone size={16} className="text-brand-green" />
            For any query contact on call: <span className="text-slate-900 font-bold">+91 98765 43210</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-100 p-8 rounded-2xl text-center space-y-4 hover:border-brand-red/30 transition-colors shadow-sm"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Why Choose Us?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We provide the best environment and resources for your academic growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, i) => (
            <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl space-y-6 hover:bg-slate-50 transition-colors group shadow-sm">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Our Top Courses</h2>
            <p className="text-slate-600">Specialized coaching for various entrance exams and academic levels.</p>
          </div>
          <Link to="/courses" className="text-brand-red font-bold flex items-center gap-2 hover:underline">
            View All Courses <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoadingCourses ? (
            <div className="col-span-1 md:col-span-3 flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            (apiCourses.length > 0 ? apiCourses : courses).slice(0, 3).map((course, i) => {
              const discountedPrice = Math.round(course.price * 0.85);
              return (
                <div key={course._id || course.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden group hover:border-brand-red/50 transition-all flex flex-col shadow-sm">
                  <div className="p-8 space-y-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-blue">
                        <BookOpen size={24} />
                      </div>
                      <div className="bg-brand-red text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                        15% OFF
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-slate-900">{course.title}</h3>
                      <div className="text-xs text-brand-green font-bold uppercase tracking-widest">{course.duration} Program</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 line-through text-lg">₹{course.price.toLocaleString()}</span>
                        <span className="text-slate-900 font-bold text-2xl">₹{discountedPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{course.description}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <CheckCircle2 size={14} className="text-brand-green" />
                        Notes for Each Subject
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <CheckCircle2 size={14} className="text-brand-green" />
                        Expert Mentorship
                      </div>
                    </div>
                  </div>
                  <div className="p-8 pt-0">
                    <Link
                      to="/courses"
                      className="w-full py-4 bg-slate-50 group-hover:bg-brand-red text-slate-900 group-hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Success Stories</h2>
            <p className="text-slate-600">Meet our achievers who made us proud.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-100 p-8 rounded-3xl space-y-6 relative shadow-sm"
              >
                <Quote className="absolute top-6 right-6 text-brand-red/5" size={48} />
                <div className="flex items-center gap-4">
                  <img src={story.image} alt={story.name} className="w-16 h-16 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg">{story.name}</h4>
                    <div className="text-brand-green text-sm font-bold">{story.achievement}</div>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">"{story.story}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Gallery */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Success Gallery</h2>
          <p className="text-slate-600">Glimpses of our celebrations and student achievements.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
          ].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-2xl overflow-hidden group relative"
            >
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-brand-red rounded-[2.5rem] p-16 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-red-200">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-white">Start Your Success Story</h2>
          <p className="text-red-50 text-xl max-w-2xl mx-auto">Don't wait for the right moment. Create it with Om Sai Coaching Classes. Admissions are open!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="px-10 py-5 bg-white text-brand-red font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-xl"
            >
              Enroll Today
            </Link>
            <Link
              to="/contact"
              className="px-10 py-5 bg-red-700 text-white font-bold rounded-2xl hover:bg-red-800 transition-all border border-red-500/30"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



