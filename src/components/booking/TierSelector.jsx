// src/components/booking/TierSelector.jsx
import { Check } from "lucide-react";

export function TierSelector({ tiers, selectedTierId, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tiers.map((tier) => {
        const selected = selectedTierId === tier.id;
        return (
          <div
            key={tier.id}
            onClick={() => onSelect?.(tier.id)}
            className={`
              rounded-2xl border p-5 cursor-pointer transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
              ${
                selected
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card"
              }
            `}
          >
            <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
            <p className="text-primary font-bold text-lg mb-3">{tier.price}</p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {tier.perks?.map((perk, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
