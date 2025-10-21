import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AddAppointmentDialog } from "@/components/AddAppointmentDialog";
import { toast } from "sonner";

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
      id: String(appointments.length + 1),
      patientName,
      time,
      specialty,
    };
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    toast.success(`Agendamento para ${patientName} adicionado com sucesso!`);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8">Agenda</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-1">
          <Card className="bg-card shadow-sm">
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                locale={ptBR}
              />
            </CardContent>
          </Card>
        </div>

        {/* Appointments Section */}
        <div className="lg:col-span-2">
          <Card className="bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-semibold">
                Agendamentos para {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : "hoje"}
              </CardTitle>
              <Button size="sm" className="rounded-lg" onClick={() => setIsAddAppointmentDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-background hover:bg-muted/80 transition-colors">
                    <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time} • {appointment.specialty}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">Nenhum agendamento para esta data.</p>
              )}
            </CardContent>
          </Card>
        </div>
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