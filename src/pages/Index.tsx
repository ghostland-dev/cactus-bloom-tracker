import { useState } from "react";
import heroImage from "@/assets/hero-cactus.jpg";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { TaskList } from "@/components/TaskList";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { PlantationZones } from "@/components/PlantationZones";
import { WeatherWidget } from "@/components/WeatherWidget";
import { FinanceCard } from "@/components/FinanceCard";
import { VarietyCard } from "@/components/VarietyCard";
import { RiskTable, Bug, Droplets as DropletsIcon, Lock, TrendingDown, Wallet } from "@/components/RiskTable";
import { ProjectInfo } from "@/components/ProjectInfo";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { Calculator } from "lucide-react";
import {
  Sprout,
  Calendar,
  TrendingUp,
  Droplets,
  MapPin,
  ListTodo,
  Clock,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  Leaf,
  AlertTriangle,
  Coins,
} from "lucide-react";

// Données réelles du projet - Basé sur le dossier complet
const projectTasks = [
  { id: "1", title: "Accès terrain - finalisation des accords", completed: true, priority: "high" as const, dueDate: "Année 0" },
  { id: "2", title: "Dossier subvention Génération Green", completed: false, priority: "high" as const, dueDate: "En cours" },
  { id: "3", title: "Défrichage léger du terrain", completed: false, priority: "medium" as const, dueDate: "Année 1" },
  { id: "4", title: "Labour superficiel (20-30 cm)", completed: false, priority: "medium" as const, dueDate: "Année 1" },
  { id: "5", title: "Piquetage - espacement 5m × 4m", completed: false, priority: "medium" as const, dueDate: "Année 1" },
  { id: "6", title: "Achat plants certifiés ONSSA (Achefri/Melk Zhar)", completed: false, priority: "high" as const, dueDate: "Année 1" },
  { id: "7", title: "Surveillance mensuelle cochenille", completed: false, priority: "high" as const, dueDate: "Mensuel" },
  { id: "8", title: "Désherbage manuel (2 fois/an)", completed: false, priority: "low" as const, dueDate: "Année 1" },
];

const projectPhases = [
  { id: "1", name: "Année 0 - Préparation", startDate: "2024", endDate: "2024", progress: 50, status: "in-progress" as const },
  { id: "2", name: "Année 1 - Plantation", startDate: "2025", endDate: "2025", progress: 0, status: "upcoming" as const },
  { id: "3", name: "Année 2 - Première récolte", startDate: "2026", endDate: "2026", progress: 0, status: "upcoming" as const },
  { id: "4", name: "Année 3+ - Pleine production", startDate: "2027", endDate: "∞", progress: 0, status: "upcoming" as const },
];

// 1-2 hectares, 500 plants/ha = 500-1000 plants
const projectZones = [
  { id: "1", name: "Parcelle principale", area: 1.5, plants: 750, health: "good" as const, lastInspection: "En attente plantation" },
  { id: "2", name: "Extension future", area: 0.5, plants: 250, health: "moderate" as const, lastInspection: "Non planté" },
];

const projectWeather = {
  temperature: 38,
  humidity: 15,
  windSpeed: 12,
  condition: "sunny" as const,
  rainfall: 2, // Zone très aride
};

const projectFinances = {
  year2: {
    investmentInitial: 26000, // 6000 plantation + 5000 entretien + 15000 divers
    chargesAnnuelles: 5000, // 2500 entretien + 2500 récolte
    recettesEstimees: 45000, // 30000-60000 moyenne
    subventions: 70, // 60-80%
  },
  year3: {
    investmentInitial: 0,
    chargesAnnuelles: 5000,
    recettesEstimees: 70000, // 60000-80000 moyenne
    subventions: 70,
  },
};

const projectVarieties = [
  {
    id: "1",
    name: "Achefri",
    resistance: "high" as const,
    fruitQuality: "Calibre moyen à gros",
    adaptability: "Zones arides",
    recommended: true,
  },
  {
    id: "2",
    name: "Melk Zhar",
    resistance: "high" as const,
    fruitQuality: "Qualité commerciale",
    adaptability: "Stress hydrique",
    recommended: true,
  },
];

const projectRisks = [
  { id: "1", name: "Cochenille du cactus", measure: "Variétés résistantes certifiées ONSSA", severity: "high" as const, icon: Bug },
  { id: "2", name: "Sécheresse extrême", measure: "Espacement large 5m × 4m", severity: "medium" as const, icon: DropletsIcon },
  { id: "3", name: "Vol / Dégradation", measure: "Clôture du terrain", severity: "medium" as const, icon: Lock },
  { id: "4", name: "Prix bas du marché", measure: "Vente précoce saison", severity: "low" as const, icon: TrendingDown },
  { id: "5", name: "Risque financier", measure: "Réserve de trésorerie", severity: "low" as const, icon: Wallet },
];

const Index = () => {
  const [tasks, setTasks] = useState(projectTasks);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "finances" | "varieties" | "calculator">("dashboard");

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalPlants = projectZones.reduce((acc, z) => acc + z.plants, 0);
  const totalArea = projectZones.reduce((acc, z) => acc + z.area, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Projet Cactus</h1>
              <p className="text-xs text-muted-foreground">Imiter / Tinghir</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <LayoutDashboard className="w-4 h-4" />
              Tableau de bord
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="w-4 h-4" />
              Calendrier
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="w-4 h-4" />
              Zones
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-4 h-4" />
              Paramètres
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="gradient" size="sm" className="hidden sm:flex">
              + Nouvelle tâche
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 space-y-2 animate-slide-up">
            <a href="#" className="flex items-center gap-2 p-3 rounded-lg bg-secondary text-sm font-medium">
              <LayoutDashboard className="w-4 h-4" />
              Tableau de bord
            </a>
            <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              Calendrier
            </a>
            <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Zones
            </a>
            <a href="#" className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary text-sm text-muted-foreground">
              <Settings className="w-4 h-4" />
              Paramètres
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={heroImage}
          alt="Plantation de figuier de barbarie à Tinghir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Bienvenue sur votre tableau de bord
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Gérez votre exploitation de figuier de barbarie avec un suivi quotidien, hebdomadaire et annuel.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === "dashboard" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveTab("dashboard")}
            className="shrink-0"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Tableau de bord
          </Button>
          <Button
            variant={activeTab === "finances" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveTab("finances")}
            className="shrink-0"
          >
            <Coins className="w-4 h-4 mr-2" />
            Finances
          </Button>
          <Button
            variant={activeTab === "varieties" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveTab("varieties")}
            className="shrink-0"
          >
            <Leaf className="w-4 h-4 mr-2" />
            Variétés & Risques
          </Button>
          <Button
            variant={activeTab === "calculator" ? "gradient" : "outline"}
            size="sm"
            onClick={() => setActiveTab("calculator")}
            className="shrink-0"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculateur
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Surface totale"
            value={`${totalArea} ha`}
            subtitle={`${projectZones.length} parcelles`}
            icon={MapPin}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Plants prévus"
            value={totalPlants.toLocaleString()}
            subtitle="500 plants/ha"
            icon={Sprout}
            variant="accent"
            delay={0.1}
          />
          <StatCard
            title="Budget total"
            value="110 000 DH"
            subtitle="≈ 10 000 €"
            icon={Coins}
            delay={0.2}
          />
          <StatCard
            title="Première récolte"
            value="Année 2"
            subtitle="5-8 t/ha estimé"
            icon={Calendar}
            variant="rose"
            delay={0.3}
          />
        </div>

        {activeTab === "dashboard" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Tasks & Zones */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tasks Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Tâches du projet
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {completedTasks}/{tasks.length} complétées
                  </span>
                </div>
                <TaskList tasks={tasks} onToggle={handleToggleTask} />
              </section>

              {/* Zones Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Zones de plantation
                  </h3>
                </div>
                <PlantationZones zones={projectZones} />
              </section>
            </div>

            {/* Right Column - Weather & Timeline */}
            <div className="space-y-8">
              {/* Project Info */}
              <ProjectInfo
                location="Imiter / Tinghir (zone aride)"
                surface="1 à 2 hectares"
                budget="110 000 DH (10 000 €)"
                objective="Production de fruits frais"
                density="500 plants/ha (5m × 4m)"
              />

              {/* Weather Widget */}
              <WeatherWidget weather={projectWeather} location="Tinghir, Maroc" />

              {/* Project Timeline */}
              <section>
                <h3 className="font-serif text-xl font-semibold flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Planification
                </h3>
                <ProjectTimeline phases={projectPhases} />
              </section>
            </div>
          </div>
        )}

        {activeTab === "finances" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                Projections financières
              </h3>
              <FinanceCard data={projectFinances.year2} year={2} />
              <FinanceCard data={projectFinances.year3} year={3} />
            </div>
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Subventions disponibles
              </h3>
              <div className="card-elevated p-5 space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Génération Green</span>
                  <span className="font-semibold text-accent">Actif</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">ADA (cactus résistant)</span>
                  <span className="font-semibold text-accent">Éligible</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Subvention plants</span>
                  <span className="font-semibold text-primary">60-80%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <span className="text-sm">Irrigation localisée</span>
                  <span className="font-semibold text-primary">Jusqu'à 80%</span>
                </div>
              </div>

              <h3 className="font-serif text-xl font-semibold flex items-center gap-2 mt-8">
                <Calendar className="w-5 h-5 text-rose" />
                Rendements estimés
              </h3>
              <div className="card-elevated p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Année 2</span>
                  <span className="font-semibold">5-8 t/ha</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "35%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Année 3+</span>
                  <span className="font-semibold">15-20 t/ha</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "varieties" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                <Leaf className="w-5 h-5 text-accent" />
                Variétés recommandées
              </h3>
              <VarietyCard varieties={projectVarieties} />
              
              <div className="card-elevated p-5 border-l-4 border-rose">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-rose mb-1">Important</h4>
                    <p className="text-sm text-muted-foreground">
                      Interdiction d'utiliser des variétés locales non certifiées. 
                      Utilisez uniquement des plants certifiés ONSSA résistants à la cochenille.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <RiskTable risks={projectRisks} />
            </div>
          </div>
        )}

        {activeTab === "calculator" && (
          <div className="max-w-3xl mx-auto">
            <BudgetCalculator />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Projet Cactus - Figuier de Barbarie | Imiter / Tinghir</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
