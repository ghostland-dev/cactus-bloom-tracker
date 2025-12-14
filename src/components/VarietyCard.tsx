import { cn } from "@/lib/utils";
import { Leaf, Shield, Droplets, Award } from "lucide-react";

interface Variety {
  id: string;
  name: string;
  resistance: "high" | "medium" | "low";
  fruitQuality: string;
  adaptability: string;
  recommended: boolean;
}

interface VarietyCardProps {
  varieties: Variety[];
}

const resistanceColors = {
  high: "bg-accent text-accent-foreground",
  medium: "bg-primary text-primary-foreground",
  low: "bg-rose text-rose-foreground",
};

const resistanceLabels = {
  high: "Excellente",
  medium: "Moyenne",
  low: "Faible",
};

export function VarietyCard({ varieties }: VarietyCardProps) {
  return (
    <div className="space-y-4">
      {varieties.map((variety, index) => (
        <div
          key={variety.id}
          className={cn(
            "card-elevated p-5 animate-scale-in",
            variety.recommended && "ring-2 ring-accent"
          )}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-semibold">{variety.name}</h4>
                  {variety.recommended && (
                    <Award className="w-4 h-4 text-accent" />
                  )}
                </div>
                {variety.recommended && (
                  <p className="text-xs text-accent">Recommandée</p>
                )}
              </div>
            </div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                resistanceColors[variety.resistance]
              )}
            >
              <Shield className="w-3 h-3" />
              {resistanceLabels[variety.resistance]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm font-medium">{variety.fruitQuality}</p>
              <p className="text-xs text-muted-foreground">Qualité des fruits</p>
            </div>
            <div>
              <p className="text-sm font-medium flex items-center gap-1">
                <Droplets className="w-3 h-3 text-primary" />
                {variety.adaptability}
              </p>
              <p className="text-xs text-muted-foreground">Adaptation</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
