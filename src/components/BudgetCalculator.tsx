import { useState, useMemo } from "react";
import { Calculator, MapPin, Sprout, Coins, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Constantes basées sur le dossier projet
const COST_PER_HECTARE = {
  plantation: 3000, // DH après subventions (6000 pour 2ha)
  entretien2ans: 2500, // DH
  diversSecurite: 7500, // DH
};
const PLANTS_PER_HECTARE = 500;
const SUBVENTION_RATE = 0.7; // 70% moyenne
const RENDEMENT_ANNEE2 = 6.5; // tonnes/ha moyenne
const RENDEMENT_ANNEE3 = 17.5; // tonnes/ha moyenne
const PRIX_TONNE = 6000; // DH/tonne moyenne

export function BudgetCalculator() {
  const [budgetDH, setBudgetDH] = useState<number>(110000);
  const [showResults, setShowResults] = useState(false);

  const calculations = useMemo(() => {
    const budgetNet = budgetDH;
    const coutParHectare = COST_PER_HECTARE.plantation + COST_PER_HECTARE.entretien2ans + COST_PER_HECTARE.diversSecurite;
    
    // Surface possible
    const surfacePossible = Math.floor((budgetNet / coutParHectare) * 10) / 10;
    const surfaceArrondie = Math.max(0.5, Math.floor(surfacePossible * 2) / 2); // Arrondi à 0.5 ha
    
    // Nombre de plants
    const nombrePlants = Math.floor(surfaceArrondie * PLANTS_PER_HECTARE);
    
    // Coûts détaillés
    const coutPlantation = surfaceArrondie * COST_PER_HECTARE.plantation;
    const coutEntretien = surfaceArrondie * COST_PER_HECTARE.entretien2ans;
    const coutDivers = surfaceArrondie * COST_PER_HECTARE.diversSecurite;
    const investissementTotal = coutPlantation + coutEntretien + coutDivers;
    
    // Subventions
    const montantSubventions = coutPlantation * SUBVENTION_RATE;
    const investissementNet = investissementTotal - montantSubventions;
    
    // Rendements et revenus
    const rendementAnnee2 = surfaceArrondie * RENDEMENT_ANNEE2;
    const rendementAnnee3 = surfaceArrondie * RENDEMENT_ANNEE3;
    const revenuAnnee2 = rendementAnnee2 * PRIX_TONNE;
    const revenuAnnee3 = rendementAnnee3 * PRIX_TONNE;
    
    // Charges annuelles
    const chargesAnnuelles = surfaceArrondie * 2500 + rendementAnnee3 * 1.5 * 1000; // entretien + récolte
    
    // Bénéfices
    const beneficeAnnee2 = revenuAnnee2 - (surfaceArrondie * 2500);
    const beneficeAnnee3 = revenuAnnee3 - chargesAnnuelles;
    
    // ROI
    const roiAnnee2 = ((beneficeAnnee2 / investissementNet) * 100);
    const roiAnnee3 = ((beneficeAnnee3 / investissementNet) * 100);
    const anneesRetour = investissementNet / beneficeAnnee3;

    return {
      surfaceArrondie,
      nombrePlants,
      coutPlantation,
      coutEntretien,
      coutDivers,
      investissementTotal,
      montantSubventions,
      investissementNet,
      rendementAnnee2,
      rendementAnnee3,
      revenuAnnee2,
      revenuAnnee3,
      beneficeAnnee2,
      beneficeAnnee3,
      roiAnnee2,
      roiAnnee3,
      anneesRetour,
    };
  }, [budgetDH]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-lg">Calculateur de projet</h3>
            <p className="text-sm text-muted-foreground">Entrez votre budget pour voir les projections</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budget-dh">Budget total (DH)</Label>
            <Input
              id="budget-dh"
              type="number"
              value={budgetDH}
              onChange={(e) => setBudgetDH(Number(e.target.value))}
              className="text-lg font-semibold"
              min={10000}
              step={5000}
            />
          </div>
          <div className="space-y-2">
            <Label>Équivalent en €</Label>
            <div className="h-10 px-3 flex items-center bg-secondary rounded-md text-lg font-semibold">
              {Math.round(budgetDH / 11).toLocaleString()} €
            </div>
          </div>
        </div>

        <Button
          variant="gradient"
          className="w-full mt-4"
          onClick={() => setShowResults(true)}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculer les projections
        </Button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-slide-up">
          {/* Surface & Plants */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card-elevated p-5 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-serif font-bold">{calculations.surfaceArrondie} ha</p>
              <p className="text-sm text-muted-foreground">Surface exploitable</p>
            </div>
            <div className="card-elevated p-5 text-center">
              <Sprout className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-3xl font-serif font-bold">{calculations.nombrePlants.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Plants à cultiver</p>
            </div>
          </div>

          {/* Investment Breakdown */}
          <div className="card-elevated p-5">
            <h4 className="font-serif font-semibold mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              Répartition de l'investissement
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm">Plantation (après subventions)</span>
                <span className="font-semibold">{calculations.coutPlantation.toLocaleString()} DH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm">Entretien (2 ans)</span>
                <span className="font-semibold">{calculations.coutEntretien.toLocaleString()} DH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                <span className="text-sm">Divers & sécurité</span>
                <span className="font-semibold">{calculations.coutDivers.toLocaleString()} DH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                <span className="text-sm text-accent">Subventions estimées (70%)</span>
                <span className="font-semibold text-accent">-{calculations.montantSubventions.toLocaleString()} DH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/20 rounded-lg border-2 border-primary/30">
                <span className="font-medium">Investissement net</span>
                <span className="font-bold text-lg">{calculations.investissementNet.toLocaleString()} DH</span>
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="card-elevated p-5">
            <h4 className="font-serif font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Projections de revenus
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Année 2</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Rendement: {calculations.rendementAnnee2.toFixed(1)} tonnes
                </p>
                <p className="text-xl font-serif font-bold text-primary">
                  {calculations.revenuAnnee2.toLocaleString()} DH
                </p>
                <p className={cn(
                  "text-sm font-medium mt-1",
                  calculations.beneficeAnnee2 > 0 ? "text-accent" : "text-rose"
                )}>
                  Bénéfice: {calculations.beneficeAnnee2 > 0 ? "+" : ""}{calculations.beneficeAnnee2.toLocaleString()} DH
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Année 3+</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Rendement: {calculations.rendementAnnee3.toFixed(1)} tonnes
                </p>
                <p className="text-xl font-serif font-bold text-accent">
                  {calculations.revenuAnnee3.toLocaleString()} DH
                </p>
                <p className="text-sm font-medium mt-1 text-accent">
                  Bénéfice: +{calculations.beneficeAnnee3.toLocaleString()} DH
                </p>
              </div>
            </div>
          </div>

          {/* ROI Summary */}
          <div className="card-elevated p-5 bg-gradient-to-br from-primary/10 to-accent/10">
            <h4 className="font-serif font-semibold mb-4">Retour sur investissement</h4>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-serif font-bold text-primary">
                  {calculations.roiAnnee2.toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">ROI Année 2</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-accent">
                  {calculations.roiAnnee3.toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground">ROI Année 3+</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold">
                  {calculations.anneesRetour.toFixed(1)} ans
                </p>
                <p className="text-xs text-muted-foreground">Retour investissement</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
