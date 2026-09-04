// import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  FileCheck2,
  Globe2,
  MapPin,
  MoveUpRight,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Feature = {
  id: string;
  title: string;
  description: string;
  label: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    id: "01",
    title: "Teaching with depth",
    description:
      "From your first kana to N1, learn through a structured path built around patient correction, exam strategy, and Japanese you can actually use.",
    label: "N5 → N1",
    icon: BookOpen,
  },
  {
    id: "02",
    title: "A direct pathway",
    description:
      "Move toward Yokohama language school with clarity. Every important milestone is explained before you take the next step.",
    label: "INDIA → JAPAN",
    icon: Compass,
  },
  {
    id: "03",
    title: "Guidance that stays",
    description:
      "Documents, applications, visa preparation, interviews, and the questions families should never have to navigate alone.",
    label: "END TO END",
    icon: FileCheck2,
  },
  {
    id: "04",
    title: "Support from Japan",
    description:
      "Rohit lives in Kyoto. Your relationship with RSP does not end when you leave India. It simply changes shape.",
    label: "KYOTO, JAPAN",
    icon: Globe2,
  },
];

const results = [
  {
    number: "01",
    title: "From N3 to Yokohama",
    text: "The language milestone that opened the application door.",
  },
  {
    number: "02",
    title: "A first N1",
    text: "Advanced Japanese earned one disciplined day at a time.",
  },
  {
    number: "03",
    title: "Work begins here",
    text: "Preparing for the interview, not just the exam.",
  },
];


function RedMark() {
  return (
    <span className="relative inline-flex h-3 w-3">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#E60012] opacity-40" />
      <span className="relative h-3 w-3 rounded-full bg-[#E60012]" />
    </span>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  return (
    <article
      data-feature
      className="group relative min-h-[360px] overflow-hidden border border-[#E60012] bg-white p-7 sm:p-9"
    >
      {/* giant background number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-8 select-none text-[10rem] font-black leading-none text-[#E60012]/[0.06] transition-transform duration-700 group-hover:scale-110"
      >
        {feature.id}
      </span>

      {/* animated red corner */}
      <span className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
        <span className="absolute right-0 top-0 h-px w-0 bg-[#E60012] transition-all duration-700 group-hover:w-full" />
        <span className="absolute right-0 top-0 h-0 w-px bg-[#E60012] transition-all duration-700 group-hover:h-full" />
      </span>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#E60012]">
            {feature.id}
          </span>

          <div className="flex h-12 w-12 items-center justify-center border border-[#E60012] text-[#E60012] transition-all duration-500 group-hover:rotate-12 group-hover:bg-[#E60012] group-hover:text-white">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        </div>

        <div className="mt-auto pt-20">
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-[#E60012]">
            {feature.label}
          </span>

          <h3 className="mt-3 max-w-md text-3xl font-bold tracking-[-0.04em] text-black sm:text-4xl">
            {feature.title}
          </h3>

          <p className="mt-5 max-w-md text-sm leading-7 text-black/60">
            {feature.description}
          </p>

          <div className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#E60012]">
            Explore
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </div>
      </div>

      {/* bottom animated line */}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#E60012] transition-all duration-700 group-hover:w-full" />

      {/* index marker */}
      <span
        className={`absolute bottom-7 right-7 hidden font-mono text-[9px] tracking-[0.2em] text-black/25 sm:block`}
      >
        RSP / 0{index + 1}
      </span>
    </article>
  );
}

export default function WhyRSP() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* ----------------------------------
         HERO
      ---------------------------------- */

      gsap.from("[data-hero]", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-hero-wrap]",
          start: "top 80%",
          once: true,
        },
      });

      /* ----------------------------------
         RED LINE
      ---------------------------------- */

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      /* ----------------------------------
         FEATURE CARDS
      ---------------------------------- */

      gsap.from("[data-feature]", {
        y: 100,
        opacity: 0,
        rotateX: 8,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-features]",
          start: "top 75%",
          once: true,
        },
      });

      /* ----------------------------------
         RESULTS HEADING
      ---------------------------------- */

      gsap.from("[data-results-title]", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-results-title]",
          start: "top 80%",
          once: true,
        },
      });

      /* ----------------------------------
         RESULT ROWS
      ---------------------------------- */

      gsap.from("[data-result]", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-results]",
          start: "top 70%",
          once: true,
        },
      });

      /* ----------------------------------
         GIANT BACKGROUND TEXT
      ---------------------------------- */

      gsap.to("[data-bg]", {
        xPercent: -12,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ----------------------------------
         FLOATING RED DOT
      ---------------------------------- */

      gsap.to("[data-floating-dot]", {
        y: -30,
        x: 20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white text-black"
    >
      {/* ==================================================
          GLOBAL RED ELEMENTS
      ================================================== */}

      <div
        data-floating-dot
        className="pointer-events-none absolute right-[8%] top-[12%] z-20 hidden md:block"
      >
        <RedMark />
      </div>

      {/* ==================================================
          HERO
      ================================================== */}

      <div
        data-hero-wrap
        className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 lg:px-12 lg:pb-40 lg:pt-40"
      >
        {/* top navigation-like label */}
        <div
          data-hero
          className="mb-12 flex items-center justify-between border-b border-black/10 pb-5"
        >
          <div className="flex items-center gap-3">
            <RedMark />

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
              Why RSP / Japan
            </span>
          </div>

          <span className="hidden font-mono text-[10px] font-bold tracking-[0.25em] text-black/30 sm:block">
            01 — 02
          </span>
        </div>

        <div className="grid gap-14 lg:grid-cols-[0.35fr_1.65fr]">
          {/* side label */}
          <div data-hero className="hidden lg:block">
            <div className="sticky top-20">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#E60012]">
                The beginning
              </span>

              <div className="mt-5 h-28 w-px bg-[#E60012]" />

              <span className="mt-5 block max-w-[120px] text-xs leading-5 text-black/40">
                Language creates the first connection.
              </span>
            </div>
          </div>

          {/* heading */}
          <div>
            <div data-hero className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[#E60012]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#E60012]">
                言葉から、関係へ
              </span>
            </div>

            <h2
              data-hero
              className="
    max-w-6xl
    text-[clamp(3.5rem,9vw,9rem)]
    font-black
    leading-[0.9]
    tracking-[-0.075em]
    text-black
  "
            >
              <span className="block">Language is</span>

              <span
                className="
      mt-3
      block
      text-[#E60012]
      sm:mt-4
      lg:mt-5
    "
              >
                the beginning.
              </span>
            </h2>

            <div
              data-hero
              className="mt-12 max-w-3xl border-l-4 border-[#E60012] pl-6 sm:mt-16 sm:pl-8"
            >
              <p className="text-xl font-medium leading-relaxed tracking-tight sm:text-2xl lg:text-3xl">
                Learning Japanese is not just a subject on a timetable.
                <span className="text-black/45">
                  {" "}
                  It is discipline, cultural respect, and a future that asks you
                  to keep showing up.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="mt-20 overflow-hidden sm:mt-28">
          <div ref={lineRef} className="h-[2px] w-full bg-[#E60012]" />
        </div>
      </div>

      {/* ==================================================
          FEATURES
      ================================================== */}

      <div
        data-features
        className="relative mx-auto max-w-7xl px-5 pb-32 sm:px-8 lg:px-12"
      >
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#E60012]">
              What makes it different
            </span>

            <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Four reasons.
              <br />
              <span className="text-black/35">One relationship.</span>
            </h3>
          </div>

          <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-black/30">
            SCROLL TO EXPLORE ↓
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* location statement */}
        <div className="mt-4 grid border border-[#E60012] bg-[#E60012] text-white sm:grid-cols-[1fr_auto]">
          <div className="p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <MapPin size={17} />

              <span className="font-mono text-[10px] font-bold tracking-[0.25em]">
                KYOTO / JAPAN
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed sm:text-2xl">
              Rohit lives in Kyoto. Your support does not end when you leave
              India — it simply changes shape.
            </p>
          </div>

          <div className="flex min-h-32 items-center justify-center border-t border-white/20 p-7 sm:min-h-full sm:border-l sm:border-t-0 sm:p-10">
            <Globe2
              size={54}
              strokeWidth={0.8}
              className="transition-transform duration-700 hover:rotate-45"
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          RESULTS
      ================================================== */}

      <section
        data-results
        className="relative overflow-hidden bg-[#E60012] text-white"
      >
        {/* giant moving typography */}
        <div
          data-bg
          className="pointer-events-none absolute left-18 gap-0.5 top-10 whitespace-nowrap text-[22vw] font-black leading-none tracking-[-0.1em] text-white/[0.08]"
        >
          RESULTS
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
          {/* heading */}
          <div
            data-results-title
            className="grid gap-12 lg:grid-cols-[0.45fr_1.55fr]"
          >
            <div>
              <div className="flex items-center gap-3">
                <Sparkles size={15} />

                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
                  Student results
                </span>
              </div>

              <div className="mt-10 hidden lg:block">
                <div className="h-28 w-px bg-white/50" />
              </div>
            </div>

            <div>
              <h2 className="max-w-6xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.82] tracking-[-0.075em]">
                Small wins
                <br />
                become
                <br />
                <span className="text-white/40">a different life.</span>
              </h2>

              <p className="mt-10 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Every certificate carries a story of practice, patience, and
                someone back home who kept believing.
              </p>
            </div>
          </div>

          {/* result list */}
          <div className="mt-20 border-t border-white/25 sm:mt-28">
            {results.map((result) => (
              <article
                key={result.number}
                data-result
                className="group grid gap-7 border-b border-white/25 py-10 sm:grid-cols-[100px_1fr_300px] sm:items-center sm:py-14"
              >
                <span className="font-mono text-xs font-bold tracking-[0.25em] text-white/45">
                  {result.number}
                </span>

                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                    {result.title}
                  </h3>
                </div>

                <div className="flex gap-4">
                  <p className="text-sm leading-6 text-white/60">
                    {result.text}
                  </p>

                  <MoveUpRight
                    size={18}
                    className="mt-1 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span className="h-2 w-2 rounded-full bg-white" />
              Real progress. Real people. Real stories.
            </div>

            <a
              href="/contect"
              target="/contect"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-4 border border-white px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-[#E60012]"
            >
              Read their stories
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL STATEMENT
      ================================================== */}

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#E60012]">
                The relationship is the difference.
              </span>

              <h3 className="mt-6 max-w-5xl text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                Japanese begins with language.
                <span className="text-black/25">
                  {" "}
                  The journey begins with someone beside you.
                </span>
              </h3>
            </div>

            <div className="flex h-20 w-20 items-center justify-center border-2 rounded-2xl border-[#E60012] text-[#000000] hover:bg-red-600">
              <ArrowUpRight size={28} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
