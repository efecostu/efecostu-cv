"use client";
import React from "react";
import Image from "next/image";
import { Award, BookOpen, Brain, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

interface Certification {
  title: string;
  issuer: string;
  year: string;
  logo?: string;
  icon?: React.ReactNode;
  href?: string;
}

const certifications: Certification[] = [
  {
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company · Forward Learners Programme",
    year: "2026",
    logo: "/projects/mckinsey.png",
    href: "https://www.mckinsey.com/forward",
  },
  {
    title: "SAP Certified Associate",
    issuer: "Business Process Integration with SAP S/4HANA",
    year: "2025",
    logo: "/projects/sap.png",
  },
  {
    title: "SAP Young Professionals Program",
    issuer: "SAP Training & Adoption",
    year: "2025",
    logo: "/projects/sap.png",
  },
  {
    title: "Elements of AI",
    issuer: "University of Helsinki",
    year: "2019",
    icon: <Brain className="w-5 h-5" strokeWidth={1.75} />,
    href: "https://www.elementsofai.com",
  },
  {
    title: "The Duke of Edinburgh's International Award",
    issuer: "DofE International Foundation",
    year: "2019",
    icon: <Award className="w-5 h-5" strokeWidth={1.75} />,
    href: "https://intaward.org",
  },
];

const publication = {
  title: "Air Freight Specialist Evaluation with F-AHP-TOPSIS",
  venue: "14th Annual International Conference on Industrial Engineering and Operations Management (IEOM)",
  place: "Dubai, UAE · February 2024",
  doi: "10.46254/AN14.20240129",
  summary:
    "A fuzzy AHP-TOPSIS multi-criteria decision model for evaluating and ranking air freight specialists, developed from my work with DHL Global Forwarding's Istanbul air freight team.",
};

const Credentials: React.FC = () => (
  <div className="py-16 sm:py-20 px-4">
    <Reveal>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-10 text-[var(--foreground)]">
        credentials
      </h2>
    </Reveal>

    <div className="max-w-2xl">
      <Reveal>
        <a
          href={`https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-7 hover:border-[var(--muted-foreground)] active:scale-[0.995] transition-[border-color,transform] duration-200"
        >
          <div className="flex items-center justify-between gap-4 mb-5">
            <span className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              <BookOpen className="w-4 h-4" strokeWidth={1.75} />
              Peer-reviewed publication
            </span>
            <ArrowUpRight
              className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform] duration-200"
              strokeWidth={1.75}
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-snug text-[var(--foreground)] mb-3">
            {publication.title}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 max-w-[62ch]">
            {publication.summary}
          </p>
          <p className="text-sm text-[var(--foreground)]">{publication.venue}</p>
          <p className="font-mono text-xs text-[var(--muted-foreground)] mt-1">
            {publication.place} · DOI {publication.doi}
          </p>
        </a>
      </Reveal>

      <ul className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {certifications.map((cert, i) => {
          const inner = (
            <>
              <div className="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-white flex items-center justify-center text-neutral-800">
                {cert.logo ? (
                  <Image src={cert.logo} alt={`${cert.issuer} logo`} width={40} height={40} className="w-full h-full object-contain" />
                ) : (
                  cert.icon
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base font-medium tracking-tight text-[var(--foreground)] inline-flex items-center gap-1.5">
                  <span className={cert.href ? "group-hover:underline underline-offset-4" : ""}>{cert.title}</span>
                  {cert.href && (
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted-foreground)]" strokeWidth={1.75} />
                  )}
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{cert.issuer}</p>
              </div>
              <span className="font-mono text-xs text-[var(--muted-foreground)] tabular-nums flex-shrink-0">
                {cert.year}
              </span>
            </>
          );

          return (
            <Reveal as="li" key={cert.title} delay={i * 50}>
              {cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 -mx-2 px-2 rounded-md hover:bg-[var(--accent)] transition-colors duration-200"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex items-center gap-4 py-4">{inner}</div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </div>
  </div>
);

export default Credentials;
