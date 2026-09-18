"use client";
import React from "react";
import Image from "next/image";

interface EducationProps {
  degree: string;
  institution: string;
  period: string;
  logo: string;
  description: string;
}

const EducationItem: React.FC<EducationProps> = ({
  degree,
  institution,
  period,
  logo,
  description,
}) => (
  <div className="mb-8">
    <div className="flex items-start">
      <div className="w-10 h-10 mr-4 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-white">
        <Image
          src={logo}
          alt={`${institution} logo`}
          width={40}
          height={40}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div className="text-base text-[var(--foreground)] font-semibold">
            {degree} @ {institution}
          </div>
          <div className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">
            {period}
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          {description}
        </p>
      </div>
    </div>
  </div>
);

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
      "Led Kadir Has University's international Model UN conference for two consecutive years — organising committees, hosting diplomats and mentoring student delegates.",
  },
];

const Education: React.FC = () => (
  <div className="py-8 px-4" id="education">
    <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
      education
    </h1>
    <div className="max-w-2xl">
      {educationData.map((edu) => (
        <EducationItem key={`${edu.institution}-${edu.degree}`} {...edu} />
      ))}
    </div>
  </div>
);

export default Education;
