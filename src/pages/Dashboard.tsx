import { Bell, User, CalendarDays, Plus, ChevronRight, ClipboardList, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile"; // Importa o hook useIsMobile

const Dashboard = () => {
  const isMobile = useIsMobile(); // Usa o hook para verificar se é mobile

  // Mock data for demonstration
  const nextAppointments = [
    {
      id: "1",
      name: "João Pedro Santos",
      specialty: "Psicologia",
      time: "09:00 - 10:00",
      avatar: "/placeholder.svg", // Replace with actual image path
    },
    {
      id: "2",
      name: "Ana Clara Oliveira",
      specialty: "Fonoaudiologia",
      time: "10:30 - 11:30",
      avatar: "/placeholder.svg", // Replace with actual image path
    },
    {
      id: "3",
      name: "Lucas Ferreira",
      specialty: "Terapia Ocupacional",
      time: "14:00 - 15:00",
      avatar: "/placeholder.svg", // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 flex-1"> {/* Adicionado flex-1 */}
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        {isMobile && ( // Renderiza logo e nome apenas em mobile
          <div className="flex items-center space-x-2">
            <img src="/images/terapiapp-logo.png" alt="Multi Tea Logo" className="h-8" />
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Multi Tea</span>
              <span className="text-xs text-gray-500">Dra. Marina Silva</span>
            </div>
          </div>
        )}
        {!isMobile && <div className="w-8"></div>} {/* Placeholder para manter o espaçamento em desktop */}
        <div className="flex items-center space-x-4 ml-auto"> {/* ml-auto para empurrar para a direita */}
          <Bell className="h-5 w-5 text-gray-600" />
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Therapist Profile" /> {/* Replace with actual image path */}
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 flex flex-col items-start">
              <User className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-3xl font-bold">47</span>
              <p className="text-sm text-gray-500">Pacientes Ativos</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4 flex flex-col items-start">
              <CalendarDays className="h-6 w-6 text-green-600 mb-2" />
              <span className="text-3xl font-bold">12</span>
              <p className="text-sm text-gray-500">Hoje</p>
            </CardContent>
          </Card>
        </div>

        {/* Próximos Atendimentos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Próximos Atendimentos</h2>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              Ver todos
            </Button>
          </div>
          <div className="space-y-3">
            {nextAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={appointment.avatar} alt={appointment.name} />
                      <AvatarFallback>{appointment.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{appointment.name}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.specialty} • {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Acesso Rápido */}
        <section className="relative">
          <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <Users className="h-6 w-6 mb-2 text-blue-600" />
              Pacientes
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <CalendarDays className="h-6 w-6 mb-2 text-green-600" />
              Agenda
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <ClipboardList className="h-6 w-6 mb-2 text-purple-600" />
              Relatórios
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <MessageSquare className="h-6 w-6 mb-2 text-orange-600" />
              Mensagens
            </Button>
          </div>
          <Button
            size="icon"
            className="absolute bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </section>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Dashboard;