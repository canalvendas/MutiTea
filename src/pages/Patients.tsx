import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { PatientsList } from "@/components/PatientsList";
import { AddPatientDialog } from "@/components/AddPatientDialog";
import { toast } from "sonner";
import { patientsData, Patient } from "@/data/patients";

const Patients = () => {
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(patientsData);

  const handleAddPatient = (patientData: Omit<Patient, 'id' | 'avatarUrl'>) => {
    const newPatient: Patient = {
      id: String(patients.length + 1),
      ...patientData,
      avatarUrl: "/public/placeholder.svg",
    };
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    toast.success(`Paciente ${patientData.name} adicionado com sucesso!`);
  };

  return (
    <div className="p-4 md:p-6">
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