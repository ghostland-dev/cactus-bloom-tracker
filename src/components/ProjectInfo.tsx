import { MapPin, Ruler, Coins, Target, Calendar } from "lucide-react";

interface ProjectInfoProps {
  location: string;
  surface: string;
  budget: string;
  objective: string;
  density: string;
}

export function ProjectInfo({ location, surface, budget, objective, density }: ProjectInfoProps) {
  return (
    <div className="card-elevated p-5 animate-scale-in">
      <h4 className="font-serif font-semibold mb-4">Informations du projet</h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted-foreground">Localisation:</span>
          <span className="font-medium">{location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Ruler className="w-4 h-4 text-accent shrink-0" />
          <span className="text-muted-foreground">Surface:</span>
          <span className="font-medium">{surface}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Coins className="w-4 h-4 text-primary shrink-0" />
          <span className="text-muted-foreground">Budget:</span>
          <span className="font-medium">{budget}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Target className="w-4 h-4 text-rose shrink-0" />
          <span className="text-muted-foreground">Objectif:</span>
          <span className="font-medium">{objective}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground">Densité:</span>
          <span className="font-medium">{density}</span>
        </div>
      </div>
    </div>
  );
}
