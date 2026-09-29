/**
 * ============================================================
 * CALENDAR BOOKING CONFIGURATION
 * ============================================================
 * Paste your real booking link between the quotes below.
 * Examples:
 *   "https://calendly.com/your-name/strategy-call"
 *   "https://cal.com/your-name/strategy-call"
 *   "https://calendar.app.google/your-schedule-id"
 *
 * Leave it empty ("") until you have the real link — the button
 * will then show a short "coming soon" note instead of opening
 * any placeholder page.
 * ============================================================
 */
export const BOOKING_URL = "https://calendly.com/amnaaurangzaib89/30min";

/** Booking providers that support embedding inside the site. */
const EMBEDDABLE_HOSTS = [
  "calendly.com",
  "cal.com",
  "calendar.app.google",
  "calendar.google.com",
  "tidycal.com",
  "zcal.co",
  "savvycal.com",
  "hubspot.com",
  "meetings.hubspot.com",
];

export function isBookingConfigured(url: string = BOOKING_URL): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** True when the configured provider can be shown in an in-site modal. */
export function isEmbeddable(url: string = BOOKING_URL): boolean {
  if (!isBookingConfigured(url)) return false;
  try {
    const host = new URL(url.trim()).hostname.replace(/^www\./, "");
    return EMBEDDABLE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

/** Embed-friendly variant of the booking URL. */
export function getEmbedUrl(url: string = BOOKING_URL): string {
  const trimmed = url.trim();
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host.endsWith("calendly.com")) {
      parsed.searchParams.set("embed_domain", "booking");
      parsed.searchParams.set("embed_type", "Inline");
      parsed.searchParams.set("hide_gdpr_banner", "1");
    }
    if (host.endsWith("cal.com")) {
      parsed.searchParams.set("embed", "true");
    }
    return parsed.toString();
  } catch {
    return trimmed;
  }
}
