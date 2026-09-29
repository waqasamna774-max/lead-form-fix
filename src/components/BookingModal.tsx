import { useEffect } from "react";
import { X } from "lucide-react";
import { getEmbedUrl, type BookingPrefill } from "@/config/booking";

export function BookingModal({
  open,
  onClose,
  prefill,
}: {
  open: boolean;
  onClose: () => void;
  prefill?: BookingPrefill;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book your strategy call"
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div
        className="glass relative h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <iframe
          src={getEmbedUrl(undefined, prefill)}
          title="Book your strategy call"
          className="h-full w-full border-0"
          allow="camera; microphone; fullscreen; payment"
        />
      </div>
    </div>
  );
}
