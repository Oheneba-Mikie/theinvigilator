import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Search, Filter, Plus } from "lucide-react";

interface SchedulePageProps {}

const SchedulePage: React.FC<SchedulePageProps> = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Mock data for scheduled exams
  const scheduledExams = [
    {
      id: "exam1",
      name: "Advanced Mathematics",
      date: new Date(2023, 6, 20, 10, 0),
      duration: "120 minutes",
      institution: "University of Technology",
      students: 42,
      status: "scheduled",
    },
    {
      id: "exam2",
      name: "Computer Science 101",
      date: new Date(2023, 6, 22, 14, 0),
      duration: "90 minutes",
      institution: "State University",
      students: 38,
      status: "ready",
    },
    {
      id: "exam3",
      name: "Introduction to Biology",
      date: new Date(2023, 6, 25, 9, 0),
      duration: "120 minutes",
      institution: "Medical College",
      students: 56,
      status: "scheduled",
    },
    {
      id: "exam4",
      name: "World History",
      date: new Date(2023, 6, 27, 13, 0),
      duration: "180 minutes",
      institution: "Liberal Arts College",
      students: 29,
      status: "scheduled",
    },
  ];

  // Filter exams for the selected date
  const filteredExams = scheduledExams.filter((exam) => {
    if (!date) return true;
    return (
      exam.date.getDate() === date.getDate() &&
      exam.date.getMonth() === date.getMonth() &&
      exam.date.getFullYear() === date.getFullYear()
    );
  });

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Scheduled
          </Badge>
        );
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Ready
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Exam Schedule</h1>
          <p className="text-slate-500">Manage and view upcoming exams</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Schedule New Exam
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Search exams..." className="pl-8" />
        </div>
      </div>

      <Tabs
        defaultValue="calendar"
        value={view}
        onValueChange={(v) => setView(v as "calendar" | "list")}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="calendar" className="gap-2">
            <CalendarIcon className="h-4 w-4" /> Calendar View
          </TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date
                      ? date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "All Scheduled Exams"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredExams.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      No exams scheduled for this date
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredExams.map((exam) => (
                        <div
                          key={exam.id}
                          className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{exam.name}</h3>
                              <p className="text-sm text-slate-500">
                                {exam.institution}
                              </p>
                            </div>
                            {getStatusBadge(exam.status)}
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-slate-500">Time:</span>{" "}
                              {formatDate(exam.date)}
                            </div>
                            <div>
                              <span className="text-slate-500">Duration:</span>{" "}
                              {exam.duration}
                            </div>
                            <div>
                              <span className="text-slate-500">Students:</span>{" "}
                              {exam.students}
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b bg-slate-50">
                  <div className="col-span-2">Exam Name</div>
                  <div>Date & Time</div>
                  <div>Institution</div>
                  <div>Students</div>
                  <div>Status</div>
                </div>
                {scheduledExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="col-span-2">
                      <div className="font-medium">{exam.name}</div>
                      <div className="text-sm text-slate-500">
                        {exam.duration}
                      </div>
                    </div>
                    <div>{formatDate(exam.date)}</div>
                    <div>{exam.institution}</div>
                    <div>{exam.students}</div>
                    <div>{getStatusBadge(exam.status)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulePage;
