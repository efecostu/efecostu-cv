"use client";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

interface PolaroidProps {
  image: string;
  description: string;
  alt: string;
}

const Polaroid: React.FC<PolaroidProps> = ({ image, description, alt }) => (
  <div className="polaroid-card min-w-[200px] sm:min-w-80 bg-white p-2 sm:p-4 pb-4 sm:pb-6 shadow-xl m-2 sm:m-4 transition-transform duration-300 hover:-rotate-2 hover:scale-105 relative select-none">
    <div className="mb-2 sm:mb-4 h-48 sm:h-80 overflow-hidden relative pointer-events-none">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 200px, 320px"
        className="object-cover"
        loading="lazy"
        draggable={false}
      />
    </div>
    <div className="polaroid-text text-xs sm:text-sm text-black p-1 sm:p-2 text-center">
      {description}
    </div>
  </div>
);

const polaroids: PolaroidProps[] = [
  {
    image: "/moments/IMG_7395.JPG",
    description: "HASMUN'22 — Secretary General opening speech",
    alt: "HASMUN 2022 opening speech",
  },
  {
    image: "/moments/IMG_2262.jpeg",
    description: "F-AHP-TOPSIS decision model — graduation project",
    alt: "Graduation project presentation",
  },
  {
    image: "/moments/Efe Costu.jpeg",
    description: "Formal portrait",
    alt: "Formal portrait of Efe Costu",
  },
  {
    image: "/moments/NKN_8871.JPG",
    description: "HASMUN'23 — Secretary General speech",
    alt: "HASMUN 2023 speech",
  },
  {
    image: "/moments/5D36DA11-A706-4E66-B608-9F8F843753F4_1_105_c.jpeg",
    description: "DHL Global Forwarding Istanbul team",
    alt: "DHL Global Forwarding team photo",
  },
  {
    image: "/moments/B15E95A6-61C8-49EC-8655-980ADC53CA67_1_105_c.jpeg",
    description: "HASMUN'23 closing party",
    alt: "HASMUN 2023 party",
  },
  {
    image: "/moments/EC48FE0F-845A-4069-A5C9-F39B866B4D11_1_105_c.jpeg",
    description: "With Alvaro Rodriguez, UN Resident Coordinator in Türkiye",
    alt: "Meeting the UN Resident Coordinator",
  },
  {
    image: "/moments/B0DC0BBE-A3B6-4E8E-BACE-A0CCAE2B3AC9_1_105_c.jpeg",
    description: "Sync the City — Norwich business hackathon",
    alt: "Sync the City event in Norwich",
  },
  {
    image: "/moments/9F7C0010-B923-43B9-B95E-D31214C4247A_1_105_c.jpeg",
    description: "Minuteman Press Norwich",
    alt: "Minuteman Press Norwich team",
  },
  {
    image: "/moments/710684A1-65B2-469E-A076-F172807FD4DE_1_105_c.jpeg",
    description: "HASMUN'23 family",
    alt: "HASMUN 2023 team",
  },
];

const AUTO_SCROLL_PX_PER_SEC = 45;

const Moments: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  const drag = useRef({ active: false, startX: 0, startScroll: 0 });
  const paused = useRef(false);

  const setRefs = (node: HTMLDivElement | null) => {
    scrollRef.current = node;
    inViewRef(node);
  };

  // Items are rendered twice; once we pass the first copy we jump back by exactly
  // one copy's width so the loop is seamless in both auto-scroll and manual drag.
  const wrap = (el: HTMLDivElement) => {
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !inView) return;

    let frame: number;
    let last: number | null = null;

    const tick = (now: number) => {
      if (last !== null && !paused.current && !drag.current.active) {
        el.scrollLeft += ((now - last) / 1000) * AUTO_SCROLL_PX_PER_SEC;
        wrap(el);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    wrap(el);
    drag.current.startScroll = el.scrollLeft;
    drag.current.startX = e.clientX;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    el.classList.remove("cursor-grabbing");
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)] px-4">moments</h1>
      <div className="max-w-2xl px-4">
        <p className="mb-6 text-base text-[var(--foreground)]">
          A visual snapshot of the journey — team wins, stage talks, and the people along the way.
          Drag to browse.
        </p>
      </div>

      <div className="relative w-full overflow-x-hidden overflow-y-visible">
        <div
          ref={setRefs}
          className="flex cursor-grab overflow-x-auto scrollbar-hide py-4 touch-pan-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
          onTouchEnd={() => (paused.current = false)}
          onScroll={(e) => {
            if (!drag.current.active) wrap(e.currentTarget);
          }}
        >
          {[...polaroids, ...polaroids].map((polaroid, index) => (
            <Polaroid key={`${polaroid.image}-${index}`} {...polaroid} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Moments;
