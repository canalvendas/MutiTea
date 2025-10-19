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
  avatarUrl?: string;
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
    avatarUrl: "/placeholder.svg",
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prevData => ({
          ...prevData,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Perfil do Terapeuta</h1>
      <ProfileHeader
        name={profileData.name}
        specialty={profileData.specialty}
        avatarUrl={profileData.avatarUrl}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onAvatarChange={handleAvatarChange}
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