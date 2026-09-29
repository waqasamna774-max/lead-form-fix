import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BOOKING_URL, isEmbeddable } from "@/config/booking";
import { BookingModal } from "@/components/BookingModal";

export { BOOKING_URL };

const NICHES = [
  "Coaching",
  "Online Courses",
  "Consulting",
  "Education",
  "Fitness",
  "Business",
  "Marketing",
  "Other",
];

type Errors = { name?: string; email?: string; niche?: string; form?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function validate(values: { name: string; email: string; niche: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 100) errors.name = "Name must be under 100 characters.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  else if (values.email.trim().length > 255) errors.email = "Email must be under 255 characters.";

  if (!values.niche.trim()) errors.niche = "Please tell us your niche.";
  else if (values.niche.trim().length > 100) errors.niche = "Niche must be under 100 characters.";

  return errors;
}

const fieldClass =
  "w-full rounded-xl border border-input bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

export function LeadCaptureForm() {
  const [values, setValues] = useState({ name: "", email: "", niche: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  function handleBookingClick() {
    const prefill = { name: values.name.trim(), email: values.email.trim() };
    if (isEmbeddable()) {
      setBookingOpen(true);
      return;
    }
    const url = new URL(BOOKING_URL.trim());
    if (prefill.name) url.searchParams.set("name", prefill.name);
    if (prefill.email) url.searchParams.set("email", prefill.email);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting || done) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: values.name.trim(),
      email: values.email.trim(),
      niche: values.niche.trim(),
    });
    setSubmitting(false);

    if (error) {
      setErrors({ form: "Something went wrong. Please try again in a moment." });
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="animate-in fade-in zoom-in-95 glass rounded-3xl p-8 text-center shadow-[var(--shadow-elegant)] duration-500 sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">You&rsquo;re In! ✓</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your growth assessment request has been received. Pick a time below to book your
          strategy call.
        </p>
        <button
          type="button"
          onClick={handleBookingClick}
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98] sm:w-auto"
        >
          Book My Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        <BookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          prefill={{ name: values.name.trim(), email: values.email.trim() }}
        />
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="glass rounded-3xl p-6 shadow-[var(--shadow-elegant)] sm:p-10"
    >
      <h3 className="font-display text-2xl font-bold sm:text-3xl">Get Your Free Growth Assessment</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Share a few details and we&rsquo;ll point you to the right next step.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            className={fieldClass}
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="niche" className="mb-2 block text-sm font-medium">
            Niche
          </label>
          <input
            id="niche"
            list="niche-options"
            className={fieldClass}
            placeholder="Select or type your niche"
            value={values.niche}
            onChange={(e) => setValues({ ...values, niche: e.target.value })}
          />
          <datalist id="niche-options">
            {NICHES.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
          {errors.niche && <p className="mt-2 text-xs text-destructive">{errors.niche}</p>}
        </div>
      </div>

      {errors.form && <p className="mt-5 text-sm text-destructive">{errors.form}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full rounded-xl inline-flex items-center justify-center gap-2 bg-[image:var(--gradient-primary)] px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : (<>Get My Growth Assessment <ArrowRight className="h-4 w-4" /></>)}
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        No spam. Your details are only used to prepare your assessment.
      </p>
    </form>
  );
}
