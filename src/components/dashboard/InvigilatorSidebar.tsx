import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  Building2,
  DollarSign,
  FileBarChart,
  KeyRound,
  Wrench,
  Settings,
  Search,
  Clock,
  LayoutDashboard,
} from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: number;
}

interface InvigilatorSidebarProps {
  onNavigate?: (section: string) => void;
  activeSection?: string;
}

const InvigilatorSidebar = ({
  onNavigate = () => {},
  activeSection = "dashboard",
}: InvigilatorSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarItems: SidebarItem[] = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      value: "dashboard",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      value: "schedule",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Sessions",
      value: "sessions",
      badge: 24,
    },
    { icon: <Users className="h-5 w-5" />, label: "Users", value: "users" },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: "Institutions",
      value: "institutions",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Accounting",
      value: "accounting",
    },
    {
      icon: <FileBarChart className="h-5 w-5" />,
      label: "Reports",
      value: "reports",
    },
    {
      icon: <KeyRound className="h-5 w-5" />,
      label: "Access Codes",
      value: "access-codes",
    },
    { icon: <Wrench className="h-5 w-5" />, label: "Tools", value: "tools" },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Utilities",
      value: "utilities",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for appointment ID:", searchQuery);
    // In a real app, this would trigger a search API call
  };

  return (
    <div className="h-full w-64 bg-slate-800 text-white flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">The Invigilator</h2>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search appointment ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </form>
      </div>

      <Separator className="bg-slate-700" />

      <ScrollArea className="flex-1">
        <div className="p-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              className={`w-full justify-start mb-1 ${activeSection === item.value || (item.value === "dashboard" && (activeSection === "monitoring" || activeSection === "incidents")) ? "bg-slate-700" : "hover:bg-slate-700"}`}
              onClick={() => onNavigate(item.value)}
            >
              <div className="flex items-center w-full">
                <span className="mr-3 text-slate-400">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Separator className="bg-slate-700" />

      <div className="p-4">
        <div className="text-xs text-slate-400 mb-2">Logged in as</div>
        <div className="font-medium">The Invigilator</div>
        <div className="text-sm text-slate-400">invigilator@example.com</div>
      </div>
    </div>
  );
};

export default InvigilatorSidebar;
