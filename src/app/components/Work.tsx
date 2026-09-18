"use client";
import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";

interface EducationProps {
  degree: string;
  institution: string;
  period: string;
  logo: string;
  description: string;
  wide?: boolean;
}

const educationData: EducationProps[] = [
  {
    degree: "MSc Business Management",
    institution: "University of East Anglia",
    period: "2023 – 2024 · Norwich, UK",
    logo: "/companies/ucp.png",
    description:
      "GPA 3.75 / 4.00. Strategy, marketing, project management and leadership in a global business context.",
  },
  {
    degree: "BSc Industrial Engineering",
    institution: "Kadir Has University",
    period: "2019 – 2023 · Istanbul",
    logo: "/companies/khas.png",
    description:
      "GPA 3.14 / 4.00. Operations research, data analysis and decision-making models; graduation research published at IEOM 2024.",
  },
  {
    degree: "BSBA International Trade & Logistics",
    institution: "Istanbul University",
    period: "2020 – 2024 · Istanbul",
    logo: "/companies/iu.png",
    description:
      "Second bachelor's degree completed alongside engineering studies, focused on trade operations and logistics management.",
  },
  {
    degree: "International Baccalaureate Diploma",
    institution: "Bahcesehir High School",
    period: "2017 – 2019 · Istanbul",
    logo: "/companies/bk.png",
    description: "IB Diploma Programme graduate.",
  },
  {
    degree: "Secretary General",
    institution: "HASMUN",
    period: "2022 – 2023 · hasmun.org",
    logo: "/companies/hasmun.jpeg",
    description:
      "Led Kadir Has University's international Model UN conference for two consecutive years: committees, visiting diplomats, and mentoring student delegates.",
    wide: true,
  },
];

const EducationCard: React.FC<EducationProps & { index: number }> = ({
  degree,
  institution,
  period,
  logo,
  description,
  wide,
  index,
}) => (
  <Reveal
    as="li"
    delay={index * 60}
    className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 flex flex-col gap-4 ${
      wide ? "sm:col-span-2" : ""
    }`}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="w-11 h-11 rounded-lg overflow-hidden border border-[var(--border)] bg-white flex-shrink-0">
        <Image src={logo} alt={`${institution} logo`} width={44} height={44} className="w-full h-full object-contain" />
      </div>
      <span className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums text-right leading-snug">
        {period}
      </span>
    </div>
    <div>
      <h3 className="text-base font-medium tracking-tight text-[var(--foreground)] leading-snug">{degree}</h3>
      <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{institution}</p>
    </div>
    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{description}</p>
  </Reveal>
);

const Education: React.FC = () => (
  <div className="py-16 sm:py-20 px-4">
    <Reveal>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-10 text-[var(--foreground)]">
        education
      </h2>
    </Reveal>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      {educationData.map((edu, i) => (
        <EducationCard key={`${edu.institution}-${edu.degree}`} {...edu} index={i} />
      ))}
    </ul>
  </div>
);

export default Education;
