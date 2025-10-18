export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  diagnosis: string;
  motherName: string;
  phone: string;
  avatarUrl?: string;
}

export const patientsData: Patient[] = [
  {
    id: "1",
    name: "João Pedro Santos",
    birthDate: "10/05/2018",
    diagnosis: "TEA Nível 1",
    motherName: "Maria Santos",
    phone: "(11) 98765-4321",
    avatarUrl: "/public/placeholder.svg",
  },
  {
    id: "2",
    name: "Ana Clara Oliveira",
    birthDate: "22/08/2019",
    diagnosis: "Atraso Global do Desenvolvimento",
    motherName: "Juliana Oliveira",
    phone: "(21) 91234-5678",
    avatarUrl: "/public/placeholder.svg",
  },
  {
    id: "3",
    name: "Lucas Ferreira",
    birthDate: "03/01/2017",
    diagnosis: "TEA Nível 2",
    motherName: "Carla Ferreira",
    phone: "(31) 95555-1234",
    avatarUrl: "/public/placeholder.svg",
  },
  {
    id: "4",
    name: "Mariana Costa",
    birthDate: "15/11/2020",
    diagnosis: "Investigação para TEA",
    motherName: "Fernanda Costa",
    phone: "(41) 98888-7777",
    avatarUrl: "/public/placeholder.svg",
  },
  {
    id: "5",
    name: "Pedro Henrique",
    birthDate: "30/07/2016",
    diagnosis: "TDAH",
    motherName: "Beatriz Henrique",
    phone: "(51) 99999-0000",
    avatarUrl: "/public/placeholder.svg",
  },
];