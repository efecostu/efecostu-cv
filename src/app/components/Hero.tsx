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

const Hero: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        Hi, Efe Costu 👋
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          Strategy & Business Development Specialist at <LinkWithTooltip href="https://www.skf.com" text="SKF" description="Swedish industrial group, world leader in bearings, seals and condition monitoring. I work with Turkey's largest industrial accounts." /> — an Industrial Engineer turned commercial strategist, bridging data and business decisions.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          With a BSc in <LinkWithTooltip text="Industrial Engineering" description="Operations research, data analysis, supply chain and decision-making models. Peer-reviewed publication on F-AHP-TOPSIS." /> and an MSc in <LinkWithTooltip text="Business Management" description="University of East Anglia, UK — strategy, marketing, project management and leadership." />, I build pricing analyses, P&amp;L models and KPI dashboards that turn operational data into growth strategy for energy, automotive and manufacturing accounts.
        </p>

        <div className="my-8">
          <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            EXPERTISE:
          </div>
          <p className="text-base text-[var(--foreground)]">
            Strategic Planning, Key Account Management, Data Analytics (SQL, Power BI, Python), SAP S/4HANA & Ariba, Process Automation (n8n)
          </p>
        </div>

        <p className="mb-8 text-base text-[var(--foreground)]">
          <LinkWithTooltip href="https://www.mckinsey.com/forward" text="McKinsey Forward" description="McKinsey & Company's Forward Learners Programme — problem solving, adaptability and leadership skills." /> graduate and <LinkWithTooltip text="SAP S/4HANA Certified Associate" description="SAP Certified Associate — Business Process Integration with SAP S/4HANA (2025)." />. Previously at DHL Global Forwarding, where I turned operational datasets into KPI and budget forecasts for senior management.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          Outside work I&apos;m a former Secretary General of <LinkWithTooltip href="https://hasmun.org" text="HASMUN" description="Kadir Has University Model United Nations — I led the conference in 2022 and 2023." />, hosting international summits and mentoring student delegates.
        </p>
      </div>
      <div className="flex gap-5 mt-8">
        <SocialLink href="https://github.com/efecostu" label="GitHub" />
        <SocialLink href="https://www.linkedin.com/in/efecostu/" label="LinkedIn" />
        <SocialLink href="mailto:efecostu01@gmail.com" label="Email" />
      </div>
    </div>
  );
};

export default Hero;
