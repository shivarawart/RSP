import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface ValueItem {
  number: string;
  title: string;
  description: string;
}

const timeline: TimelineItem[] = [
  {
    year: "2020",
    title: "RSP is founded",
    description:
      "A classroom in Meerut becomes the starting point for a Japan-bound dream.",
  },
  {
    year: "2021",
    title: "First student batch",
    description:
      "The first learners begin their Japanese language journey with personal guidance.",
  },
  {
    year: "2023",
    title: "First N1 achievements",
    description:
      "Students move from grammar drills to advanced confidence and real outcomes.",
  },
  {
    year: "2024",
    title: "50+ students milestone",
    description:
      "More than fifty students take their next step toward study and work in Japan.",
  },
  {
    year: "Today",
    title: "The journey continues",
    description:
      "From Kyoto, Rohit keeps walking beside every new student and family.",
  },
];

const values: ValueItem[] = [
  {
    number: "01",
    title: "Discipline",
    description:
      "Progress is rarely loud. It is the quiet decision to return to practice, again and again.",
  },
  {
    number: "02",
    title: "Cultural respect",
    description:
      "Language opens a door, but respect teaches you how to enter a place with care.",
  },
  {
    number: "03",
    title: "Real outcomes",
    description:
      "A certificate matters. So does the confidence to use Japanese in school, work, and everyday life.",
  },
];

export default function AboutUs() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      /*
       * ---------------------------------------------------------
       * REDUCED MOTION
       * ---------------------------------------------------------
       */

      if (reduceMotion) {
        gsap.set(root.querySelectorAll("[data-reveal]"), {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: "inset(0 0 0 0)",
        });

        return;
      }

      /*
       * ---------------------------------------------------------
       * HERO / INTRO
       * ---------------------------------------------------------
       */

      const eyebrow = root.querySelector("[data-eyebrow]");
      const titleLines = root.querySelectorAll("[data-title-line]");
      const intro = root.querySelector("[data-intro]");
      const introSection = root.querySelector("[data-intro-section]");

      if (introSection) {
        const introTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: introSection,
            start: "top 82%",
            once: true,
          },
        });

        introTimeline
          .fromTo(
            eyebrow,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            },
          )
          .fromTo(
            titleLines,
            {
              opacity: 0,
              yPercent: 100,
              rotateX: 70,
            },
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power4.out",
            },
            "-=0.3",
          )
          .fromTo(
            intro,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5",
          );
      }

      /*
       * ---------------------------------------------------------
       * CINEMATIC IMAGE REVEAL
       * ---------------------------------------------------------
       */

      const imageContainer = root.querySelector<HTMLElement>(
        "[data-image-container]",
      );

      const image = root.querySelector<HTMLElement>("[data-image]");

      if (imageContainer) {
        gsap.fromTo(
          imageContainer,
          {
            clipPath: "inset(0 100% 0 0)",
          },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageContainer,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      if (image) {
        gsap.fromTo(
          image,
          {
            scale: 1.18,
          },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageContainer,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      /*
       * ---------------------------------------------------------
       * IMAGE PARALLAX
       * ---------------------------------------------------------
       */

      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /*
       * ---------------------------------------------------------
       * STORY COPY
       * ---------------------------------------------------------
       */

      const storyBlocks =
        root.querySelectorAll<HTMLElement>("[data-story-block]");

      storyBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      /*
       * ---------------------------------------------------------
       * TIMELINE
       * ---------------------------------------------------------
       */

      if (timelineLineRef.current) {
        const timelineParent = timelineLineRef.current.parentElement;

        gsap.fromTo(
          timelineLineRef.current,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: timelineParent,
              start: "top 70%",
              end: "bottom 75%",
              scrub: true,
            },
          },
        );
      }

      const timelineItems = root.querySelectorAll<HTMLElement>(
        "[data-timeline-item]",
      );

      timelineItems.forEach((item) => {
        const marker = item.querySelector<HTMLElement>("[data-marker]");
        const content = item.querySelector<HTMLElement>(
          "[data-timeline-content]",
        );

        const itemTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        if (marker) {
          itemTimeline.fromTo(
            marker,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
            },
          );
        }

        if (content) {
          itemTimeline.fromTo(
            content,
            {
              opacity: 0,
              x: 30,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.25",
          );
        }
      });

      /*
       * ---------------------------------------------------------
       * VALUES
       * ---------------------------------------------------------
       */

      const valueCards =
        root.querySelectorAll<HTMLElement>("[data-value-card]");

      const valuesSection = root.querySelector("[data-values]");

      if (valueCards.length && valuesSection) {
        gsap.fromTo(
          valueCards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesSection,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      /*
       * ---------------------------------------------------------
       * CURSOR GLOW
       * ---------------------------------------------------------
       */

      if (
        cursorGlowRef.current &&
        window.matchMedia("(pointer: fine)").matches
      ) {
        const glow = cursorGlowRef.current;

        const xTo = gsap.quickTo(glow, "x", {
          duration: 0.5,
          ease: "power3.out",
        });

        const yTo = gsap.quickTo(glow, "y", {
          duration: 0.5,
          ease: "power3.out",
        });

        const handleMouseMove = (event: MouseEvent) => {
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

        root.addEventListener("mousemove", handleMouseMove);
        root.addEventListener("mouseenter", handleEnter);
        root.addEventListener("mouseleave", handleLeave);

        return () => {
          root.removeEventListener("mousemove", handleMouseMove);
          root.removeEventListener("mouseenter", handleEnter);
          root.removeEventListener("mouseleave", handleLeave);
        };
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#FEF2F2]/40 to-white text-neutral-950"
    >
      {/* =========================================================
          CURSOR GLOW
      ========================================================= */}

      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-red-500/15 to-red-600/8 blur-3xl lg:block"
      />

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-red-500/[0.03] blur-[140px]" />
        <div className="absolute -bottom-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-red-600/[0.02] blur-[120px]" />
      </div>

      {/* =========================================================
          INTRO / HERO
      ========================================================= */}

      <div
        data-intro-section
        className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-28"
      >
        <div className="grid items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div data-eyebrow className="mb-5 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inset-0 animate-ping rounded-full bg-red-600 opacity-40" />
                <span className="relative h-3 w-3 rounded-full bg-red-600" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                Our story · Since 2020
              </span>
            </div>

            <h2
              className="max-w-3xl overflow-hidden text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.88] tracking-[-0.075em]"
              style={{ perspective: "900px" }}
            >
              <span data-title-line className="block">
                Five years.
              </span>

              <span data-title-line className="block bg-gradient-to-r from-red-600 via-red-600 to-red-500 bg-clip-text text-transparent">
                One clear path.
              </span>
            </h2>
          </div>

          <div data-intro className="max-w-xl lg:justify-self-end">
            <p className="text-lg font-medium leading-[1.45] tracking-[-0.02em] text-neutral-700 sm:text-xl lg:text-2xl">
              RSP in Japan began with a simple belief: students deserve an
              honest, human bridge between where they are and the life they are
              working toward.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-red-600 to-transparent" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                About the company
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          CINEMATIC BANNER
      ========================================================= */}

      <div className="mx-auto max-w-[1500px] px-3 sm:px-6 lg:px-8">
        <div
          ref={heroImageRef}
          data-image-container
          className="group relative h-[430px] overflow-hidden rounded-[2rem] bg-neutral-950 shadow-2xl shadow-black/20 sm:h-[520px] lg:h-[620px]"
        >
          <div data-image className="absolute inset-[-5%] h-[110%] w-[110%]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/about-poster.jpg"
              className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            >
              <source src="/videos/japan-about.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(220,38,38,0.35),transparent_40%)]" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 lg:p-14">
            <div className="flex items-start justify-between gap-5">
              <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md shadow-lg">
                RSP in Japan
              </span>

              <span className="text-right text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
                2020 — Now
              </span>
            </div>

            <div className="max-w-4xl">
              <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-red-300">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                From intention to movement
              </p>

              <h3 className="text-[clamp(2.4rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.07em] text-white drop-shadow-2xl">
                Five years of
                <br />
                turning intention
                <br />
                <span className="bg-gradient-to-r from-red-400 via-red-300 to-red-400 bg-clip-text text-transparent">
                  into movement.
                </span>
              </h3>
            </div>
          </div>

          {/* Progress line */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/25">
            <div className="h-full w-1/3 bg-gradient-to-r from-red-500 to-red-400" />
          </div>

          {/* Corner accents */}
          <div className="absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-white/30" />
          <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/30" />
          <div className="absolute top-6 left-6 h-10 w-10 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-6 right-6 h-10 w-10 border-t-2 border-r-2 border-white/30" />
        </div>
      </div>

      {/* =========================================================
          COMPANY STORY
      ========================================================= */}

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1fr] lg:gap-24">
          <div data-story-block>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
              About the company
            </span>

            <h3 className="mt-5 max-w-md text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
              Five years of turning intention into movement.
            </h3>
          </div>

          <div data-story-block className="max-w-3xl">
            <p className="text-xl font-medium leading-[1.5] tracking-[-0.025em] text-neutral-700 sm:text-2xl">
              Founded in 2020, RSP in Japan has helped more than 50 students
              move toward Yokohama language school, JLPT progression from N3 to
              N1, and new work possibilities in Japan.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-6 sm:grid-cols-3">
              <div className="group">
                <p className="text-3xl font-black tracking-[-0.05em] text-neutral-900 transition-colors duration-300 group-hover:text-red-600">
                  2020
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Founded
                </p>
              </div>

              <div className="group">
                <p className="text-3xl font-black tracking-[-0.05em] text-neutral-900 transition-colors duration-300 group-hover:text-red-600">
                  50+
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Students
                </p>
              </div>

              <div className="group">
                <p className="text-3xl font-black tracking-[-0.05em] text-neutral-900 transition-colors duration-300 group-hover:text-red-600">
                  N3 → N1
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  Progression
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          TIMELINE
      ========================================================= */}

      <div className="relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                The journey
              </span>
            </div>

            <h3 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Every step
              <br />
              <span className="bg-gradient-to-r from-neutral-400 to-neutral-300 bg-clip-text text-transparent">
                changed something.
              </span>
            </h3>
          </div>

          <div className="relative">
            {/* Timeline rail */}
            <div className="absolute bottom-0 left-[5px] top-0 w-px bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-200 sm:left-[7px]">
              <div
                ref={timelineLineRef}
                className="h-full w-full origin-top bg-gradient-to-b from-red-600 to-red-500"
              />
            </div>

            <div className="space-y-12 sm:space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  data-timeline-item
                  className="relative grid gap-5 pl-8 sm:grid-cols-[130px_1fr] sm:gap-10 sm:pl-12"
                >
                  {/* Marker */}
                  <div
                    data-marker
                    className="absolute left-0 top-1 z-10 flex h-[14px] w-[14px] items-center justify-center rounded-full border-3 border-red-600 bg-white shadow-lg sm:h-[18px] sm:w-[18px]"
                  >
                    <span className="h-2 w-2 rounded-full bg-red-600 sm:h-2.5 sm:w-2.5" />
                  </div>

                  <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                    {item.year}
                  </span>

                  <div
                    data-timeline-content
                    className="group rounded-xl p-4 transition-all duration-300 hover:bg-red-50/50"
                  >
                    <h4 className="text-2xl font-black tracking-[-0.04em] text-neutral-900 sm:text-3xl">
                      {item.title}
                    </h4>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
                      {item.description}
                    </p>

                    {index < timeline.length - 1 && (
                      <div className="mt-4 h-px w-full bg-gradient-to-r from-red-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <div
        data-values
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                <span className="text-sm font-bold">✦</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                What we believe
              </span>
            </div>

            <h3 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl">
              The values that
              <br />
              keep the path
              <br />
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                real.
              </span>
            </h3>
          </div>

          <p className="max-w-xl self-end text-lg leading-relaxed text-neutral-500">
            The journey to Japan is more than language. It requires consistency,
            cultural awareness, and the confidence to turn learning into a
            real-life ability.
          </p>
        </div>

        <div className="grid border-t border-neutral-200 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.number}
              data-value-card
              className="group relative border-b border-neutral-200 px-0 py-8 transition-all duration-500 hover:bg-gradient-to-br hover:from-red-50/30 hover:to-transparent lg:border-b-0 lg:border-r lg:px-8 lg:py-10 first:lg:pl-0 last:lg:border-r-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-500 font-mono text-xs font-black tracking-[0.2em] text-white shadow-lg shadow-red-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-red-500/40">
                    {value.number}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.2em] text-neutral-300 transition-colors duration-300 group-hover:text-red-600">
                    {value.number}
                  </span>
                </div>

                <span className="h-2.5 w-2.5 rounded-full bg-neutral-200 transition-all duration-500 group-hover:scale-150 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-500/50" />
              </div>

              <h4 className="mt-12 text-3xl font-black tracking-[-0.05em] text-neutral-900 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-red-600">
                {value.title}
              </h4>

              <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500">
                {value.description}
              </p>

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-700 ease-out group-hover:w-full lg:left-8 lg:right-8 lg:w-auto lg:origin-left lg:scale-x-0 lg:group-hover:scale-x-100" />
            </article>
          ))}
        </div>
      </div>

      {/* =========================================================
          FINAL BANNER
      ========================================================= */}

      <div className="px-3 pb-4 sm:px-6 sm:pb-6 lg:px-8">
        <div className="group relative mx-auto min-h-[360px] max-w-[1500px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-600 via-red-500 to-red-600 px-6 py-12 shadow-2xl shadow-red-500/30 sm:px-10 lg:min-h-[430px] lg:px-16">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Decorative circles */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-2 border-white/20 transition-transform duration-700 group-hover:scale-110"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border-2 border-white/15 transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient orbs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-white/10 blur-[100px]" />
            <div className="absolute -bottom-40 left-[-10%] h-[350px] w-[350px] rounded-full bg-black/10 blur-[80px]" />
          </div>

          <div className="relative z-10 flex min-h-[310px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white/80 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                  Beyond the classroom
                </span>
              </div>

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                RSP / JAPAN
              </span>
            </div>

            <div>
              <h3 className="max-w-5xl text-[clamp(2.8rem,7vw,7rem)] font-black leading-[0.88] tracking-[-0.075em] text-white drop-shadow-2xl">
                The destination
                <br />
                is Japan.
                <br />
                <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
                  The path is yours.
                </span>
              </h3>
            </div>

            <div className="flex items-end justify-between gap-5">
              <p className="max-w-sm text-xs leading-6 text-white/70 sm:text-sm">
                Language. Discipline. Culture. Confidence. A clearer path toward
                what comes next.
              </p>

              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-red-600 group-hover:shadow-2xl group-hover:shadow-white/30">
                <span className="text-xl transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}