import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, withWordmark = true, size = 28 }: { className?: string; withWordmark?: boolean; size?: number }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative grid place-items-center rounded-lg"
        style={{
          width: size + 8,
          height: size + 8,
          background: "linear-gradient(135deg, oklch(0.82 0.14 210 / 0.18), oklch(0.78 0.12 240 / 0.05))",
          boxShadow: "inset 0 0 0 1px oklch(0.82 0.14 210 / 0.35)",
        }}
      >
        <Shield size={size - 6} className="text-primary" strokeWidth={2.25} />
      </div>
      {withWordmark && (
        <div className="leading-none">
          <div className="font-display text-[1.05rem] font-semibold tracking-tight">
            ELIOT
          </div>
          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            Plataforma C2R
          </div>
        </div>
      )}
    </div>
  );
}
