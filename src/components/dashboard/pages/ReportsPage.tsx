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
  Download,
  FileText,
  BarChart4,
  PieChart,
  Calendar,
  Clock,
  Building,
  Eye,
  AlertTriangle,
  Users,
} from "lucide-react";

interface ReportsPageProps {}

const ReportsPage: React.FC<ReportsPageProps> = () => {
  const [activeTab, setActiveTab] = useState("exam");
  const [timeRange, setTimeRange] = useState("last30");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for exam reports
  const examReports = [
    {
      id: "report1",
      name: "Advanced Mathematics Final Exam Report",
      institution: "University of Technology",
      date: new Date(2023, 6, 15),
      students: 42,
      duration: "120 minutes",
      incidents: 3,
      type: "exam",
    },
    {
      id: "report2",
      name: "Computer Science 101 Midterm Report",
      institution: "State University",
      date: new Date(2023, 6, 22),
      students: 38,
      duration: "90 minutes",
      incidents: 1,
      type: "exam",
    },
    {
      id: "report3",
      name: "Introduction to Biology Final Exam Report",
      institution: "Medical College",
      date: new Date(2023, 6, 25),
      students: 56,
      duration: "120 minutes",
      incidents: 5,
      type: "exam",
    },
  ];

  // Mock data for summary reports
  const summaryReports = [
    {
      id: "summary1",
      name: "Monthly Activity Summary - June 2023",
      institution: "All Institutions",
      date: new Date(2023, 6, 1),
      exams: 24,
      students: 845,
      incidents: 37,
      type: "summary",
    },
    {
      id: "summary2",
      name: "University of Technology - Quarterly Report",
      institution: "University of Technology",
      date: new Date(2023, 6, 1),
      exams: 12,
      students: 320,
      incidents: 15,
      type: "summary",
    },
    {
      id: "summary3",
      name: "Incident Analysis Report - Q2 2023",
      institution: "All Institutions",
      date: new Date(2023, 6, 5),
      exams: 45,
      students: 1250,
      incidents: 78,
      type: "summary",
    },
  ];

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter reports based on search query and active tab
  const getFilteredReports = () => {
    const reports = activeTab === "exam" ? examReports : summaryReports;

    return reports.filter((report) => {
      return (
        searchQuery === "" ||
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.institution.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const filteredReports = getFilteredReports();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-slate-500">
            Access and generate exam and system reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" /> Generate Report
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="exam"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="exam" className="gap-2">
            <FileText className="h-4 w-4" /> Exam Reports
          </TabsTrigger>
          <TabsTrigger value="summary" className="gap-2">
            <BarChart4 className="h-4 w-4" /> Summary Reports
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <PieChart className="h-4 w-4" /> Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exam">
          <Card>
            <CardContent className="p-0">
              {filteredReports.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No exam reports match your search
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div className="col-span-2">Report Name</div>
                    <div>Institution</div>
                    <div>Date</div>
                    <div>Students</div>
                    <div>Incidents</div>
                    <div>Actions</div>
                  </div>
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-2">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-slate-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{report.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-slate-400" />
                        <span className="truncate">{report.institution}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{report.students}</span>
                      </div>
                      <div className="flex items-center">
                        {report.incidents > 0 ? (
                          <>
                            <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                            <span>{report.incidents}</span>
                          </>
                        ) : (
                          <span className="text-slate-500">None</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardContent className="p-0">
              {filteredReports.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No summary reports match your search
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div className="col-span-2">Report Name</div>
                    <div>Institution</div>
                    <div>Date</div>
                    <div>Exams</div>
                    <div>Students</div>
                    <div>Actions</div>
                  </div>
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-2">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-slate-500 flex items-center mt-1">
                          <FileText className="h-3 w-3 mr-1" />
                          <span>Summary Report</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-slate-400" />
                        <span className="truncate">{report.institution}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{report.exams}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{report.students}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Download className="h-3 w-3" />
                          <span>Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <BarChart4 className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-semibold mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Interactive analytics and data visualization tools are coming
                  soon. This feature is currently under development.
                </p>
                <Button className="mt-4">Request Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
