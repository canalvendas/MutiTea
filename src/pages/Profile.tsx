import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background p-6 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-8">Perfil do Terapeuta</h1>
      <ProfileHeader
        name="Dra. Marina Silva"
        specialty="Psicologia Clínica"
        avatarUrl="/placeholder.svg" // Substitua pelo caminho da imagem real, se disponível
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <ProfileTabs isEditing={isEditing} setIsEditing={setIsEditing} />
      <MadeWithDyad />
    </div>
  );
};

export default Profile;