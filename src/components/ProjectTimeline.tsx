import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: "completed" | "in-progress" | "upcoming";
}

interface ProjectTimelineProps {
  phases: Phase[];
}

const statusColors = {
  completed: "bg-accent",
  "in-progress": "bg-primary",
  upcoming: "bg-muted",
};

const statusLabels = {
  completed: "Terminé",
  "in-progress": "En cours",
  upcoming: "À venir",
};

export function ProjectTimeline({ phases }: ProjectTimelineProps) {
  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <div
          key={phase.id}
          className="relative pl-8 pb-8 last:pb-0 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Timeline line */}
          {index < phases.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
          )}
          
          {/* Timeline dot */}
          <div
            className={cn(
              "absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-background",
              statusColors[phase.status]
            )}
          />
          
          <div className="card-elevated p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif font-semibold">{phase.name}</h4>
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  phase.status === "completed" && "bg-accent/20 text-accent",
                  phase.status === "in-progress" && "bg-primary/20 text-primary",
                  phase.status === "upcoming" && "bg-muted text-muted-foreground"
                )}
              >
                {statusLabels[phase.status]}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {phase.startDate} - {phase.endDate}
            </p>
            
            {phase.status !== "upcoming" && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{phase.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      statusColors[phase.status]
                    )}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
