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
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

export interface SavedTherapeuticPlan {
  id: string;
  patientName: string;
  submissionDate: string;
  specialty: string;
  planContent: string;
}

export interface SavedDevolutiva {
  id: string;
  patientName: string;
  submissionDate: string;
  specialty: string;
  content: string;
}

const Profile = () => {
  const { user, profile, refreshProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Anamnese State
  const [savedAnamneses, setSavedAnamneses] = useState<SavedAnamnese[]>([]);
  const [isEditAnamneseDialogOpen, setIsEditAnamneseDialogOpen] = useState(false);
  const [currentAnamnese, setCurrentAnamnese] = useState<SavedAnamnese | null>(null);

  // Evolution State
  const [savedEvolutions, setSavedEvolutions] = useState<SavedEvolution[]>([]);
  const [isEditEvolutionDialogOpen, setIsEditEvolutionDialogOpen] = useState(false);
  const [currentEvolution, setCurrentEvolution] = useState<SavedEvolution | null>(null);

  // Report State
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);

  // Therapeutic Plan State
  const [savedPlans, setSavedPlans] = useState<SavedTherapeuticPlan[]>([]);

  // Devolutiva State
  const [savedDevolutivas, setSavedDevolutivas] = useState<SavedDevolutiva[]>([]);

  // Anamnese Handlers
  const handleSaveAnamnese = (formData: AnamneseFormData) => {
    const newAnamnese: SavedAnamnese = {
      id: new Date().toISOString(),
      patientName: formData.patientName,
      submissionDate: new Date().toISOString().split('T')[0],
      specialty: profile?.specialty || "Padrão",
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
      specialty: profile?.specialty || "Padrão",
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
      specialty: profile?.specialty || "Padrão",
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

  // Therapeutic Plan Handlers
  const handleSavePlan = (planData: { patientName: string; specialty: string; planContent: string }) => {
    const newPlan: SavedTherapeuticPlan = {
      id: new Date().toISOString(),
      submissionDate: new Date().toISOString().split('T')[0],
      ...planData,
    };
    setSavedPlans(prev => [newPlan, ...prev]);
    toast.success("Plano Terapêutico salvo com sucesso!");
  };

  const handleDeletePlan = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este plano terapêutico?")) {
      setSavedPlans(prev => prev.filter(p => p.id !== id));
      toast.success("Plano Terapêutico excluído com sucesso.");
    }
  };

  // Devolutiva Handlers
  const handleSaveDevolutiva = (data: { patientName: string; specialty: string; content: string }) => {
    const newDevolutiva: SavedDevolutiva = {
      id: new Date().toISOString(),
      submissionDate: new Date().toISOString().split('T')[0],
      ...data,
    };
    setSavedDevolutivas(prev => [newDevolutiva, ...prev]);
    toast.success("Devolutiva salva com sucesso!");
  };

  const handleDeleteDevolutiva = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta devolutiva?")) {
      setSavedDevolutivas(prev => prev.filter(d => d.id !== id));
      toast.success("Devolutiva excluída com sucesso.");
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !user) {
      return;
    }

    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Math.random()}.${fileExt}`;
    const toastId = toast.loading("Enviando avatar...");

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Erro ao enviar o avatar.", { id: toastId });
      console.error(uploadError);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const newAvatarUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: newAvatarUrl })
      .eq('id', user.id);

    if (updateError) {
      toast.error("Erro ao atualizar o perfil.", { id: toastId });
      console.error(updateError);
      return;
    }

    await refreshProfile();
    toast.success("Avatar atualizado com sucesso!", { id: toastId });
  };

  const handleProfileUpdate = async (data: ProfileData) => {
    if (!user) return;

    const [firstName, ...lastNameParts] = data.name.split(' ');
    const lastName = lastNameParts.join(' ');

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: data.phone,
        address: data.address,
        specialty: data.specialty,
        crp: data.crp,
      })
      .eq('id', user.id);

    if (error) {
      toast.error("Erro ao atualizar o perfil.");
      console.error(error);
    } else {
      await refreshProfile();
      toast.success("Dados cadastrais atualizados com sucesso!");
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  const displayName = profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() : user?.email || 'Usuário';
  const displaySpecialty = profile?.specialty || 'Especialidade';

  const profileFormData: ProfileData = {
    name: displayName,
    email: user?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    specialty: profile?.specialty || '',
    crp: profile?.crp || '',
    avatarUrl: profile?.avatarUrl || '',
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8">Perfil do Terapeuta</h1>
      <ProfileHeader
        name={displayName}
        specialty={displaySpecialty}
        avatarUrl={profile?.avatarUrl}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onAvatarChange={handleAvatarChange}
      />
      <ProfileTabs
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        profileData={profileFormData}
        onProfileUpdate={handleProfileUpdate}
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
        savedPlans={savedPlans}
        onSavePlan={handleSavePlan}
        onDeletePlan={handleDeletePlan}
        savedDevolutivas={savedDevolutivas}
        onSaveDevolutiva={handleSaveDevolutiva}
        onDeleteDevolutiva={handleDeleteDevolutiva}
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