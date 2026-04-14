import React, { useState, useEffect } from "react";
import { Users, BookOpen, CreditCard, FileText, Plus, Edit, Trash2, CheckCircle, Clock, MessageSquare, Mail, Phone, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { token } = useAuth();
  const [stats, setStats] = useState({
    students: 0,
    staff: 0,
    courses: 0,
    revenue: 0,
    totalCollected: 0,
    totalPending: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = { "Authorization": `Bearer ${token}` };

      if (activeTab === "overview") {
        const [uRes, cRes, pRes, sRes] = await Promise.all([
          fetch(`${API_BASE_URL}/users`, { headers }),
          fetch(`${API_BASE_URL}/courses`),
          fetch(`${API_BASE_URL}/payments`, { headers }),
          fetch(`${API_BASE_URL}/students`, { headers })
        ]);
        const uData = await uRes.json();
        const cData = await cRes.json();
        const pData = await pRes.json();
        const sData = await sRes.json();

        setUsers(uData);
        setCourses(cData);
        setPayments(pData);
        setStudents(sData);

        setStats({
          students: uData.filter((u: any) => u.role === "student").length,
          staff: uData.filter((u: any) => u.role === "staff").length,
          courses: cData.length,
          revenue: pData.reduce((acc: number, p: any) => acc + p.amount, 0),
          totalCollected: sData.reduce((acc: number, s: any) => acc + (s.amountPaid || 0), 0),
          totalPending: sData.reduce((acc: number, s: any) => acc + ((s.totalFees || 0) - (s.amountPaid || 0)), 0)
        });
      } else if (activeTab === "students") {
        const [sRes, cRes] = await Promise.all([
          fetch(`${API_BASE_URL}/students`, { headers }),
          fetch(`${API_BASE_URL}/courses`)
        ]);
        setStudents(await sRes.json());
        setCourses(await cRes.json());
      } else if (activeTab === "staff") {
        const res = await fetch(`${API_BASE_URL}/staff-details`, { headers });
        setStaffMembers(await res.json());
      } else if (activeTab === "courses") {
        const res = await fetch(`${API_BASE_URL}/courses`);
        setCourses(await res.json());
      } else if (activeTab === "contacts") {
        const res = await fetch(`${API_BASE_URL}/contacts`, { headers });
        setContacts(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContactStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (err) {
      console.error("Failed to update contact:", err);
    }
  };

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({ title: "", description: "", price: 0, duration: "", batchStartDate: "" });
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", role: "staff" });
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentForm, setStudentForm] = useState({ phone: "", totalFees: 0, amountPaid: 0, admissionDate: "", enrolledCourses: [] as string[] });

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `/api/students/${editingItem._id}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(studentForm)
      });
      setIsStudentModalOpen(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Failed to save student:", err);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Are you sure? This will also delete the user account.")) return;
    try {
      await fetch(`/api/students/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error("Failed to delete student:", err);
    }
  };

  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffForm, setStaffForm] = useState({ department: "", salary: 0, joinDate: "", subjects: "", education: "" });

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `/api/staff-details/${editingItem._id}`;
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(staffForm)
      });
      setIsStaffModalOpen(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error("Failed to save staff:", err);
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (!confirm("Are you sure? This will also delete the user account.")) return;
    try {
      await fetch(`/api/staff-details/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error("Failed to delete staff:", err);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `${API_BASE_URL}/courses/${editingItem._id}` : `${API_BASE_URL}/courses`;
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(courseForm)
      });
      setIsCourseModalOpen(false);
      setEditingItem(null);
      setCourseForm({ title: "", description: "", price: 0, duration: "", batchStartDate: "" });
      fetchData();
    } catch (err) {
      console.error("Failed to save course:", err);
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For simplicity, we only allow creating new staff or updating existing users
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `${API_BASE_URL}/users/${editingItem._id}` : `${API_BASE_URL}/auth/register`;
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userForm)
      });
      setIsUserModalOpen(false);
      setEditingItem(null);
      setUserForm({ name: "", email: "", password: "", role: "staff" });
      fetchData();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <CreditCard size={20} /> },
    { id: "students", label: "Students", icon: <Users size={20} /> },
    { id: "staff", label: "Staff members", icon: <ShieldCheck size={20} /> },
    { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
    { id: "contacts", label: "Inquiries", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      {/* ... existing sidebar ... */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Admin Panel</h2>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
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
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-500">Manage your coaching classes and students.</p>
            </div>
            <div className="flex gap-3">
              {activeTab === "courses" && (
                <button
                  onClick={() => { setEditingItem(null); setCourseForm({ title: "", description: "", price: 0, duration: "", batchStartDate: "" }); setIsCourseModalOpen(true); }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Course
                </button>
              )}
              {activeTab === "students" && (
                <button
                  onClick={() => { setEditingItem(null); setUserForm({ name: "", email: "", password: "", role: "student" }); setIsUserModalOpen(true); }}
                  className="px-4 py-2 bg-brand-green hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Student
                </button>
              )}
              {activeTab === "staff" && (
                <button
                  onClick={() => { setEditingItem(null); setUserForm({ name: "", email: "", password: "", role: "staff" }); setIsUserModalOpen(true); }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Staff
                </button>
              )}
            </div>
          </header>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { label: "Total Students", value: stats.students, icon: <Users className="text-blue-400" />, color: "blue" },
                      { label: "Total Staff", value: stats.staff, icon: <ShieldCheck className="text-purple-400" />, color: "purple" },
                      { label: "Active Courses", value: stats.courses, icon: <BookOpen className="text-indigo-400" />, color: "indigo" },
                      { label: "Total Collected from students", value: `₹${stats.totalCollected.toLocaleString()}`, icon: <CreditCard className="text-brand-green" />, color: "green" },
                      { label: "Total Pending from students", value: `₹${stats.totalPending.toLocaleString()}`, icon: <CreditCard className="text-orange-400" />, color: "orange" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                          {stat.icon}
                        </div>
                        <div>
                          <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Recent Payments</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Student</th>
                            <th className="px-6 py-4 font-semibold">Course</th>
                            <th className="px-6 py-4 font-semibold">Amount</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {payments.slice(0, 5).map((payment) => (
                            <tr key={payment._id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-slate-900">{payment.student?.name}</div>
                                <div className="text-xs text-slate-500">{payment.student?.email}</div>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-600">{payment.course?.title}</td>
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">₹{payment.amount}</td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-green-900/30 text-green-400 text-[10px] font-bold uppercase rounded-md flex items-center gap-1 w-fit">
                                  <CheckCircle size={10} />
                                  {payment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-500">
                                {new Date(payment.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "students" && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Student Management</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">Name</th>
                          <th className="px-6 py-4 font-semibold">Email</th>
                          <th className="px-6 py-4 font-semibold">Fees Status</th>
                          <th className="px-6 py-4 font-semibold">Admission Date</th>
                          <th className="px-6 py-4 font-semibold">Courses Chosen</th>
                          <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                          <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-slate-900">{student.user?.name}</div>
                              <div className="text-xs text-slate-500">{student.phone || "No phone"}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{student.user?.email}</td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="text-xs font-bold text-slate-900">₹{student.amountPaid} / ₹{student.totalFees}</div>
                                <div className="flex items-center gap-2">
                                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-brand-green"
                                      style={{ width: `${Math.min(100, (student.amountPaid / (student.totalFees || 1)) * 100)}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-orange-500 whitespace-nowrap">₹{(student.totalFees - student.amountPaid).toLocaleString()} Left</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              {new Date(student.admissionDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {student.enrolledCourses?.map((c: any) => (
                                  <span key={c._id} className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full">
                                    {c.title}
                                  </span>
                                ))}
                                {(!student.enrolledCourses || student.enrolledCourses.length === 0) && (
                                  <span className="text-xs text-slate-400 italic">No courses</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    setEditingItem(student);
                                    setStudentForm({
                                      phone: student.phone || "",
                                      totalFees: student.totalFees,
                                      amountPaid: student.amountPaid,
                                      admissionDate: student.admissionDate ? new Date(student.admissionDate).toISOString().split('T')[0] : "",
                                      enrolledCourses: student.enrolledCourses?.map((c: any) => c._id || c) || []
                                    });
                                    setIsStudentModalOpen(true);
                                  }}
                                  className="text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                  <Edit size={16} />
                                </button>
                                <button onClick={() => handleDeleteStudent(student._id)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "staff" && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Staff Management</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">Name</th>
                          <th className="px-6 py-4 font-semibold">Department & Education</th>
                          <th className="px-6 py-4 font-semibold">Salary & Subjects</th>
                          <th className="px-6 py-4 font-semibold">Join Date</th>
                          <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {staffMembers.map((staff) => (
                          <tr key={staff._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-slate-900">{staff.user?.name}</div>
                              <div className="text-xs text-slate-500">{staff.user?.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              <div className="font-medium text-slate-900">{staff.department || "General"}</div>
                              <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">{staff.education || "No education info"}</div>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <div className="font-bold text-slate-900">₹{staff.salary?.toLocaleString()}</div>
                              <div className="text-xs text-slate-500 italic">{staff.subjects || "No subjects assigned"}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              {new Date(staff.joinDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-400">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    setEditingItem(staff);
                                    setStaffForm({
                                      department: staff.department || "",
                                      salary: staff.salary,
                                      joinDate: staff.joinDate ? new Date(staff.joinDate).toISOString().split('T')[0] : "",
                                      subjects: staff.subjects || "",
                                      education: staff.education || ""
                                    });
                                    setIsStaffModalOpen(true);
                                  }}
                                  className="text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                  <Edit size={16} />
                                </button>
                                <button onClick={() => handleDeleteStaff(staff._id)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "courses" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course._id} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 group shadow-sm hover:border-blue-200 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                          <BookOpen size={24} />
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingItem(course); setCourseForm({ title: course.title, description: course.description, price: course.price, duration: course.duration, batchStartDate: course.batchStartDate ? new Date(course.batchStartDate).toISOString().split('T')[0] : "" }); setIsCourseModalOpen(true); }}
                            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-all"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course._id)}
                            className="p-2 bg-slate-50 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-500 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{course.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-2">{course.description}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-slate-900">₹{course.price}</div>
                          <div className="text-xs text-slate-500">{course.duration}</div>
                        </div>
                        {course.batchStartDate && (
                          <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                            <Clock size={12} />
                            Batch Starts: {new Date(course.batchStartDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "contacts" && (
                <div className="space-y-6">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 font-bold">
                            {contact.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{contact.name}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1"><Mail size={12} /> {contact.email}</span>
                              {contact.phone && <span className="flex items-center gap-1"><Phone size={12} /> {contact.phone}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={contact.status}
                            onChange={(e) => handleUpdateContactStatus(contact._id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                          <span className="text-xs text-slate-500">{new Date(contact.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{contact.subject || "No Subject"}</div>
                        <p className="text-slate-600 text-sm">{contact.message}</p>
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
                      <MessageSquare size={48} className="mx-auto text-slate-800 mb-4" />
                      <p className="text-slate-500">No inquiries found.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 p-8 rounded-[2rem] w-full max-w-md space-y-6 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-900">{editingItem ? "Edit Course" : "Add New Course"}</h3>
            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Duration</label>
                  <input
                    type="text"
                    required
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g. 6 Months"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Batch Start Date</label>
                <input
                  type="date"
                  value={courseForm.batchStartDate}
                  onChange={(e) => setCourseForm({ ...courseForm, batchStartDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsCourseModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">Save Course</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 p-8 rounded-[2rem] w-full max-w-md space-y-6 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-900">{editingItem ? "Edit User" : `Add New ${userForm.role}`}</h3>
            <form onSubmit={handleSaveUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              {!editingItem && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                  <input
                    type="password"
                    required
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsUserModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors">Save User</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Student Detail Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 p-8 rounded-[2rem] w-full max-w-md space-y-6 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-900">Student Details</h3>
            <p className="text-sm text-slate-500">Edit information for {editingItem?.user?.name}</p>
            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                <input
                  type="text"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Total Fees (₹)</label>
                  <input
                    type="number"
                    value={studentForm.totalFees}
                    onChange={(e) => setStudentForm({ ...studentForm, totalFees: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Amount Paid (₹)</label>
                  <input
                    type="number"
                    value={studentForm.amountPaid}
                    onChange={(e) => setStudentForm({ ...studentForm, amountPaid: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Admission Date</label>
                <input
                  type="date"
                  value={studentForm.admissionDate}
                  onChange={(e) => setStudentForm({ ...studentForm, admissionDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Courses Chosen</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto space-y-2">
                  {courses.map((course: any) => (
                    <label key={course._id} className="flex items-center gap-3 group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={studentForm.enrolledCourses.includes(course._id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setStudentForm(prev => ({
                            ...prev,
                            enrolledCourses: checked
                              ? [...prev.enrolledCourses, course._id]
                              : prev.enrolledCourses.filter(id => id !== course._id)
                          }));
                        }}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">{course.title}</span>
                    </label>
                  ))}
                  {courses.length === 0 && <p className="text-xs text-slate-400 italic">No courses found</p>}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsStudentModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl transition-colors">Save Details</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Staff Detail Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 p-8 rounded-[2rem] w-full max-w-md space-y-6 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-900">Staff Details</h3>
            <p className="text-sm text-slate-500">Edit profile for {editingItem?.user?.name}</p>
            <form onSubmit={handleSaveStaff} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Salary (₹)</label>
                  <input
                    type="number"
                    value={staffForm.salary}
                    onChange={(e) => setStaffForm({ ...staffForm, salary: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
                  <input
                    type="text"
                    value={staffForm.department}
                    onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Joining Date</label>
                <input
                  type="date"
                  value={staffForm.joinDate}
                  onChange={(e) => setStaffForm({ ...staffForm, joinDate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Education</label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc. Physics, B.Ed."
                  value={staffForm.education}
                  onChange={(e) => setStaffForm({ ...staffForm, education: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Subjects</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Physics, Mathematics"
                  value={staffForm.subjects}
                  onChange={(e) => setStaffForm({ ...staffForm, subjects: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsStaffModalOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors">Save Details</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
