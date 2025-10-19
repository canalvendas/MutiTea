import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;