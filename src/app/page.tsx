"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ThemeProvider } from "./theme-provider";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Credentials from "./components/Credentials";
import Moments from "./components/Moments";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

// Dynamically import Card with SSR disabled to avoid Three.js/Rapier SSR issues
const Card = dynamic(() => import("./components/Card"), { ssr: false });

const Divider = () => (
  <hr className="border-t relative w-screen left-[50%] right-[50%] -translate-x-[50%]" aria-hidden="true" />
);

export default function Home() {
  const [cardHeight, setCardHeight] = useState("100vh");
  const headerRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const calculateHeight = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!headerRef.current || !workRef.current) return;
        const headerTop = headerRef.current.getBoundingClientRect().top + window.scrollY;
        const workBottom = workRef.current.getBoundingClientRect().bottom + window.scrollY;
        setCardHeight(`${workBottom - headerTop + 30}px`);
      }, 100);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="dakshi-theme">
      <div className="min-h-screen p-0">
        <div
          className="card-wrapper mr-10 hidden lg:block"
          style={{ height: cardHeight, position: "absolute", top: 0, right: 0 }}
        >
          <Card />
        </div>

        <div className="relative">
          <header className="sticky top-0 z-20" ref={headerRef}>
            <Header />
          </header>

          <main>
            <section className="hero-section relative z-0" id="hero">
              <Hero />
            </section>
            <Divider />

            <section className="relative w-full z-0" id="projects">
              <Projects />
            </section>
            <Divider />

            <section className="relative w-full z-0" ref={workRef} id="work">
              <Work />
            </section>
            <Divider />

            <section className="relative w-full z-0" id="credentials">
              <Credentials />
            </section>
            <Divider />

            <section className="relative w-full z-0" id="moments">
              <Moments />
            </section>
            <Divider />

            <section className="relative w-full z-0" id="contact">
              <ContactForm />
            </section>
            <Divider />
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
