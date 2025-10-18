import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { PatientsList } from "@/components/PatientsList";
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { toast } from "sonner";

const Patients = () => {
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false);
  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "João Pedro Santos",
      specialty: "Psicologia",
      avatarUrl: "/public/placeholder.svg",
    },
    {
      id: "2",
      name: "Ana Clara Oliveira",
      specialty: "Fonoaudiologia",
      avatarUrl: "/public/placeholder.svg",
    },
    {
      id: "3",
      name: "Lucas Ferreira",
      specialty: "Terapia Ocupacional",
      avatarUrl: "/public/placeholder.svg",
    },
    {
      id: "4",
      name: "Mariana Costa",
      specialty: "Psicologia",
      avatarUrl: "/public/placeholder.svg",
    },
    {
      id: "5",
      name: "Pedro Henrique",
      specialty: "Fonoaudiologia",
      avatarUrl: "/public/placeholder.svg",
    },
  ]);

  const handleAddPatient = (name: string, specialty: string) => {
    const newPatient = {
      id: String(patients.length + 1),
      name,
      specialty,
      avatarUrl: "/public/placeholder.svg",
    };
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    toast.success(`Paciente ${name} adicionado com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-8">Pacientes</h1>

      {/* Search and Add Patient Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar paciente por nome, CPF ou especialidade..."
            className="pl-11 pr-4 py-3 text-base rounded-lg shadow-sm"
          />
        </div>
        <Button className="w-full md:w-auto py-3 text-base rounded-lg shadow-sm" onClick={() => setIsAddPatientDialogOpen(true)}>
          <Plus className="h-5 w-5 mr-2" /> Adicionar Paciente
        </Button>
      </div>

      {/* Patients List */}
      <PatientsList patients={patients} />

      {/* Add Patient Dialog */}
      <AddPatientDialog
        isOpen={isAddPatientDialogOpen}
        onClose={() => setIsAddPatientDialogOpen(false)}
        onAddPatient={handleAddPatient}
      />

      <MadeWithDyad />
    </div>
  );
};

export default Patients;