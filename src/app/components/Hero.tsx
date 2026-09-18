"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LinkWithTooltipProps {
  href?: string;
  text: string;
  description: React.ReactNode;
  imageUrl?: string;
}

const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
  imageUrl,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 100);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!href && window.innerWidth < 768) {
      e.preventDefault();
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTooltipVisible]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <a
        ref={linkRef}
        href={href}
        target={href ? "_blank" : undefined}
        className="text-[var(--muted-foreground)] text-[15px] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group inline-flex items-center"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={handleClick}
      >
        {text}
        {href && (
          <svg
            className="w-3 h-3 ml-0.5 inline-block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        )}
      </a>

      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 left-0 top-8 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {imageUrl && (
            <div className="w-full h-40 overflow-hidden rounded mb-2">
              <Image
                src={imageUrl}
                alt="tooltip illustration"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-1">{description}</div>
          <span className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></span>
        </div>
      )}
    </span>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-[var(--link)] text-sm hover:underline flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <svg
        className="w-3 h-3 ml-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </a>
  );
};

const expertise = [
  "Strategic planning",
  "Key account management",
  "Pricing & P&L analysis",
  "SQL · Power BI · Python",
  "SAP S/4HANA & Ariba",
  "Process automation (n8n)",
];

const Hero: React.FC = () => {
  return (
    <div className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-4">
      <div className="max-w-2xl">
        <p className="text-sm text-[var(--muted-foreground)] mb-3">Istanbul, Türkiye</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05] text-[var(--foreground)] mb-5">
          Efe Coştu
        </h1>
        <p className="text-lg sm:text-xl text-[var(--foreground)] leading-snug mb-8">
          Strategy &amp; Business Development Specialist at{" "}
          <LinkWithTooltip
            href="https://www.skf.com"
            text="SKF"
            description="Swedish industrial group, world leader in bearings, seals and condition monitoring. I work with Turkey's largest industrial accounts."
          />
          . Industrial engineer turned commercial strategist.
        </p>

        <p className="mb-6 text-base text-[var(--muted-foreground)] leading-relaxed max-w-[62ch]">
          I turn operational data into growth decisions for energy, automotive and manufacturing accounts: pricing
          analyses, P&amp;L models and KPI dashboards that senior leadership actually uses. BSc in{" "}
          <LinkWithTooltip
            text="Industrial Engineering"
            description="Operations research, data analysis, supply chain and decision-making models. Peer-reviewed publication on F-AHP-TOPSIS."
          />
          , MSc in{" "}
          <LinkWithTooltip
            text="Business Management"
            description="University of East Anglia, UK — strategy, marketing, project management and leadership."
          />
          ,{" "}
          <LinkWithTooltip
            href="https://www.mckinsey.com/forward"
            text="McKinsey Forward"
            description="McKinsey & Company's Forward Learners Programme — problem solving, adaptability and leadership skills."
          />{" "}
          graduate.
        </p>

        <p className="mb-10 text-base text-[var(--muted-foreground)] leading-relaxed max-w-[62ch]">
          Previously at DHL Global Forwarding. Former Secretary General of{" "}
          <LinkWithTooltip
            href="https://hasmun.org"
            text="HASMUN"
            description="Kadir Has University Model United Nations — I led the conference in 2022 and 2023."
          />
          , hosting international summits and mentoring student delegates.
        </p>

        <ul className="flex flex-wrap gap-2 mb-10" aria-label="Areas of expertise">
          {expertise.map((item) => (
            <li
              key={item}
              className="text-sm px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href="#contact"
            className="inline-flex items-center h-11 px-5 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-[opacity,transform] duration-200"
          >
            Get in touch
          </a>
          <div className="flex gap-5">
            <SocialLink href="https://www.linkedin.com/in/efecostu/" label="LinkedIn" />
            <SocialLink href="https://github.com/efecostu" label="GitHub" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
