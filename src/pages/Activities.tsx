import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { activitiesData } from "@/data/activities";
import { Badge } from "@/components/ui/badge";

const Activities = () => {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8">Banco de Atividades</h1>

      <Accordion type="multiple" className="w-full space-y-4">
        {activitiesData.map((specialtyData) => (
          <AccordionItem key={specialtyData.specialty} value={specialtyData.specialty} className="border rounded-lg bg-card">
            <AccordionTrigger className="p-4 text-xl font-semibold hover:no-underline">
              <div className="flex items-center space-x-3">
                <specialtyData.icon className="h-7 w-7 text-primary" />
                <span>{specialtyData.specialty}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <Accordion type="multiple" className="w-full space-y-2">
                {specialtyData.demands.map((demand) => (
                  <AccordionItem key={demand.name} value={demand.name} className="border rounded-md bg-background">
                    <AccordionTrigger className="px-4 font-medium hover:no-underline">
                      {demand.name}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 space-y-4">
                      {demand.activities.map((activity) => (
                        <Card key={activity.title} className="shadow-sm">
                          <CardHeader>
                            <CardTitle>{activity.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{activity.description}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Materiais:</span>
                              <Badge variant="outline">{activity.materials}</Badge>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <MadeWithDyad />
    </div>
  );
};

export default Activities;