export interface Patient {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
}

export const patientsData: Patient[] = [
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
];