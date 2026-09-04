"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Founder {
  name: string;
  role: string;
  location: string;
  image: string;
  statement: string;
  bio: string;
  tags: string[];
}

const founders: Founder[] = [
  {
    name: "Rohit",
    role: "Founder · RSP in Japan",
    location: "Kyoto, Japan",
    image: "/Gemini_Generated_Image_a0bu8ha0bu8ha0bu.png",
    statement: "Building a bridge between ambition and a life in Japan.",
    bio: "RSP in Japan was built around a simple idea: students should never feel like they are navigating the journey alone. From language learning to cultural understanding and the next step toward Japan, the goal has always been to make the path clearer, more human, and more honest.",
    tags: [
      "Japanese Language",
      "Student Guidance",
      "Japan",
      "Cultural Understanding",
    ],
  },
];

export default function Founders() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(section.querySelectorAll("[data-reveal]"), {
          opacity: 1,
          y: 0,
          x: 0,
          clipPath: "inset(0 0 0 0)",
        });

        return;
      }

      /* =====================================================
         HERO REVEAL
      ===================================================== */

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector("[data-founder-hero]"),
          start: "top 85%",
          once: true,
        },
      });

      heroTimeline
        .fromTo(
          "[data-eyebrow]",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
        )
        .fromTo(
          "[data-title]",
          {
            opacity: 0,
            yPercent: 100,
            rotateX: 60,
          },
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .fromTo(
          "[data-hero-copy]",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55",
        );

      /* =====================================================
         PORTRAIT REVEAL
      ===================================================== */

      if (portraitRef.current) {
        const image = portraitRef.current.querySelector(
          "[data-portrait-image]",
        );

        const imageTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 78%",
            once: true,
          },
        });

        imageTimeline
          .fromTo(
            portraitRef.current,
            {
              clipPath: "inset(100% 0 0 0)",
            },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.2,
              ease: "power4.inOut",
            },
          )
          .fromTo(
            image,
            {
              scale: 1.12,
            },
            {
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
            },
            "-=0.9",
          );
      }

      /* =====================================================
         PORTRAIT PARALLAX
      ===================================================== */

      if (portraitRef.current) {
        gsap.to(portraitRef.current.querySelector("[data-image-wrap]"), {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* =====================================================
         STATEMENT
      ===================================================== */

      gsap.fromTo(
        "[data-statement]",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 82%",
            once: true,
          },
        },
      );

      /* =====================================================
         BIO
      ===================================================== */

      gsap.fromTo(
        "[data-bio]",
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-bio]",
            start: "top 84%",
            once: true,
          },
        },
      );

      /* =====================================================
         TAGS
      ===================================================== */

      gsap.fromTo(
        "[data-tag]",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-tags]",
            start: "top 86%",
            once: true,
          },
        },
      );

      /* =====================================================
         NUMBERS
      ===================================================== */

      gsap.fromTo(
        "[data-number]",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-numbers]",
            start: "top 82%",
            once: true,
          },
        },
      );

      /* =====================================================
         MOUSE GLOW
      ===================================================== */

      if (glowRef.current && window.matchMedia("(pointer: fine)").matches) {
        const glow = glowRef.current;

        const xTo = gsap.quickTo(glow, "x", {
          duration: 0.45,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(glow, "y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const handleMove = (event: MouseEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };

        const handleEnter = () => {
          gsap.to(glow, {
            opacity: 1,
            duration: 0.3,
          });
        };

        const handleLeave = () => {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.3,
          });
        };

        section.addEventListener("mousemove", handleMove);
        section.addEventListener("mouseenter", handleEnter);
        section.addEventListener("mouseleave", handleLeave);

        return () => {
          section.removeEventListener("mousemove", handleMove);
          section.removeEventListener("mouseenter", handleEnter);
          section.removeEventListener("mouseleave", handleLeave);
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const founder = founders[0];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white text-neutral-950"
    >
      {/* =====================================================
          CURSOR GLOW
      ===================================================== */}

      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl lg:block"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <div
        data-founder-hero
        className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pb-32 lg:pt-36"
      >
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div data-eyebrow className="mb-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                The person behind the path
              </span>
            </div>

            <div className="overflow-hidden [perspective:1000px]">
              <h1
                data-title
                className="max-w-5xl text-[clamp(3.4rem,9vw,9rem)] font-black leading-[0.82] tracking-[-0.08em]"
              >
                Meet the
                <br />
                <span className="text-red-600">founder.</span>
              </h1>
            </div>
          </div>

          <div data-hero-copy className="max-w-md lg:justify-self-end">
            <p className="text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Behind every student's journey is a person who believes the path
              should be clearer than the destination feels.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-red-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                RSP in Japan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOUNDER
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-3 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[1.5rem] bg-neutral-950 lg:grid-cols-[1fr_0.85fr]">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className="relative h-[500px] overflow-hidden sm:h-[650px] lg:h-[760px]"
          >
            <div data-image-wrap className="absolute -inset-[6%] h-[140%]">
              <img
                data-portrait-image
                src={founder.image}
                alt={`${founder.name}, founder of RSP in Japan`}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

            {/* Location */}
            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
              <div className="rounded-full border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-md">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/80">
                  {founder.location}
                </span>
              </div>
            </div>

            {/* Portrait label */}
            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
                {founder.role}
              </p>

              <h2 className="mt-2 text-5xl font-black tracking-[-0.06em] text-white sm:text-7xl">
                {founder.name}
              </h2>
            </div>
          </div>

          {/* Founder information */}
          <div className="flex flex-col justify-between bg-neutral-950 p-6 text-white sm:p-10 lg:p-14">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
                Founder&apos;s note
              </span>

              <blockquote
                data-statement
                className="mt-8 max-w-xl text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl lg:text-5xl"
              >
                “{founder.statement}”
              </blockquote>
            </div>

            <div className="mt-16">
              <div data-bio className="border-l border-red-600 pl-5">
                <p className="text-sm leading-7 text-white/60 sm:text-base">
                  {founder.bio}
                </p>
              </div>

              <div data-tags className="mt-8 flex flex-wrap gap-2">
                {founder.tags.map((tag) => (
                  <span
                    key={tag}
                    data-tag
                    className="rounded-full border border-white/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors duration-300 hover:border-red-500 hover:text-red-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOUNDER PHILOSOPHY
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
              The philosophy
            </span>

            <h3 className="mt-5 max-w-md text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
              More than a language classroom.
            </h3>
          </div>

          <div>
            <p className="max-w-4xl text-2xl font-medium leading-[1.35] tracking-[-0.03em] text-neutral-700 sm:text-4xl">
              Learning Japanese is only one part of the journey. The bigger goal
              is helping people understand where they are going, why they are
              going there, and what it takes to build a life with confidence.
            </p>

            <div className="mt-10 h-px w-full bg-neutral-200">
              <div className="h-full w-1/4 bg-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          NUMBERS
      ===================================================== */}

      <div data-numbers className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          {[
            ["2020", "Founded"],
            ["50+", "Students guided"],
            ["N3 → N1", "JLPT progression"],
          ].map(([number, label]) => (
            <div
              key={number}
              data-number
              className="border-b border-neutral-200 px-5 py-10 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 lg:px-10"
            >
              <span className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                {number}
              </span>

              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          FINAL VISION
      ===================================================== */}

      <div className="px-3 py-3 sm:px-6 sm:py-6 lg:px-8">
        <div className="relative mx-auto min-h-[500px] max-w-[1500px] overflow-hidden rounded-[1.5rem] bg-red-600 p-6 sm:p-10 lg:p-16">
          {/* Decorative typography */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-5 top-10 select-none text-[18rem] font-black leading-none tracking-[-0.1em] text-white/[0.05]"
          >
            R
          </div>

          <div className="relative z-10 flex min-h-[440px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                The vision
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                RSP / JAPAN
              </span>
            </div>

            <div>
              <p className="mb-5 max-w-xl text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                One student at a time.
              </p>

              <h3 className="max-w-5xl text-[clamp(3rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.08em] text-white">
                Make the
                <br />
                path
                <br />
                <span className="text-white/45">clearer.</span>
              </h3>
            </div>

            <div className="flex items-end justify-between gap-8">
              <p className="max-w-md text-sm leading-6 text-white/60">
                The work continues with every student, every conversation, every
                lesson, and every step toward Japan.
              </p>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-all duration-500 hover:rotate-45 hover:bg-white hover:text-red-600">
                ↗
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
