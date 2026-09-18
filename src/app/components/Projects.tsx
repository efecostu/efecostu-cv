"use client";
import React from "react";
import Image from "next/image";

interface ExperienceProps {
  title: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  description: string;
  highlights: string[];
}

const ExperienceItem: React.FC<ExperienceProps> = ({
  title,
  company,
  period,
  location,
  logo,
  description,
  highlights,
}) => (
  <div className="mb-10">
    <div className="flex items-start">
      <div className="w-10 h-10 mr-4 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-white">
        <Image
          src={logo}
          alt={`${company} logo`}
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="text-base text-[var(--foreground)] font-semibold">
            {title} @ {company}
          </div>
          <div className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
            {period} · {location}
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          {description}
        </p>
        {highlights.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-[var(--muted-foreground)] list-disc pl-5 marker:text-[var(--border)]">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
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
    period: "Oct 2023 – Present",
    location: "Norwich, UK · remote",
    logo: "/projects/minuteman.png",
    description:
      "Started during my MSc: SEO, Google Ads and competitive analysis for a UK print agency — a 45% average increase in qualified inbound traffic.",
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
  <div className="py-8 px-4">
    <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
      work experience
    </h1>
    <div className="max-w-2xl">
      {experiences.map((exp) => (
        <ExperienceItem key={`${exp.company}-${exp.period}`} {...exp} />
      ))}
    </div>
  </div>
);

export default Experience;
