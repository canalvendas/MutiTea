import { Outlet, useOutletContext } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";
import { useState } from "react";
import { ProfileData } from "@/pages/Profile";

const AppLayout = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Dra. Marina Silva",
    email: "marina.silva@multitea.com",
    phone: "(XX) XXXXX-XXXX",
    address: "Rua Exemplo, 123 - Cidade, Estado",
    specialty: "Psicologia",
    crp: "CRP 00/12345",
    avatarUrl: "/placeholder.svg",
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet context={{ profileData, setProfileData }} />
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;

export function useProfile() {
  return useOutletContext<{ profileData: ProfileData, setProfileData: React.Dispatch<React.SetStateAction<ProfileData>> }>();
}