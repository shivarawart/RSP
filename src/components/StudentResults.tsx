import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    number: "01",
    title: "From N3 to Yokohama",
    description: "The language milestone that opened the application door.",
    tag: "PATHWAY",
  },
  {
    number: "02",
    title: "A first N1",
    description: "Advanced Japanese earned one disciplined day at a time.",
    tag: "MASTERY",
  },
  {
    number: "03",
    title: "Work begins here",
    description: "Preparing for the interview, not just the exam.",
    tag: "FUTURE",
  },
];

export default function StudentResults() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".results-heading");

      const intro = section.querySelector(".results-intro");

      const items = gsap.utils.toArray<HTMLElement>(".result-item");

      const line = section.querySelector<HTMLElement>(".results-progress");

      const number = section.querySelector<HTMLElement>(".results-big-number");

      if (reduceMotion) {
        gsap.set([heading, intro, ...items, line, number].filter(Boolean), {
          opacity: 1,
          clearProps: "all",
        });

        return;
      }

      gsap.set([heading, intro].filter(Boolean), {
        opacity: 0,
        y: 40,
      });

      gsap.set(items, {
        opacity: 0,
        x: 60,
      });

      gsap.set(line, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
        })
        .to(
          intro,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          line,
          {
            scaleY: 1,
            duration: 1.2,
            ease: "power4.inOut",
          },
          "-=0.3",
        )
        .to(
          items,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.7",
        );

      /* ---------------------------------------------
         BIG NUMBER PARALLAX
      --------------------------------------------- */

      if (number) {
        gsap.to(number, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /* ---------------------------------------------
         RESULT CARD INTERACTION
      --------------------------------------------- */

      items.forEach((item) => {
        const arrow = item.querySelector<HTMLElement>(".result-arrow");

        const handleEnter = () => {
          if (!arrow) return;

          gsap.to(arrow, {
            x: 7,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          if (!arrow) return;

          gsap.to(arrow, {
            x: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        item.addEventListener("pointerenter", handleEnter);

        item.addEventListener("pointerleave", handleLeave);

        ctx.add(() => {
          item.removeEventListener("pointerenter", handleEnter);

          item.removeEventListener("pointerleave", handleLeave);
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#171313]
        px-5
        py-24
        text-[#f8f7f4]
        sm:px-8
        sm:py-28
        lg:px-12
        lg:py-36
        xl:py-44
      "
    >
      {/* Ambient glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#8f1018]/20
          blur-[150px]
        "
      />

      {/* Grid */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto max-w-[1500px]">
        {/* =============================================
            HEADER
        ============================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[.8fr_1.2fr]
            lg:items-end
          "
        >
          <div>
            <div
              className="
                mb-7
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  h-px
                  w-12
                  bg-[#d58b91]
                "
              />

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.35em]
                  text-[#d58b91]
                "
              >
                Student results
              </span>
            </div>

            <p
              className="
                max-w-[280px]
                text-xs
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              Every milestone matters.
            </p>
          </div>

          <div>
            <h2
              className="
                results-heading
                max-w-[850px]
                text-[clamp(3.2rem,7vw,7rem)]
                font-black
                leading-[0.87]
                tracking-[-0.075em]
              "
            >
              Small wins become
              <span className="block text-[#d58b91]">a different life.</span>
            </h2>

            <p
              className="
                results-intro
                mt-8
                max-w-[620px]
                text-base
                leading-7
                text-white/50
                sm:text-lg
                sm:leading-8
              "
            >
              Every certificate carries a story of practice, patience, and
              someone back home who kept believing.
            </p>
          </div>
        </div>

        {/* =============================================
            RESULTS JOURNEY
        ============================================== */}

        <div
          className="
            relative
            mt-20
            lg:mt-32
          "
        >
          {/* Progress rail */}

          <div
            className="
              absolute
              bottom-0
              left-[19px]
              top-0
              w-px
              bg-white/10
              sm:left-[27px]
              lg:left-[39px]
            "
          >
            <div
              className="
                results-progress
                h-full
                w-full
                origin-top
                bg-[#d58b91]
              "
            />
          </div>

          {/* Items */}

          <div className="space-y-5 sm:space-y-7">
            {results.map((result) => (
              <article
                key={result.number}
                className="
                  result-item
                  group
                  relative
                  grid
                  grid-cols-[40px_1fr]
                  gap-6
                  sm:grid-cols-[56px_1fr]
                  sm:gap-8
                  lg:grid-cols-[80px_1fr]
                  lg:gap-10
                "
              >
                {/* Number node */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d58b91]/30
                    bg-[#171313]
                    text-[8px]
                    font-black
                    tracking-[0.15em]
                    text-[#d58b91]
                    transition-all
                    duration-500
                    group-hover:border-[#d58b91]
                    group-hover:bg-[#d58b91]
                    group-hover:text-[#171313]
                    sm:h-14
                    sm:w-14
                    lg:h-20
                    lg:w-20
                  "
                >
                  {result.number}
                </div>

                {/* Card */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-6
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:border-[#d58b91]/30
                    group-hover:bg-white/[0.06]
                    sm:p-8
                    lg:p-10
                  "
                >
                  {/* Top label */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.3em]
                        text-[#d58b91]
                      "
                    >
                      {result.tag}
                    </span>

                    <span
                      className="
                        result-arrow
                        text-lg
                        text-white/30
                        transition-colors
                        group-hover:text-[#d58b91]
                      "
                    >
                      →
                    </span>
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      mt-7
                      max-w-[800px]
                      text-[clamp(1.7rem,4vw,3.5rem)]
                      font-black
                      leading-[0.95]
                      tracking-[-0.055em]
                    "
                  >
                    {result.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-4
                      max-w-[580px]
                      text-sm
                      leading-6
                      text-white/45
                      sm:text-base
                    "
                  >
                    {result.description}
                  </p>

                  {/* Bottom accent */}

                  <div
                    className="
                      mt-8
                      h-px
                      w-12
                      bg-[#d58b91]/40
                      transition-all
                      duration-700
                      group-hover:w-28
                      group-hover:bg-[#d58b91]
                    "
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =============================================
            CTA / CLOSING STATEMENT
        ============================================== */}

        <div
          className="
            mt-20
            flex
            flex-col
            gap-8
            border-t
            border-white/10
            pt-8
            sm:mt-28
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              The journey continues
            </span>

            <p
              className="
                mt-3
                max-w-[480px]
                text-sm
                leading-6
                text-white/45
              "
            >
              Your result is more than a certificate. It is another step toward
              the life you imagined.
            </p>
          </div>

          <a
            href="/success-stories"
            className="
              group
              inline-flex
              items-center
              gap-5
              self-start
              rounded-full
              border
              border-white/15
              px-6
              py-4
              text-[9px]
              font-black
              uppercase
              tracking-[0.22em]
              text-white
              transition-all
              duration-500
              hover:border-[#d58b91]
              hover:bg-[#d58b91]
              hover:text-[#171313]
              sm:self-auto
            "
          >
            <span>Read their stories</span>

            <span
              className="
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Huge decorative number */}

      <div
        aria-hidden="true"
        className="
          results-big-number
          pointer-events-none
          absolute
          -bottom-20
          right-[-3rem]
          select-none
          text-[18rem]
          font-black
          leading-none
          tracking-[-0.12em]
          text-white/[0.025]
          sm:text-[25rem]
          lg:text-[35rem]
        "
      >
        03
      </div>
    </section>
  );
}
