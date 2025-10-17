import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ProfileTabs = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="Dra. Marina Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="marina.silva@multitea.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" defaultValue="(XX) XXXXX-XXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue="Rua Exemplo, 123 - Cidade, Estado" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidade</Label>
                <Input id="specialty" defaultValue="Psicologia Clínica" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crp">CRP/CRM</Label>
                <Input id="crp" defaultValue="CRP 00/12345" />
              </div>
            </div>
            <Button className="mt-4">Salvar Alterações</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="anamnese" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Anamnese</CardTitle>
            <CardDescription>Histórico detalhado do paciente.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Nenhuma anamnese registrada ainda." rows={10} />
            <Button className="mt-4">Adicionar Anamnese</Button>
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