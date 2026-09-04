"use client";

import { useEffect, useRef } from "react";
// import emailjs from "@emailjs/browser";
import FormComponent from "./FormComponent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CONTACT CONFIG
========================================================= */

const CONTACT = {
  email: "connect@rspinjapan.com",
  phone: "+91 00000 00000",
  whatsapp: "+91 00000 00000",
  location: "Meerut, Uttar Pradesh, India",
  mapQuery: "Meerut, Uttar Pradesh, India",
  responseTime: "Within 24 hours",
};

/* =========================================================
   TYPES
========================================================= */



/* =========================================================
   ICONS
========================================================= */

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  // const formRef = useRef<HTMLFormElement>(null);

 
  /* =======================================================
     GSAP
  ======================================================= */

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      /* Hero */

      const hero = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      hero
        .from(".contact-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          ".contact-title",
          {
            opacity: 0,
            y: 80,
            duration: 1,
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          ".contact-copy",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".contact-hero-card",
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
            duration: 0.8,
          },
          "-=0.5",
        );

      /* Grid animation */

      gsap.to(".contact-grid", {
        backgroundPosition: "80px 80px",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* Scroll reveals */

      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      /* Cards */

      gsap.utils
        .toArray<HTMLElement>(".contact-card")
        .forEach((element, index) => {
          gsap.from(element, {
            opacity: 0,
            y: 35,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });

      /* Map */

      gsap.from(".contact-map", {
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-map",
          start: "top 85%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-white text-slate-950">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative min-h-[720px] overflow-hidden bg-[#090909] text-white sm:min-h-[760px]">
        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />

        {/* Grid */}

        <div
          className="contact-grid absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Glow */}

        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 sm:min-h-[760px] sm:px-8 lg:px-12">
          <div className="grid w-full gap-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            {/* Left */}

            <div>
              <div className="contact-eyebrow mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-400 sm:text-[11px]">
                <span className="h-px w-10 bg-red-500" />
                Contact RSP in Japan
              </div>

              <div className="overflow-hidden">
                <h1 className="contact-title text-[clamp(3.5rem,9vw,8rem)] font-black leading-[0.86] tracking-[-0.07em]">
                  Let&apos;s talk
                </h1>
              </div>
                
              <div>
                <h1 className="contact-title text-[clamp(3.5rem,9vw,9rem)] font-black leading-[0.86] tracking-[-0.07em] text-red-500 ">
                  Japan.
                </h1>
              </div>

              <p className="contact-copy mt-9 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                Thinking about learning Japanese, studying in Japan, or building
                your future there?
                <br className="hidden sm:block" />
                Tell us where you want to go.
              </p>
            </div>

            {/* Right card */}

            <div className="contact-hero-card border border-white/15 bg-white/[0.07] p-6 backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  RSP / CONTACT
                </span>

                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Available
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Start with a conversation.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">
                No complicated process. Share your goals and we&apos;ll help you
                understand your next step.
              </p>

              <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-red-400">
                    <ClockIcon />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      Response
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {CONTACT.responseTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-red-400">
                    <MapPinIcon />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                      Based in
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {CONTACT.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom label */}

        <div className="absolute bottom-7 left-5 right-5 flex items-center justify-between border-t border-white/10 pt-4 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30 sm:left-8 sm:right-8 sm:text-[9px] lg:left-12 lg:right-12">
          <span>RSP in Japan</span>
          <span>学ぶ · 進む · 日本へ</span>
        </div>
      </section>

      {/* ===================================================
          CONTACT DETAILS
      =================================================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {/* Email */}

          <a
            href={`mailto:${CONTACT.email}`}
            className="contact-card group border-b border-slate-200 p-7 transition-colors hover:bg-slate-50 md:border-b-0 md:border-r lg:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="text-red-600">
                <MailIcon />
              </div>

              <ArrowUpRightIcon />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Email
            </p>

            <p className="mt-3 break-all text-base font-bold sm:text-lg">
              {CONTACT.email}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Send us your questions anytime.
            </p>
          </a>

          {/* Phone */}

          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="contact-card group border-b border-slate-200 p-7 transition-colors hover:bg-slate-50 md:border-b-0 md:border-r lg:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="text-red-600">
                <PhoneIcon />
              </div>

              <ArrowUpRightIcon />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Phone
            </p>

            <p className="mt-3 text-base font-bold sm:text-lg">
              {CONTACT.phone}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Talk directly with our guidance team.
            </p>
          </a>

          {/* Location */}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              CONTACT.mapQuery,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card group p-7 transition-colors hover:bg-slate-50 lg:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="text-red-600">
                <MapPinIcon />
              </div>

              <ArrowUpRightIcon />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Visit
            </p>

            <p className="mt-3 text-base font-bold sm:text-lg">
              {CONTACT.location}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Open our location in Google Maps.
            </p>
          </a>
        </div>
      </section>

      {/* ===================================================
          FORM
      =================================================== */}

      <section
        id="contact-form"
        className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            {/* Intro */}

            <div className="contact-reveal lg:sticky lg:top-24 lg:h-fit">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                <span className="h-px w-8 bg-red-600" />
                Send an enquiry
              </div>

              <h2 className="max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Your next chapter can start with a message.
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                Whether you&apos;re starting from N5 or preparing for N2/N1,
                tell us what you&apos;re working toward. We&apos;ll help you
                understand the most realistic next step.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Japanese language guidance",
                  "JLPT preparation",
                  "Study in Japan pathway",
                  "Career & interview guidance",
                  "Japan life & cultural preparation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-slate-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <CheckIcon />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}

            <div className="contact-reveal">
              <div className="border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
                <div className="mb-9">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    RSP / Enquiry form
                  </p>

                  <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                    Tell us what you&apos;re planning.
                  </h3>
                </div>

                {/* //form */}
                <div className="w-full min-h-[500px] sm:min-h-[520px]">
                  <FormComponent />
                </div>

                <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
                  We respect your privacy and only use your information to
                  respond to your enquiry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          JAPAN PATHWAY
      =================================================== */}

      <section className="bg-[#090909] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="contact-reveal max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              <span className="h-px w-8 bg-red-500" />
              The RSP route
            </div>

            <h2 className="text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-6xl">
              One conversation.
              <br />
              <span className="text-white/25">A clearer path to Japan.</span>
            </h2>
          </div>

          <div className="mt-16 grid border-l border-white/10 sm:grid-cols-2 lg:grid-cols-6">
            {[
              ["01", "Learn", "Start Japanese with RSP."],
              ["02", "N3", "Build your foundation."],
              ["03", "Admission", "Prepare for your next step."],
              ["04", "Japan", "Study and experience life there."],
              ["05", "N2 / N1", "Advance your Japanese."],
              ["06", "Career", "Move toward opportunity."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="contact-card group min-h-[220px] border-b border-r border-white/10 p-6 transition-colors hover:bg-white/[0.04] lg:min-h-[250px]"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] text-red-500">
                  {number}
                </span>

                <h3 className="mt-14 text-xl font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          GOOGLE MAP
      =================================================== */}

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="contact-reveal mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
                <span className="h-px w-8 bg-red-600" />
                Find RSP
              </div>

              <h2 className="text-4xl font-black tracking-[-0.06em] sm:text-6xl">
                Come and meet us.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Prefer talking face-to-face? Visit us in Meerut and discuss your
              Japanese language and Japan pathway with the team.
            </p>
          </div>

          <div className="contact-map relative min-h-[420px] overflow-hidden border border-slate-200 bg-slate-100 sm:min-h-[520px]">
            <iframe
              title="RSP in Japan location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                CONTACT.mapQuery,
              )}&output=embed`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map card */}

            <div className="absolute bottom-5 left-5 max-w-xs border border-white/20 bg-black/90 p-5 text-white shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-red-500">
                  <MapPinIcon />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
                    RSP in Japan
                  </p>

                  <p className="mt-2 text-sm font-semibold leading-6">
                    {CONTACT.location}
                  </p>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  CONTACT.mapQuery,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-400 transition-colors hover:text-red-300"
              >
                Open in Google Maps
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          FAQ
      =================================================== */}

      <section className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="contact-reveal text-center">
            <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
              <span className="h-px w-8 bg-red-600" />
              Before you write
              <span className="h-px w-8 bg-red-600" />
            </div>

            <h2 className="text-4xl font-black tracking-[-0.06em] sm:text-6xl">
              Questions are welcome.
            </h2>
          </div>

          <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
            {[
              {
                question: "I am a complete beginner. Can I join?",
                answer:
                  "Yes. Our pathway is designed to start from the basics and gradually build your Japanese language skills.",
              },
              {
                question: "Can you help me prepare for JLPT?",
                answer:
                  "Yes. RSP programs include structured preparation, practice material and mock-test focused learning.",
              },
              {
                question: "Do you guide students who want to study in Japan?",
                answer:
                  "Yes. We can help you understand the language, preparation and pathway toward studying in Japan.",
              },
              {
                question: "Can I contact RSP before deciding on a course?",
                answer:
                  "Absolutely. You can send an enquiry first and discuss your goals before choosing a program.",
              },
            ].map((item) => (
              <details key={item.question} className="contact-card group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-base font-bold sm:text-lg">
                  {item.question}

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-lg font-normal transition-transform group-open:rotate-45 group-open:border-red-500 group-open:text-red-600">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pb-7 pr-12 text-sm leading-7 text-slate-500">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="relative overflow-hidden bg-red-600 px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="contact-reveal">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
              RSP in Japan · Since 2020
            </p>

            <h2 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Don&apos;t just plan Japan.
              <br />
              Start the conversation.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              document.getElementById("contact-form")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="contact-reveal group inline-flex w-fit items-center gap-4 border border-white bg-white px-6 py-4 text-sm font-bold text-red-600 transition-colors hover:bg-transparent hover:text-white"
          >
            Send an enquiry
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
