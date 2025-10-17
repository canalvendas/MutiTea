import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
}

interface PatientsListProps {
  patients: Patient[];
}

export const PatientsList = ({ patients }: PatientsListProps) => {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={patient.avatarUrl || "/placeholder.svg"} alt={patient.name} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-lg">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.specialty}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};