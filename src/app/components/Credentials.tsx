"use client";
import React from "react";
import Image from "next/image";
import { Award, BookOpen, Brain, ExternalLink } from "lucide-react";

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
    icon: <Brain className="w-5 h-5" />,
    href: "https://www.elementsofai.com",
  },
  {
    title: "The Duke of Edinburgh's International Award",
    issuer: "DofE International Foundation",
    year: "2019",
    icon: <Award className="w-5 h-5" />,
    href: "https://intaward.org",
  },
];

const publication = {
  title: "Air Freight Specialist Evaluation with F-AHP-TOPSIS",
  venue:
    "Proceedings of the 14th Annual International Conference on Industrial Engineering and Operations Management",
  place: "Dubai, UAE · 12–14 February 2024",
  doi: "10.46254/AN14.20240129",
  summary:
    "A fuzzy AHP-TOPSIS multi-criteria decision model for evaluating and ranking air freight specialists, built on operational data from DHL Global Forwarding's Istanbul air freight team.",
};

const Credentials: React.FC = () => (
  <div className="py-8 px-4" id="credentials">
    <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
      credentials
    </h1>

    <div className="max-w-2xl">
      <h2 className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
        Peer-reviewed publication
      </h2>
      <a
        href={`https://doi.org/${publication.doi}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mb-10 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--muted-foreground)] transition-colors no-underline hover:no-underline"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex-shrink-0 rounded-lg border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="text-base font-semibold text-[var(--foreground)] group-hover:underline">
                {publication.title}
              </div>
              <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 text-[var(--muted-foreground)]" />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {publication.venue}
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              {publication.place} · DOI {publication.doi}
            </p>
            <p className="text-sm text-[var(--foreground)] mt-3">
              {publication.summary}
            </p>
          </div>
        </div>
      </a>

      <h2 className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
        Certifications & programmes
      </h2>
      <ul className="space-y-5">
        {certifications.map((cert) => {
          const body = (
            <>
              <div className="w-10 h-10 mr-4 flex-shrink-0 rounded-lg overflow-hidden border border-[var(--border)] bg-white flex items-center justify-center text-[var(--foreground)]">
                {cert.logo ? (
                  <Image
                    src={cert.logo}
                    alt={`${cert.issuer} logo`}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-neutral-800">{cert.icon}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <div className="text-base font-semibold text-[var(--foreground)] inline-flex items-center gap-1">
                    {cert.title}
                    {cert.href && (
                      <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)]" />
                    )}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {cert.year}
                  </div>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {cert.issuer}
                </p>
              </div>
            </>
          );

          return (
            <li key={cert.title}>
              {cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start no-underline hover:no-underline [&:hover_.text-base]:underline"
                >
                  {body}
                </a>
              ) : (
                <div className="flex items-start">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default Credentials;
