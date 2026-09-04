import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
 
  Coffee,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  MapPin,
  Plane,
  Sparkles,
  TrainFront,
  Waves,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

type JourneyStep = {
  number: string;
  title: string;
  description: string;
};

type LivingItem = {
  japanese: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

type CareerItem = {
  title: string;
  icon: React.ElementType;
};

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "Yokohama · Kanagawa",
    title: ["A city where", "Japanese becomes real."],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "Study · Live · Grow",
    title: ["Your next chapter", "starts in Japan."],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "Language · Culture · Future",
    title: ["Learn the language.", "Live the context."],
  },
];

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Counselling",
    description:
      "We understand your goals, current level, budget, and the kind of life you want in Japan.",
  },
  {
    number: "02",
    title: "Language training",
    description:
      "Build from the first kana to N3 with a structured plan, practice, and steady accountability.",
  },
  {
    number: "03",
    title: "Document preparation",
    description:
      "Get clear guidance for academic records, financial papers, translations, and the application file.",
  },
  {
    number: "04",
    title: "Application",
    description:
      "Your documents move to the partner school with a timeline you can understand.",
  },
  {
    number: "05",
    title: "COE",
    description:
      "We stay close through the Certificate of Eligibility stage and answer every question.",
  },
  {
    number: "06",
    title: "Visa",
    description:
      "Prepare for your visa appointment with calm, practical support.",
  },
  {
    number: "07",
    title: "Departure",
    description:
      "Know what to pack, what to expect, and how to arrive prepared.",
  },
  {
    number: "08",
    title: "Arrival support",
    description:
      "A new country feels lighter when someone who lives there is still in your corner.",
  },
];

const livingItems: LivingItem[] = [
  {
    japanese: "暮らす",
    title: "Accommodation",
    description: "Understand your options before the suitcase is packed.",
    icon: Home,
  },
  {
    japanese: "生活",
    title: "Cost of living",
    description: "Plan for the everyday with a realistic, grounded picture.",
    icon: Coffee,
  },
  {
    japanese: "移動",
    title: "Transport",
    description: "Learn the rhythms of trains, routes, and getting around.",
    icon: TrainFront,
  },
  {
    japanese: "文化",
    title: "Culture tips",
    description: "Small gestures make a new place feel more welcoming.",
    icon: HeartHandshake,
  },
];

const careerItems: CareerItem[] = [
  {
    title: "Business and office roles",
    icon: BriefcaseBusiness,
  },
  {
    title: "Care and service roles",
    icon: HeartHandshake,
  },
  {
    title: "Hospitality and tourism",
    icon: Waves,
  },
  {
    title: "Further study pathways",
    icon: GraduationCap,
  },
];

const imageCards = [
  {
    image: "/assets/WhatsApp Image 2026-08-31 at 00.23.40.jpeg",
    label: "01 / The campus",
    title: "A place to focus.",
    className: "lg:mt-20",
  },
  {
    image: "/assets/WhatsApp Image 2026-08-31 at 00.23.39.jpeg",
    label: "02 / The neighbourhood",
    title: "A city to explore.",
    className: "lg:-mt-4",
  },
  {
    image: "/assets/WhatsApp Image 2026-08-31 at 00.23.39 (1).jpeg",
    label: "03 / Your new life",
    title: "A future to build.",
    className: "lg:mt-32",
  },
 
];

export default function StudyInJapanPage() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set("[data-animate]", {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });

        return;
      }

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from("[data-hero-image]", {
          scale: 1.12,
          duration: 1.8,
        })
        .from(
          "[data-hero-overlay]",
          {
            opacity: 0,
            duration: 1,
          },
          "-=1.3",
        )
        .from(
          "[data-hero-eyebrow]",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.8",
        )
        .from(
          "[data-hero-title-line]",
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.4",
        )
        .from(
          "[data-hero-bottom]",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4",
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 70,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-left]")
        .forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            x: -70,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          });
        });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-right]")
        .forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            x: 70,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          });
        });

      gsap.utils
        .toArray<HTMLElement>("[data-image-reveal]")
        .forEach((element) => {
          gsap.from(element, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          });
        });

      gsap.utils.toArray<HTMLElement>("[data-number]").forEach((element) => {
        gsap.from(element, {
          scale: 0.4,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      const marquee = root.querySelector<HTMLElement>("[data-marquee]");

      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.to("[data-floating]", {
        y: -14,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-gradient-to-b from-[#f8f7f4] via-white to-[#f8f7f4] text-[#111] selection:bg-[#d71920] selection:text-white"
    >
      <HeroSection />
      <IntroSection />
      <VisualStory />
      <PartnerPathway />
      <RouteSection />
      <LivingSection />
      <CareerSection />
      <SupportSection />
      <FinalCTA />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[620px] bg-black text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1400}
        loop
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".japan-hero-pagination",
        }}
        className="absolute inset-0 h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full overflow-hidden">
              <img
                data-hero-image
                src={slide.image}
                alt={slide.title.join(" ")}
                className="h-full w-full object-cover transition-transform duration-700"
              />

              <div
                data-hero-overlay
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Decorative gradient orb */}
              <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#d71920]/20 blur-[150px]" />

              <div className="absolute inset-0 mx-auto flex w-full max-w-[1500px] items-center px-6 pt-20 sm:px-10 lg:px-16">
                <div className="max-w-5xl">
                  <div
                    data-hero-eyebrow
                    className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-white/80"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#e21b23] opacity-40" />
                      <span className="relative h-3 w-3 rounded-full bg-[#e21b23]" />
                    </span>
                    {slide.eyebrow}
                  </div>

                  <h1 className="overflow-hidden text-[clamp(3.3rem,9vw,9rem)] font-black leading-[0.87] tracking-[-0.065em] drop-shadow-2xl">
                    {slide.title.map((line) => (
                      <span
                        key={line}
                        data-hero-title-line
                        className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent"
                      >
                        {line}
                      </span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[1500px] items-end justify-between px-6 pb-8 sm:px-10 lg:px-16">
        <div
          data-hero-bottom
          className="flex items-center gap-5 backdrop-blur-sm"
        >
          <span className="group flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 transition-all duration-300 hover:border-[#e21b23] hover:bg-[#e21b23] hover:shadow-xl hover:shadow-[#e21b23]/30">
            <ArrowDownRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </span>

          <span className="hidden text-xs font-bold uppercase tracking-[0.22em] text-white/70 sm:block">
            Scroll to explore
          </span>
        </div>

        <div className="pointer-events-auto japan-hero-pagination flex gap-2" />
      </div>

      <div className="absolute right-6 top-7 z-30 hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70 sm:flex">
        <span>日本で学ぶ</span>
        <span className="h-px w-8 bg-white/30" />
        <span>01 — 03</span>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* INTRO */
/* -------------------------------------------------------------------------- */

function IntroSection() {
  return (
    
<section className="relative isolate overflow-hidden bg-[#f7f7f5] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40 xl:px-20">
  {/* =========================================================
      BACKGROUND
  ========================================================= */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {/* Ambient red lights */}
    <div className="absolute -right-40 top-0 h-[550px] w-[550px] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#d71920]/[0.045] blur-[140px]" />

    <div className="absolute -bottom-60 -left-40 h-[600px] w-[600px] animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-[#d71920]/[0.025] blur-[150px]" />

    {/* Japanese characters */}
    <span className="absolute right-[4%] top-[5%] select-none text-[16rem] font-black leading-none text-black/[0.018] transition-transform duration-1000 hover:scale-110 sm:text-[22rem]">
      日
    </span>

    <span className="absolute bottom-[12%] left-[2%] select-none text-[10rem] font-black leading-none text-[#d71920]/[0.025]">
      本
    </span>

    {/* Editorial grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
  </div>

  {/* =========================================================
      MAIN
  ========================================================= */}
  <div className="relative mx-auto max-w-[1600px]">

    {/* =======================================================
        HEADER
    ======================================================= */}
    <div className="mb-16 flex animate-[fadeIn_0.8s_ease-out_both] flex-col justify-between gap-6 border-b border-black/10 pb-6 sm:flex-row sm:items-center lg:mb-24">

      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d71920]/40" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d71920]" />
        </span>

        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60 sm:text-xs">
          Study in Japan
        </span>

        <span className="text-xs text-black/20">/</span>

        <span className="text-sm font-medium text-black/40">
          で学ぶ
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden h-px w-10 bg-black/10 sm:block" />

        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/35">
          Yokohama · Kanagawa · Japan
        </span>
      </div>
    </div>

    {/* =======================================================
        HERO GRID
    ======================================================= */}
    <div className="grid items-end gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">

      {/* =====================================================
          LEFT CONTENT
      ===================================================== */}
      <div className="relative">

        {/* Floating Japanese character */}
        <div
          aria-hidden="true"
          className="absolute -left-3 -top-14 hidden animate-[float_6s_ease-in-out_infinite] select-none text-7xl font-light leading-none text-[#d71920]/15 lg:block"
        >
          日
        </div>

        {/* Eyebrow */}
        <div className="mb-8 flex animate-[slideUp_0.8s_0.15s_ease-out_both] items-center gap-3">
          <span className="h-px w-10 origin-left animate-[scaleX_0.8s_0.5s_ease-out_both] bg-[#d71920]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d71920]">
            Your next chapter
          </span>
        </div>

        {/* Heading */}
        <h2 className="max-w-5xl animate-[slideUp_0.9s_0.2s_ease-out_both] text-[clamp(3.7rem,8vw,8.7rem)] font-black leading-[0.83] tracking-[-0.075em] text-[#111]">
          The next
          <br />

          <span className="relative inline-block">
            step

            <span className="absolute -bottom-2 left-0 h-[3px] w-12 origin-left animate-[scaleX_1s_0.9s_ease-out_both] bg-[#d71920] sm:-bottom-3 sm:w-20" />
          </span>

          <br />

          <span className="relative inline-block bg-gradient-to-r from-[#d71920] via-[#d71920] to-[#9d1016] bg-clip-text text-transparent">
            has a place.
          </span>
        </h2>

        {/* Main description */}
        <p className="mt-10 max-w-xl animate-[slideUp_0.8s_0.35s_ease-out_both] text-base font-medium leading-7 tracking-[-0.01em] text-black/55 sm:text-lg sm:leading-8 lg:mt-14">
          Yokohama language school gives your Japanese a new context:
          a classroom, a neighbourhood, and a city where you can begin
          making the language yours.
        </p>

        {/* ===================================================
            EXPERIENCE TAGS
        =================================================== */}
        <div className="mt-8 flex max-w-xl flex-wrap gap-2.5 sm:mt-10 sm:gap-3">
          {[
            "Language",
            "City",
            "Culture",
            "Future",
          ].map((item, index) => (
            <span
              key={item}
              className="animate-[fadeIn_0.6s_ease-out_both] rounded-full border border-black/10 bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-black/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d71920]/30 hover:bg-[#d71920] hover:text-white hover:shadow-lg hover:shadow-[#d71920]/15 sm:px-5 sm:text-[10px]"
              style={{
                animationDelay: `${0.55 + index * 0.08}s`,
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* ===================================================
            QUICK FACTS
        =================================================== */}
        <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-black/10 py-6 sm:mt-16 sm:py-7">

          <div className="pr-4">
            <p className="text-xl font-black tracking-tight text-black sm:text-2xl">
              01
            </p>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Language
            </p>
          </div>

          <div className="border-l border-black/10 px-4">
            <p className="text-xl font-black tracking-tight text-black sm:text-2xl">
              02
            </p>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Lifestyle
            </p>
          </div>

          <div className="border-l border-black/10 pl-4">
            <p className="text-xl font-black tracking-tight text-black sm:text-2xl">
              03
            </p>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Future
            </p>
          </div>
        </div>

        {/* ===================================================
            DESTINATION META
        =================================================== */}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black/35">
          <span>Yokohama</span>
          <span className="h-1 w-1 rounded-full bg-[#d71920]" />
          <span>Kanagawa</span>
          <span className="h-1 w-1 rounded-full bg-[#d71920]" />
          <span>Japan</span>
        </div>
      </div>

      {/* =====================================================
          RIGHT IMAGE EXPERIENCE
      ===================================================== */}
      <div className="relative">

        <div className="relative ml-auto max-w-[760px]">

          {/* Red architectural block */}
          <div
            aria-hidden="true"
            className="absolute -right-3 -top-3 z-0 h-28 w-28 animate-[fadeIn_0.8s_0.4s_ease-out_both] bg-[#d71920] transition-transform duration-700 hover:translate-x-2 hover:-translate-y-2 sm:-right-5 sm:-top-5 sm:h-36 sm:w-36"
          />

          {/* Small vertical number */}
          <div className="absolute -left-10 top-10 z-20 hidden text-[9px] font-bold tracking-[0.3em] text-black/30 xl:block [writing-mode:vertical-rl]">
            EXPERIENCE JAPAN
          </div>

          {/* Main image */}
          <div className="relative z-10 overflow-hidden bg-black p-2 shadow-[0_35px_100px_rgba(0,0,0,0.14)] animate-[imageReveal_1.2s_0.2s_ease-out_both] sm:p-3">

            <div className="group relative aspect-[4/5] overflow-hidden bg-[#e9e9e6] sm:aspect-[5/6] lg:aspect-[4/5]">

              <img
                src="/assets/WhatsApp Image 2026-08-31 at 00.25.02.jpeg"
                alt="Yokohama cityscape in Japan"
                width={2000}
                height={2500}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />

              {/* Gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 opacity-90 transition-opacity duration-700 group-hover:opacity-100" />

              {/* Image corner */}
              <div className="absolute left-5 top-5 h-10 w-10 border-l border-t border-white/50 transition-all duration-500 group-hover:h-14 group-hover:w-14 sm:left-7 sm:top-7" />

              <div className="absolute bottom-5 right-5 h-10 w-10 border-b border-r border-white/50 transition-all duration-500 group-hover:h-14 group-hover:w-14 sm:bottom-7 sm:right-7" />

              {/* Image content */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">

                <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">
                    Kanagawa
                  </p>

                  <p className="mt-1 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
                    Yokohama
                  </p>

                  <p className="mt-2 max-w-xs text-xs font-medium leading-5 text-white/60">
                    Where language becomes part of everyday life.
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[10px] font-bold text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-12 group-hover:bg-[#d71920] sm:h-14 sm:w-14">
                  JP
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FLOATING INFORMATION CARD
          ================================================= */}
          <div className="relative z-20 -mt-10 ml-5 w-[calc(100%-40px)] max-w-[390px] animate-[slideUp_0.8s_0.7s_ease-out_both] border border-black/10 bg-white p-5 shadow-[0_25px_60px_rgba(0,0,0,0.09)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_80px_rgba(0,0,0,0.12)] sm:-mt-14 sm:ml-10 sm:p-7">

            <div className="flex items-start justify-between gap-6">

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#d71920]">
                  Start here
                </p>

                <p className="mt-2 text-xl font-black tracking-[-0.04em] text-black sm:text-2xl">
                  Make Japanese yours.
                </p>
              </div>

              <span className="text-2xl font-light text-black/15">
                01
              </span>
            </div>

            <div className="mt-5 h-px bg-black/10" />

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">
                  Learn
                </p>

                <p className="mt-1 text-sm font-bold text-black">
                  Japanese
                </p>
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">
                  Experience
                </p>

                <p className="mt-1 text-sm font-bold text-black">
                  Yokohama
                </p>
              </div>
            </div>
          </div>

          {/* Vertical label */}
          <span className="absolute -right-12 top-1/2 hidden -translate-y-1/2 rotate-90 text-[9px] font-bold uppercase tracking-[0.4em] text-black/25 xl:block">
            Discover · Learn · Belong
          </span>
        </div>
      </div>
    </div>

    {/* =======================================================
        EXPERIENCE CARDS
    ======================================================= */}
    <div className="mt-24 border-t border-black/10 pt-10 sm:mt-32 lg:mt-40">

      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d71920]">
            Beyond the classroom
          </p>

          <h3 className="mt-3 max-w-2xl text-3xl font-black tracking-[-0.055em] text-black sm:text-4xl lg:text-5xl">
            Learn a language.
            <span className="text-black/30"> Live the context.</span>
          </h3>
        </div>

        <p className="max-w-sm text-sm leading-6 text-black/40">
          The city becomes part of your learning experience,
          giving every new word somewhere real to belong.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            number: "01",
            title: "Language",
            description:
              "Build practical Japanese through everyday conversations and real situations.",
          },
          {
            number: "02",
            title: "Neighbourhood",
            description:
              "Step outside the classroom and discover the rhythm of life around you.",
          },
          {
            number: "03",
            title: "Culture",
            description:
              "Experience traditions, food, people and perspectives beyond the textbook.",
          },
          {
            number: "04",
            title: "Future",
            description:
              "Turn your Japanese journey into a foundation for what comes next.",
          },
        ].map((item, index) => (
          <article
            key={item.number}
            className="group relative bg-[#f7f7f5] p-7 transition-all duration-500 hover:bg-white sm:p-8 lg:p-9"
            style={{
              animation: "slideUp 0.7s ease-out both",
              animationDelay: `${0.1 + index * 0.1}s`,
            }}
          >
            {/* Number */}
            <div className="flex items-start justify-between">
              <span className="text-xs font-black text-[#d71920]">
                {item.number}
              </span>

              <span className="text-xl font-light text-black/10 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#d71920]/30">
                ↗
              </span>
            </div>

            {/* Title */}
            <h4 className="mt-14 text-xl font-black tracking-[-0.04em] text-black transition-transform duration-500 group-hover:translate-x-1">
              {item.title}
            </h4>

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-black/45">
              {item.description}
            </p>

            {/* Bottom line */}
            <div className="mt-8 h-px w-8 origin-left bg-[#d71920] transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>
    </div>

    {/* =======================================================
        FINAL STATEMENT
    ======================================================= */}
    <div className="mt-20 flex flex-col justify-between gap-8 sm:mt-28 lg:flex-row lg:items-center">

      <div className="max-w-3xl">
        <p className="text-[clamp(1.8rem,3.5vw,3.8rem)] font-black leading-[1] tracking-[-0.055em] text-black">
          Your Japanese journey doesn't begin
          <span className="text-[#d71920]"> when you arrive.</span>
        </p>

        <p className="mt-5 max-w-xl text-sm leading-6 text-black/40 sm:text-base">
          It begins the moment you decide that Japan could become
          part of your story.
        </p>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="group inline-flex w-fit items-center gap-5 border-b-2 border-black pb-3 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors duration-300 hover:border-[#d71920] hover:text-[#d71920]"
      >
        Explore your next step

        <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </a>
    </div>
  </div>

  {/* =========================================================
      TAILWIND CUSTOM KEYFRAMES
      Add these to your global CSS / Tailwind layer.
  ========================================================= */}
  <style>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(35px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes imageReveal {
      from {
        opacity: 0;
        transform: scale(0.96);
        clip-path: inset(8% 8% 8% 8%);
      }
      to {
        opacity: 1;
        transform: scale(1);
        clip-path: inset(0 0 0 0);
      }
    }

    @keyframes float {
      0%,
      100% {
        transform: translateY(0) rotate(-4deg);
      }

      50% {
        transform: translateY(-14px) rotate(4deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
</section>


  );
}

/* -------------------------------------------------------------------------- */
/* VISUAL STORY */
/* -------------------------------------------------------------------------- */

function VisualStory() {
  return (
    <section className="border-y-2 border-black/10 bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#111] px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div
          data-reveal
          className="mb-16 flex flex-col justify-between gap-7 md:flex-row md:items-end"
        >
          <div>
            <span className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e21b23]">
              <span className="h-2 w-2 rounded-full bg-[#e21b23] animate-pulse" />
              Yokohama / 01
            </span>

            <h3 className="max-w-3xl text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.92] tracking-[-0.06em]">
              Three places.
              <span className="block bg-gradient-to-r from-white/60 via-white/40 to-white/30 bg-clip-text text-transparent">
                One new context.
              </span>
            </h3>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/60">
            Your experience isn&apos;t limited to the classroom. The city
            becomes part of the lesson.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {imageCards.map((card) => (
            <div
              key={card.title}
              data-reveal
              className={`group relative ${card.className}`}
            >
              <div
                data-image-reveal
                className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-black/30"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

                {/* Red accent line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#e21b23] to-[#d71920] transition-all duration-700 group-hover:w-full" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                      {card.label}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-[#e21b23] group-hover:bg-[#e21b23] group-hover:shadow-lg group-hover:shadow-[#e21b23]/30">
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </span>
                  </div>

                  <h4 className="text-2xl font-black tracking-tight text-white drop-shadow-lg">
                    {card.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          data-marquee
          className="mt-24 flex w-[200%] gap-10 whitespace-nowrap border-y-2 border-white/15 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white/25"
        >
          <span>
            YOKOHAMA · 日本 · LANGUAGE · CULTURE · FUTURE · YOKOHAMA · 日本 ·
            LANGUAGE · CULTURE · FUTURE ·
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PARTNER PATHWAY */
/* -------------------------------------------------------------------------- */

function PartnerPathway() {
  const cards = [
    {
      number: "01",
      title: "A focused environment",
      description:
        "A place where your study routine has room to become a habit.",
      icon: Languages,
    },
    {
      number: "02",
      title: "A city with momentum",
      description:
        "Yokohama gives you the pace, movement, and energy of modern Japan.",
      icon: MapPin,
    },
    {
      number: "03",
      title: "A bridge to work",
      description:
        "Language becomes more powerful when you can imagine where it takes you.",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#d71920]/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal-left>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d71920] to-[#c4161d] text-white shadow-lg shadow-[#d71920]/30">
                <span className="text-xl font-black">02</span>
              </span>
            </div>

            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.25em] text-[#d71920]">
              The partner pathway
            </span>

            <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.06em]">
              Yokohama,
              <span className="block bg-gradient-to-r from-black/40 via-black/30 to-black/20 bg-clip-text text-transparent">
                where the next chapter gets real.
              </span>
            </h2>
          </div>

          <div data-reveal-right>
            <p className="mb-12 max-w-3xl text-xl leading-8 text-black/70 sm:text-2xl">
              A language school is more than a destination. It is the place
              where your study routine, friendships, independence, and Japanese
              start to belong together.
            </p>

            <div className="divide-y-2 divide-black/10 border-y-2 border-black/10">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.number}
                    className="group grid gap-5 py-10 transition-all duration-500 hover:px-4 md:grid-cols-[70px_1fr_55px] md:items-center"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d71920] to-[#c4161d] font-mono text-sm font-black text-white shadow-lg shadow-[#d71920]/30">
                      {card.number}
                    </span>

                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-[#d71920]">
                        {card.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-black/60">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black/15 bg-white transition-all duration-500 group-hover:border-[#d71920] group-hover:bg-gradient-to-br group-hover:from-[#d71920] group-hover:to-[#c4161d] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#d71920]/30">
                      <Icon
                        size={20}
                        strokeWidth={1.7}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* ROUTE */
/* -------------------------------------------------------------------------- */

function RouteSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#d71920] via-[#c4161d] to-[#d71920] px-6 py-28 text-white sm:px-10 sm:py-36 lg:px-16 lg:py-44">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-0 text-[25rem] font-black leading-none text-white/[0.04]">
          08
        </div>
        <div className="absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-black/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div data-reveal className="mb-20 grid gap-10 lg:grid-cols-[1fr_0.6fr]">
          <div>
            <span className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <Plane size={15} />
              </div>
              Your route to Japan
            </span>

            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.84] tracking-[-0.07em] drop-shadow-2xl">
              Eight steps.
              <span className="block bg-gradient-to-r from-white/50 via-white/40 to-white/30 bg-clip-text text-transparent">
                No mystery.
              </span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-lg leading-8 text-white/80">
              We keep the process visible so you can focus on the work that
              matters — becoming ready for the life ahead.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-white/30 via-white/20 to-transparent md:block" />

          <div>
            {journeySteps.map((step) => (
              <div
                key={step.number}
                data-reveal
                className="group relative grid gap-7 border-t border-white/20 py-10 md:grid-cols-[40px_220px_1fr] md:items-start md:gap-10"
              >
                <span
                  data-number
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 bg-gradient-to-br from-[#d71920] to-[#c4161d] text-xs font-black shadow-lg shadow-black/20 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-[#d71920] group-hover:shadow-xl group-hover:shadow-white/30 group-hover:scale-110"
                >
                  {step.number}
                </span>

                <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {step.title}
                </h3>

                <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                  {step.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-white/60 to-transparent transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* LIVING */
/* -------------------------------------------------------------------------- */

function LivingSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#d71920]/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div data-reveal-left>
            <span className="mb-5 block text-5xl font-light text-[#d71920]/20">
              暮らす
            </span>

            <span className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#d71920]">
              <span className="h-2 w-2 rounded-full bg-[#d71920] animate-pulse" />
              Living in Japan
            </span>

            <h2 className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.88] tracking-[-0.065em]">
              The practical
              <span className="block bg-gradient-to-r from-black/30 via-black/20 to-black/15 bg-clip-text text-transparent">
                things matter.
              </span>
            </h2>
          </div>

          <div data-reveal-right>
            <p className="mb-12 max-w-3xl text-xl leading-8 text-black/70">
              A good move is made of small preparations. We help you think
              beyond admission and into the everyday.
            </p>

            <div className="grid gap-px overflow-hidden rounded-3xl border-2 border-black/10 bg-gradient-to-br from-black/10 to-black/5 shadow-xl shadow-black/5 sm:grid-cols-2">
              {livingItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group relative bg-gradient-to-br from-[#f8f7f4] to-white p-8 transition-all duration-500 hover:from-[#111] hover:to-[#0a0a0a] hover:text-white sm:p-10"
                  >
                    {/* Accent corner */}
                    <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                      <div className="absolute right-0 top-0 h-px w-0 bg-gradient-to-l from-[#d71920] to-transparent transition-all duration-700 group-hover:w-full" />
                      <div className="absolute right-0 top-0 h-0 w-px bg-gradient-to-b from-[#d71920] to-transparent transition-all duration-700 group-hover:h-full" />
                    </div>

                    <div className="mb-10 flex items-start justify-between">
                      <span className="text-3xl font-black text-[#d71920] transition-colors duration-300 group-hover:text-white">
                        {item.japanese}
                      </span>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black/15 bg-white shadow-md transition-all duration-500 group-hover:border-[#d71920] group-hover:bg-gradient-to-br group-hover:from-[#d71920] group-hover:to-[#c4161d] group-hover:text-white group-hover:shadow-xl group-hover:shadow-[#d71920]/30">
                        <Icon
                          size={19}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-black tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-xs text-sm leading-6 text-black/60 transition-colors duration-300 group-hover:text-white/70">
                      {item.description}
                    </p>

                    <ArrowUpRight
                      size={19}
                      className="absolute bottom-8 right-8 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#d71920] to-[#c4161d] transition-all duration-700 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CAREER */
/* -------------------------------------------------------------------------- */

function CareerSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#111] px-6 py-28 text-white sm:px-10 sm:py-36 lg:px-16 lg:py-44">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#d71920]/[0.05] blur-[120px]" />
        <div className="absolute -bottom-40 left-[-10%] h-[450px] w-[450px] rounded-full bg-white/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid gap-16 lg:grid-cols-2">
          <div data-reveal-left>
            <span className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e21b23]">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#e21b23] to-[#d71920]">
                <Sparkles size={16} />
              </div>
              Beyond the classroom
            </span>

            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-black leading-[0.88] tracking-[-0.065em]">
              Prepare for
              <span className="block bg-gradient-to-r from-white/30 via-white/20 to-white/15 bg-clip-text text-transparent">
                the work that follows.
              </span>
            </h2>

            <p className="mt-10 max-w-xl text-lg leading-8 text-white/65">
              After N2 or N1, Japanese can become the language of your
              professional life. We help you prepare for that conversation.
            </p>
          </div>

          <div data-reveal-right className="lg:pt-20">
            <div className="divide-y-2 divide-white/15 border-y-2 border-white/15">
              {careerItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex items-center gap-5 py-8"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e21b23] to-[#d71920] font-mono text-xs font-black text-white shadow-lg shadow-[#e21b23]/30">
                      {index + 1}
                    </span>

                    <div className="flex flex-1 items-center gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white/15 bg-white/5 transition-all duration-500 group-hover:border-[#e21b23] group-hover:bg-gradient-to-br group-hover:from-[#e21b23] group-hover:to-[#d71920]">
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className="text-white/50 transition-all duration-300 group-hover:text-white group-hover:scale-110"
                        />
                      </div>

                      <h3 className="text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#e21b23] sm:text-2xl">
                        {item.title}
                      </h3>
                    </div>

                    <ArrowRight
                      size={21}
                      className="text-white/30 transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#e21b23]"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SUPPORT */
/* -------------------------------------------------------------------------- */

function SupportSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-[#d71920]/[0.03] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal-left>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d71920] to-[#c4161d] text-white shadow-xl shadow-[#d71920]/30">
                <Sparkles size={20} />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
                Our support
              </span>
            </div>

            <h2 className="max-w-4xl text-[clamp(3rem,6.5vw,7rem)] font-black leading-[0.88] tracking-[-0.07em]">
              A Japanese interview needs more than
              <span className="bg-gradient-to-r from-[#d71920] via-[#d71920] to-[#c4161d] bg-clip-text text-transparent">
                {" "}
                memorised answers.
              </span>
            </h2>
          </div>

          <div data-reveal-right>
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#e9e7e1] to-[#f5f3ef] p-8 shadow-2xl shadow-black/10 transition-all duration-500 hover:shadow-[#d71920]/20 sm:p-12">
              {/* Decorative Japanese character */}
              <div className="absolute -right-10 -top-14 text-[12rem] font-black leading-none text-black/[0.04] transition-transform duration-700 group-hover:scale-110">
                話
              </div>

              {/* Accent corner */}
              <div className="absolute left-0 top-0 h-24 w-24 overflow-hidden">
                <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-[#d71920] to-transparent transition-all duration-700 group-hover:w-full" />
                <div className="absolute left-0 top-0 h-0 w-px bg-gradient-to-b from-[#d71920] to-transparent transition-all duration-700 group-hover:h-full" />
              </div>

              <div className="relative z-10">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#111] to-[#0a0a0a] text-white shadow-xl shadow-black/20">
                  <Languages size={24} />
                </div>

                <p className="text-2xl font-medium leading-[1.25] tracking-tight text-neutral-900 sm:text-3xl">
                  Practice your story, refine your keigo, understand the room,
                  and walk in carrying the confidence of preparation.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Practical preparation",
                    "Interview confidence",
                    "Professional Japanese",
                  ].map((item) => (
                    <div
                      key={item}
                      className="group flex items-center gap-3 text-sm font-bold text-neutral-700"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#d71920] to-[#c4161d] text-white shadow-md shadow-[#d71920]/30">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="transition-colors duration-300 group-hover:text-[#d71920]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* CTA */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#d71920] via-[#c4161d] to-[#d71920] px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-20 -left-10 text-[22rem] font-black leading-none text-white/[0.04]">
          日
        </div>
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-black/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div data-reveal className="max-w-5xl">
          <span className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-white/80 animate-pulse" />
            Your Japan starts with a decision.
          </span>

          <h2 className="text-[clamp(3.5rem,8vw,9rem)] font-black leading-[0.82] tracking-[-0.075em] drop-shadow-2xl">
            Make the next
            <span className="block bg-gradient-to-r from-white/50 via-white/40 to-white/30 bg-clip-text text-transparent">
              step count.
            </span>
          </h2>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="group relative flex items-center justify-between gap-10 overflow-hidden rounded-full bg-gradient-to-r from-white to-white/90 px-7 py-4 text-sm font-black text-[#111] shadow-2xl shadow-white/30 transition-all duration-300 hover:px-9 hover:shadow-white/40 hover:scale-105"
            >
              <span className="relative z-10">Start your journey</span>
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#d71920] to-[#c4161d] text-white shadow-lg shadow-[#d71920]/30 transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight size={17} />
              </span>
              {/* Shimmer effect */}
              <span className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-full" />
            </Link>

            <Link
              to="/japan-study"
              className="group flex items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-white/10 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.15em] backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#d71920] hover:shadow-2xl hover:shadow-white/30"
            >
              Explore programs
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="mt-28 flex flex-col justify-between gap-8 border-t-2 border-white/25 pt-7 text-xs font-bold uppercase tracking-[0.2em] text-white/50 sm:flex-row">
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white/60" />
            Study in Japan · で学ぶ
          </span>
          <span>Yokohama · Kanagawa</span>
          <span>Language / Life / Future</span>
        </div>
      </div>
    </section>
  );
}
