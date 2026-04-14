import React, { useState } from "react";
import { BookOpen, FileText, CreditCard, Calendar, Clock, Download, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student Portal</h2>
          <div className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: <Calendar size={20} /> },
              { id: "courses", label: "My Courses", icon: <BookOpen size={20} /> },
              { id: "notes", label: "Study Notes", icon: <FileText size={20} /> },
              { id: "financials", label: "Payments", icon: <CreditCard size={20} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-slate-950">
        <div className="max-w-6xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
            <p className="text-slate-400">Track your progress and access study materials.</p>
          </header>

          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Notifications / Alerts */}
              <div className="bg-yellow-900/20 border border-yellow-800/50 p-4 rounded-xl flex items-center gap-4 text-yellow-200 text-sm">
                <AlertCircle className="flex-shrink-0" />
                <p>Reminder: Your next installment of ₹2,500 for "JEE Advanced" is due on Oct 25th.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Enrolled Courses */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <BookOpen className="text-blue-500" size={20} />
                    Active Courses
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: "JEE Advanced 2024", progress: 65, instructor: "Sanjay Kumar" },
                      { title: "Physics Crash Course", progress: 30, instructor: "Dr. Mehta" },
                    ].map((course, i) => (
                      <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white font-bold">{course.title}</div>
                            <div className="text-xs text-slate-500">Instructor: {course.instructor}</div>
                          </div>
                          <div className="text-blue-400 font-bold text-sm">{course.progress}%</div>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Classes */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Calendar className="text-blue-500" size={20} />
                    Upcoming Classes
                  </h3>
                  <div className="space-y-4">
                    {[
                      { time: "Tomorrow, 10:00 AM", subject: "Calculus", type: "Offline" },
                      { time: "Oct 16, 02:00 PM", subject: "Quantum Physics", type: "Online" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div className="flex-1">
                          <div className="text-white font-bold text-sm">{item.subject}</div>
                          <div className="text-xs text-slate-500">{item.time} • {item.type}</div>
                        </div>
                        <button className="text-xs text-blue-500 font-medium hover:underline">Join</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 group hover:border-blue-500/50 transition-colors">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Organic Chemistry - Unit {i}</h4>
                    <p className="text-xs text-slate-500">Uploaded by Dr. Sharma • 2 days ago</p>
                  </div>
                  <button className="w-full py-2 bg-slate-800 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "financials" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                  <div className="text-slate-500 text-sm">Total Paid</div>
                  <div className="text-3xl font-bold text-white">₹12,500</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
                  <div className="text-slate-500 text-sm">Pending Dues</div>
                  <div className="text-3xl font-bold text-red-400">₹2,500</div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="font-bold text-white">Payment History</h3>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Transaction ID</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      { id: "TXN-98231", amount: "₹5,000", status: "Paid", date: "Sep 12, 2023" },
                      { id: "TXN-98102", amount: "₹7,500", status: "Paid", date: "Aug 10, 2023" },
                    ].map((item, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 text-sm font-mono text-slate-400">{item.id}</td>
                        <td className="px-6 py-4 text-sm font-bold text-white">{item.amount}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 text-[10px] font-bold uppercase rounded-md">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
