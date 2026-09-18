import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";

const NAV_ITEMS = [
  { label: "about", id: "hero" },
  { label: "experience", id: "projects" },
  { label: "education", id: "work" },
  { label: "credentials", id: "credentials" },
  { label: "moments", id: "moments" },
  { label: "contact", id: "contact" },
];

function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    document.documentElement.classList.add("theme-transition");
    const handleTransitionEnd = () => {
      document.documentElement.classList.remove("theme-transition");
    };
    document.documentElement.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      document.documentElement.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  const isDark = () => document.documentElement.classList.contains("dark");

  const handleThemeChange = () => {
    document.documentElement.classList.add("theme-transition");
    setTheme(isDark() ? "light" : "dark");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    setIsMenuOpen(false);
    if (!element) return;

    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const top = element.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const showSun = mounted && (theme === "dark" || (theme === "system" && isDark()));

  const navButtonClass =
    "cursor-pointer text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 py-2";

  return (
    <div>
      <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[var(--background)]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/70" aria-hidden="true" />
      <div className="relative flex justify-between items-center h-14 w-full">
        <button
          onClick={() => scrollToSection("hero")}
          className="cursor-pointer font-medium tracking-tight text-[var(--foreground)]"
          aria-label="Back to top"
        >
          efe coştu
        </button>

        <div className="flex items-center gap-1 sm:gap-3">
          <nav aria-label="Primary">
            <ul className="hidden sm:flex items-center gap-5">
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id}>
                  <button onClick={() => scrollToSection(id)} className={navButtonClass}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {mounted && (
            <button
              onClick={handleThemeChange}
              className="cursor-pointer h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-[var(--accent)] active:scale-[0.96] transition-[background-color,transform] duration-200"
              aria-label={showSun ? "Switch to light mode" : "Switch to dark mode"}
            >
              {showSun ? (
                <Sun className="h-[18px] w-[18px] text-[var(--muted-foreground)]" strokeWidth={1.75} />
              ) : (
                <Moon className="h-[18px] w-[18px] text-[var(--muted-foreground)]" strokeWidth={1.75} />
              )}
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer sm:hidden h-10 w-10 inline-flex items-center justify-center rounded-md hover:bg-[var(--accent)] active:scale-[0.96] transition-[background-color,transform] duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-[18px] w-[18px] text-[var(--muted-foreground)]" strokeWidth={1.75} />
            ) : (
              <Menu className="h-[18px] w-[18px] text-[var(--muted-foreground)]" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-14 bottom-0 bg-[var(--background)] z-50 overflow-y-auto">
          <ul className="flex flex-col gap-1 px-6 pt-6">
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className="cursor-pointer w-full text-left text-2xl tracking-tight py-3 border-b border-[var(--border)] text-[var(--foreground)]"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr className="border-t border-[var(--border)] relative w-screen left-[50%] right-[50%] -translate-x-[50%]" aria-hidden="true" />
    </div>
  );
}

export default Header;
