import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface Zone {
  id: string;
  name: string;
  area: number;
  plants: number;
  health: "excellent" | "good" | "moderate" | "poor";
  lastInspection: string;
}

interface PlantationZonesProps {
  zones: Zone[];
}

const healthColors = {
  excellent: "bg-accent text-accent-foreground",
  good: "bg-accent/70 text-accent-foreground",
  moderate: "bg-primary text-primary-foreground",
  poor: "bg-rose text-rose-foreground",
};

const healthLabels = {
  excellent: "Excellent",
  good: "Bon",
  moderate: "Modéré",
  poor: "Faible",
};

export function PlantationZones({ zones }: PlantationZonesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {zones.map((zone, index) => (
        <div
          key={zone.id}
          className="card-elevated p-5 animate-scale-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-serif font-semibold">{zone.name}</h4>
                <p className="text-sm text-muted-foreground">{zone.area} hectares</p>
              </div>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                healthColors[zone.health]
              )}
            >
              {healthLabels[zone.health]}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-2xl font-serif font-semibold">{zone.plants.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Plants</p>
            </div>
            <div>
              <p className="text-sm font-medium">{zone.lastInspection}</p>
              <p className="text-sm text-muted-foreground">Dernière inspection</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
