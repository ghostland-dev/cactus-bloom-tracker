import { useState } from "react";
import heroImage from "@/assets/hero-cactus.jpg";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { TaskList } from "@/components/TaskList";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { PlantationZones } from "@/components/PlantationZones";
import { WeatherWidget } from "@/components/WeatherWidget";
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
  Sun,
  LayoutDashboard,
  Settings,
} from "lucide-react";

// Mock data
const mockTasks = [
  { id: "1", title: "Inspection zone A - vérifier l'état des plants", completed: false, priority: "high" as const, dueDate: "Aujourd'hui" },
  { id: "2", title: "Irrigation goutte-à-goutte - maintenance", completed: true, priority: "medium" as const, dueDate: "Hier" },
  { id: "3", title: "Préparation du sol - zone D", completed: false, priority: "medium" as const, dueDate: "Demain" },
  { id: "4", title: "Récolte des figues de barbarie - zone B", completed: false, priority: "high" as const, dueDate: "Cette semaine" },
  { id: "5", title: "Analyse du sol - laboratoire", completed: true, priority: "low" as const, dueDate: "Terminé" },
];

const mockPhases = [
  { id: "1", name: "Préparation du terrain", startDate: "Jan 2024", endDate: "Mar 2024", progress: 100, status: "completed" as const },
  { id: "2", name: "Plantation initiale", startDate: "Avr 2024", endDate: "Juin 2024", progress: 100, status: "completed" as const },
  { id: "3", name: "Phase de croissance", startDate: "Juil 2024", endDate: "Déc 2024", progress: 65, status: "in-progress" as const },
  { id: "4", name: "Première récolte", startDate: "Jan 2025", endDate: "Mar 2025", progress: 0, status: "upcoming" as const },
];

const mockZones = [
  { id: "1", name: "Zone A - Nord", area: 2.5, plants: 1250, health: "excellent" as const, lastInspection: "Il y a 2 jours" },
  { id: "2", name: "Zone B - Est", area: 3.0, plants: 1500, health: "good" as const, lastInspection: "Il y a 5 jours" },
  { id: "3", name: "Zone C - Sud", area: 2.0, plants: 1000, health: "moderate" as const, lastInspection: "Il y a 1 semaine" },
  { id: "4", name: "Zone D - Ouest", area: 1.5, plants: 750, health: "good" as const, lastInspection: "Hier" },
];

const mockWeather = {
  temperature: 32,
  humidity: 25,
  windSpeed: 15,
  condition: "sunny" as const,
  rainfall: 5,
};

const Index = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;

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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Surface totale"
            value="9 ha"
            subtitle="4 zones actives"
            icon={MapPin}
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Plants cultivés"
            value="4,500"
            icon={Sprout}
            trend={{ value: 12, positive: true }}
            variant="accent"
            delay={0.1}
          />
          <StatCard
            title="Tâches complétées"
            value={`${completedTasks}/${tasks.length}`}
            subtitle="Cette semaine"
            icon={ListTodo}
            delay={0.2}
          />
          <StatCard
            title="Prochaine récolte"
            value="45 jours"
            subtitle="Estimation"
            icon={Calendar}
            variant="rose"
            delay={0.3}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tasks Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Tâches du jour
                </h3>
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
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
                <Button variant="ghost" size="sm">
                  Gérer
                </Button>
              </div>
              <PlantationZones zones={mockZones} />
            </section>
          </div>

          {/* Right Column - Weather & Timeline */}
          <div className="space-y-8">
            {/* Weather Widget */}
            <WeatherWidget weather={mockWeather} location="Tinghir, Maroc" />

            {/* Project Timeline */}
            <section>
              <h3 className="font-serif text-xl font-semibold flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                Phases du projet
              </h3>
              <ProjectTimeline phases={mockPhases} />
            </section>
          </div>
        </div>
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
