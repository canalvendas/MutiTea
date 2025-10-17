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

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg md:hidden">
      <div className="flex justify-around h-16 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                isActive && "text-primary"
              )
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};