import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Share2, Archive } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  specialty: string;
  avatarUrl?: string;
}

export const ProfileHeader = ({ name, specialty, avatarUrl }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-sm rounded-lg mb-6 md:flex-row md:justify-between md:items-start">
      <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-4">
        <Avatar className="h-24 w-24 mb-4 md:mb-0">
          <AvatarImage src={avatarUrl || "/public/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">{specialty}</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" /> Editar
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" /> Compartilhar
        </Button>
        <Button variant="destructive" size="sm">
          <Archive className="h-4 w-4 mr-2" /> Arquivar
        </Button>
      </div>
    </div>
  );
};