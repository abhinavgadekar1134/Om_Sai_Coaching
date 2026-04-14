import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Clock, CheckCircle, ArrowRight, X, Info, Tag, Calendar, Award, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { courses } from "../data/courses";
import { API_BASE_URL } from "../config/api";

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [apiCourses, setApiCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/courses`)
      .then(res => res.json())
      .then(data => {
        setApiCourses(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch courses:", err);
        setIsLoading(false);
      });
  }, []);

  const handleEnroll = async (course: any) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsEnrolling(true);
    try {
      const discountedPrice = Math.round(course.price * 0.85);
      
      // 1. Create order on backend
      const response = await fetch(`${API_BASE_URL}/razorpay/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ courseId: course._id || course.id, amount: discountedPrice })
      });
      
      if (!response.ok) throw new Error("Failed to create order");
      const order = await response.json();
      
      // 2. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Om Sai Coaching Classes",
        description: `Enrollment for ${course.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          // 3. Verify payment on backend
          const verifyRes = await fetch(`${API_BASE_URL}/razorpay/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
              ...response,
              courseId: course._id || course.id,
              amount: discountedPrice
            })
          });
          
          const result = await verifyRes.json();
          if (result.success) {
            setEnrollmentSuccess(true);
            setTimeout(() => {
              setEnrollmentSuccess(false);
              setSelectedCourse(null);
            }, 3000);
          }
        },
        modal: {
          ondismiss: () => setIsEnrolling(false)
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#e11d48",
        },
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Enrollment failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  const getCardColor = (color: string) => {
    switch (color) {
      case "blue": return "border-brand-blue/10 hover:border-brand-blue bg-brand-blue/[0.02]";
      case "red": return "border-brand-red/10 hover:border-brand-red bg-brand-red/[0.02]";
      case "green": return "border-brand-green/10 hover:border-brand-green bg-brand-green/[0.02]";
      case "emerald": return "border-emerald-500/10 hover:border-emerald-500 bg-emerald-500/[0.02]";
      case "purple": return "border-purple-500/10 hover:border-purple-500 bg-purple-500/[0.02]";
      case "orange": return "border-orange-500/10 hover:border-orange-500 bg-orange-500/[0.02]";
      default: return "border-slate-100 hover:border-blue-500 bg-white";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue": return "text-brand-blue bg-brand-blue/5";
      case "red": return "text-brand-red bg-brand-red/5";
      case "green": return "text-brand-green bg-brand-green/5";
      case "emerald": return "text-emerald-500 bg-emerald-500/5";
      case "purple": return "text-purple-500 bg-purple-500/5";
      case "orange": return "text-orange-500 bg-orange-500/5";
      default: return "text-blue-500 bg-blue-500/5";
    }
  };

  const displayCourses = apiCourses.length > 0 ? apiCourses : (isLoading ? [] : courses);

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto space-y-20 bg-white">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-sm font-bold"
        >
          Special Offer: 15% Discount on All Courses
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight">Our <span className="text-brand-red">Courses</span></h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">Expert-led programs designed to help you achieve your academic goals and crack competitive exams.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course, i) => {
            const discountedPrice = Math.round(course.price * 0.85);
            return (
              <motion.div
                key={course._id || course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCourse(course)}
                className={`cursor-pointer border rounded-[2rem] p-6 space-y-6 flex flex-col transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-xl ${getCardColor(course.color || "blue")}`}
              >
                <div className="absolute top-6 right-6 bg-brand-red text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                  15% OFF
                </div>

                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(course.color || "blue")}`}>
                    <BookOpen size={24} />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900">{course.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={14} className="text-brand-blue" /> {course.duration}</span>
                      {course.batchStartDate && (
                        <span className="flex items-center gap-1 text-brand-green font-bold">
                          <Calendar size={14} /> Batch Starts: {new Date(course.batchStartDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">{course.description}</p>

                <div className="flex flex-wrap gap-3">
                  {(course.features || ["Expert Faculty", "Study Material", "Test Series"]).slice(0, 3).map((feature: string, j: number) => (
                    <span key={j} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-50 mt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle size={14} className="text-brand-green" />
                    Notes for Each Subject
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                    <CheckCircle size={14} className="text-brand-green" />
                    Expert Mentorship
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 line-through text-xs">₹{course.price.toLocaleString()}</span>
                      <span className="text-slate-900 font-bold text-xl">₹{discountedPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Early Bird Offer</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-red-200">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto space-y-8">
                <div className="space-y-4">
                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${getIconColor(selectedCourse.color || "blue")}`}>
                    {selectedCourse.category || "Academic"}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900">{selectedCourse.title}</h2>
                  <div className="flex flex-wrap gap-6 text-slate-500">
                    <div className="flex items-center gap-2"><Clock size={18} className="text-brand-blue" /> {selectedCourse.duration}</div>
                    <div className="flex items-center gap-2"><Tag size={18} className="text-brand-red" /> 15% Discount Applied</div>
                    <div className="flex items-center gap-2"><Calendar size={18} className="text-brand-green" /> {selectedCourse.batchStartDate ? `Batch Starts: ${new Date(selectedCourse.batchStartDate).toLocaleDateString()}` : "New Batch Starts Soon"}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Info size={20} className="text-brand-blue" />
                    About the Course
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{selectedCourse.longDescription || selectedCourse.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle size={20} className="text-brand-green" />
                      What You'll Get
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-600 bg-brand-green/5 p-4 rounded-2xl border border-brand-green/10">
                        <CheckCircle size={16} className="text-brand-green flex-shrink-0" />
                        <span className="text-sm font-bold">Notes for Each Subject (Included)</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 bg-brand-green/5 p-4 rounded-2xl border border-brand-green/10">
                        <CheckCircle size={16} className="text-brand-green flex-shrink-0" />
                        <span className="text-sm font-bold">Expert Mentorship (Included)</span>
                      </div>
                      {(selectedCourse.features || ["Expert Faculty", "Study Material", "Test Series", "Doubt Sessions"]).map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <CheckCircle size={16} className="text-brand-green flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Award size={20} className="text-brand-red" />
                      What You'll Achieve
                    </h3>
                    <div className="space-y-3">
                      {(selectedCourse.achievements || ["Concept Clarity", "Exam Readiness", "Confidence Boost"]).map((achievement: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <Star size={16} className="text-brand-red flex-shrink-0 fill-brand-red" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-brand-blue/5 border border-brand-blue/10 p-6 rounded-3xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                    <Book size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold">Notes for Each Subject</h4>
                    <p className="text-slate-500 text-sm">Comprehensive study materials and handwritten notes provided for all subjects.</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">Total Investment</div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 line-through text-xl">₹{selectedCourse.price.toLocaleString()}</span>
                      <span className="text-slate-900 font-bold text-4xl">₹{Math.round(selectedCourse.price * 0.85).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEnroll(selectedCourse)}
                    disabled={isEnrolling || enrollmentSuccess}
                    className={`px-10 py-5 font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 ${
                      enrollmentSuccess 
                        ? "bg-brand-green text-white shadow-green-200" 
                        : "bg-brand-red hover:bg-red-700 text-white shadow-red-200"
                    } ${isEnrolling ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isEnrolling ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : enrollmentSuccess ? (
                      <>
                        <CheckCircle size={20} />
                        Enrolled Successfully!
                      </>
                    ) : (
                      "Enroll Now"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Star = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);


