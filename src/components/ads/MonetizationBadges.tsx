import { Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";

export function FreeBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-emerald-500/30 text-[10px] sm:text-xs font-medium text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Free Download</span>
    </div>
  );
}

export function PremiumBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-purple-500/50 text-[10px] sm:text-xs font-bold text-purple-300 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
      <span>Ad Unlock Required</span>
    </div>
  );
}

export function WarningBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-orange-500/30 text-xs font-medium text-orange-400 bg-orange-500/10 w-full mb-4">
      <AlertTriangle className="w-4 h-4 shrink-0" />
      <span>Large files (&gt;100MB) may slow down your browser because processing happens locally.</span>
    </div>
  );
}
