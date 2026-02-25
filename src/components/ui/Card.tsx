import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

export function Card({ children, className, hover = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-5",
        hover && "transition-all duration-200 hover:border-sky-200 dark:hover:border-sky-500/30 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-base font-semibold text-[var(--foreground)]", className)}>{children}</h3>
  );
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-sm text-[var(--muted-foreground)] mt-1", className)}>{children}</p>
  );
}
