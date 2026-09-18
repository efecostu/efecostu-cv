"use client";
import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";

interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  description: string;
  highlights: string[];
}

const ExperienceItem: React.FC<ExperienceProps & { index: number; isLast: boolean }> = ({
  title,
  company,
  period,
  location,
  logo,
  description,
  highlights,
  index,
  isLast,
}) => (
  <Reveal as="li" delay={index * 60} className="relative pl-14 sm:pl-16">
    {!isLast && (
      <span
        className="absolute left-5 sm:left-6 top-12 bottom-0 w-px bg-[var(--border)]"
        aria-hidden="true"
      />
    )}
    <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-[var(--border)] bg-white">
      <Image src={logo} alt={`${company} logo`} width={48} height={48} className="w-full h-full object-contain" />
    </div>

    <div className={`min-w-0 ${isLast ? "pb-0" : "pb-10"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base sm:text-lg font-medium tracking-tight text-[var(--foreground)]">
          {title} <span className="text-[var(--muted-foreground)] font-normal">@ {company}</span>
        </h3>
        <div className="font-mono text-xs text-[var(--muted-foreground)] whitespace-nowrap tabular-nums">
          {period} · {location}
        </div>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-[62ch] leading-relaxed">{description}</p>
      {highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-[var(--foreground)] max-w-[62ch]">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span className="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-[var(--muted-foreground)]" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </Reveal>
);

const experiences: ExperienceProps[] = [
  {
    title: "Strategy & Business Development Specialist",
    company: "SKF",
    period: "Sep 2023 – Present",
    location: "Istanbul",
    logo: "/projects/skf.png",
    description:
      "Commercial strategy and key account management for Turkey's largest industrial enterprises across energy, automotive, mining and manufacturing.",
    highlights: [
      "Market research and strategic analysis to identify growth opportunities and shape account-specific commercial strategies.",
      "Pricing analyses, P&L models and ROI assessments (SQL, Excel, Power BI) supporting investment decisions on key accounts such as Tüpraş and Ford.",
      "Day-to-day commercial operations on SAP S/4HANA and SAP Ariba — procurement workflows, order management and reporting.",
      "End-to-end coordination across logistics, finance and technical teams with structured follow-up and accountability.",
    ],
  },
  {
    title: "Operations & Strategic Analytics Analyst",
    company: "DHL Global Forwarding",
    period: "Sep 2022 – Sep 2023",
    location: "Istanbul",
    logo: "/projects/dhl.png",
    description:
      "Data-driven operations support for the air freight division of the world's largest logistics group.",
    highlights: [
      "Analysed large operational datasets with SQL and Excel to produce KPI and budget-forecasting reports for senior management.",
      "Identified bottlenecks and drove process improvements; automated procurement request-to-approval cycles with n8n.",
      "Research conducted here became a peer-reviewed publication on air freight specialist evaluation (IEOM 2024).",
    ],
  },
  {
    title: "Digital Marketing & Growth Analyst",
    company: "Minuteman Press Norwich",
    period: "Oct 2023 – Jun 2026",
    location: "Norwich, UK · remote",
    logo: "/projects/minuteman.png",
    description:
      "Started during my MSc: SEO, AI-driven search visibility and Google Ads for a UK print agency — a 45% average increase in qualified inbound traffic.",
    highlights: [],
  },
  {
    title: "Sales Intern",
    company: "ARK Pres",
    period: "Aug – Sep 2022",
    location: "Istanbul",
    logo: "/projects/arkpres.png",
    description:
      "Sales department of an automotive seat-belt manufacturer; researched and worked on the company's ERP system.",
    highlights: [],
  },
  {
    title: "International Office Assistant",
    company: "Kadir Has University",
    period: "Sep 2021 – Jun 2022",
    location: "Istanbul",
    logo: "/projects/khas.png",
    description:
      "Scholarship student role supporting 500+ international students with documentation and study-abroad consulting.",
    highlights: [],
  },
  {
    title: "Planning Intern",
    company: "Uzer Makina",
    period: "Aug – Sep 2021",
    location: "Kocaeli",
    logo: "/projects/uzer.png",
    description:
      "Production planning internship at a leading machinery manufacturer, working alongside the industrial engineering team.",
    highlights: [],
  },
];

const Experience: React.FC = () => (
  <div className="py-16 sm:py-20 px-4">
    <Reveal>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-10 text-[var(--foreground)]">
        work experience
      </h2>
    </Reveal>
    <ol className="max-w-2xl">
      {experiences.map((exp, i) => (
        <ExperienceItem
          key={`${exp.company}-${exp.period}`}
          {...exp}
          index={i}
          isLast={i === experiences.length - 1}
        />
      ))}
    </ol>
  </div>
);

export default Experience;
