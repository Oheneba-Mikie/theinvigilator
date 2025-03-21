import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Clock,
  Users,
  Eye,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface SessionsPageProps {}

const SessionsPage: React.FC<SessionsPageProps> = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for active sessions
  const activeSessions = [
    {
      id: "session1",
      examName: "Advanced Mathematics",
      institution: "University of Technology",
      startTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      duration: "120 minutes",
      activeStudents: 38,
      totalStudents: 42,
      incidents: 3,
      status: "in-progress",
    },
    {
      id: "session2",
      examName: "Computer Science 101",
      institution: "State University",
      startTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      duration: "90 minutes",
      activeStudents: 36,
      totalStudents: 38,
      incidents: 1,
      status: "in-progress",
    },
    {
      id: "session3",
      examName: "Introduction to Biology",
      institution: "Medical College",
      startTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      duration: "120 minutes",
      activeStudents: 54,
      totalStudents: 56,
      incidents: 0,
      status: "starting",
    },
  ];

  // Mock data for completed sessions
  const completedSessions = [
    {
      id: "session4",
      examName: "World History",
      institution: "Liberal Arts College",
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 180), // 2 days ago + 3 hours
      duration: "180 minutes",
      completedStudents: 28,
      totalStudents: 29,
      incidents: 5,
      status: "completed",
    },
    {
      id: "session5",
      examName: "Organic Chemistry",
      institution: "Science Institute",
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 120), // 3 days ago + 2 hours
      duration: "120 minutes",
      completedStudents: 45,
      totalStudents: 45,
      incidents: 2,
      status: "completed",
    },
  ];

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate time remaining
  const calculateTimeRemaining = (startTime: Date, durationMinutes: number) => {
    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);
    const remaining = endTime.getTime() - Date.now();

    if (remaining <= 0) return "Completed";

    const minutes = Math.floor(remaining / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours > 0 ? `${hours}h ` : ""}${mins}m remaining`;
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            In Progress
          </Badge>
        );
      case "starting":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Starting
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-800">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter sessions based on search query and institution filter
  const filterSessions = (sessions: any[]) => {
    return sessions.filter((session) => {
      const matchesSearch =
        searchQuery === "" ||
        session.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.institution.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesInstitution =
        institutionFilter === "all" ||
        session.institution === institutionFilter;

      return matchesSearch && matchesInstitution;
    });
  };

  const filteredActiveSessions = filterSessions(activeSessions);
  const filteredCompletedSessions = filterSessions(completedSessions);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Exam Sessions</h1>
          <p className="text-slate-500">
            Monitor active and review completed exam sessions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="gap-2">
            <Eye className="h-4 w-4" /> View All
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by exam name or institution..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select
            value={institutionFilter}
            onValueChange={setInstitutionFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by institution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Institutions</SelectItem>
              <SelectItem value="University of Technology">
                University of Technology
              </SelectItem>
              <SelectItem value="State University">State University</SelectItem>
              <SelectItem value="Medical College">Medical College</SelectItem>
              <SelectItem value="Liberal Arts College">
                Liberal Arts College
              </SelectItem>
              <SelectItem value="Science Institute">
                Science Institute
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="active"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="active" className="relative">
            Active Sessions
            <Badge className="ml-2 bg-green-600">
              {filteredActiveSessions.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed Sessions
            <Badge className="ml-2" variant="outline">
              {filteredCompletedSessions.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardContent className="p-0">
              {filteredActiveSessions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No active sessions match your filters
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div className="col-span-2">Exam</div>
                    <div>Institution</div>
                    <div>Start Time</div>
                    <div>Time Remaining</div>
                    <div>Students</div>
                    <div>Actions</div>
                  </div>
                  {filteredActiveSessions.map((session) => (
                    <div
                      key={session.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-2">
                        <div className="font-medium">{session.examName}</div>
                        <div className="flex items-center mt-1">
                          {getStatusBadge(session.status)}
                          {session.incidents > 0 && (
                            <Badge
                              variant="destructive"
                              className="ml-2 flex items-center gap-1"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              {session.incidents}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>{session.institution}</div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-slate-400" />
                        {formatTime(session.startTime)}
                      </div>
                      <div>
                        {calculateTimeRemaining(
                          session.startTime,
                          parseInt(session.duration),
                        )}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-slate-400" />
                        {session.activeStudents}/{session.totalStudents}
                      </div>
                      <div>
                        <Button size="sm" className="w-full">
                          Monitor
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-0">
              {filteredCompletedSessions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No completed sessions match your filters
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div className="col-span-2">Exam</div>
                    <div>Institution</div>
                    <div>Date</div>
                    <div>Duration</div>
                    <div>Completion</div>
                    <div>Actions</div>
                  </div>
                  {filteredCompletedSessions.map((session) => (
                    <div
                      key={session.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-2">
                        <div className="font-medium">{session.examName}</div>
                        <div className="flex items-center mt-1">
                          {getStatusBadge(session.status)}
                          {session.incidents > 0 && (
                            <Badge
                              variant="outline"
                              className="ml-2 flex items-center gap-1 bg-amber-100 text-amber-800"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              {session.incidents} incidents
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>{session.institution}</div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-slate-400" />
                        {formatTime(session.startTime)}
                      </div>
                      <div>{session.duration}</div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        {session.completedStudents}/{session.totalStudents}
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="w-full">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionsPage;
