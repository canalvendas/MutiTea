import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AddAppointmentDialog } from "@/components/AddAppointmentDialog"; // Importa o novo componente de diálogo
import { toast } from "sonner"; // Importa o toast para feedback

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  specialty: string;
}

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isAddAppointmentDialogOpen, setIsAddAppointmentDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "João Pedro Santos",
      time: "09:00 - 10:00",
      specialty: "Psicologia",
    },
    {
      id: "2",
      patientName: "Ana Clara Oliveira",
      time: "10:30 - 11:30",
      specialty: "Fonoaudiologia",
    },
    {
      id: "3",
      patientName: "Lucas Ferreira",
      time: "14:00 - 15:00",
      specialty: "Terapia Ocupacional",
    },
  ]);

  const handleAddAppointment = (patientName: string, time: string, specialty: string) => {
    const newAppointment: Appointment = {
      id: String(appointments.length + 1), // ID simples para demonstração
      patientName,
      time,
      specialty,
    };
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    toast.success(`Agendamento para ${patientName} adicionado com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-6">Agenda</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Selecione uma Data</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              locale={ptBR}
            />
          </CardContent>
        </Card>

        {/* Appointments Section */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">
              Agendamentos para {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : "hoje"}
            </CardTitle>
            <Button size="sm" className="h-8" onClick={() => setIsAddAppointmentDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Agendamento
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-3 p-3 border rounded-md bg-gray-50">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.time} • {appointment.specialty}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">Nenhum agendamento para esta data.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Appointment Dialog */}
      <AddAppointmentDialog
        isOpen={isAddAppointmentDialogOpen}
        onClose={() => setIsAddAppointmentDialogOpen(false)}
        onAddAppointment={handleAddAppointment}
      />

      <MadeWithDyad />
    </div>
  );
};

export default Agenda;