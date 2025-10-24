import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddPatientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patientData: {
    name: string;
    birth_date: string;
    diagnosis: string;
    mother_name: string;
    phone: string;
  }) => void;
}

export const AddPatientDialog = ({ isOpen, onClose, onAddPatient }: AddPatientDialogProps) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [motherName, setMotherName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (name.trim() && birthDate.trim() && diagnosis.trim() && motherName.trim() && phone.trim()) {
      onAddPatient({ name, birth_date: birthDate, diagnosis, mother_name: motherName, phone });
      setName("");
      setBirthDate("");
      setDiagnosis("");
      setMotherName("");
      setPhone("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Paciente</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo paciente à sua lista.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left sm:text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-full sm:col-span-3"
              placeholder="Nome completo do paciente"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="birthDate" className="text-left sm:text-right">
              Nascimento
            </Label>
            <Input
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="col-span-full sm:col-span-3"
              placeholder="DD/MM/AAAA"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="diagnosis" className="text-left sm:text-right">
              Diagnóstico
            </Label>
            <Input
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="col-span-full sm:col-span-3"
              placeholder="Ex: TEA, TDAH..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="motherName" className="text-left sm:text-right">
              Nome da Mãe
            </Label>
            <Input
              id="motherName"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              className="col-span-full sm:col-span-3"
              placeholder="Nome completo da mãe"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-left sm:text-right">
              Telefone
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-full sm:col-span-3"
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};