import { Cloud, Sun, Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "partly-cloudy";
  rainfall: number;
}

interface WeatherWidgetProps {
  weather: WeatherData;
  location: string;
}

const conditionIcons = {
  sunny: Sun,
  cloudy: Cloud,
  "partly-cloudy": Cloud,
};

export function WeatherWidget({ weather, location }: WeatherWidgetProps) {
  const ConditionIcon = conditionIcons[weather.condition];
  
  return (
    <div className="card-elevated p-6 bg-gradient-to-br from-primary/5 to-accent/5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Météo actuelle</p>
          <p className="font-serif font-semibold text-lg">{location}</p>
        </div>
        <ConditionIcon className="w-12 h-12 text-primary animate-pulse-soft" />
      </div>
      
      <div className="text-5xl font-serif font-bold mb-6">
        {weather.temperature}°C
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-accent" />
          <div>
            <p className="text-sm font-medium">{weather.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidité</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{weather.windSpeed} km/h</p>
            <p className="text-xs text-muted-foreground">Vent</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-primary" />
          <div>
            <p className="text-sm font-medium">{weather.rainfall} mm</p>
            <p className="text-xs text-muted-foreground">Pluie/mois</p>
          </div>
        </div>
      </div>
    </div>
  );
}
