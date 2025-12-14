import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const priorityColors = {
  low: "bg-accent/20 text-accent",
  medium: "bg-primary/20 text-primary",
  high: "bg-rose/20 text-rose",
};

export function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="card-elevated p-4 flex items-center gap-4 cursor-pointer group animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => onToggle(task.id)}
        >
          <button
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
              task.completed
                ? "bg-accent border-accent"
                : "border-muted-foreground/40 group-hover:border-accent"
            )}
          >
            {task.completed && <Check className="w-4 h-4 text-accent-foreground" />}
          </button>
          
          <div className="flex-1">
            <p
              className={cn(
                "font-medium transition-all duration-300",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </p>
            {task.dueDate && (
              <p className="text-sm text-muted-foreground mt-0.5">{task.dueDate}</p>
            )}
          </div>
          
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              priorityColors[task.priority]
            )}
          >
            {task.priority === "high" ? "Urgent" : task.priority === "medium" ? "Normal" : "Faible"}
          </span>
        </div>
      ))}
    </div>
  );
}
