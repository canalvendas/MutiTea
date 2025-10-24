import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityPlanForm } from "@/components/ActivityPlanForm";
import { SavedActivityPlansList, SavedActivityPlan } from "@/components/SavedActivityPlansList";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { activitiesData } from "@/data/activities";

const Activities = () => {
  const { profile, loading } = useAuth();
  const [savedPlans, setSavedPlans] = useState<SavedActivityPlan[]>([]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!profile || !profile.specialty) {
    return (
      <div className="p-4 md:p-6 text-center">
        <p>Não foi possível carregar os dados do perfil para encontrar atividades. Por favor, complete seu perfil.</p>
      </div>
    );
  }

  const specialtyActivities = activitiesData.find(s => s.specialty === profile.specialty);
  const diagnosesForSpecialty = specialtyActivities ? specialtyActivities.diagnoses : [];

  const handleSavePlan = (data: { patientName: string; content: string }) => {
    const newPlan: SavedActivityPlan = {
      id: new Date().toISOString(),
      submissionDate: new Date().toISOString().split('T')[0],
      ...data,
    };
    setSavedPlans(prev => [newPlan, ...prev]);
    toast.success("Plano de atividades salvo com sucesso!");
  };

  const handleDeletePlan = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este plano de atividades?")) {
      setSavedPlans(prev => prev.filter(p => p.id !== id));
      toast.success("Plano de atividades excluído com sucesso.");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <h1 className="text-3xl font-bold">Gerador de Plano de Atividades</h1>

      <Card>
        <CardHeader>
          <CardTitle>Planos de Atividades Salvos</CardTitle>
          <CardDescription>Visualize, baixe ou exclua os planos gerados.</CardDescription>
        </CardHeader>
        <CardContent>
          <SavedActivityPlansList
            plans={savedPlans}
            onDelete={handleDeletePlan}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Plano de Atividades</CardTitle>
          <CardDescription>Selecione o paciente e as demandas para gerar sugestões de atividades para a sua especialidade: <span className="font-semibold text-primary">{profile.specialty}</span>.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityPlanForm onSavePlan={handleSavePlan} diagnoses={diagnosesForSpecialty} />
        </CardContent>
      </Card>

      <MadeWithDyad />
    </div>
  );
};

export default Activities;