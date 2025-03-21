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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Building,
  Calendar,
} from "lucide-react";

interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for users
  const users = [
    {
      id: "user1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      role: "admin",
      institution: "University of Technology",
      lastActive: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      status: "active",
    },
    {
      id: "user2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 (555) 234-5678",
      role: "proctor",
      institution: "State University",
      lastActive: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: "active",
    },
    {
      id: "user3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 345-6789",
      role: "proctor",
      institution: "Medical College",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "active",
    },
    {
      id: "user4",
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      phone: "+1 (555) 456-7890",
      role: "instructor",
      institution: "Liberal Arts College",
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "active",
    },
    {
      id: "user5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 567-8901",
      role: "instructor",
      institution: "Science Institute",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      status: "inactive",
    },
  ];

  // Format time for display
  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            Admin
          </Badge>
        );
      case "proctor":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            The Invigilator
          </Badge>
        );
      case "instructor":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Instructor
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span>Active</span>
          </div>
        );
      case "inactive":
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-slate-300 mr-2"></div>
            <span>Inactive</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  // Filter users based on search query, role filter, and active tab
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.institution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && user.status === "active") ||
      (activeTab === "inactive" && user.status === "inactive");

    return matchesSearch && matchesRole && matchesTab;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-slate-500">
            Manage administrators, invigilators, and instructors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, email, or institution..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="proctor">The Invigilator</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No users match your filters
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                    <div className="col-span-2">User</div>
                    <div>Role</div>
                    <div>Institution</div>
                    <div>Contact</div>
                    <div>Last Active</div>
                    <div>Actions</div>
                  </div>
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-2 flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div>{getRoleBadge(user.role)}</div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-slate-400" />
                        <span className="truncate">{user.institution}</span>
                      </div>
                      <div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-slate-400" />
                          <span className="truncate">Email</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Phone className="h-3 w-3 mr-1 text-slate-400" />
                          <span className="truncate">{user.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        <span>{formatLastActive(user.lastActive)}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3">
                          {getStatusBadge(user.status)}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
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

export default UsersPage;
