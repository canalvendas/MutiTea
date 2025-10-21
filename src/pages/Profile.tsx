import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";
import { AnamneseFormData } from "@/components/AnamneseForm";
import { EvolutionFormData } from "@/components/EvolutionForm";
import { EditAnamneseDialog } from "@/components/EditAnamneseDialog";
import { EditEvolutionDialog } from "@/components/EditEvolutionDialog";
import { toast } from "sonner";
import { ReportWizardData } from "@/components/ReportWizard";

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

export interface SavedEvolution {
  id: string;
  patientName: string;
  submissionDate: string;
  specialty: string;
  data: EvolutionFormData;
}

export interface SavedReport {
  id: string;
  patientName: string;
  submissionDate: string;
  specialty: string;
  data: ReportWizardData;
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

  // Anamnese State
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
  const [isEditAnamneseDialogOpen, setIsEditAnamneseDialogOpen] = useState(false);
  const [currentAnamnese, setCurrentAnamnese] = useState<SavedAnamnese | null>(null);

  // Evolution State
  const [savedEvolutions, setSavedEvolutions] = useState<SavedEvolution[]>([
    {
      id: 'evo1',
      patientName: 'João Pedro Santos',
      submissionDate: '2024-07-22',
      specialty: 'Psicologia',
      data: {
        patientName: 'João Pedro Santos',
        sessionDate: '2024-07-22',
        chegadaPaciente: 'Chegou regulado, comunicando-se sobre seu dia.',
        recursosAtividades: 'Jogo de regras para trabalhar troca de turnos e flexibilidade.',
      } as EvolutionFormData,
    }
  ]);
  const [isEditEvolutionDialogOpen, setIsEditEvolutionDialogOpen] = useState(false);
  const [currentEvolution, setCurrentEvolution] = useState<SavedEvolution | null>(null);

  // Report State
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);

  // Anamnese Handlers
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
      setIsEditAnamneseDialogOpen(true);
    }
  };

  const handleDeleteAnamnese = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta anamnese?")) {
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
    setIsEditAnamneseDialogOpen(false);
    setCurrentAnamnese(null);
  };

  // Evolution Handlers
  const handleSaveEvolution = (formData: EvolutionFormData) => {
    const newEvolution: SavedEvolution = {
      id: new Date().toISOString(),
      patientName: formData.patientName,
      submissionDate: formData.sessionDate || new Date().toISOString().split('T')[0],
      specialty: profileData.specialty,
      data: formData,
    };
    setSavedEvolutions(prev => [newEvolution, ...prev]);
  };

  const handleEditEvolution = (id: string) => {
    const evolutionToEdit = savedEvolutions.find((e) => e.id === id);
    if (evolutionToEdit) {
      setCurrentEvolution(evolutionToEdit);
      setIsEditEvolutionDialogOpen(true);
    }
  };

  const handleDeleteEvolution = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este registro de evolução?")) {
      setSavedEvolutions((prev) => prev.filter((e) => e.id !== id));
      toast.success("Registro de evolução excluído com sucesso.");
    }
  };

  const handleUpdateEvolution = (updatedData: EvolutionFormData) => {
    if (!currentEvolution) return;
    setSavedEvolutions((prev) =>
      prev.map((e) =>
        e.id === currentEvolution.id
          ? { ...e, data: updatedData, patientName: updatedData.patientName }
          : e
      )
    );
    toast.success("Registro de evolução atualizado com sucesso!");
    setIsEditEvolutionDialogOpen(false);
    setCurrentEvolution(null);
  };

  // Report Handlers
  const handleSaveReport = (reportData: ReportWizardData) => {
    const newReport: SavedReport = {
      id: new Date().toISOString(),
      patientName: reportData.patientName,
      submissionDate: new Date().toISOString().split('T')[0],
      specialty: profileData.specialty,
      data: reportData,
    };
    setSavedReports(prev => [newReport, ...prev]);
    toast.success("Relatório salvo com sucesso no sistema!");
  };

  const handleDeleteReport = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este relatório?")) {
      setSavedReports((prev) => prev.filter((r) => r.id !== id));
      toast.success("Relatório excluído com sucesso.");
    }
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
    <div className="p-4 md:p-6">
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
        savedEvolutions={savedEvolutions}
        onSaveEvolution={handleSaveEvolution}
        onEditEvolution={handleEditEvolution}
        onDeleteEvolution={handleDeleteEvolution}
        savedReports={savedReports}
        onSaveReport={handleSaveReport}
        onDeleteReport={handleDeleteReport}
      />
      <EditAnamneseDialog
        isOpen={isEditAnamneseDialogOpen}
        onClose={() => setIsEditAnamneseDialogOpen(false)}
        anamnese={currentAnamnese}
        onSave={handleUpdateAnamnese}
      />
      <EditEvolutionDialog
        isOpen={isEditEvolutionDialogOpen}
        onClose={() => setIsEditEvolutionDialogOpen(false)}
        evolution={currentEvolution}
        onSave={handleUpdateEvolution}
      />
      <MadeWithDyad />
    </div>
  );
};

export default Profile;