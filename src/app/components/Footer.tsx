import React from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "https://www.linkedin.com/in/efecostu/", label: "LinkedIn" },
  { href: "https://github.com/efecostu", label: "GitHub" },
  { href: "mailto:efecostu01@gmail.com", label: "Email" },
];

const Footer: React.FC = () => (
  <footer className="py-10 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[var(--muted-foreground)]">
    <p>
      © {new Date().getFullYear()} Efe Coştu · Istanbul
    </p>
    <ul className="flex items-center gap-5">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 hover:text-[var(--foreground)] transition-colors duration-200"
          >
            {l.label}
            <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} />
          </a>
        </li>
      ))}
    </ul>
  </footer>
);

export default Footer;
