import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import StudentDashboard from "./StudentDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "staff":
      return <StaffDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return <div className="p-20 text-center text-red-500">Invalid Role</div>;
  }
}
