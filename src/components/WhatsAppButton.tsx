
import { useEffect, useRef } from "react";
import gsap from "gsap";

type WhatsAppButtonProps = {
  phoneNumber: string;
  message?: string;
};

export default function WhatsAppButton({
  phoneNumber,
  message = "Hello! I would like to know more about your services.",
}: WhatsAppButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);

  /*
   * ---------------------------------------
   * WHATSAPP URL
   * ---------------------------------------
   *
   * Example:
   * India -> 919876543210
   *
   * Don't use +, spaces or dashes.
   */
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message,
  )}`;

  /*
   * ---------------------------------------
   * GSAP INTRO + FLOATING ANIMATION
   * ---------------------------------------
   */

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        delay: 1,
      });

      timeline.from(button, {
        scale: 0,
        opacity: 0,
        rotation: -20,
        duration: 0.7,
        ease: "back.out(1.7)",
      });

      gsap.to(button, {
        y: -5,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.7,
      });
    }, button);

    return () => ctx.revert();
  }, []);

  /*
   * ---------------------------------------
   * HOVER ANIMATION
   * ---------------------------------------
   */

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });

    if (tooltipRef.current) {
      gsap.fromTo(
        tooltipRef.current,
        {
          x: 10,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        },
      );
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        x: 10,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] sm:bottom-7 sm:right-7">
      <a
        ref={buttonRef}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          group relative
          flex items-center
          gap-3
          rounded-full
          bg-[#25D366]
          p-2.5
          pr-3
          text-white
          shadow-[0_12px_35px_rgba(37,211,102,0.30)]
          transition-shadow
          duration-300
          hover:shadow-[0_16px_45px_rgba(37,211,102,0.42)]
          focus:outline-none
          focus:ring-4
          focus:ring-[#25D366]/30
        "
      >
        {/* --------------------------------
            PULSE RING
        -------------------------------- */}

        <span
          className="
            pointer-events-none
            absolute inset-0
            rounded-full
            border-2
            border-[#25D366]
            opacity-0
            transition-all
            duration-300
            group-hover:scale-125
            group-hover:opacity-30
          "
        />

        {/* --------------------------------
            ICON
        -------------------------------- */}

        <span
          className="
            relative
            flex h-11 w-11
            shrink-0
            items-center justify-center
            rounded-full
            bg-white
            text-[#25D366]
            shadow-sm
            transition-transform
            duration-300
            group-hover:rotate-[-8deg]
          "
        >
          <WhatsAppIcon />
        </span>

        {/* --------------------------------
            DESKTOP LABEL
        -------------------------------- */}

        <span
          ref={tooltipRef}
          className="
            hidden
            whitespace-nowrap
            pr-2
            text-sm
            font-semibold
            md:block
          "
        >
          Chat with us
        </span>

        {/* --------------------------------
            NOTIFICATION DOT
        -------------------------------- */}

        <span
          className="
            absolute
            right-0
            top-0
            flex
            h-3.5 w-3.5
            items-center
            justify-center
            rounded-full
            border-2
            border-white
            bg-red-500
          "
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

/*
 * ---------------------------------------
 * WHATSAPP SVG
 * ---------------------------------------
 */

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.07 0C5.55 0 .24 5.31.24 11.83c0 2.08.54 4.1 1.56 5.89L.14 24l6.43-1.63a11.82 11.82 0 0 0 5.5 1.4h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.39-8.46ZM12.08 21.8h-.01a9.84 9.84 0 0 1-5.01-1.37l-.36-.21-3.82.97 1.02-3.72-.23-.38a9.82 9.82 0 1 1 8.41 4.71Zm5.39-7.37c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.68-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.65-.94-2.26-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54 0 1.5 1.09 2.94 1.24 3.14.15.2 2.14 3.27 5.18 4.58.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.18-1.44-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

