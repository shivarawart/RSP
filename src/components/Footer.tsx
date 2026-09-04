import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FooterLink = {
  label: string;
  href: string;
  route?: string;
};

const navigationLinks: FooterLink[] = [
  { label: "Home", href: "#home", route: "/" },
  { label: "About", href: "#about", route: "/about" },
  { label: "Courses", href: "#courses", route: "/courses" },
  { label: "Founder", href: "#founder", route: "/founder" },
  { label: "Japan Study", href: "#japan-study", route: "/japan-study" },
  { label: "Contact", href: "#contact", route: "/contact" },
];

const socialLinks: FooterLink[] = [
  { label: "Instagram", href: "https://instagram.com", route: "" },
  { label: "LinkedIn", href: "https://linkedin.com", route: "" },
  { label: "Twitter", href: "https://twitter.com", route: "" },
];

const quickLinks: FooterLink[] = [
  { label: "Success Stories", href: "", route: "/japan-study" },
  { label: "FAQ", href: "", route: "/about" },
  { label: "Privacy Policy", href: "", route: "" },
  { label: "Terms of Service", href: "", route: "" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current?.querySelectorAll(".footer-char");

      gsap.from(".footer-reveal", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
        },
      });

      if (titleChars?.length) {
        gsap.from(titleChars, {
          yPercent: 120,
          opacity: 0,
          rotateX: -70,
          stagger: 0.025,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        });
      }

      gsap.to(".footer-orb", {
        y: -80,
        x: 40,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".footer-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
      });

      // Enhanced animations for premium feel
      gsap.from(".footer-stat", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 70%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();

    const target = document.querySelector(href);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNavigation = (route: string, href?: string) => {
    if (route) {
      navigate(route);
      if (href) {
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    } else if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#090203] via-[#180607] to-[#090203] text-white"
    >
      {/* =========================================
          PREMIUM BACKGROUND
      ========================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="footer-orb absolute right-[-15%] top-[-20%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-red-700/25 to-red-900/15 blur-[150px]" />

        <div className="footer-orb absolute left-[-10%] top-[40%] h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-red-900/25 to-[#8F1018]/20 blur-[130px]" />

        {/* Additional ambient glow */}
        <div className="absolute bottom-[-20%] left-[20%] h-[500px] w-[500px] rounded-full bg-red-950/30 blur-[140px]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
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
            backgroundSize: "80px 80px",
          }}
        />

        {/* Subtle particle effects */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* =========================================
            BIG CTA - ENHANCED
        ========================================== */}

        <section className="py-24 sm:py-32 lg:py-40">
          <div className="footer-reveal mb-8 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-40" />
              <span className="relative h-3 w-3 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">
              Ready to start?
            </span>
          </div>

          <h2
            ref={titleRef}
            className="max-w-5xl overflow-hidden text-5xl font-black leading-[0.9] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-[9rem]"
            style={{
              perspective: "1000px",
            }}
          >
            {"Let's start.".split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="footer-char inline-block"
                style={{
                  whiteSpace: char === " " ? "pre" : undefined,
                }}
              >
                {char}
              </span>
            ))}
          </h2>

          <div className="footer-reveal mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base">
              Have an idea, product or experience you want to bring to life?
              Let's turn it into something people remember.
            </p>

            {/* Premium CTA Button */}
            <Link
              to="/contact"
              className="group relative flex h-16 w-full items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 px-6 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-2xl shadow-red-900/50 transition-all duration-500 hover:rounded-[28px] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] sm:w-[240px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                Start Your
              </span>

              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 group-hover:bg-white group-hover:text-red-600">
                ↗
              </span>

              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-b from-white to-red-100 transition-transform duration-500 group-hover:scale-y-100" />

              <span className="absolute inset-0 z-10 flex items-center justify-between px-6 text-sm font-bold uppercase tracking-[0.15em] text-red-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span>Journey</span>
                <span className="text-xl"></span>
              </span>

              {/* Shimmer effect */}
              <span className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full" />
            </Link>
          </div>

          {/* Stats */}
          <div className="footer-reveal mt-16 grid grid-cols-3 gap-4 sm:gap-8">
            <div className="footer-stat text-center">
              <p className="text-3xl font-bold text-red-400 sm:text-4xl">
                500+
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                Students
              </p>
            </div>
            <div className="footer-stat text-center">
              <p className="text-3xl font-bold text-red-400 sm:text-4xl">
                100%
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                In Japan
              </p>
            </div>
            <div className="footer-stat text-center">
              <p className="text-3xl font-bold text-red-400 sm:text-4xl">
                4.9★
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
                Rating
              </p>
            </div>
          </div>
        </section>

        {/* =========================================
            DIVIDER - ENHANCED
        ========================================== */}

        <div className="relative h-px overflow-hidden bg-gradient-to-r from-white/10 via-white/20 to-white/10">
          <div className="footer-line absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-red-500 via-red-400 to-red-500" />
        </div>

        {/* =========================================
            FOOTER CONTENT - ENHANCED
        ========================================== */}

        {/* =========================================
    FOOTER CONTENT - ENHANCED
========================================== */}
        <section className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="footer-reveal">
              <Link to="/" className="group inline-flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-white/80 text-lg font-black text-[#8F1018] shadow-lg shadow-white/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-xl">
                  R
                </span>

                <span className="text-2xl font-black tracking-tight">
                  RSP<span className="text-red-500">.</span>
                  <span className="text-white/40"> Japan</span>
                </span>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
                Your journey to Japan starts here. Learn Japanese, experience
                culture, and build a future in Japan with personalized guidance.
              </p>
            </div>

            {/* Socials */}
            <div className="footer-reveal mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/20 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-red-600/30 to-transparent transition-transform duration-300 group-hover:scale-y-100" />

                  <span className="relative z-10">{social.label}</span>
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="footer-reveal mt-8 space-y-4">
              <a
                href="mailto:connect@rspinjapan.com"
                className="group flex items-center gap-3 text-sm text-white/45 transition-colors hover:text-red-400"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-red-500/30 group-hover:bg-red-500/10">
                  <Mail size={14} />
                </div>

                <span>connect@rspinjapan.com</span>
              </a>

              <div className="group flex items-center gap-3 text-sm text-white/45">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all group-hover:border-red-500/30 group-hover:bg-red-500/10">
                  <MapPin size={14} />
                </div>

                <span>Kyoto, Japan · India</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-reveal lg:col-span-2">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              <span className="h-px w-4 bg-red-500" />
              Explore
            </p>

            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation(link.route || "", link.href)
                    }
                    className="group relative flex w-full items-center gap-2 text-left text-sm font-medium text-white/45 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    <span className="h-px w-0 shrink-0 bg-red-500 transition-all duration-300 group-hover:w-5" />

                    <span>{link.label}</span>

                    <ArrowUpRight
                      size={12}
                      strokeWidth={1.8}
                      className="ml-auto opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-reveal lg:col-span-2">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              <span className="h-px w-4 bg-red-500" />
              Resources
            </p>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.route || "#"}
                    className="group flex w-full items-center gap-2 text-sm text-white/45 transition-all duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-red-500 to-transparent transition-all duration-300 group-hover:w-6" />

                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================================
      MAP IMAGE
  ========================================== */}
          <div className="footer-reveal lg:col-span-4">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              <span className="h-px w-4 bg-red-500" />
              Find us
            </p>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="relative h-[230px] overflow-hidden rounded-xl sm:h-[260px]">
                {/* Map Image */}
                <img
                  src="/images/kyoto-map.webp"
                  alt="RSP Japan location in Kyoto, Japan"
                  className="h-full w-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                />

                {/* Dark overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                {/* Red Map Marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute -inset-3 rounded-full bg-red-500/20 blur-sm" />

                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-red-600 text-white shadow-[0_0_35px_rgba(239,68,68,0.7)]">
                    <MapPin size={18} />
                  </span>
                </div>

                {/* Location Information */}
                <div className="absolute bottom-5 left-5">
                  <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/45">
                    Our location
                  </p>

                  <p className="mt-1 text-xl font-black tracking-[-0.03em] text-white">
                    Kyoto
                  </p>

                  <p className="text-[10px] text-white/45">Japan</p>
                </div>

                {/* Corner Decoration */}
                <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-red-500/60" />

                <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-red-500/30" />
              </div>
            </div>

            {/* Map Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                  Kyoto, Japan
                </span>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Kyoto,Japan"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 hover:text-white"
              >
                Open map
                <ArrowUpRight
                  size={11}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-reveal lg:col-span-3">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
              <span className="h-px w-4 bg-red-500" />
              Get in touch
            </p>

            <div className="space-y-4">
              <p className="text-sm leading-6 text-white/40">
                Available for selected projects, collaborations and ambitious
                ideas.
              </p>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white/60 backdrop-blur-sm transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/20 hover:text-white"
              >
                <Mail size={14} />

                <span>Send us a message</span>

                <ArrowUpRight
                  size={12}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================
            BOTTOM BAR - ENHANCED
        ========================================== */}

        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left — Copyright + Legal */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
                © {new Date().getFullYear()} RSP Japan
              </p>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <Link
                to="/privacy"
                className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25 transition-colors duration-300 hover:text-white"
              >
                Privacy
              </Link>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <Link
                to="/terms"
                className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25 transition-colors duration-300 hover:text-white"
              >
                Terms
              </Link>
            </div>

            {/* Right — Back to top */}
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              className="group flex w-fit items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-white/25 transition-colors duration-300 hover:text-white"
            >
              <span>Back to top</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_8px_25px_rgba(239,68,68,0.25)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M12 19V5M6 11l6-6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for floating particles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </footer>
  );
}
