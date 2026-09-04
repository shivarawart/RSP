import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HeroProps = {
  founderImage: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ founderImage }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-topline", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
      })
        .from(
          ".hero-kicker",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.45",
        )
        .from(
          ".hero-title-line",
          {
            yPercent: 110,
            opacity: 0,
            rotateX: -35,
            stagger: 0.1,
            duration: 0.9,
          },
          "-=0.3",
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.45",
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
          },
          "-=0.35",
        )
        .from(
          ".hero-image-wrap",
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
            duration: 1.1,
          },
          "-=0.75",
        )
        .from(
          ".hero-image-meta",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.5",
        );

      gsap.to(".hero-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.from(".hero-grid-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Premium floating elements animation
      gsap.from(".premium-badge", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(".stats-card", {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleStartLearning = () => {
    // Navigate to courses page first
    navigate("/courses");
    // Then smoothly scroll to contact section after a brief delay
    setTimeout(() => {
      const contactElement = document.querySelector("#contact");
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleContactFounder = () => {
    navigate("/contact");
    setTimeout(() => {
      const founderElement = document.querySelector("#founder");
      if (founderElement) {
        founderElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-gradient-to-br from-[#8F1018] via-[#6B0A12] to-[#180607]
        text-white
      "
    >
      {/* =====================================================
          PREMIUM ATMOSPHERIC BACKGROUND
      ====================================================== */}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Animated gradient orbs */}
        <div
          className="
            absolute
            -right-40
            top-20
            h-[600px]
            w-[600px]
            rounded-full
            bg-gradient-to-br from-red-400/20 to-orange-500/10
            blur-[150px]
            animate-pulse
          "
          style={{ animationDuration: "8s" }}
        />

        <div
          className="
            absolute
            -bottom-40
            left-[-10%]
            h-[550px]
            w-[550px]
            rounded-full
            bg-gradient-to-tr from-black/20 to-red-900/15
            blur-[140px]
          "
        />

        {/* Premium particle effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Fine grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.05]
          "
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

        {/* Giant background typography */}
        <span
          className="
            absolute
            -right-10
            top-[18%]
            select-none
            text-[18rem]
            font-black
            leading-none
            tracking-[-0.12em]
            text-white/[0.02]
            sm:text-[25rem]
            lg:text-[34rem]
          "
        >
          JP
        </span>

        {/* Diagonal accent lines */}
        <div
          className="
            absolute
            left-0
            top-1/3
            h-px
            w-[40%]
            origin-left
            -rotate-12
            bg-gradient-to-r from-white/10 to-transparent
          "
        />
        <div
          className="
            absolute
            right-0
            bottom-1/4
            h-px
            w-[30%]
            origin-right
            rotate-12
            bg-gradient-to-l from-white/10 to-transparent
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1800px]
          flex-col
          px-5
          pb-8
          pt-28
          sm:px-8
          sm:pt-32
          lg:px-12
          lg:pt-36
          xl:px-16
        "
      >
        {/* =================================================
            TOP HORIZONTAL LINE
        ================================================== */}

        <div
          className="
            hero-topline
            h-px
            w-full
            origin-left
            bg-gradient-to-r from-white/30 via-white/15 to-transparent
          "
        />

        {/* =================================================
            TOP METADATA - ENHANCED
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            py-5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.28em]
            text-white/45
            sm:text-[10px]
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
            <span>RSP in Japan</span>
          </div>

          <div className="hidden items-center gap-6 sm:flex">
            <span>Kyoto · Tokyo · Japan</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span>Est. 2020</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Est. 2020</span>
            <span className="premium-badge flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em]">
              <span className="h-1 w-1 rounded-full bg-green-400" />
              Premium
            </span>
          </div>
        </div>

        {/* =================================================
            HERO CONTENT
        ================================================== */}

        <div
          className="
            grid
            flex-1
            grid-cols-1
            gap-12
            py-10
            lg:grid-cols-[1.05fr_0.95fr]
            lg:items-center
            lg:gap-16
            lg:py-14
            xl:grid-cols-[1.1fr_0.9fr]
            xl:gap-24
          "
        >
          {/* =================================================
              LEFT SIDE - ENHANCED
          ================================================== */}

          <div className="relative z-10 max-w-4xl">
            {/* Kicker - Enhanced with glow */}
            <div className="hero-kicker mb-7 flex items-center gap-3 sm:mb-9">
              <span
                className="
                  flex
                  h-9
                  min-w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/25
                  bg-white/5
                  px-2
                  text-[11px]
                  font-bold
                  shadow-lg
                  backdrop-blur-sm
                "
              >
                日
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                日本語への道
              </span>

              <span className="h-px w-10 bg-gradient-to-r from-white/30 to-transparent" />

              <span className="text-xs text-white/45">A road to Japan</span>
            </div>

            {/* Main heading - Enhanced with text shadow */}
            <div
              className="
                overflow-hidden
              "
              style={{
                perspective: "1000px",
              }}
            >
              <h1
                className="
                  font-black
                  leading-[0.84]
                  tracking-[-0.075em]
                  text-white
                  text-[clamp(4rem,9vw,9.5rem)]
                  drop-shadow-2xl
                "
              >
                <span className="hero-title-line block">Learn</span>
                <span className="hero-title-line block">Japanese.</span>
                <span className="hero-title-line block bg-gradient-to-r from-white via-white/80 to-white/30 bg-clip-text text-transparent">
                  Live Japan.
                </span>
              </h1>
            </div>

            {/* Description - Enhanced */}
            <p
              className="
                hero-description
                mt-8
                max-w-xl
                text-base
                leading-7
                text-white/65
                sm:mt-10
                sm:text-lg
                sm:leading-8
              "
            >
              Learn Japanese in Japan. Build confidence through real
              experiences, real conversations and a life immersed in Japanese
              culture.
            </p>

            {/* =================================================
                ACTIONS - PREMIUM BUTTONS
            ================================================== */}

            <div
              className="
                hero-actions
                mt-9
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:gap-4
              "
            >
              {/* Primary - Enhanced with premium effects */}
              <button
                type="button"
                onClick={handleStartLearning}
                className="
                  group
                  relative
                  flex
                  h-16
                  w-full
                  items-center
                  justify-between
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-r from-white via-white/95 to-white/90
                  px-6
                  text-sm
                  font-bold
                  text-[#8F1018]
                  shadow-2xl
                  shadow-black/30
                  transition-all
                  duration-500
                  hover:rounded-[32px]
                  hover:shadow-[#8F1018]/50
                  hover:scale-[1.02]
                  sm:w-[240px]
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8F1018] animate-pulse" />
                  Start learning
                </span>

                <span
                  className="
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br from-[#8F1018] to-[#6B0A12]
                    text-white
                    shadow-lg
                    transition-all
                    duration-500
                    group-hover:rotate-45
                    group-hover:scale-110
                  "
                >
                  ↗
                </span>

                <span
                  className="
                    absolute
                    inset-0
                    origin-bottom
                    scale-y-0
                    bg-gradient-to-b from-[#180607] to-[#8F1018]
                    transition-transform
                    duration-500
                    group-hover:scale-y-100
                  "
                />

                <span
                  className="
                    absolute
                    inset-0
                    z-20
                    flex
                    items-center
                    justify-between
                    px-6
                    text-sm
                    font-bold
                    text-white
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:opacity-100
                  "
                >
                  <span className="flex items-center gap-2">
                    <span>Start learning</span>
                    <span className="text-[10px] text-white/70">→</span>
                  </span>
                  <span>↗</span>
                </span>

                {/* Shimmer effect */}
                <span
                  className="
                    absolute
                    -left-full
                    top-0
                    h-full
                    w-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:left-full
                  "
                />
              </button>

              {/* Secondary - Enhanced */}
              <button
                type="button"
                onClick={handleContactFounder}
                className="
                  group
                  flex
                  h-16
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/25
                  bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-md
                  shadow-xl
                  shadow-black/20
                  transition-all
                  duration-500
                  hover:border-white/40
                  hover:bg-white/15
                  hover:shadow-2xl
                  hover:scale-[1.02]
                  sm:w-auto
                "
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Talk to Rohit
                </span>
                <span className="transition-all duration-500 group-hover:translate-x-2 group-hover:rotate-45">
                  ↗
                </span>
              </button>
            </div>

            {/* =================================================
                PREMIUM STATS CARD
            ================================================== */}

            <div className="stats-card mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">500+</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">
                    Students
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">100%</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">
                    In Japan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">4.9★</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/40">
                    Rating
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                TRUST / FOUNDER META - ENHANCED
            ================================================== */}

            <div
              className="
                mt-10
                flex
                flex-col
                gap-5
                border-t
                border-white/15
                pt-6
                sm:flex-row
                sm:items-center
                sm:gap-8
              "
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-red-400 to-red-600" />
                  <span className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-red-400 animate-ping" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  Founded by
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 shadow-lg">
                  <img
                    src={founderImage}
                    alt="Rohit Shiv Prasad"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">
                    Rohit Shiv Prasad
                  </span>
                  <p className="text-xs text-white/40">Kyoto, Japan</p>
                </div>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-px w-12 bg-white/15" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Visionary Educator
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT / FOUNDER IMAGE - ENHANCED
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-[520px]
              items-end
              justify-center
              lg:min-h-[650px]
              xl:min-h-[720px]
            "
          >
            {/* Decorative vertical line - Enhanced */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-1/2
                top-0
                hidden
                w-px
                bg-gradient-to-b from-transparent via-white/20 to-transparent
                lg:block
              "
            />

            {/* Image frame - Premium */}
            <div
              className="
                hero-image-wrap
                relative
                z-10
                h-[500px]
                w-full
                max-w-[480px]
                overflow-hidden
                rounded-[2.5rem]
                shadow-2xl
                shadow-black/50
                sm:h-[600px]
                lg:h-[650px]
                xl:h-[700px]
              "
            >
              {/* Image */}
              <img
                src={founderImage}
                alt="Rohit Shiv Prasad, founder of RSP in Japan"
                className="
                  hero-image
                  h-[108%]
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />

              {/* Premium gradient overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#180607]/90
                  via-[#180607]/20
                  to-transparent
                "
              />

              {/* Image border - Enhanced */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-[2.5rem]
                  border-2
                  border-white/20
                  shadow-[inset_0_0_60px_rgba(255,255,255,0.1)]
                "
              />

              {/* Corner accents */}
              <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-white/40" />
              <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-white/40" />
              <div className="absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 border-white/40" />
              <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-white/40" />

              {/* Founder name - Enhanced */}
              <div
                className="
                  hero-image-meta
                  absolute
                  bottom-6
                  left-6
                  right-6
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
                      Founder
                    </p>
                  </div>

                  <p className="mt-1.5 text-xl font-bold tracking-tight text-white drop-shadow-lg">
                    Rohit Shiv Prasad
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-xs text-white/50">
                    <span className="h-px w-4 bg-white/30" />
                    RSP in Japan
                  </p>
                </div>

                <button
                  onClick={handleContactFounder}
                  className="
                    group
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/25
                    bg-gradient-to-br from-white/20 to-white/5
                    text-white
                    backdrop-blur-md
                    shadow-lg
                    transition-all
                    duration-500
                    hover:scale-110
                    hover:bg-white/30
                    hover:shadow-xl
                  "
                >
                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:rotate-45">
                    ↗
                  </span>
                </button>
              </div>
            </div>

            {/* =================================================
                FLOATING CARD - PREMIUM
            ================================================== */}

            <div
              className="
                hero-image-meta
                absolute
                bottom-8
                left-0
                z-20
                hidden
                w-[220px]
                rounded-2xl
                border
                border-white/20
                bg-gradient-to-br from-[#180607]/90 to-[#180607]/70
                p-5
                backdrop-blur-xl
                shadow-2xl
                shadow-black/50
                lg:block
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-orange-400 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                  The journey
                </span>
              </div>

              <p className="mt-5 text-base font-bold leading-6 text-white drop-shadow-md">
                From learning
                <br />
                to living Japan.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#180607] bg-white/20 text-[8px] font-bold">
                    JP
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#180607] bg-white/20 text-[8px] font-bold">
                    日
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#180607] bg-white/20 text-[8px] font-bold">
                    ★
                  </span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.15em] text-white/40">
                  Learn · Experience · Belong
                </span>
              </div>

              {/* Progress indicator */}
              <div className="mt-5">
                <div className="h-1 w-full rounded-full bg-white/10">
                  <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-red-400 to-orange-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM INFORMATION BAR - ENHANCED
        ================================================== */}

        <div className="relative mt-auto">
          <div
            className="
              hero-grid-line
              h-px
              w-full
              origin-left
              bg-gradient-to-r from-white/30 via-white/15 to-transparent
            "
          />

          <div
            className="
              flex
              flex-col
              gap-5
              py-6
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-white/35
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span>Japanese language · Culture · Life</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden items-center gap-2 sm:flex">
                <span>Scroll to explore</span>
                <span className="animate-bounce">↓</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>35° 01′ N · 135° 45′ E</span>
            </div>
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
    </section>
  );
}
