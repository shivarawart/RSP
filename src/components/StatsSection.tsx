"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  {
    value: "5+",
    label: "years of guidance.",
    sublabel: "Since 2020",
  },
  {
    value: "50+",
    label: "students in Japan",
    sublabel: "And counting",
  },
  {
    value: "N3 → N1",
    label: "levels achieved",
    sublabel: "With intention",
  },
  {
    value: "Japan",
    label: "jobs in sight",
    sublabel: "Beyond the classroom",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const valuesRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const values = valuesRef.current;

      /* --------------------------------
         SECTION REVEAL
      -------------------------------- */

      gsap.fromTo(
        section.querySelector("[data-stats-header]"),
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
          },
        },
      );

      /* --------------------------------
         CARD REVEAL
      -------------------------------- */

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 28,
          clipPath: "inset(0 0 100% 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 86%",
            once: true,
          },
        },
      );

      /* --------------------------------
         VALUE REVEAL
      -------------------------------- */

      values.forEach((value) => {
        gsap.fromTo(
          value,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      /* --------------------------------
         DESKTOP MAGNETIC EFFECT
         Disabled for touch devices
      -------------------------------- */

      if (window.matchMedia("(pointer: fine)").matches) {
        cards.forEach((card) => {
          const content = card.querySelector(
            "[data-card-content]",
          ) as HTMLElement | null;

          const glow = card.querySelector("[data-glow]") as HTMLElement | null;

          if (!content || !glow) return;

          const xTo = gsap.quickTo(content, "x", {
            duration: 0.35,
            ease: "power3.out",
          });

          const yTo = gsap.quickTo(content, "y", {
            duration: 0.35,
            ease: "power3.out",
          });

          const glowX = gsap.quickTo(glow, "x", {
            duration: 0.5,
            ease: "power3.out",
          });

          const glowY = gsap.quickTo(glow, "y", {
            duration: 0.5,
            ease: "power3.out",
          });

          const handleMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();

            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const x = mouseX / rect.width - 0.5;
            const y = mouseY / rect.height - 0.5;

            xTo(x * 5);
            yTo(y * 5);

            glowX(x * 25);
            glowY(y * 25);
          };

          const handleEnter = () => {
            gsap.to(card, {
              y: -3,
              duration: 0.35,
              ease: "power3.out",
            });

            gsap.to(content, {
              scale: 1.015,
              duration: 0.35,
              ease: "power3.out",
            });

            gsap.to(glow, {
              opacity: 1,
              scale: 1.2,
              duration: 0.4,
              ease: "power3.out",
            });
          };

          const handleLeave = () => {
            xTo(0);
            yTo(0);
            glowX(0);
            glowY(0);

            gsap.to(card, {
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to(content, {
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
            });

            gsap.to(glow, {
              opacity: 0,
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
            });
          };

          card.addEventListener("mousemove", handleMove);
          card.addEventListener("mouseenter", handleEnter);
          card.addEventListener("mouseleave", handleLeave);

          return () => {
            card.removeEventListener("mousemove", handleMove);
            card.removeEventListener("mouseenter", handleEnter);
            card.removeEventListener("mouseleave", handleLeave);
          };
        });
      }

      /* --------------------------------
         RED SIGNAL ANIMATION
      -------------------------------- */

      const signal = section.querySelector(
        "[data-signal]",
      ) as HTMLElement | null;

      if (signal) {
        gsap.fromTo(
          signal,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      aria-label="Our achievements"
    >
      {/* --------------------------------
          BACKGROUND GRID
      -------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #dc2626 1px, transparent 1px), linear-gradient(to bottom, #dc2626 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* --------------------------------
          TOP SIGNAL
      -------------------------------- */}

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-[92%] -translate-x-1/2 bg-neutral-100"
      >
        <div data-signal className="h-full origin-left bg-red-600" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div
          data-stats-header
          className="mb-5 flex items-center justify-between sm:mb-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-neutral-800 sm:text-[11px]">
              Results that matter
            </span>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-px w-8 bg-neutral-200" />

            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-neutral-400">
              2020 — 2026
            </span>
          </div>
        </div>

        {/* --------------------------------
            CARDS
        -------------------------------- */}

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={`${stat.value}-${index}`}
              ref={(element) => {
                if (element) {
                  cardsRef.current[index] = element;
                }
              }}
              className="group relative min-h-[145px] overflow-hidden bg-white sm:min-h-[160px]"
            >
              {/* Glow */}
              <div
                data-glow
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/10 opacity-0 blur-2xl"
              />

              {/* Red vertical accent */}
              <div className="absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 bg-red-600 transition-transform duration-500 ease-out group-hover:scale-y-100" />

              {/* Content */}
              <div
                data-card-content
                className="relative flex h-full flex-col justify-between p-4 sm:p-5"
                style={{
                  willChange: "transform",
                }}
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span
                    ref={(element) => {
                      if (element) {
                        valuesRef.current[index] = element;
                      }
                    }}
                    className="text-[27px] font-black leading-none tracking-[-0.06em] text-neutral-950 sm:text-[34px]"
                  >
                    {stat.value}
                  </span>

                  <span className="text-[9px] font-bold tracking-[0.15em] text-neutral-300 transition-colors duration-300 group-hover:text-red-600">
                    0{index + 1}
                  </span>
                </div>

                {/* Middle */}
                <div>
                  <div className="mb-3 h-px w-full bg-neutral-100">
                    <div className="h-full w-0 bg-red-600 transition-all duration-700 ease-out group-hover:w-full" />
                  </div>

                  <p className="text-[11px] font-bold leading-relaxed text-neutral-800 sm:text-xs">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-neutral-400 sm:text-[10px]">
                    {stat.sublabel}
                  </p>
                </div>
              </div>

              {/* Hover bottom line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-red-600 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* --------------------------------
            BOTTOM MICRO LINE
        -------------------------------- */}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-neutral-300">
            Progress
          </span>

          <div className="flex items-center gap-1">
            {stats.map((_, index) => (
              <span
                key={index}
                className="h-1 w-4 bg-neutral-100 transition-colors duration-300 hover:bg-red-600"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
