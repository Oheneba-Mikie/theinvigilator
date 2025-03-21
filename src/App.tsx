import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  AdminLogin,
  ProctorLogin,
  StudentLogin,
  LoginSelector,
} from "./components/auth";
import AdminDashboard from "./components/admin/AdminDashboard";
import InvigilatorDashboard from "./components/dashboard/InvigilatorDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import ExamInProgress from "./components/student/ExamInProgress";
import ExamComplete from "./components/student/ExamComplete";
import { useRoutes } from "react-router-dom";

// @ts-ignore - Tempo routes will be available at runtime
import routes from "tempo-routes";

const App = () => {
  const [userRole, setUserRole] = useState<
    "admin" | "proctor" | "student" | null
  >(null);

  const handleLogin = (role: "admin" | "proctor" | "student") => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route
          path="/"
          element={
            !userRole ? (
              <LoginSelector onSelectRole={handleLogin} />
            ) : userRole === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : userRole === "proctor" ? (
              <InvigilatorDashboard onLogout={handleLogout} />
            ) : (
              <StudentDashboard onLogout={handleLogout} />
            )
          }
        />
        <Route
          path="/admin-login"
          element={<AdminLogin onLogin={() => handleLogin("admin")} />}
        />
        <Route
          path="/proctor-login"
          element={<ProctorLogin onLogin={() => handleLogin("proctor")} />}
        />
        <Route
          path="/student-login"
          element={<StudentLogin onLogin={() => handleLogin("student")} />}
        />
        <Route path="/exam-in-progress" element={<ExamInProgress />} />
        <Route
          path="/exam-complete"
          element={
            <ExamComplete onReturnToDashboard={() => handleLogin("student")} />
          }
        />

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
};

export default App;
