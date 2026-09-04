import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Study in Japan",
    href: "/JapanStudy",
  },
  {
    name: "founder",
    href: "/founder",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

// const NAV_HEIGHT = 90;

export default function Navbar() {
  const location = useLocation();

  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLinksRef = useRef<HTMLDivElement | null>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);

  /* ---------------------------------------
     ACTIVE ROUTE
  --------------------------------------- */

  const isActiveRoute = useCallback(
    (href: string) => {
      if (href === "/") {
        return location.pathname === "/";
      }

      return (
        location.pathname === href || location.pathname.startsWith(`${href}/`)
      );
    },
    [location.pathname],
  );

  /* ---------------------------------------
     NAVBAR INTRO
  --------------------------------------- */

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline.fromTo(
        nav,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        },
      );

      timeline.from(
        ".nav-logo",
        {
          x: -25,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.45",
      );

      timeline.from(
        ".desktop-link",
        {
          y: -15,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
        },
        "-=0.3",
      );

      timeline.from(
        ".nav-cta",
        {
          x: 20,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.25",
      );
    }, nav);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ---------------------------------------
     SCROLL DETECTION
  --------------------------------------- */

  useEffect(() => {
    let previousScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 40);

      if (currentScroll < previousScroll) {
        setScrollingUp(true);
      } else if (currentScroll > previousScroll) {
        setScrollingUp(false);
      }

      previousScroll = currentScroll;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------
     CLOSE MOBILE MENU
  --------------------------------------- */

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  /* ---------------------------------------
     MOBILE MENU ANIMATION
  --------------------------------------- */

  useEffect(() => {
    const menu = mobileMenuRef.current;
    const links = mobileLinksRef.current;

    if (!menu) return;

    menuTimelineRef.current?.kill();

    if (menuOpen) {
      document.body.style.overflow = "hidden";

      gsap.set(menu, {
        display: "block",
      });

      const timeline = gsap.timeline();

      menuTimelineRef.current = timeline;

      timeline.fromTo(
        menu,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power4.out",
        },
      );

      if (links) {
        timeline.from(
          Array.from(links.children),
          {
            y: 35,
            opacity: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.25",
        );
      }

      return () => {
        timeline.kill();
      };
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(menu, {
          display: "none",
        });
      },
    });

    menuTimelineRef.current = timeline;

    timeline.to(menu, {
      yPercent: -100,
      duration: 0.45,
      ease: "power3.inOut",
    });

    document.body.style.overflow = "";

    return () => {
      timeline.kill();
    };
  }, [menuOpen]);

  /* ---------------------------------------
     CLOSE MENU WHEN ROUTE CHANGES
  --------------------------------------- */

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* ---------------------------------------
     RESTORE BODY SCROLL
  --------------------------------------- */

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ---------------------------------------
     ESC KEY
  --------------------------------------- */

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, closeMobileMenu]);

  /* ---------------------------------------
     SCROLL TO TOP AFTER ROUTE CHANGE
  --------------------------------------- */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  /* ---------------------------------------
     NAVBAR THEME
  --------------------------------------- */

  /*
   * Red while at the top.
   * White after scrolling down.
   */
  const redMode = !scrolled || scrollingUp;

  return (
    <>
      {/* =====================================
          NAVBAR
      ====================================== */}

      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <nav
          aria-label="Main navigation"
          className={`
            mx-auto
            flex
            h-[68px]
            w-full
            max-w-7xl
            items-center
            justify-between
            rounded-2xl
            border
            px-2
            transition-all
            duration-500
            ${
              redMode
                ? `
                  border-red-400/30
                  bg-[#8F1018]
                  shadow-[0_15px_50px_rgba(143,16,24,0.30)]
                `
                : `
                  border-black/10
                  bg-white
                  shadow-[0_15px_50px_rgba(0,0,0,0.10)]
                `
            }
          `}
        >
          {/* =====================================
              LOGO
          ====================================== */}

          <Link
            to="/"
            aria-label="RSP in Japan home"
            className="
              nav-logo
              group
              flex
              items-center
              gap-3
              pl-2
              sm:pl-3
            "
          >
            <span
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-sm
                font-black
                transition-all
                duration-300
                group-hover:rotate-6
                group-hover:scale-105
                ${
                  redMode
                    ? "bg-white text-[#8F1018]"
                    : "bg-[#8F1018] text-white"
                }
              `}
            >
              R
            </span>

            <div className="hidden items-center sm:flex">
              <span
                className={`
      text-lg
      font-black
      tracking-[-0.055em]
      transition-colors
      duration-300
      ${redMode ? "text-white" : "text-[#180607]"}
    `}
              >
                RSP
              </span>

              <span className="mx-2 text-[11px] font-medium text-[#E60012]">
                /
              </span>

              <span
                className={`
      text-[9px]
      font-semibold
      uppercase
      tracking-[0.28em]
      transition-colors
      duration-300
      ${redMode ? "text-white/55" : "text-[#180607]/55"}
    `}
              >
                in Japan
              </span>
            </div>
          </Link>

          {/* =====================================
              DESKTOP NAVIGATION
          ====================================== */}

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    desktop-link
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    transition-colors
                    duration-300
                    ${redMode ? "text-white/70" : "text-black/60"}
                    ${active ? (redMode ? "text-white" : "text-[#8F1018]") : ""}
                  `}
                >
                  {/* Hover background */}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute
                      inset-0
                      origin-left
                      scale-x-0
                      rounded-xl
                      transition-transform
                      duration-300
                      group-hover:scale-x-100
                      ${redMode ? "bg-white" : "bg-[#8F1018]"}
                    `}
                  />

                  {/* Text */}

                  <span
                    className={`
                      relative
                      z-10
                      transition-colors
                      duration-300
                      ${
                        redMode
                          ? "group-hover:text-[#8F1018]"
                          : "group-hover:text-white"
                      }
                    `}
                  >
                    {item.name}
                  </span>

                  {/* Active indicator */}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute
                      bottom-1
                      left-1/2
                      h-1
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-red-500
                      transition-all
                      duration-300
                      ${active ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* =====================================
              DESKTOP CTA
          ====================================== */}

          <Link
            to="/contact"
            className={`
              nav-cta
              group
              relative
              mr-1
              hidden
              overflow-hidden
              rounded-xl
              px-5
              py-3
              text-xs
              font-bold
              uppercase
              tracking-[0.12em]
              sm:mr-2
              md:block
              ${redMode ? "bg-white text-[#8F1018]" : "bg-[#8F1018] text-white"}
            `}
          >
            {/* Animated fill */}

            <span
              aria-hidden="true"
              className={`
                absolute
                inset-0
                translate-y-full
                transition-transform
                duration-300
                group-hover:translate-y-0
                ${redMode ? "bg-red-500" : "bg-red-600"}
              `}
            />

            <span
              className="
                relative
                z-10
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              Let's Talk
            </span>
          </Link>

          {/* =====================================
              MOBILE MENU BUTTON
          ====================================== */}

          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
            className={`
              relative
              mr-1
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              md:hidden
              ${
                redMode
                  ? "border-white/20 bg-white/10"
                  : "border-black/10 bg-black/5"
              }
            `}
          >
            <span
              className={`
                absolute
                h-[2px]
                w-5
                transition-all
                duration-300
                ${menuOpen ? "rotate-45" : "-translate-y-1.5"}
                ${redMode ? "bg-white" : "bg-[#8F1018]"}
              `}
            />

            <span
              className={`
                absolute
                h-[2px]
                w-5
                transition-all
                duration-300
                ${menuOpen ? "-rotate-45" : "translate-y-1.5"}
                ${redMode ? "bg-white" : "bg-[#8F1018]"}
              `}
            />
          </button>
        </nav>
      </header>

      {/* =====================================
          MOBILE MENU
      ====================================== */}

      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        aria-hidden={!menuOpen}
        className="
          fixed
          inset-0
          z-40
          hidden
          bg-[#8F1018]
          md:hidden
        "
      >
        <div
          className="
            flex
            min-h-screen
            flex-col
            overflow-y-auto
            px-6
            pb-10
            pt-32
            sm:px-10
          "
        >
          {/* Header */}

          <div className="mb-10">
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/50
              "
            >
              Navigation
            </span>
          </div>

          {/* Links */}

          <div ref={mobileLinksRef} className="flex flex-col">
            {navItems.map((item, index) => {
              const active = isActiveRoute(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                  className="
                    mobile-nav-link
                    group
                    flex
                    items-center
                    gap-4
                    border-b
                    border-white/10
                    py-5
                    text-left
                  "
                >
                  {/* Number */}

                  <span
                    className={`
                      w-6
                      text-xs
                      ${active ? "text-white" : "text-white/30"}
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Name */}

                  <span
                    className={`
                      text-3xl
                      font-bold
                      tracking-tight
                      text-white
                      transition-transform
                      duration-300
                      group-hover:translate-x-3
                      sm:text-5xl
                      ${active ? "translate-x-2" : ""}
                    `}
                  >
                    {item.name}
                  </span>

                  {/* Arrow */}

                  <span
                    aria-hidden="true"
                    className="
                      ml-auto
                      text-xl
                      text-white/40
                      transition-all
                      duration-300
                      group-hover:translate-x-2
                      group-hover:text-white
                    "
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Footer */}

          <div className="mt-auto">
            <div className="mb-5 h-px bg-white/10" />

            <p
              className="
                max-w-sm
                text-sm
                leading-6
                text-white/40
              "
            >
              Helping students take the next step toward Japan.
            </p>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-white
                hover:text-[#8F1018]
              "
            >
              Start a conversation
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
