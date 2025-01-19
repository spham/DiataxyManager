import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">DiataxyManager</CardTitle>
          <CardDescription>Un gestionnaire de documentation basé sur la méthodologie Diataxis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Qu'est-ce que DiataxyManager ?</h2>
            <p className="text-muted-foreground">
              DiataxyManager est un outil professionnel de gestion de documentation qui implémente la méthodologie Diataxis. 
              Il permet de créer, organiser et maintenir une documentation claire et structurée selon les quatre quadrants 
              fondamentaux de Diataxis.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-3">La Méthodologie Diataxis</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-2">Tutoriels</h3>
                <p className="text-muted-foreground">
                  Les tutoriels sont des leçons pratiques qui guident l'apprenant à travers une série 
                  d'étapes pour réaliser un projet spécifique. Ils sont conçus pour l'apprentissage 
                  par la pratique.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Guides Pratiques</h3>
                <p className="text-muted-foreground">
                  Les guides pratiques (How-to) sont des instructions étape par étape pour résoudre 
                  des problèmes spécifiques. Ils répondent à des questions pratiques et sont orientés 
                  vers la réalisation de tâches.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Documentation Technique</h3>
                <p className="text-muted-foreground">
                  La documentation technique fournit des informations précises et détaillées sur le 
                  fonctionnement du système. Elle sert de référence et décrit la structure et les 
                  fonctionnalités.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Explications</h3>
                <p className="text-muted-foreground">
                  Les explications clarifient et approfondissent la compréhension. Elles fournissent 
                  le contexte, explorent les concepts et expliquent le "pourquoi" derrière les choix 
                  techniques.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-3">Fonctionnalités Principales</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Organisation structurée selon les quadrants Diataxis</li>
              <li>• Modèles personnalisables pour chaque type de documentation</li>
              <li>• Interface intuitive de création et d'édition</li>
              <li>• Système de recherche intégré</li>
              <li>• Gestion flexible des contenus</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
