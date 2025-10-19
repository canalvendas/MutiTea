import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";
import { AnamneseFormData } from "@/components/AnamneseForm";
import { EditAnamneseDialog } from "@/components/EditAnamneseDialog";
import { toast } from "sonner";

export interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  specialty: string;
  crp?: string;
  avatarUrl?: string;
}

export interface SavedAnamnese {
  id: string;
  patientName: string;
  submissionDate: string;
  specialty: string;
  data: AnamneseFormData;
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

  const [savedAnamneses, setSavedAnamneses] = useState<SavedAnamnese[]>([
    {
      id: '1',
      patientName: 'João Pedro Santos',
      submissionDate: '2024-07-15',
      specialty: 'Psicologia',
      data: {
        patientName: 'João Pedro Santos',
        queixaPrincipal: 'Dificuldade de interação social na escola.',
        historicoQueixa: 'Os pais notaram os primeiros sinais por volta dos 3 anos de idade.',
      } as AnamneseFormData,
    }
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentAnamnese, setCurrentAnamnese] = useState<SavedAnamnese | null>(null);

  const handleSaveAnamnese = (formData: AnamneseFormData) => {
    const newAnamnese: SavedAnamnese = {
      id: new Date().toISOString(),
      patientName: formData.patientName,
      submissionDate: new Date().toISOString().split('T')[0],
      specialty: profileData.specialty,
      data: formData,
    };
    setSavedAnamneses(prev => [newAnamnese, ...prev]);
  };

  const handleEditAnamnese = (id: string) => {
    const anamneseToEdit = savedAnamneses.find((a) => a.id === id);
    if (anamneseToEdit) {
      setCurrentAnamnese(anamneseToEdit);
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteAnamnese = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta anamnese? Esta ação não pode ser desfeita.")) {
      setSavedAnamneses((prev) => prev.filter((a) => a.id !== id));
      toast.success("Anamnese excluída com sucesso.");
    }
  };

  const handleUpdateAnamnese = (updatedData: AnamneseFormData) => {
    if (!currentAnamnese) return;

    setSavedAnamneses((prev) =>
      prev.map((a) =>
        a.id === currentAnamnese.id
          ? { ...a, data: updatedData, patientName: updatedData.patientName }
          : a
      )
    );
    toast.success("Anamnese atualizada com sucesso!");
    setIsEditDialogOpen(false);
    setCurrentAnamnese(null);
  };

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
        savedAnamneses={savedAnamneses}
        onSaveAnamnese={handleSaveAnamnese}
        onEditAnamnese={handleEditAnamnese}
        onDeleteAnamnese={handleDeleteAnamnese}
      />
      <EditAnamneseDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        anamnese={currentAnamnese}
        onSave={handleUpdateAnamnese}
      />
      <MadeWithDyad />
    </div>
  );
};

export default Profile;