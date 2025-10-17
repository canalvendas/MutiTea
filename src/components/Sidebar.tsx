import { NavLink } from "react-router-dom";
import { Home, Users, Calendar, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Início", icon: Home, path: "/" },
  { name: "Pacientes", icon: Users, path: "/patients" },
  { name: "Agenda", icon: Calendar, path: "/agenda" },
  { name: "Relatórios", icon: FileText, path: "/reports" },
  { name: "Perfil", icon: User, path: "/profile" },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar-background text-sidebar-foreground p-4">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 mb-6">
        <img src="/images/terapiapp-logo.png" alt="Multi Tea Logo" className="h-10" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 p-3 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};