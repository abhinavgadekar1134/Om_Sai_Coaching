import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, BookOpen, Info, Phone, Home as HomeIcon, LayoutDashboard, MapPin, Mail, MessageCircle, Instagram, Facebook, Book } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import om_sai from './om_sai.png'
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white/80 text-slate-900 sticky top-0 z-50 shadow-sm border-b border-slate-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Circular Border (Red and Green) */}
                {/* <div className="absolute inset-0 rounded-full border-2 border-brand-red border-t-brand-green border-r-brand-green"></div> */}
                <img src={om_sai} style={{ width: "200px" }} alt="" />
                {/* Blue Book Icon */}
                <Book className="text-brand-blue relative z-10" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-brand-red leading-none">Om Sai Coaching Classes</span>
                <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] mt-1">Symbol of Success</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-bold text-slate-600 hover:text-brand-red transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-blue text-white hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-bold hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-red text-white hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-red"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-bold bg-brand-blue text-white hover:bg-blue-700 flex items-center gap-3"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left block px-3 py-3 rounded-md text-base font-bold hover:bg-red-50 text-red-600 flex items-center gap-3"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-bold bg-brand-red text-white hover:bg-red-700"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />
      <main>{children}</main>
      <footer className="bg-slate-50 border-t border-slate-200 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-slate-600">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-brand-red border-t-brand-green border-r-brand-green"></div>
                <Book className="text-brand-blue" size={20} />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">Om Sai Classes</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students with quality education and personalized guidance since 2014. Our commitment is your success.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/om_sai_coaching/" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/om_sai_coaching/" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-red hover:text-white hover:border-brand-red transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/9511757781" className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-sm mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-brand-red transition-colors">Home</Link></li>
              <li><Link to="/courses" className="hover:text-brand-red transition-colors">Our Courses</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-sm mb-8">Courses</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/courses" className="hover:text-brand-green transition-colors">IIT-JEE Advanced</Link></li>
              <li><Link to="/courses" className="hover:text-brand-green transition-colors">NEET Medical</Link></li>
              <li><Link to="/courses" className="hover:text-brand-green transition-colors">CET Classes</Link></li>
              <li><Link to="/courses" className="hover:text-brand-green transition-colors">Foundation Batches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-sm mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-red shrink-0" />
                <span>Satral Maharashtra 413711,India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-green shrink-0" />
                <span>+91 9511757781</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-blue shrink-0" />
                <span>maheshanap260@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Om Sai Coaching Classes. <span className="text-brand-green font-bold">Symbol of Success</span>. All rights reserved. <br></br> <br />Developed By Abhinav Gadekar
          </p>
        </div>
      </footer >
    </div >
  );
};


