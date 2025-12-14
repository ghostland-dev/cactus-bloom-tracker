import { cn } from "@/lib/utils";
import { AlertTriangle, Shield, Bug, Droplets, Lock, TrendingDown, Wallet } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Risk {
  id: string;
  name: string;
  measure: string;
  severity: "high" | "medium" | "low";
  icon: LucideIcon;
}

interface RiskTableProps {
  risks: Risk[];
}

const severityColors = {
  high: "bg-rose/20 text-rose border-rose/30",
  medium: "bg-primary/20 text-primary border-primary/30",
  low: "bg-accent/20 text-accent border-accent/30",
};

const severityLabels = {
  high: "Élevé",
  medium: "Moyen",
  low: "Faible",
};

export function RiskTable({ risks }: RiskTableProps) {
  return (
    <div className="card-elevated overflow-hidden animate-scale-in">
      <div className="p-4 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <h4 className="font-serif font-semibold">Gestion des risques</h4>
        </div>
      </div>
      <div className="divide-y divide-border">
        {risks.map((risk) => {
          const Icon = risk.icon;
          return (
            <div
              key={risk.id}
              className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="p-2 bg-secondary rounded-lg shrink-0">
                <Icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{risk.name}</p>
                <p className="text-xs text-muted-foreground truncate">{risk.measure}</p>
              </div>
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium border shrink-0",
                  severityColors[risk.severity]
                )}
              >
                {severityLabels[risk.severity]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Bug, Droplets, Lock, TrendingDown, Wallet };
