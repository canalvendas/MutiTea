import { MadeWithDyad } from "@/components/made-with-dyad";

const Agenda = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-4">Agenda</h1>
      <p className="text-lg text-gray-600 text-center">
        Esta é a página da Agenda. Seu calendário de atendimentos aparecerá aqui!
      </p>
      <MadeWithDyad />
    </div>
  );
};

export default Agenda;