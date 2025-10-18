"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { AnamneseForm } from "./AnamneseForm"; // Importa o novo componente

// Esquema de validação para os dados cadastrais
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().optional(),
  address: z.string().optional(),
  specialty: z.string().min(1, { message: "Selecione uma especialidade." }),
  crp: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileTabsProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const ProfileTabs = ({ isEditing, setIsEditing }: ProfileTabsProps) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Dra. Marina Silva",
      email: "marina.silva@multitea.com",
      phone: "(XX) XXXXX-XXXX",
      address: "Rua Exemplo, 123 - Cidade, Estado",
      specialty: "Psicologia", // Valor inicial da especialidade
      crp: "CRP 00/12345",
    },
  });

  const currentSpecialty = form.watch("specialty"); // Observa a especialidade selecionada

  const onSubmitProfile = (data: ProfileFormValues) => {
    console.log("Dados Cadastrais submitted:", data);
    toast.success("Dados cadastrais atualizados com sucesso!");
    setIsEditing(false);
    // Aqui você enviaria os dados para um backend
  };

  const handleCancel = () => {
    form.reset(); // Reseta o formulário para os valores iniciais
    setIsEditing(false); // Sai do modo de edição
  };

  return (
    <Tabs defaultValue="dados-cadastrais" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
        <TabsTrigger value="dados-cadastrais">Dados Cadastrais</TabsTrigger>
        <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
        <TabsTrigger value="evolucao">Evolução</TabsTrigger>
        <TabsTrigger value="documentos">Documentos</TabsTrigger>
        <TabsTrigger value="plano-terapeutico">Plano Terapêutico</TabsTrigger>
      </TabsList>

      <TabsContent value="dados-cadastrais" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Dados Cadastrais</CardTitle>
            <CardDescription>Gerencie suas informações pessoais e profissionais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione sua especialidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Psicologia">Psicologia</SelectItem>
                            <SelectItem value="Fonoaudiologia">Fonoaudiologia</SelectItem>
                            <SelectItem value="Terapia Ocupacional">Terapia Ocupacional</SelectItem>
                            <SelectItem value="Psicomotricidade">Psicomotricidade</SelectItem>
                            <SelectItem value="Psicopedagogia">Psicopedagogia</SelectItem>
                            <SelectItem value="Musicoterapia">Musicoterapia</SelectItem>
                            <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
                            <SelectItem value="Nutrição">Nutrição</SelectItem>
                            <SelectItem value="Padrão">Outra / Padrão</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="crp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CRP/CRM</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!isEditing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {isEditing && (
                  <div className="flex space-x-2 pt-2">
                    <Button type="submit">Salvar Alterações</Button>
                    <Button variant="outline" type="button" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="anamnese" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Anamnese</CardTitle>
            <CardDescription>Preencha o histórico detalhado do paciente de acordo com sua especialidade.</CardDescription>
          </CardHeader>
          <CardContent>
            <AnamneseForm specialty={currentSpecialty} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="evolucao" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Evolução</CardTitle>
            <CardDescription>Registros de progresso e evolução do tratamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhum registro de evolução ainda.</p>
            <Button className="mt-4">Adicionar Evolução</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documentos" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
            <CardDescription>Gerencie documentos relacionados ao paciente.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Nenhum documento anexado ainda.</p>
            <Button className="mt-4">Adicionar Documento</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="plano-terapeutico" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Plano Terapêutico</CardTitle>
            <CardDescription>Defina e acompanhe o plano de tratamento.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Nenhum plano terapêutico definido ainda." rows={10} />
            <Button className="mt-4">Salvar Plano</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};