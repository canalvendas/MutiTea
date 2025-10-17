import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Calendar } from "@/components/ui/calendar"; // Importa o componente Calendar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; // Importa o locale para português

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock data for appointments based on selected date
  const mockAppointments = [
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
  ];

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
              locale={ptBR} // Define o idioma do calendário para português
            />
          </CardContent>
        </Card>

        {/* Appointments Section */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">
              Agendamentos para {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : "hoje"}
            </CardTitle>
            <Button size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-2" /> Adicionar Agendamento
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            {mockAppointments.length > 0 ? (
              mockAppointments.map((appointment) => (
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

      <MadeWithDyad />
    </div>
  );
};

export default Agenda;