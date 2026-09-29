import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "light";
    setLight(saved);
    document.documentElement.classList.toggle("light", saved);
  }, []);
  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/60 text-muted-foreground transition hover:text-foreground"
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
