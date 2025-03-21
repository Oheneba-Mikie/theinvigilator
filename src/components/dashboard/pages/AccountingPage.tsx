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
  Download,
  DollarSign,
  Building,
  Calendar,
  FileText,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

interface AccountingPageProps {}

const AccountingPage: React.FC<AccountingPageProps> = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for invoices
  const invoices = [
    {
      id: "INV-2023-001",
      institution: "University of Technology",
      amount: 2450.0,
      date: new Date(2023, 5, 15),
      dueDate: new Date(2023, 6, 15),
      status: "paid",
      items: [
        { description: "Exam Proctoring Services - May 2023", amount: 2450.0 },
      ],
    },
    {
      id: "INV-2023-002",
      institution: "State University",
      amount: 1875.5,
      date: new Date(2023, 5, 22),
      dueDate: new Date(2023, 6, 22),
      status: "paid",
      items: [
        { description: "Exam Proctoring Services - May 2023", amount: 1875.5 },
      ],
    },
    {
      id: "INV-2023-003",
      institution: "Medical College",
      amount: 3200.0,
      date: new Date(2023, 6, 1),
      dueDate: new Date(2023, 7, 1),
      status: "pending",
      items: [
        { description: "Exam Proctoring Services - June 2023", amount: 3200.0 },
      ],
    },
    {
      id: "INV-2023-004",
      institution: "Liberal Arts College",
      amount: 1250.0,
      date: new Date(2023, 6, 5),
      dueDate: new Date(2023, 7, 5),
      status: "overdue",
      items: [
        { description: "Exam Proctoring Services - June 2023", amount: 1250.0 },
      ],
    },
    {
      id: "INV-2023-005",
      institution: "Science Institute",
      amount: 950.75,
      date: new Date(2023, 6, 10),
      dueDate: new Date(2023, 7, 10),
      status: "pending",
      items: [
        { description: "Exam Proctoring Services - June 2023", amount: 950.75 },
      ],
    },
  ];

  // Mock data for payments
  const payments = [
    {
      id: "PAY-2023-001",
      institution: "University of Technology",
      amount: 2450.0,
      date: new Date(2023, 6, 10),
      method: "Credit Card",
      reference: "INV-2023-001",
      status: "completed",
    },
    {
      id: "PAY-2023-002",
      institution: "State University",
      amount: 1875.5,
      date: new Date(2023, 6, 15),
      method: "Bank Transfer",
      reference: "INV-2023-002",
      status: "completed",
    },
    {
      id: "PAY-2023-003",
      institution: "Science Institute",
      amount: 1200.0,
      date: new Date(2023, 5, 28),
      method: "Credit Card",
      reference: "INV-2023-005",
      status: "processing",
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Get status badge for invoices
  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get status badge for payments
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Processing
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter invoices based on search query and status filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      searchQuery === "" ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter payments based on search query
  const filteredPayments = payments.filter((payment) => {
    return (
      searchQuery === "" ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Accounting</h1>
          <p className="text-slate-500">
            Manage invoices, payments, and financial records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">
            <FileText className="h-4 w-4" /> Generate Invoice
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID, institution, or reference..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {activeTab === "invoices" && (
          <div className="w-full md:w-64">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Tabs
        defaultValue="invoices"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="invoices" className="gap-2">
            <FileText className="h-4 w-4" /> Invoices
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" /> Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardContent className="p-0">
              {filteredInvoices.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No invoices match your filters
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div>Invoice #</div>
                    <div className="col-span-2">Institution</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Due Date</div>
                    <div>Status</div>
                  </div>
                  {filteredInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="font-medium">{invoice.id}</div>
                      <div className="col-span-2 flex items-center">
                        <Building className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{invoice.institution}</span>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(invoice.amount)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{formatDate(invoice.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{formatDate(invoice.dueDate)}</span>
                      </div>
                      <div>{getInvoiceStatusBadge(invoice.status)}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-0">
              {filteredPayments.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No payments match your search
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div>Payment #</div>
                    <div className="col-span-2">Institution</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Method</div>
                    <div>Status</div>
                  </div>
                  {filteredPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="font-medium">{payment.id}</div>
                      <div className="col-span-2 flex items-center">
                        <Building className="h-4 w-4 mr-2 text-slate-400" />
                        <span>{payment.institution}</span>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(payment.amount)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{formatDate(payment.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{payment.method}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPaymentStatusBadge(payment.status)}
                        <span className="text-xs text-slate-500">
                          {payment.reference}
                        </span>
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

export default AccountingPage;
