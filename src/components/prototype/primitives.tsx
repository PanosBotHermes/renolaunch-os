'use client';
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import type { LucideProps } from "lucide-react";

type IconComponent = (props: LucideProps) => ReactNode;

export function SurfaceCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-card border border-reno-border bg-reno-card", className)}>
      {children}
    </div>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  tone = "accent",
}: {
  title: string;
  value: string;
  icon: IconComponent;
  tone?: "accent" | "success" | "warning" | "error";
}) {
  const toneStyles: Record<"accent" | "success" | "warning" | "error", string> = {
    accent: "text-reno-accent bg-reno-accent/10",
    success: "text-reno-success bg-reno-success/10",
    warning: "text-reno-warning bg-reno-warning/10",
    error: "text-reno-error bg-reno-error/10",
  };

  return (
    <SurfaceCard className="p-5 transition-colors hover:border-reno-accent/70">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-reno-text-secondary">{title}</p>
        <span className={cn("inline-flex rounded-md p-2", toneStyles[tone])}>
          <Icon size={16} />
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-tight text-reno-text-primary">{value}</p>
    </SurfaceCard>
  );
}

export function StatusBadge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "error" | "accent";
}) {
  const toneStyles: Record<"default" | "success" | "warning" | "error" | "accent", string> = {
    default: "border-reno-border bg-reno-border/40 text-reno-text-secondary",
    success: "border-reno-success/25 bg-reno-success/10 text-reno-success",
    warning: "border-reno-warning/25 bg-reno-warning/10 text-reno-warning",
    error: "border-reno-error/25 bg-reno-error/10 text-reno-error",
    accent: "border-reno-accent/25 bg-reno-accent/10 text-reno-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        toneStyles[tone],
      )}
    >
      {children}
    </span>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  let barColor = "bg-reno-error";
  if (clampedValue >= 70) barColor = "bg-reno-success";
  if (clampedValue >= 40 && clampedValue < 70) barColor = "bg-reno-warning";

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-reno-border/70", className)}>
      <div className={cn("h-full rounded-full", barColor)} style={{ width: `${clampedValue}%` }} />
    </div>
  );
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-medium text-reno-text-secondary">
      {children}
    </label>
  );
}

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-input border border-reno-border bg-reno-bg px-3 text-sm text-reno-text-primary outline-none transition-colors",
        "focus:border-reno-accent",
        props.className,
      )}
    />
  );
}

export function FieldSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-input border border-reno-border bg-reno-bg px-3 text-sm text-reno-text-primary outline-none transition-colors",
        "focus:border-reno-accent",
        props.className,
      )}
    />
  );
}

export function FieldTextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-input border border-reno-border bg-reno-bg px-3 py-2 text-sm text-reno-text-primary outline-none transition-colors",
        "focus:border-reno-accent",
        props.className,
      )}
    />
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-input bg-reno-accent px-4 text-sm font-medium text-white transition-colors",
        "hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-input border border-reno-border bg-reno-card px-4 text-sm font-medium text-reno-text-primary transition-colors",
        "hover:border-reno-accent/70",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-card border border-dashed border-reno-border/70 bg-reno-bg/40 p-8 text-center">
      <p className="text-sm font-medium text-reno-text-primary">{title}</p>
      <p className="mt-2 text-sm text-reno-text-secondary">{detail}</p>
    </div>
  );
}
