"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   TYPES
============================================================ */

interface UpcomingCourse {
  id: number;
  month: string;
  title: string;
  description: string;
  level: string;
  seats: string;
  accent: string;
}

interface CourseLevel {
  id: string;
  number: string;
  duration: string;
  hours: string;
  title: string;
  description: string;
}

interface BatchFormat {
  icon: string;
  title: string;
  description: string;
}

interface ProgramFeature {
  title: string;
}

interface PathwayItem {
  number: string;
  title: string;
}

/* ============================================================
   DATA
============================================================ */

const upcomingCourses: UpcomingCourse[] = [
  {
    id: 1,
    month: "OCT",
    title: "Japanese Foundation Batch",
    description:
      "Start your Japanese journey with a structured foundation built around confidence, consistency, and real conversation.",
    level: "N5",
    seats: "Limited seats",
    accent: "01",
  },
  {
    id: 2,
    month: "NOV",
    title: "N4 → N3 Accelerator",
    description:
      "A focused progression program designed for learners ready to move beyond basic Japanese and toward practical fluency.",
    level: "N4 → N3",
    seats: "Applications open",
    accent: "02",
  },
  {
    id: 3,
    month: "DEC",
    title: "Japan Pathway Program",
    description:
      "Prepare your Japanese, study pathway, and next steps with a program designed around your Japan goal.",
    level: "N3+",
    seats: "Coming soon",
    accent: "03",
  },
];

const courses: CourseLevel[] = [
  {
    id: "N5",
    number: "01",
    duration: "4–5 months",
    hours: "6 hrs / week",
    title: "Build your foundation.",
    description:
      "Build a confident foundation in everyday Japanese, hiragana, katakana, and simple conversation.",
  },
  {
    id: "N4",
    number: "02",
    duration: "5–6 months",
    hours: "6 hrs / week",
    title: "Find your rhythm.",
    description:
      "Navigate daily life, understand familiar topics, and speak with more natural rhythm.",
  },
  {
    id: "N3",
    number: "03",
    duration: "7–8 months",
    hours: "8 hrs / week",
    title: "Cross the bridge.",
    description:
      "The bridge to Japan: read practical Japanese, follow conversations, and prepare for school.",
  },
  {
    id: "N2",
    number: "04",
    duration: "8–10 months",
    hours: "8 hrs / week",
    title: "Speak the language of opportunity.",
    description:
      "Work with business vocabulary, complex texts, interviews, and the language of opportunity.",
  },
  {
    id: "N1",
    number: "05",
    duration: "10–12 months",
    hours: "10 hrs / week",
    title: "Live confidently in Japanese.",
    description:
      "Reach advanced fluency for professional settings, higher study, and a life lived in Japanese.",
  },
];

const formats: BatchFormat[] = [
  {
    icon: "↗",
    title: "Online",
    description: "A focused desk and a class that travels with you.",
  },
  {
    icon: "◉",
    title: "Offline in Delhi",
    description:
      "Learn in a room with people who are walking beside you.",
  },
  {
    icon: "◷",
    title: "Weekend batches",
    description:
      "Keep your weekdays moving while Japanese becomes part of your rhythm.",
  },
  {
    icon: "＋",
    title: "One-on-one intensive",
    description:
      "A closer plan for a faster, more personal climb.",
  },
];

const features: ProgramFeature[] = [
  {
    title: "Study material that stays useful",
  },
  {
    title: "Kanji drills that build memory",
  },
  {
    title: "Speaking practice with Japan-based guidance",
  },
  {
    title: "Interview and keigo training",
  },
  {
    title: "JLPT mock tests with feedback",
  },
  {
    title: "A plan you can explain to your family",
  },
];

const pathway: PathwayItem[] = [
  {
    number: "01",
    title: "Learn Japanese with RSP",
  },
  {
    number: "02",
    title: "Reach N3",
  },
  {
    number: "03",
    title: "Admission to Yokohama",
  },
  {
    number: "04",
    title: "Study in Japan",
  },
  {
    number: "05",
    title: "Advance to N2 / N1",
  },
  {
    number: "06",
    title: "Job placement in Japan",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function Courses() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathwayLineRef = useRef<HTMLDivElement | null>(null);

  const [activeCourse, setActiveCourse] = useState("N5");

  /* ==========================================================
     GSAP
  ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 640px) and (max-width: 1023px)",
          mobile: "(max-width: 639px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean;
            tablet: boolean;
            mobile: boolean;
            reduced: boolean;
          };

          const {
            desktop,
            mobile,
            reduced,
          } = conditions;

          /* ======================================================
             REDUCED MOTION
          ====================================================== */

          if (reduced) {
            gsap.set(
              [
                "[data-reveal]",
                "[data-hero-eyebrow]",
                "[data-hero-title]",
                "[data-hero-description]",
                "[data-upcoming-header]",
                "[data-upcoming-card]",
                "[data-course-card]",
                "[data-format-card]",
                "[data-feature]",
                "[data-pathway-item]",
                "[data-cta-content]",
              ],
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateX: 0,
                clipPath: "inset(0% 0% 0% 0%)",
              },
            );

            if (pathwayLineRef.current) {
              gsap.set(pathwayLineRef.current, {
                scaleX: 1,
              });
            }

            return;
          }

          /* ======================================================
             HELPER
          ====================================================== */

          const reveal = (
            selector: string,
            options: {
              y?: number;
              x?: number;
              duration?: number;
              stagger?: number;
              start?: string;
            } = {},
          ) => {
            const {
              y = 32,
              x = 0,
              duration = 0.8,
              stagger = 0.08,
              start = "top 84%",
            } = options;

            const elements = gsap.utils.toArray<HTMLElement>(
              selector,
            );

            if (!elements.length) return;

            gsap.fromTo(
              elements,
              {
                opacity: 0,
                y,
                x,
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration,
                stagger,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: elements[0],
                  start,
                  once: true,
                },
              },
            );
          };

          /* ======================================================
             HERO
          ====================================================== */

          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: "[data-courses-hero]",
              start: "top 82%",
              once: true,
            },
          });

          heroTimeline
            .fromTo(
              "[data-hero-eyebrow]",
              {
                opacity: 0,
                y: 18,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
            )
            .fromTo(
              "[data-hero-title]",
              {
                opacity: 0,
                yPercent: 105,
                rotateX: desktop ? 50 : 20,
                transformOrigin: "50% 100%",
              },
              {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                duration: desktop ? 1.15 : 0.9,
                ease: "power4.out",
              },
              "-=0.28",
            )
            .fromTo(
              "[data-hero-description]",
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.65",
            );

          /* ======================================================
             GENERIC REVEALS
          ====================================================== */

          reveal("[data-reveal]", {
            y: desktop ? 42 : 28,
            duration: desktop ? 0.9 : 0.75,
            stagger: 0.1,
          });

          /* ======================================================
             UPCOMING COURSES
          ====================================================== */

          const upcomingSection = section.querySelector(
            "[data-upcoming]",
          );

          if (upcomingSection) {
            const upcomingTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: upcomingSection,
                start: "top 78%",
                once: true,
              },
            });

            upcomingTimeline
              .fromTo(
                "[data-upcoming-header]",
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                },
              )
              .fromTo(
                "[data-upcoming-card]",
                {
                  opacity: 0,
                  y: 45,
                  scale: 0.985,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1,
                  ease: "power3.out",
                },
                "-=0.45",
              );
          }

          /* ======================================================
             COURSE CARDS
          ====================================================== */

          const courseCards = gsap.utils.toArray<HTMLElement>(
            "[data-course-card]",
          );

          if (courseCards.length) {
            gsap.fromTo(
              courseCards,
              {
                opacity: 0,
                y: desktop ? 45 : 30,
                scale: 0.97,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: desktop ? 0.8 : 0.65,
                stagger: desktop ? 0.11 : 0.07,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: "[data-course-grid]",
                  start: "top 80%",
                  once: true,
                },
              },
            );
          }

          /* ======================================================
             BATCH FORMATS
          ====================================================== */

          const formatCards = gsap.utils.toArray<HTMLElement>(
            "[data-format-card]",
          );

          if (formatCards.length) {
            gsap.fromTo(
              formatCards,
              {
                opacity: 0,
                y: 35,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: "[data-formats]",
                  start: "top 80%",
                  once: true,
                },
              },
            );
          }

          /* ======================================================
             FEATURE LIST
          ====================================================== */

          const featureItems = gsap.utils.toArray<HTMLElement>(
            "[data-feature]",
          );

          if (featureItems.length) {
            gsap.fromTo(
              featureItems,
              {
                opacity: 0,
                x: desktop ? -28 : -15,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.65,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: "[data-features]",
                  start: "top 80%",
                  once: true,
                },
              },
            );
          }

          /* ======================================================
             JLPT SECTION
          ====================================================== */

          const jlptSection = section.querySelector(
            "[data-jlpt]",
          );

          if (jlptSection) {
            const jlptContent =
              jlptSection.querySelectorAll("[data-reveal]");

            gsap.fromTo(
              jlptContent,
              {
                opacity: 0,
                y: 38,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: jlptSection,
                  start: "top 78%",
                  once: true,
                },
              },
            );

            /* ----------------------------------------------------
               PARALLAX
            ---------------------------------------------------- */

            gsap.to(jlptSection, {
              yPercent: desktop ? -7 : mobile ? -2 : -4,
              ease: "none",
              scrollTrigger: {
                trigger: jlptSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          /* ======================================================
             PATHWAY ITEMS
          ====================================================== */

          const pathwayItems = gsap.utils.toArray<HTMLElement>(
            "[data-pathway-item]",
          );

          if (pathwayItems.length) {
            gsap.fromTo(
              pathwayItems,
              {
                opacity: 0,
                y: 28,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.12,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: "[data-pathway]",
                  start: "top 78%",
                  once: true,
                },
              },
            );
          }

          /* ======================================================
             PATHWAY LINE
          ====================================================== */

          if (pathwayLineRef.current && desktop) {
            const pathwayLine = pathwayLineRef.current;

            gsap.set(pathwayLine, {
              scaleX: 0,
              transformOrigin: "left center",
            });

            gsap.to(pathwayLine, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-pathway]",
                start: "top 72%",
                end: "bottom 68%",
                scrub: 1,
              },
            });
          }

          /* ======================================================
             PATHWAY DOTS
          ====================================================== */

          const pathwayDots = gsap.utils.toArray<HTMLElement>(
            "[data-pathway-dot]",
          );

          if (pathwayDots.length) {
            gsap.fromTo(
              pathwayDots,
              {
                scale: 0,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.12,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: "[data-pathway]",
                  start: "top 76%",
                  once: true,
                },
              },
            );
          }

          /* ======================================================
             FINAL CTA
          ====================================================== */

          const cta = section.querySelector("[data-final-cta]");

          if (cta) {
            gsap.fromTo(
              "[data-cta-content]",
              {
                opacity: 0,
                y: 38,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: cta,
                  start: "top 82%",
                  once: true,
                },
              },
            );
          }

          /* ======================================================
             REFRESH
          ====================================================== */

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      );

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#FEF2F2]/30 to-white text-neutral-950"
    >
      {/* ========================================================
          GLOBAL BACKGROUND
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-red-500/[0.03] blur-[140px]" />

        <div className="absolute -bottom-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-red-600/[0.02] blur-[120px]" />
      </div>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section
        data-courses-hero
        className="relative isolate overflow-hidden bg-[#db1010] text-[#171111]"
      >
        {/* =====================================================
      BACKGROUND IMAGE
  ====================================================== */}

        <div className="absolute inset-0 -z-100">
          <img
            src="https://img.yuxiaowang.com/uploads/oss/20260124/7fc3d81fa3713e22af28af2e9a429dde.png"
            alt="Japanese language students studying in a classroom"
            className="
        h-full
        w-full
        object-cover
        object-center
        scale-105
      "
          />
        </div>

        {/* =====================================================
      IMAGE OVERLAYS
  ====================================================== */}

        <div
          className="
      absolute
      inset-0
      -z-10
      bg-red/100
      backdrop-blur-[5px]
    "
        />

        <div
          className="
      absolute
      inset-0
      -z-10
      bg-gradient-to-r
      from-[#f7f5f2]
      via-[#f7f5f2]/90
      to-[#f7f5f2]/30
    "
        />

        <div
          className="
      absolute
      inset-0
      -z-10
      bg-gradient-to-t
      from-[#f7f5f2]
      via-transparent
      to-white/20
    "
        />

        {/* =====================================================
      DECORATIVE ELEMENTS
  ====================================================== */}

        <div
          aria-hidden="true"
          className="
      pointer-events-none
      absolute
      right-[-8rem]
      top-[-8rem]
      -z-10
      h-[28rem]
      w-[28rem]
      rounded-full
      bg-red-600/10
      blur-3xl
    "
        />

        <div
          aria-hidden="true"
          className="
      pointer-events-none
      absolute
      bottom-[-10rem]
      left-[-10rem]
      -z-10
      h-[30rem]
      w-[30rem]
      rounded-full
      bg-red-500/5
      blur-3xl
    "
        />

        {/* =====================================================
      MAIN CONTAINER
  ====================================================== */}

        <div
          className="
      relative
      mx-auto
      max-w-[1500px]
      px-5
      pb-16
      pt-28
      sm:px-8
      sm:pb-20
      sm:pt-32
      lg:px-12
      lg:pb-28
      lg:pt-40
      xl:px-16
    "
        >
          <div
            className="
        grid
        items-end
        gap-14
        lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]
        lg:gap-20
        xl:gap-28
      "
          >
            {/* =================================================
          LEFT CONTENT
      ================================================== */}

            <div className="relative max-w-5xl">
              {/* Eyebrow */}

              <div
                data-hero-eyebrow
                className="
            mb-7
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-red-600/15
            bg-white/70
            px-4
            py-2.5
            shadow-sm
            backdrop-blur-md
            sm:mb-9
          "
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="
                absolute
                inset-0
                animate-ping
                rounded-full
                bg-red-600
                opacity-40
              "
                  />

                  <span
                    className="
                relative
                h-2.5
                w-2.5
                rounded-full
                bg-red-600
              "
                  />
                </span>

                <span
                  className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.28em]
              text-red-700
              sm:text-[10px]
            "
                >
                  Courses + Programs · 学ぶ
                </span>
              </div>

              {/* Heading */}

              <div className="overflow-visible">
                <h1
                  data-hero-title
                  className="
              max-w-[1000px]
              text-[clamp(3.5rem,9vw,9.5rem)]
              font-black
              leading-[0.82]
              tracking-[-0.075em]
              text-[#171111]
            "
                >
                  The language
                  <br />
                  <span className="relative inline-block">for what's</span>
                  <br />
                  <span
                    className="
                relative
                inline-block
                bg-gradient-to-r
                from-[#8f1018]
                via-red-500
                to-[#8f1018]
                bg-clip-text
                text-transparent
              "
                  >
                    next.
                  </span>
                </h1>
              </div>

              {/* Bottom mini-meta */}

              <div
                className="
            mt-9
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-3
            sm:mt-11
          "
              >
                <span
                  className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-black/45
            "
                >
                  Japanese Language
                </span>

                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-red-600"
                />

                <span
                  className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-black/45
            "
                >
                  JLPT Preparation
                </span>

                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-red-600"
                />

                <span
                  className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-black/45
            "
                >
                  Japan Pathway
                </span>
              </div>
            </div>

            {/* =================================================
          RIGHT CONTENT
      ================================================== */}

            <div
              data-hero-description
              className="
          w-full
          lg:justify-self-end
          lg:pb-2
        "
            >
              {/* Description */}

              <p
                className="
            max-w-xl
            text-[1.05rem]
            font-medium
            leading-[1.55]
            tracking-[-0.025em]
            text-neutral-700
            sm:text-xl
            lg:text-[1.4rem]
            lg:leading-[1.45]
          "
              >
                A structured route from the first character to the Japanese you
                need for school, interviews, work, and a life that feels like
                your own.
              </p>

              {/* =================================================
            FLOATING INFO CARD
        ================================================== */}

              <div
                className="
            mt-8
            w-full
            max-w-md
            overflow-hidden
            rounded-[1.5rem]
            border
            border-black/10
            bg-white/85
            p-5
            shadow-[0_25px_80px_rgba(0,0,0,0.12)]
            backdrop-blur-xl
            sm:mt-10
            sm:p-6
          "
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span
                      className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.25em]
                  text-red-600
                "
                    >
                      Built around your goal
                    </span>

                    <h2
                      className="
                  mt-2
                  text-xl
                  font-black
                  tracking-tight
                  text-[#171111]
                  sm:text-2xl
                "
                    >
                      Learn. Prepare. Go.
                    </h2>
                  </div>

                  <span
                    className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#8f1018]
                text-lg
                text-white
              "
                  >
                    ↗
                  </span>
                </div>

                <div
                  className="
              mt-5
              grid
              grid-cols-3
              divide-x
              divide-black/10
              border-t
              border-black/10
              pt-5
            "
                >
                  <div className="pr-3">
                    <span
                      className="
                  block
                  text-xl
                  font-black
                  tracking-tight
                "
                    >
                      N5
                    </span>

                    <span
                      className="
                  mt-1
                  block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-black/40
                "
                    >
                      Beginner
                    </span>
                  </div>

                  <div className="px-3">
                    <span
                      className="
                  block
                  text-xl
                  font-black
                  tracking-tight
                "
                    >
                      N3
                    </span>

                    <span
                      className="
                  mt-1
                  block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-black/40
                "
                    >
                      Progress
                    </span>
                  </div>

                  <div className="pl-3">
                    <span
                      className="
                  block
                  text-xl
                  font-black
                  tracking-tight
                "
                    >
                      N1
                    </span>

                    <span
                      className="
                  mt-1
                  block
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-black/40
                "
                    >
                      Advanced
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
        BOTTOM EDGE
    ================================================== */}

          <div
            className="
        mt-16
        flex
        items-center
        justify-between
        border-t
        border-black/10
        pt-5
        sm:mt-20
        lg:mt-24
      "
          >
            <span
              className="
          text-[9px]
          font-black
          uppercase
          tracking-[0.25em]
          text-black/35
        "
            >
              RSP in Japan
            </span>

            <div className="flex items-center gap-3">
              <span
                className="
            h-px
            w-8
            bg-black/20
            sm:w-14
          "
              />

              <span
                className="
            text-[9px]
            font-black
            uppercase
            tracking-[0.25em]
            text-black/35
          "
              >
                01 / Courses
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          UPCOMING COURSES
      ======================================================== */}

      <section
        data-upcoming
        className="relative overflow-hidden bg-[#080808] py-20 text-white sm:py-24 lg:py-28"
      >
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-600/[0.045] blur-[120px]" />

          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-red-900/[0.05] blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.8) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.8) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Header */}

          <div
            data-upcoming-header
            className="mb-12 flex flex-col gap-7 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" />

                  <span className="relative h-2 w-2 rounded-full bg-red-500" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-red-400">
                  Upcoming courses
                </span>
              </div>

              <h2 className="mt-5 max-w-2xl text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-[-0.065em]">
                Your next{" "}
                <span className="text-white/35">chapter starts here.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                Explore our upcoming Japanese language programs and choose the
                right starting point for your journey to Japan.
              </p>
            </div>

            {/* Meta */}

            <div className="flex items-center justify-between gap-8 lg:pb-1">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                  Next intake
                </p>

                <p className="mt-2 text-sm font-semibold text-white/70">
                  Limited seats
                </p>
              </div>

              <div className="hidden h-10 w-px bg-white/10 sm:block" />

              <div className="hidden sm:block">
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/25">
                  Explore
                </p>

                <p className="mt-2 text-sm font-semibold text-white/70">
                  Auto sliding
                </p>
              </div>
            </div>
          </div>

          {/* Swiper */}

          <div data-upcoming-card className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={16}
              loop={upcomingCourses.length > 2}
              speed={850}
              grabCursor
              watchSlidesProgress
              autoplay={{
                delay: 3600,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: ".upcoming-pagination",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.15,
                  spaceBetween: 18,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1.75,
                  spaceBetween: 22,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              className="upcoming-swiper"
            >
              {upcomingCourses.map((course, index) => (
                <SwiperSlide key={course.id}>
                  <article
                    className="
                      group
                      relative
                      flex
                      min-h-[390px]
                      flex-col
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-white/[0.09]
                      bg-[#101010]
                      p-6
                      transition-all
                      duration-500
                      hover:border-white/[0.16]
                      sm:min-h-[410px]
                      sm:p-7
                    "
                  >
                    {/* Number */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-3
                        -top-8
                        select-none
                        text-[11rem]
                        font-black
                        leading-none
                        tracking-[-0.12em]
                        text-white/[0.025]
                        transition-colors
                        duration-500
                        group-hover:text-red-500/[0.04]
                      "
                    >
                      {course.accent}
                    </div>

                    {/* Top */}

                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                        <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-red-400">
                          {course.month}
                        </span>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">
                        {course.seats}
                      </span>
                    </div>

                    {/* Level */}

                    <div className="relative z-10 mt-10">
                      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25">
                        Level {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-2 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                        {course.level}
                      </h3>
                    </div>

                    {/* Content */}

                    <div className="relative z-10 mt-auto pt-10">
                      <div className="mb-5 h-px w-8 bg-red-500/70 transition-all duration-500 group-hover:w-14" />

                      <h4 className="max-w-md text-2xl font-bold leading-[1] tracking-[-0.04em] sm:text-3xl">
                        {course.title}
                      </h4>

                      <p className="mt-4 max-w-md text-[13px] leading-6 text-white/40">
                        {course.description}
                      </p>

                      {/* CTA */}

                      <Link
                        to="/contact"
                        className="
                          group/button
                          mt-6
                          inline-flex
                          items-center
                          gap-3
                          rounded-full
                          border
                          border-white/10
                          bg-white
                          px-4
                          py-2.5
                          text-[8px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-black
                          transition-all
                          duration-300
                          hover:border-red-500
                          hover:bg-red-600
                          hover:text-white
                        "
                      >
                        <span>Enquire now</span>

                        <span
                          className="
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-black/[0.08]
                            text-sm
                            transition-all
                            duration-300
                            group-hover/button:rotate-45
                            group-hover/button:bg-white/20
                          "
                        >
                          ↗
                        </span>
                      </Link>
                    </div>

                    {/* Red edge */}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        w-full
                        origin-left
                        scale-x-0
                        bg-gradient-to-r
                        from-red-600
                        via-red-400
                        to-transparent
                        transition-transform
                        duration-700
                        group-hover:scale-x-100
                      "
                    />
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Controls */}

            <div className="mt-7 flex items-center justify-between">
              <div className="upcoming-pagination flex min-h-[8px] items-center" />

              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-red-500/40" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>

                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/20">
                  Auto explore
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Swiper CSS */}

        <style>{`
          .upcoming-swiper {
            overflow: visible !important;
          }

          .upcoming-swiper .swiper-slide {
            height: auto;
          }

          .upcoming-pagination {
            gap: 6px;
          }

          .upcoming-pagination .swiper-pagination-bullet {
            display: block;
            width: 6px;
            height: 6px;
            margin: 0 !important;
            border-radius: 999px;
            background: rgba(255,255,255,0.18);
            opacity: 1;
            transition:
              width 0.35s ease,
              background-color 0.35s ease;
          }

          .upcoming-pagination
            .swiper-pagination-bullet-active {
            width: 24px;
            background: rgb(239,68,68);
          }

          @media (max-width: 639px) {
            .upcoming-swiper {
              overflow: hidden !important;
            }
          }
        `}</style>
      </section>

      {/* ========================================================
          LEVELS
      ======================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div data-reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
              Choose your level
            </span>

            <h2 className="mt-5 max-w-md text-4xl font-black leading-[0.92] tracking-[-0.06em] sm:text-5xl">
              Meet the version
              <br />
              of Japanese
              <br />
              <span className="bg-gradient-to-r from-neutral-400 to-neutral-300 bg-clip-text text-transparent">
                you are ready for.
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-500">
              Start where you are. Move at a pace you can sustain. Ask about
              fees, placement, and the best fit for your goal.
            </p>
          </div>

          <div data-course-grid className="grid gap-3 sm:grid-cols-2">
            {courses.map((course) => {
              const active = activeCourse === course.id;

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setActiveCourse(course.id)}
                  data-course-card
                  className={`group relative min-h-[280px] overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-500 sm:p-6 ${
                    active
                      ? "border-red-600 bg-gradient-to-br from-red-600 to-red-500 text-white shadow-2xl shadow-red-500/30"
                      : "border-neutral-200 bg-white text-neutral-950 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-4xl font-black tracking-[-0.07em] ${
                        active ? "text-white" : "text-neutral-950"
                      }`}
                    >
                      {course.id}
                    </span>

                    <span
                      className={`text-[9px] font-bold tracking-[0.2em] ${
                        active ? "text-white/60" : "text-neutral-300"
                      }`}
                    >
                      {course.number}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p
                      className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
                        active ? "text-white/70" : "text-neutral-400"
                      }`}
                    >
                      {course.duration} · {course.hours}
                    </p>

                    <h3 className="mt-3 text-xl font-black tracking-[-0.04em]">
                      {course.title}
                    </h3>

                    <p
                      className={`mt-3 text-xs leading-6 ${
                        active ? "text-white/80" : "text-neutral-500"
                      }`}
                    >
                      {course.description}
                    </p>
                  </div>

                  <span
                    className={`absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs transition-all duration-300 ${
                      active
                        ? "border-white/40 bg-white text-red-600 shadow-lg"
                        : "border-neutral-200 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white"
                    }`}
                  >
                    ↗
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          BATCH FORMATS
      ======================================================== */}

      <section
        data-formats
        className="bg-gradient-to-b from-neutral-50 via-white to-neutral-50"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div data-reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                  <span className="text-sm font-bold">✦</span>
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                  Batch formats
                </span>
              </div>

              <h2 className="mt-5 text-4xl font-black leading-[0.92] tracking-[-0.06em] sm:text-5xl">
                A format that
                <br />
                fits your
                <br />
                <span className="bg-gradient-to-r from-neutral-400 to-neutral-300 bg-clip-text text-transparent">
                  real life.
                </span>
              </h2>
            </div>

            <div className="grid border-t-2 border-neutral-200 sm:grid-cols-2">
              {formats.map((format, index) => (
                <article
                  key={format.title}
                  data-format-card
                  className="group relative border-b-2 border-neutral-200 p-6 transition-all duration-500 hover:bg-gradient-to-br hover:from-red-50/40 hover:to-transparent first:pl-0 sm:even:border-l-2 sm:even:pl-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-neutral-200 bg-white text-sm text-red-600 shadow-md transition-all duration-500 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-red-500/30">
                      {format.icon}
                    </span>

                    <span className="text-[9px] font-bold tracking-[0.2em] text-neutral-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-10 text-2xl font-black tracking-[-0.05em] text-neutral-900 transition-colors duration-300 group-hover:text-red-600">
                    {format.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-500">
                    {format.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-700 ease-out group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURES
      ======================================================== */}

      <section
        data-features
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div data-reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
              Inside every program
            </span>

            <h2 className="mt-5 max-w-md text-4xl font-black leading-[0.92] tracking-[-0.06em] sm:text-5xl">
              Practice for the exam.
              <br />
              <span className="bg-gradient-to-r from-neutral-400 to-neutral-300 bg-clip-text text-transparent">
                Prepare for the person you become.
              </span>
            </h2>
          </div>

          <div>
            <div className="divide-y-2 divide-neutral-200 border-y-2 border-neutral-200">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  data-feature
                  className="group flex items-center gap-5 py-6"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-500 font-mono text-[9px] font-black tracking-[0.2em] text-white shadow-lg shadow-red-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-red-500/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-red-600 transition-transform duration-300 group-hover:scale-150 group-hover:bg-red-500" />

                  <p className="text-sm font-semibold text-neutral-700 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-red-600">
                    {feature.title}
                  </p>

                  <span className="ml-auto text-sm text-neutral-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-red-600">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          JLPT
      ======================================================== */}

      <section
        data-jlpt
        className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-red-600 text-white"
      >
        {/* Circle */}

        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[70px] border-white" />
        </div>

        {/* Atmosphere */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-white/10 blur-[100px]" />

          <div className="absolute -bottom-40 left-[-10%] h-[350px] w-[350px] rounded-full bg-black/10 blur-[80px]" />
        </div>

        <div
          data-parallax
          className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
        >
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-reveal>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white/80" />

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                  JLPT preparation
                </span>
              </div>

              <h2 className="mt-5 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.075em] drop-shadow-2xl">
                Think like
                <br />
                the exam.
              </h2>
            </div>

            <div data-reveal>
              <p className="text-lg leading-7 text-white/80 sm:text-xl">
                Know what the exam is asking. Learn how to manage time,
                recognize patterns, and turn a practice score into a next step.
              </p>

              <Link
                to="/contact"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-red-600 shadow-2xl shadow-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-600/50"
              >
                Ask about preparation
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PATHWAY
      ======================================================== */}

      <section
        data-pathway
        className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      >
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div data-reveal>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                The pathway
              </span>
            </div>

            <h2 className="mt-5 text-4xl font-black leading-[0.92] tracking-[-0.06em] sm:text-5xl">
              One clear direction.
              <br />
              <span className="bg-gradient-to-r from-neutral-400 to-neutral-300 bg-clip-text text-transparent">
                Many meaningful milestones.
              </span>
            </h2>
          </div>
        </div>

        {/* Desktop */}

        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-neutral-200">
            <div
              ref={pathwayLineRef}
              className="h-full origin-left bg-gradient-to-r from-red-600 to-red-500"
            />
          </div>

          <div className="grid grid-cols-6 gap-4">
            {pathway.map((item) => (
              <div
                key={item.number}
                data-pathway-item
                className="group relative pt-10"
              >
                <span
                  data-pathway-dot
                  className="absolute left-0 top-0 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full border-[3px] border-red-600 bg-white shadow-lg shadow-red-500/30 transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl group-hover:shadow-red-500/40"
                >
                  <span className="h-2 w-2 rounded-full bg-red-600 transition-transform duration-300 group-hover:scale-125" />
                </span>

                <span className="text-[9px] font-black tracking-[0.2em] text-red-600">
                  {item.number}
                </span>

                <h3 className="mt-3 max-w-[150px] text-sm font-black leading-5 tracking-[-0.02em] text-neutral-900 transition-colors duration-300 group-hover:text-red-600">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}

        <div className="relative lg:hidden">
          <div className="absolute bottom-5 left-[6px] top-5 w-px bg-neutral-200">
            <div className="h-full w-full bg-gradient-to-b from-red-600 to-red-500" />
          </div>

          <div className="space-y-7">
            {pathway.map((item) => (
              <div
                key={item.number}
                data-pathway-item
                className="group relative flex gap-6 pl-1"
              >
                <span
                  data-pathway-dot
                  className="relative z-10 mt-1 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border-[3px] border-red-600 bg-white shadow-md transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-red-500/30"
                />

                <div>
                  <span className="text-[9px] font-black tracking-[0.2em] text-red-600">
                    {item.number}
                  </span>

                  <h3 className="mt-2 text-xl font-black tracking-[-0.04em] text-neutral-900 transition-colors duration-300 group-hover:text-red-600">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA
      ======================================================== */}
      <section data-final-cta className="px-3 pb-3 sm:px-6 sm:pb-6 lg:px-8">
        <div className="group relative mx-auto max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-neutral-950 via-[#0a0a0a] to-neutral-950 px-5 py-12 text-white shadow-2xl shadow-black/40 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-16">
          {/* Decorative rings */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-red-500/10 transition-transform duration-1000 group-hover:scale-110" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full border border-red-500/10 transition-transform duration-1000 group-hover:scale-110" />

          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-red-600/[0.08] blur-[150px]" />

            <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-red-500/[0.06] blur-[130px]" />

            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.025] blur-[180px]" />
          </div>

          {/* Main content */}
          <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
            {/* =====================================================
          LEFT CONTENT
      ====================================================== */}
            <div data-cta-content className="max-w-2xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3.5 py-2 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-red-300 sm:text-[10px]">
                  From N5 to N4 — and beyond
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-7 max-w-3xl text-[clamp(2.6rem,5vw,5.3rem)] font-black leading-[0.88] tracking-[-0.055em]">
                Learn Japanese
                <br />
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
                  the right way.
                </span>
                <br />
                <span className="text-white">Built for real results.</span>
              </h2>

              {/* Description */}
              <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-[15px] sm:leading-7">
                Our N5 and N4 courses are designed by JLPT-certified instructors
                who know exactly what the exam tests — and how to teach it so it
                sticks. Clear structure, focused practice, and a team that
                actually cares about your progress.
              </p>

              {/* Stats */}
              <div className="mt-9 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm">
                {/* Stat */}
                <div className="border-r border-white/10 px-3 py-4 sm:px-5">
                  <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[9px]">
                    Students
                  </div>

                  <div className="mt-1.5 text-xl font-black tracking-tight text-white sm:text-2xl">
                    2,500+
                  </div>
                </div>

                {/* Stat */}
                <div className="border-r border-white/10 px-3 py-4 sm:px-5">
                  <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[9px]">
                    Pass rate
                  </div>

                  <div className="mt-1.5 text-xl font-black tracking-tight text-white sm:text-2xl">
                    92%
                  </div>
                </div>

                {/* Stat */}
                <div className="px-3 py-4 sm:px-5">
                  <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 sm:text-[9px]">
                    Instructors
                  </div>

                  <div className="mt-1.5 text-xl font-black tracking-tight text-white sm:text-2xl">
                    15+
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
          RIGHT VISUAL AREA
      ====================================================== */}
            <div data-cta-content className="relative">
              {/* Image composition */}
              <div className="grid grid-cols-[1.35fr_0.65fr] gap-3 sm:gap-4">
                {/* ================================================
              LARGE FEATURE IMAGE
          ================================================= */}
                <figure className="group/img relative min-h-[420px] overflow-hidden rounded-[1.75rem] bg-neutral-900 ring-1 ring-white/10 sm:min-h-[500px] lg:min-h-[540px]">
                  <img
                    src="/changes/download (6).jpg.jpeg"
                    alt="N5 and N4 Japanese classes in session"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover/img:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90" />

                  {/* Top badge */}
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-[9px]">
                    Core course
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                    <div className="mb-2 h-px w-8 bg-red-500" />

                    <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
                      N5 & N4 Classes
                    </h3>

                    <p className="mt-1.5 max-w-xs text-[10px] leading-5 text-white/70 sm:text-[11px]">
                      JLPT-focused lessons designed around the skills you
                      actually need for the exam.
                    </p>
                  </div>
                </figure>

                {/* ================================================
              SMALL IMAGE COLUMN
          ================================================= */}
                <div className="grid grid-rows-2 gap-3 sm:gap-4">
                  {/* Image 2 */}
                  <figure className="group/img relative min-h-0 overflow-hidden rounded-[1.5rem] bg-neutral-900 ring-1 ring-white/10">
                    <img
                      src="/changes/download (7).jpg.jpeg"
                      alt="Certified Japanese teachers teaching students"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute left-3 top-3 rounded-full border border-red-500/20 bg-red-500/10 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.18em] text-red-300 backdrop-blur-md">
                      Expert-led
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.12em] text-white">
                        Certified Teachers
                      </h3>

                      <p className="mt-1 text-[9px] leading-4 text-white/65">
                        Learn directly from experienced instructors.
                      </p>
                    </div>
                  </figure>

                  {/* Image 3 */}
                  <figure className="group/img relative min-h-0 overflow-hidden rounded-[1.5rem] bg-neutral-900 ring-1 ring-white/10">
                    <img
                      src="/changes/download (8).jpg (1).jpeg"
                      alt="Students celebrating JLPT success and progress"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute left-3 top-3 rounded-full border border-red-500/20 bg-red-500/10 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.18em] text-red-300 backdrop-blur-md">
                      Proven results
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-[11px] font-black uppercase tracking-[0.12em] text-white">
                        Real Results
                      </h3>

                      <p className="mt-1 text-[9px] leading-4 text-white/65">
                        Build confidence and move forward.
                      </p>
                    </div>
                  </figure>
                </div>
              </div>

              {/* =================================================
            CTA
        ================================================== */}
              <Link
                to="/contact"
                className="group/cta relative mt-5 flex w-full items-center justify-between overflow-hidden rounded-full border border-red-400/20 bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-600/40 sm:px-7 sm:py-5"
              >
                {/* Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />

                <span className="relative">Start your N5 / N4 journey</span>

                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-red-600 transition-transform duration-300 group-hover/cta:rotate-45">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}