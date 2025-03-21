import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Building,
  Users,
  Calendar,
  MoreHorizontal,
  MapPin,
  Globe,
} from "lucide-react";

interface InstitutionsPageProps {}

const InstitutionsPage: React.FC<InstitutionsPageProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for institutions
  const institutions = [
    {
      id: "inst1",
      name: "University of Technology",
      type: "University",
      location: "Boston, MA",
      website: "www.uotech.edu",
      users: 45,
      exams: 12,
      status: "active",
      joinDate: new Date(2022, 3, 15),
    },
    {
      id: "inst2",
      name: "State University",
      type: "University",
      location: "Chicago, IL",
      website: "www.stateuniv.edu",
      users: 38,
      exams: 8,
      status: "active",
      joinDate: new Date(2022, 5, 22),
    },
    {
      id: "inst3",
      name: "Medical College",
      type: "College",
      location: "New York, NY",
      website: "www.medcollege.edu",
      users: 29,
      exams: 15,
      status: "active",
      joinDate: new Date(2022, 1, 10),
    },
    {
      id: "inst4",
      name: "Liberal Arts College",
      type: "College",
      location: "Portland, OR",
      website: "www.liberalarts.edu",
      users: 22,
      exams: 6,
      status: "active",
      joinDate: new Date(2022, 8, 5),
    },
    {
      id: "inst5",
      name: "Science Institute",
      type: "Institute",
      location: "San Francisco, CA",
      website: "www.scienceinst.edu",
      users: 18,
      exams: 4,
      status: "inactive",
      joinDate: new Date(2022, 2, 18),
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
      case "inactive":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-800">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter institutions based on search query
  const filteredInstitutions = institutions.filter((institution) => {
    return (
      searchQuery === "" ||
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Institutions</h1>
          <p className="text-slate-500">
            Manage educational institutions using the platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Institution
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, location, or type..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredInstitutions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No institutions match your search
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-7 gap-4 p-4 font-medium border-b bg-slate-50">
                <div className="col-span-2">Institution</div>
                <div>Location</div>
                <div>Users</div>
                <div>Exams</div>
                <div>Joined</div>
                <div>Actions</div>
              </div>
              {filteredInstitutions.map((institution) => (
                <div
                  key={institution.id}
                  className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-slate-50 transition-colors"
                >
                  <div className="col-span-2">
                    <div className="font-medium">{institution.name}</div>
                    <div className="flex items-center mt-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-800"
                      >
                        {institution.type}
                      </Badge>
                      <div className="ml-2">
                        {getStatusBadge(institution.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                    <span>{institution.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-slate-400" />
                    <span>{institution.users}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                    <span>{institution.exams}</span>
                  </div>
                  <div>{formatDate(institution.joinDate)}</div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Globe className="h-3 w-3" />
                      <span className="hidden sm:inline">Website</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
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
    </div>
  );
};

export default InstitutionsPage;
