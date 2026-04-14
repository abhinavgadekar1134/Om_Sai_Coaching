import React from "react";
import { motion } from "motion/react";
import { Users, Award, Calendar, BookOpen, Target, Eye, Heart, Shield, Zap, CheckCircle2, Linkedin, Twitter, Mail, Download } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Students Enrolled", value: "2000+", icon: <Users size={24} /> },
    { label: "Success Rate", value: "98%", icon: <Award size={24} /> },
    { label: "Expert Teachers", value: "10+", icon: <Users size={24} /> },
    { label: "Years Experience", value: new Date().getFullYear() - 2014 + "+", icon: <Calendar size={24} /> },
  ];

  const coreValues = [
    { title: "Integrity", description: "We uphold the highest standards of integrity in all our actions.", icon: <Shield className="text-blue-400" /> },
    { title: "Excellence", description: "We strive for excellence in teaching and student support.", icon: <Award className="text-blue-400" /> },
    { title: "Innovation", description: "We embrace innovative teaching methods and technologies.", icon: <Zap className="text-blue-400" /> },
    { title: "Commitment", description: "We are committed to the success and well-being of our students.", icon: <Heart className="text-blue-400" /> },
  ];

  const faculty = [
    {
      name: "Dr. Rajesh Sharma",
      role: "Senior Faculty",
      education: "Ph.D. in Physics (IIT Bombay)",
      subject: "Physics",
      image: "https://i.pravatar.cc/150?u=rajesh"
    },
    {
      name: "Prof. Sunita Gupta",
      role: "Department Head",
      education: "M.Sc. Mathematics (Gold Medalist)",
      subject: "Mathematics",
      image: "https://i.pravatar.cc/150?u=sunita"
    },
    {
      name: "Dr. Anil Verma",
      role: "Specialist Faculty",
      education: "Ph.D. in Organic Chemistry",
      subject: "Chemistry",
      image: "https://i.pravatar.cc/150?u=anil"
    },
    {
      name: "Ms. Priya Das",
      role: "Associate Professor",
      education: "M.Sc. Zoology, B.Ed.",
      subject: "Biology",
      image: "https://i.pravatar.cc/150?u=priya_das"
    },
  ];

  return (
    <div className="space-y-24 pb-24 bg-white">
      {/* ... existing sections ... */}
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900"
          >
            About <span className="text-brand-red">Om Sai Classes</span>
          </motion.h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A legacy of {new Date().getFullYear() - 2014 + "+"} years in shaping the future of thousands of students through quality education and dedicated mentorship.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center pt-4"
          >
            <a
              href="https://drive.google.com/your-brochure-link-here"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-200"
            >
              <Download size={20} />
              Download Admission Brochure
            </a>
          </motion.div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent blur-3xl"></div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-1 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-sm font-bold">
            Our Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">The Story of Om Sai Coaching Classes</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Founded in 2014 by Mr. Mahesh Anap, Om Sai Coaching Classes started with a single classroom and a vision to make quality coaching accessible to every aspiring student. Over the years, we have grown into a premier educational institution known for our rigorous academic standards and student-centric approach.
            </p>
            <p>
              Our journey has been defined by the success of our students. From local school toppers to national-level rankers in JEE and NEET, our alumni have consistently proven that with the right guidance and hard work, anything is possible.
            </p>
            <p>
              Today, we stand as a beacon of excellence, equipped with modern facilities and a team of expert faculty members who are dedicated to nurturing the next generation of leaders and innovators.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden border border-slate-100 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070"
              alt="Classroom"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-brand-red p-8 rounded-3xl shadow-xl hidden md:block">
            <div className="text-4xl font-bold text-white">{new Date().getFullYear() - 2014 + "+"}</div>
            <div className="text-red-100 text-sm">Years of Excellence</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-brand-blue">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200">
            <Eye size={32} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed">
            To be the most trusted and innovative educational institution, recognized globally for empowering students to achieve their highest potential and become responsible global citizens.
          </p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-blue/10 transition-colors"></div>
        </div>
        <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] space-y-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200">
            <Target size={32} />
          </div>
          <h3 className="text-3xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed">
            To provide high-quality, personalized coaching through expert mentorship and modern pedagogical tools, fostering an environment of curiosity, discipline, and academic excellence.
          </p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-blue/10 transition-colors"></div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Our Core Values</h2>
          <p className="text-slate-600">The principles that guide everything we do.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl space-y-4 hover:border-brand-blue/30 transition-colors shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900">{value.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders Section */}
      <section className="bg-brand-red py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <div className="text-center space-y-4 text-white">
            <h2 className="text-3xl md:text-5xl font-bold">Meet Our Founders</h2>
            <p className="text-red-100">The visionary leaders behind Om Sai Coaching Classes.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Founder 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-[3rem] border border-white/10">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1974"
                  alt="Founder 1"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6 text-white">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">Mr. Mahesh Anap</h3>
                  <div className="text-red-200 font-medium italic">Co-Founder & Director</div>
                </div>
                <p className="text-red-50 leading-relaxed text-sm">
                  "Education is not just about learning facts, but training the mind to think. We believe in nurturing the potential of every student."
                </p>
                <div className="flex gap-3">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Linkedin size={18} /></button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Twitter size={18} /></button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Mail size={18} /></button>
                </div>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-[3rem] border border-white/10">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1976"
                  alt="Founder 2"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-6 text-white">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">Mrs. Sonali Anap</h3>
                  <div className="text-red-200 font-medium italic">Co-Founder & Academic Head</div>
                </div>
                <p className="text-red-50 leading-relaxed text-sm">
                  "Our mission is to provide a platform where students can excel academically and grow personally through dedicated mentorship."
                </p>
                <div className="flex gap-3">
                  <a href=""><button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Linkedin size={18} /></button></a>
                  <a href=""><button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Twitter size={18} /></button></a>
                  <a href=""><button className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><Mail size={18} /></button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Faculty */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Meet Our Expert Faculty</h2>
          <p className="text-slate-600">The brilliant minds behind our students' success.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl overflow-hidden group hover:border-brand-blue/50 transition-colors shadow-sm flex flex-col">
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 text-center space-y-3 flex-1 flex flex-col">
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">{member.name}</h4>
                  <p className="text-brand-blue text-sm font-bold">{member.role}</p>
                </div>
                <div className="pt-3 border-t border-slate-50 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education</div>
                  <p className="text-slate-600 text-sm">{member.education}</p>
                </div>
                <div className="pt-3 border-t border-slate-50 space-y-1 mt-auto">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</div>
                  <p className="text-brand-green font-bold text-sm">{member.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

