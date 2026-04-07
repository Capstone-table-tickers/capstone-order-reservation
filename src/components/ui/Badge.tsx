import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "outline" | "success";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
    success: "bg-green-100 text-green-800",
  };

  return (
    <span className={cn("rounded-full px-2 py-1 text-xs font-medium", variantClasses[variant], className)}>
      {children}
    </span>
  );
}