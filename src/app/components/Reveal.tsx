"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = "", as = "div" }) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true, rootMargin: "0px 0px -40px 0px" });
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
