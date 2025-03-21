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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Copy,
  Calendar,
  Clock,
  Building,
  FileText,
  KeyRound,
  RefreshCw,
  Trash2,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface AccessCodesPageProps {}

const AccessCodesPage: React.FC<AccessCodesPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [newCodeExam, setNewCodeExam] = useState("");
  const [newCodeQuantity, setNewCodeQuantity] = useState("10");
  const [newCodeExpiry, setNewCodeExpiry] = useState("24");

  // Mock data for access codes
  const accessCodes = [
    {
      id: "code1",
      code: "ADV-MATH-2023-001",
      exam: "Advanced Mathematics Final",
      institution: "University of Technology",
      generated: new Date(2023, 6, 10),
      expires: new Date(2023, 6, 20),
      status: "active",
      used: 28,
      total: 45,
    },
    {
      id: "code2",
      code: "CS101-MID-2023-002",
      exam: "Computer Science 101 Midterm",
      institution: "State University",
      generated: new Date(2023, 6, 15),
      expires: new Date(2023, 6, 22),
      status: "active",
      used: 12,
      total: 38,
    },
    {
      id: "code3",
      code: "BIO-FINAL-2023-003",
      exam: "Introduction to Biology Final",
      institution: "Medical College",
      generated: new Date(2023, 6, 5),
      expires: new Date(2023, 6, 25),
      status: "active",
      used: 0,
      total: 56,
    },
    {
      id: "code4",
      code: "HIST-MID-2023-004",
      exam: "World History Midterm",
      institution: "Liberal Arts College",
      generated: new Date(2023, 5, 20),
      expires: new Date(2023, 6, 1),
      status: "expired",
      used: 29,
      total: 29,
    },
    {
      id: "code5",
      code: "CHEM-QUIZ-2023-005",
      exam: "Organic Chemistry Quiz",
      institution: "Science Institute",
      generated: new Date(2023, 5, 25),
      expires: new Date(2023, 6, 5),
      status: "expired",
      used: 18,
      total: 20,
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

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Active
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-800">
            Expired
          </Badge>
        );
      case "revoked":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter access codes based on search query and status filter
  const filteredCodes = accessCodes.filter((code) => {
    const matchesSearch =
      searchQuery === "" ||
      code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || code.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle generating new access codes
  const handleGenerateCode = () => {
    // In a real app, this would call an API to generate codes
    console.log({
      exam: newCodeExam,
      quantity: newCodeQuantity,
      expiry: newCodeExpiry,
    });
    setShowGenerateDialog(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Access Codes</h1>
          <p className="text-slate-500">
            Generate and manage exam access codes
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => setShowGenerateDialog(true)}>
            <Plus className="h-4 w-4" /> Generate Codes
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by code, exam, or institution..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="revoked">Revoked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredCodes.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No access codes match your filters
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b bg-slate-50">
                <div className="col-span-2">Access Code</div>
                <div>Exam</div>
                <div>Institution</div>
                <div>Expiry Date</div>
                <div>Usage</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {filteredCodes.map((code) => (
                <div
                  key={code.id}
                  className="grid grid-cols-8 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                >
                  <div className="col-span-2">
                    <div className="font-medium flex items-center">
                      <KeyRound className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{code.code}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-6 w-6"
                        onClick={() => navigator.clipboard.writeText(code.code)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Generated: {formatDate(code.generated)}
                    </div>
                  </div>
                  <div className="truncate">{code.exam}</div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-slate-400" />
                    <span className="truncate">{code.institution}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                    <span>{formatDate(code.expires)}</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span>
                        {code.used}/{code.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(code.used / code.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>{getStatusBadge(code.status)}</div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={code.status !== "active"}
                    >
                      <Mail className="h-3 w-3" />
                      <span className="hidden sm:inline">Send</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={code.status !== "active"}
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span className="hidden sm:inline">Renew</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                      disabled={code.status !== "active"}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate Access Codes Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Access Codes</DialogTitle>
            <DialogDescription>
              Create new access codes for an upcoming exam
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="exam" className="text-sm font-medium">
                Exam
              </label>
              <Select value={newCodeExam} onValueChange={setNewCodeExam}>
                <SelectTrigger id="exam">
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adv-math">
                    Advanced Mathematics Final
                  </SelectItem>
                  <SelectItem value="cs101">
                    Computer Science 101 Midterm
                  </SelectItem>
                  <SelectItem value="bio-intro">
                    Introduction to Biology Final
                  </SelectItem>
                  <SelectItem value="world-hist">
                    World History Midterm
                  </SelectItem>
                  <SelectItem value="org-chem">
                    Organic Chemistry Quiz
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Number of Codes
              </label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={newCodeQuantity}
                onChange={(e) => setNewCodeQuantity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="expiry" className="text-sm font-medium">
                Expiry (hours)
              </label>
              <Input
                id="expiry"
                type="number"
                min="1"
                max="720"
                value={newCodeExpiry}
                onChange={(e) => setNewCodeExpiry(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGenerateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleGenerateCode}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccessCodesPage;
