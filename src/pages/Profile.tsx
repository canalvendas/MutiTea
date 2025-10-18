import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";

export interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  specialty: string;
  crp?: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Dra. Marina Silva",
    email: "marina.silva@multitea.com",
    phone: "(XX) XXXXX-XXXX",
    address: "Rua Exemplo, 123 - Cidade, Estado",
    specialty: "Psicologia",
    crp: "CRP 00/12345",
  });

  return (
    <div className="min-h-screen bg-background p-6 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-8">Perfil do Terapeuta</h1>
      <ProfileHeader
        name={profileData.name}
        specialty={profileData.specialty}
        avatarUrl="/placeholder.svg"
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <ProfileTabs
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <MadeWithDyad />
    </div>
  );
};

export default Profile;