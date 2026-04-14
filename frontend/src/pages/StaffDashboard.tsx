import React, { useState } from "react";
import { BookOpen, FileText, Calendar, User, Clock, CheckCircle, Upload, Plus } from "lucide-react";
import { motion } from "motion/react";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("academic");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Staff Portal</h2>
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("academic")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "academic" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <BookOpen size={20} />
              Academic
            </button>
            <button
              onClick={() => setActiveTab("personal")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === "personal" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              <User size={20} />
              Personal
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-slate-950">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Staff Dashboard</h1>
              <p className="text-slate-400">Manage your classes and notes.</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Upload size={18} />
              Upload Notes
            </button>
          </header>

          {activeTab === "academic" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Schedule */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Calendar className="text-blue-500" size={20} />
                    Today's Schedule
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { time: "09:00 AM", subject: "Mathematics", class: "12th Standard", room: "Room 101" },
                    { time: "11:30 AM", subject: "Physics", class: "11th Standard", room: "Room 203" },
                    { time: "03:00 PM", subject: "Mathematics", class: "10th Standard", room: "Online" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-blue-400 font-mono text-sm w-20">{item.time}</div>
                      <div className="flex-1">
                        <div className="text-white font-bold">{item.subject}</div>
                        <div className="text-xs text-slate-500">{item.class} • {item.room}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Uploads */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FileText className="text-blue-500" size={20} />
                  Recent Study Notes
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">Calculus Notes Part {i}.pdf</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">12th Maths • 2.4 MB</div>
                        </div>
                      </div>
                      <button className="text-slate-500 hover:text-white">
                        <Clock size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "personal" && (
            <div className="space-y-8">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                  SK
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h2 className="text-2xl font-bold text-white">Sanjay Kumar</h2>
                  <p className="text-slate-400">Senior Mathematics Faculty</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full">Employee ID: OS-042</span>
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">Active Status</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="font-bold text-white">Salary History</h3>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-slate-950/50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Month</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      { month: "September 2023", amount: "₹45,000", status: "Paid", date: "Oct 01, 2023" },
                      { month: "August 2023", amount: "₹45,000", status: "Paid", date: "Sep 02, 2023" },
                    ].map((item, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 text-sm text-white">{item.month}</td>
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
