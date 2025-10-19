import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNavigation } from "./BottomNavigation";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Outlet /> {/* As páginas da aplicação serão renderizadas aqui */}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;