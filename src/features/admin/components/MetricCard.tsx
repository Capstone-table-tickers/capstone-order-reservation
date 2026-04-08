import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export interface MetricCardProps {
  label: string;
  value: string | number;
  description: string;
  badgeLabel?: string;
  badgeVariant?: "default" | "outline" | "success";
  className?: string;
}

export function MetricCard({
  label,
  value,
  description,
  badgeLabel,
  badgeVariant = "default",
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between transition hover:border-[var(--color-brand-200)] hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{value}</p>
        </div>
        {badgeLabel ? (
          <Badge variant={badgeVariant} className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest">
            {badgeLabel}
          </Badge>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-gray-500">{description}</p>
    </Card>
  );
}
