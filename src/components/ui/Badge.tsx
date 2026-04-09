import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "outline" | "success";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-700",
    outline: "border border-[var(--color-border)] text-gray-600",
    success: "bg-[var(--color-brand-100)] text-[var(--color-brand-800)]",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
