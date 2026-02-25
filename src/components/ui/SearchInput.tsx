"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search...", className }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <MagnifyingGlass
        size={15}
        weight="bold"
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-10 pl-9 pr-9 rounded-xl border border-[var(--border)] text-sm",
          "bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
          "focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400",
          "dark:focus:ring-sky-400/30 dark:focus:border-sky-500",
          "transition-all duration-150"
        )}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Clear search"
        >
          <X size={14} weight="bold" />
        </button>
      )}
    </div>
  );
}
