"use client";

import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, DollarSign } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/DateRangePicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for reports
const mockReportData = {
  totalAppointments: 150,
  activePatients: 47,
  estimatedRevenue: 7500,
  appointmentsByMonth: [
    { name: "Jan", atendimentos: 20 },
    { name: "Fev", atendimentos: 25 },
    { name: "Mar", atendimentos: 30 },
    { name: "Abr", atendimentos: 28 },
    { name: "Mai", atendimentos: 35 },
    { name: "Jun", atendimentos: 32 },
  ],
};

const Reports = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20 md:pb-0 flex-1">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <DateRangePicker date={dateRange} setDate={setDateRange} />
        {/* Adicionar botões de filtro ou exportação aqui, se necessário */}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Atendimentos
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReportData.totalAppointments}
            </div>
            <p className="text-xs text-muted-foreground">
              +20% do mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockReportData.activePatients}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 novos pacientes este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Estimada
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockReportData.estimatedRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +15% do mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments by Month Chart */}
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Atendimentos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockReportData.appointmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="atendimentos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <MadeWithDyad />
    </div>
  );
};

export default Reports;