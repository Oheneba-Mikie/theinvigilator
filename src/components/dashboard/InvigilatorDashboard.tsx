import React, { useState } from "react";
import Header from "./Header";
import InvigilatorSidebar from "./InvigilatorSidebar";
import StatsSummary from "./StatsSummary";
import LiveTestTakerGrid from "./LiveTestTakerGrid";
import AlertsPanel from "./AlertsPanel";
import UpcomingExams from "./UpcomingExams";
import AIMonitoringPanel from "../monitoring/AIMonitoringPanel";
import FlaggedIncidentsPanel from "../incidents/FlaggedIncidentsPanel";
import ChatInterface from "../communication/ChatInterface";

// Import page components
import SchedulePage from "./pages/SchedulePage";
import SessionsPage from "./pages/SessionsPage";
import UsersPage from "./pages/UsersPage";
import InstitutionsPage from "./pages/InstitutionsPage";
import AccountingPage from "./pages/AccountingPage";
import ReportsPage from "./pages/ReportsPage";
import AccessCodesPage from "./pages/AccessCodesPage";

interface InvigilatorDashboardProps {
  onLogout?: () => void;
}

const InvigilatorDashboard = ({
  onLogout = () => {},
}: InvigilatorDashboardProps) => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [activeView, setActiveView] = useState<
    "dashboard" | "monitoring" | "incidents"
  >("dashboard");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    null,
  );
  const [showChat, setShowChat] = useState<boolean>(false);
  const [chatStudentId, setChatStudentId] = useState<string | null>(null);

  // Handle viewing student details
  const handleViewStudentDetails = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveView("monitoring");
  };

  // Handle viewing alerts
  const handleViewAlerts = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveView("monitoring");
  };

  // Handle sending message to student
  const handleSendMessage = (studentId: string) => {
    setChatStudentId(studentId);
    setShowChat(true);
  };

  // Handle viewing alert details
  const handleViewAlert = (alertId: string) => {
    setSelectedIncidentId(alertId);
    setActiveView("incidents");
  };

  // Handle contacting student from alert
  const handleContactStudent = (alertId: string) => {
    // In a real app, you would get the student ID associated with this alert
    const studentId = "student-" + alertId;
    setChatStudentId(studentId);
    setShowChat(true);
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    setActiveView("dashboard");
    setSelectedStudentId(null);
    setSelectedIncidentId(null);
  };

  // Handle closing chat
  const handleCloseChat = () => {
    setShowChat(false);
    setChatStudentId(null);
  };

  // Handle sidebar navigation
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === "dashboard") {
      setActiveView("dashboard");
    }
  };

  // Render the appropriate content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        if (activeView === "dashboard") {
          return (
            <div className="space-y-6">
              <StatsSummary />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LiveTestTakerGrid
                    onViewDetails={handleViewStudentDetails}
                    onSendMessage={handleSendMessage}
                    onViewAlerts={handleViewAlerts}
                  />
                </div>
                <div className="space-y-6">
                  <AlertsPanel
                    onViewAlert={handleViewAlert}
                    onDismissAlert={(alertId) =>
                      console.log("Dismiss alert", alertId)
                    }
                    onContactStudent={handleContactStudent}
                  />
                  <UpcomingExams />
                </div>
              </div>
            </div>
          );
        } else if (activeView === "monitoring" && selectedStudentId) {
          return (
            <AIMonitoringPanel
              studentId={selectedStudentId}
              studentName={`Student ${selectedStudentId}`}
              examName="Current Exam"
              onBack={handleBackToDashboard}
            />
          );
        } else if (activeView === "incidents") {
          return (
            <FlaggedIncidentsPanel
              onAction={(action, incidentId) => {
                console.log(`Action ${action} taken on incident ${incidentId}`);
                if (action === "contact") {
                  handleContactStudent(incidentId);
                }
              }}
            />
          );
        }
        break;
      case "schedule":
        return <SchedulePage />;
      case "sessions":
        return <SessionsPage />;
      case "users":
        return <UsersPage />;
      case "institutions":
        return <InstitutionsPage />;
      case "accounting":
        return <AccountingPage />;
      case "reports":
        return <ReportsPage />;
      case "access-codes":
        return <AccessCodesPage />;
      case "tools":
      case "utilities":
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow-sm border h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                {activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1).replace("-", " ")}
              </h2>
              <p className="text-slate-500">
                This section is under development. Please check back later.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <InvigilatorSidebar
        onNavigate={handleNavigate}
        activeSection={
          activeSection === "dashboard" ? activeView : activeSection
        }
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          adminName="The Invigilator"
          adminEmail="invigilator@example.com"
          onNotificationsClick={() => setActiveView("incidents")}
          onSettingsClick={() => console.log("Settings clicked")}
          onHelpClick={() => console.log("Help clicked")}
          onLogoutClick={onLogout}
        />

        <div className="flex-1 overflow-auto p-6">{renderContent()}</div>
      </div>

      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] z-50">
          <ChatInterface
            studentId={chatStudentId || undefined}
            studentName={`Student ${chatStudentId}`} // In a real app, you would get the actual name
            onClose={handleCloseChat}
          />
        </div>
      )}
    </div>
  );
};

export default InvigilatorDashboard;
