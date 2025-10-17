import { MadeWithDyad } from "@/components/made-with-dyad";

const Reports = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 pb-20 md:pb-0">
      <h1 className="text-3xl font-bold mb-4">Relatórios</h1>
      <p className="text-lg text-gray-600 text-center">
        Esta é a página de Relatórios. Aqui você poderá gerar e visualizar seus relatórios!
      </p>
      <MadeWithDyad />
    </div>
  );
};

export default Reports;