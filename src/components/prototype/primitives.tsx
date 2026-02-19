'use client';

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export function SurfaceCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass-card card-hover", className)}>{children}</div>;
}

export function StatCard({
  title,
  value,
  icon,
  tone = "accent",
  trend = "+0%",
  trendDirection,
  trendLabel = "vs last period",
}: {
  title: string;
  value: string;
  icon: ReactNode;
  tone?: "accent" | "success" | "warning" | "error";
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendLabel?: string;
}) {
  const iconToneStyles: Record<"accent" | "success" | "warning" | "error", string> = {
    accent: "from-indigo-500/40 to-violet-500/35 text-indigo-200",
    success: "from-emerald-500/35 to-lime-400/25 text-emerald-200",
    warning: "from-amber-500/35 to-orange-400/25 text-amber-200",
    error: "from-rose-500/35 to-red-400/25 text-rose-200",
  };

  const glowToneStyles: Record<"accent" | "success" | "warning" | "error", string> = {
    accent: "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_70%)]",
    success: "bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.22),transparent_70%)]",
    warning: "bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22),transparent_70%)]",
    error: "bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.22),transparent_70%)]",
  };

  const currentDirection =
    trendDirection ?? (tone === "error" ? "down" : tone === "warning" ? "neutral" : "up");

  const trendStyles: Record<"up" | "down" | "neutral", string> = {
    up: "border border-emerald-500/25 bg-emerald-500/14 text-emerald-300",
    down: "border border-rose-500/25 bg-rose-500/14 text-rose-300",
    neutral: "border border-amber-500/25 bg-amber-500/14 text-amber-300",
  };

  const TrendIcon = currentDirection === "up" ? ArrowUpRight : currentDirection === "down" ? ArrowDownRight : Minus;

  return (
    <SurfaceCard className="relative overflow-hidden p-5 md:p-6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="mb-5 flex items-start justify-between gap-3">
        <p className="pt-1 text-sm font-medium text-reno-text-2">{title}</p>
        <div className="relative">
          <span className={cn("absolute -inset-4 rounded-full blur-xl", glowToneStyles[tone])} />
          <span
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/10 bg-gradient-to-br",
              iconToneStyles[tone],
            )}
          >
            {icon}
          </span>
        </div>
      </div>
      <p className="num-tabular text-[30px] font-bold leading-none tracking-tight text-reno-text-1">{value}</p>
      <div className="mt-5 flex items-center gap-2 text-xs md:text-sm">
        <span className={cn("inline-flex items-center gap-1 rounded-pill px-2.5 py-1 font-medium", trendStyles[currentDirection])}>
          <TrendIcon size={13} />
          <span className="num-tabular">{trend}</span>
        </span>
        <span className="text-reno-text-2">{trendLabel}</span>
      </div>
    </SurfaceCard>
  );
}

export function StatusBadge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "error" | "accent" | "info";
}) {
  const toneStyles: Record<"default" | "success" | "warning" | "error" | "accent" | "info", string> = {
    default: "border-white/10 bg-white/5 text-reno-text-2",
    success: "border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
    warning: "border-amber-500/30 bg-amber-500/15 text-amber-300",
    error: "border-rose-500/30 bg-rose-500/15 text-rose-300",
    accent: "border-indigo-500/30 bg-indigo-500/15 text-indigo-300",
    info: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  };

  return (
    <span className={cn("inline-flex min-h-6 items-center rounded-pill border px-2.5 py-1 text-xs font-medium", toneStyles[tone])}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  const clampedValue = Math.max(0, Math.min(100, value));

  let barColor = "from-rose-500 to-red-500";
  if (clampedValue >= 70) barColor = "from-emerald-500 to-lime-400";
  if (clampedValue >= 40 && clampedValue < 70) barColor = "from-amber-500 to-orange-400";

  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-white/8", className)}>
      <div className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-300", barColor)} style={{ width: `${clampedValue}%` }} />
    </div>
  );
}

export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-reno-text-2">
      {children}
    </label>
  );
}

const fieldBaseStyles =
  "h-11 w-full rounded-input border border-white/10 bg-white/[0.035] px-3 text-sm text-reno-text-1 outline-none transition-all placeholder:text-reno-text-3 focus:border-indigo-400/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/15";

export function FieldInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBaseStyles, props.className)} />;
}

export function FieldSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(fieldBaseStyles, props.className)} />;
}

export function FieldTextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-input border border-white/10 bg-white/[0.035] px-3 py-2.5 text-sm text-reno-text-1 outline-none transition-all placeholder:text-reno-text-3 focus:border-indigo-400/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/15",
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
        "btn-primary btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-input px-4 text-sm font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-60",
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
        "btn-secondary btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-input px-4 text-sm font-medium text-reno-text-1 transition-all disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "btn-ghost btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-input px-4 text-sm font-medium text-reno-text-2 transition-all hover:text-reno-text-1 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-card border border-dashed border-white/15 bg-white/[0.015] p-8 text-center">
      <p className="text-sm font-medium text-reno-text-1">{title}</p>
      <p className="mt-2 text-sm text-reno-text-2">{detail}</p>
    </div>
  );
}
