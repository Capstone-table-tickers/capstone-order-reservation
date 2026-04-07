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
        "group flex h-full flex-col justify-between rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm transition duration-200 ease-out hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gray-400">{label}</p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">{value}</p>
        </div>
        {badgeLabel ? (
          <Badge variant={badgeVariant} className="rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]">
            {badgeLabel}
          </Badge>
        ) : null}
      </div>

      <p className="mt-6 text-sm leading-6 text-gray-500">{description}</p>
    </Card>
  );
}
