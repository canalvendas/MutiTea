import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { PatientsList } from "@/components/PatientsList";
import { AddPatientDialog } from "@/components/AddPatientDialog"; // Importa o novo componente de diálogo
import { toast } from "sonner"; // Importa o toast para feedback

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
      id: String(patients.length + 1), // ID simples para demonstração
      name,
      specialty,
      avatarUrl: "/public/placeholder.svg",
    };
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    toast.success(`Paciente ${name} adicionado com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-6">Pacientes</h1>

      {/* Search and Add Patient Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Buscar paciente..."
            className="pl-9 pr-4 py-2 border rounded-md w-full"
          />
        </div>
        <Button className="w-full md:w-auto" onClick={() => setIsAddPatientDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar Paciente
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