import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Coins, Receipt, PiggyBank } from "lucide-react";

interface FinanceData {
  investmentInitial: number;
  chargesAnnuelles: number;
  recettesEstimees: number;
  subventions: number;
}

interface FinanceCardProps {
  data: FinanceData;
  year: number;
}

export function FinanceCard({ data, year }: FinanceCardProps) {
  const profit = data.recettesEstimees - data.chargesAnnuelles;
  const isProfitable = profit > 0;

  return (
    <div className="card-elevated p-5 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-serif font-semibold">Finances - Année {year}</h4>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1",
            isProfitable
              ? "bg-accent/20 text-accent"
              : "bg-primary/20 text-primary"
          )}
        >
          {isProfitable ? (
            <>
              <TrendingUp className="w-3 h-3" />
              Rentable
            </>
          ) : (
            <>
              <TrendingDown className="w-3 h-3" />
              Investissement
            </>
          )}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Investissement initial</span>
          </div>
          <span className="font-semibold">{data.investmentInitial.toLocaleString()} DH</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Charges annuelles</span>
          </div>
          <span className="font-semibold text-rose">{data.chargesAnnuelles.toLocaleString()} DH</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Recettes estimées</span>
          </div>
          <span className="font-semibold text-accent">{data.recettesEstimees.toLocaleString()} DH</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Subventions</span>
          </div>
          <span className="font-semibold text-primary">{data.subventions}%</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="font-medium">Bénéfice net estimé</span>
          <span
            className={cn(
              "text-lg font-serif font-bold",
              isProfitable ? "text-accent" : "text-rose"
            )}
          >
            {profit > 0 ? "+" : ""}{profit.toLocaleString()} DH
          </span>
        </div>
      </div>
    </div>
  );
}
